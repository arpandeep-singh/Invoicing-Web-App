import { Request, Response, request } from 'express';
import logger from '../services/logger';
import { getAllCustomers as getCustomers, createCustomer, getCustomerById, createTask, addDueMoney, addRecivedMoney } from '../services/customer';
import { sendInvoice } from '../services/email';

export async function getAllCustomers(req: Request, res: Response) {

  try {
    const customers = await getCustomers();

    if ( !customers || customers?.data.length <= 0) return res.status(404).json({ error: 'No customers found' });

    return res.status(200).json({
      message: 'success',
      data: customers.data
    })

  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: 'Internal server error' })
  }

}

export async function handleCreateCustomer(req: Request, res: Response) {
  try {

    const {
      firstName,
      lastName,
      email,
      task,
      price,
      dueDate,
    } = req.body;

    if (!firstName) return res.status(400).json({ error: 'Firstname is required' });
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const customer = await createCustomer({
      firstName,
      lastName,
      email,
    });

    

    if(!customer || customer.error || !customer.data) return res.status(400).json({ error: customer ? customer.error : 'Customer not created' });

    if (task) {
      await createTask(customer?.data?.id, task);
    }

    if(price) {
      const date = new Date(dueDate);
      await addDueMoney(customer?.data?.id, date, price);
    }

    return res.status(200).json({
      message: 'success',
      data: customer.data
    })

    
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export async function handleGetCustomerById(req: Request, res: Response) {
  try {

    const userId = req.params.id;
    const customer = await getCustomerById(userId);

    if(!customer || customer?.error) return res.status(400).json({ error: customer?.error });

    return res.status(200).json({
      message: 'success',
      data: customer.data
    })
    
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export async function handleMakePayment(req: Request, res: Response) {
  try {
    const {
      customerId,
      amount,
      action,
      dueDate,
      email,
      includeGst,
    } = req.body;

    if (!customerId) return res.status(400).json({ error: 'Customer id is missing' });
    if (!amount) return res.status(400).json({ error: 'Please specify amount' });

    let trx;

    if(action == 'ADD_DUE_MONEY') {
      if(!dueDate) return res.status(400).json({ error: 'Please specify due date' })
      const date = new Date(dueDate);
      trx = await addDueMoney(customerId, date, amount);
    } else {
      trx = await addRecivedMoney(customerId, amount);
    }


    sendInvoice({
      customerId,
      date: new Date(),
      dueDate: new Date(),
      emailInvoice: email,
      includeGst,
    });

    return res.status(200).json({
      message: 'success',
      data: trx
    })

  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: 'Internal server error' })
  }
}