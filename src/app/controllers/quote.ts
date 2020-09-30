import { Request, Response } from 'express';
import * as quoteService from '../services/quote';

// customerName: 'Piyush Garg',
//   companyName: 'Ks Builders',
//   customerEmail: 'gargpiyush195@gmail.com',
//   quotePrice: '123',
//   description: 'ddsfsdfsd'
export async function createQuote(req: Request, res: Response) {
    const {
        customerName,
        companyName, 
        customerEmail, 
        quotePrice, 
        description
    } = req.body;

    const quote = await quoteService.createQuote({
        companyName,
        customerEmail,
        customerName,
        description,
        quotePrice,
        email: req.body.sendEmail ? true : false
    });

    return res.redirect('/quote');

}