import { Router, Request, Response } from 'express';
import { getAllCustomers, getCustomerById } from '../services/customer';
import { getSummary, getTransctionById } from '../services/payment';
import { getAllQuotes } from '../services/quote';

const router = Router();

router.get('/', (req: any, res) => {
  return res.redirect('/dashboard');
})

router.get('/dashboard', async(req: Request, res: Response) => {
  let customers = await getAllCustomers();
  if (customers && customers?.data.length <= 0) customers.data = [];

  const summary = await getSummary();


  res.render('dashboard', {
    customers: customers?.data,
    summary: {
      total: summary?.totalMoney || 0,
      totalRecived: summary?.totalRecived || 0,
      totalDue: summary?.totalDue || 0,
    }
  })
});


router.get('/customers', async (req: Request, res: Response) => {
  let customers = await getAllCustomers();

  if(customers && customers?.data.length <= 0) customers.data = [];
  
  res.render('customers', {
    customers: customers ? customers.data : []
  })
})

router.get('/payment/:id', async (req: Request, res: Response) => {
  const customerId = req.params.id;

  const customer = await getCustomerById(customerId);
  const transcations = await getTransctionById(customerId);
  res.render('addPayment', {
    customer: customer.data,
    transcations: transcations && transcations?.length > 0 ? transcations : [],
  })
});

router.get('/invoice/:customerId?', async (req: Request, res: Response) => {

  const customerId = req.params.customerId;
  let allInvoices;

  if (customerId) {
    const invoices = await getCustomerById(customerId);
    allInvoices = invoices && invoices.data ? [ invoices.data ] : [];
  } 
  else {
    allInvoices = (await getAllCustomers())?.data;
  }

  
  res.render('invoice', {
    invoices: allInvoices
  })

});

router.get('/quote',  async (req: Request, res: Response) => {
  const quotes = await getAllQuotes();
  res.render('quote', {
    quotes
  })
})

export default router;