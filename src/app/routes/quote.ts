import { Router } from 'express';
import { createQuote } from '../controllers/quote';
const router = Router();

router.post('/create', createQuote);

export default router;