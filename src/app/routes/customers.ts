import { Router } from 'express';
import { getAllCustomers, handleCreateCustomer, handleGetCustomerById, handleMakePayment } from '../controllers/customers';

const router = Router();

router.get('/', getAllCustomers);
router.get('/:id', handleGetCustomerById);

router.post('/payments/make', handleMakePayment)

router.post('/add', handleCreateCustomer);

export default router;