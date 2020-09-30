import Customer from '../models/customer.model';
import { Task } from '../models/task.model';
import logger from './logger';
import { Payment } from '../models/payment.model';
import { Transaction } from '../models/transcations.model';

export interface IUser {
  firstName: string;
  lastName?: string;
  email: string;
}

export async function createCustomer(user: IUser) {
  try {
    const emails = await Customer.query().where('email', user.email);

    if (emails.length > 0) return { error: 'Email already exsists' };

    const customer = await Customer.query().insert(user);
    return { data: customer };
  } catch (error) {
    logger.error(error);
  }
}

export async function getAllCustomers() {
  try {
    const customers = await Customer.query().select('*').withGraphJoined('tasks').withGraphJoined('payments').withGraphJoined('invoices').orderBy('due_date', 'asc');
    return { data: customers };
  } catch (error) {
    logger.error(error);
  }
}

export async function getCustomerById(id: string) {
  try {

    const customer = await Customer.query().findById(id).withGraphJoined('payments').withGraphJoined('tasks').withGraphJoined('invoices');
    if (!customer) return { error: 'User not found' }

    return { data: customer };
    
  } catch (error) {
    logger.error(error);
    return { error: 'User not found' }
  }
}

export async function createTask(customerId: string, task: string) {
  try {
    const createdTask = await Task.query().insert({
      customerId,
      task,
    });

    return createdTask;
  } catch (error) {
    logger.error(error);
  }
}

export async function addDueMoney(customerId: string, dueDate: Date, dueAmount: number) {
  try {
    const createdPayment = await Payment.query().select('*').where('customerId', customerId);
    if(createdPayment.length > 0) {
      const updatedPayment = await Payment.query().where('customerId', customerId).patch({
        totalAmount: ( createdPayment[0].totalAmount * 1) + dueAmount,
        dueDate
      });

      return updatedPayment;
    }

    const newPayment = await Payment.query().insert({
      customerId,
      dueDate,
      totalAmount: dueAmount,
    });

    return newPayment;

  } catch (error) {
    logger.error(error);
  }

}

export async function addRecivedMoney(customerId: string, amount: number) {

  try {
    const customer = await Customer.query().findById(customerId);
    if(!customer) return { error: 'Customer not found' };

    const payment = await Payment.query().where('customerId',customerId).select('*');
    const recived = await Payment.query().where('customerId', customerId).patch({
      recivedAmount: (payment[0].recivedAmount * 1 ) + amount,
    });

    await Transaction.query().insert({
      customerId,
      amountRecived: amount,
    })

    return { data: recived } ;

  } catch (error) {
    logger.error(error);
  }

}