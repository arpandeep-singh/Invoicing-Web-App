import { Payment } from '../models/payment.model';
import logger from './logger';
import { Transaction } from '../models/transcations.model';
import { Invoice } from '../models/invoice';

export async function getSummary() {
  try {
    const payments = await Payment.query().select('*');
    const totalRecived = payments.reduce((a, b) => a + ( b.recivedAmount * 1 ), 0);
    const totalMoney = payments.reduce((a, b) => a + ( b.totalAmount * 1), 0);

    return {
      totalRecived,
      totalMoney,
      totalDue: totalMoney - totalRecived,
    }
  } catch (error) {
    logger.error(error);
  }
}

export async function getTransctionById(customerId: string) {
  try {
    const trx = await Transaction.query().select('*').where('customerId', customerId).orderBy('createdAt', 'DESC');

    return trx;
  } catch (error) {
    logger.error(error);
  }
}


export async function createInvoice(customerId: string, filePath: string) {
  try {
    
    const invoice = await Invoice.query().insert({
      customerId,
      file: filePath

    });

    return invoice;

  } catch (error) {
    logger.error(error);
  }
}