import { Quote } from "../models/quotes";
import { sendQuote } from "./email";
import path from 'path';
import { v1 as uuidv1 } from 'uuid';

export interface ICreateQuoteParams {
    customerName: string;
    companyName: string;
    customerEmail: string;
    quotePrice: number;
    description: string;
    email?: boolean
}

export async function getAllQuotes() {
    const quotes = await Quote.query().select('*');
    return quotes;
}

export async function createQuote(payload: ICreateQuoteParams) {
    const { customerEmail, companyName, customerName, quotePrice, description } = payload;
    const quotePdf = path.resolve('./public/pdf');
    const fileName  =`quote-${uuidv1()}.pdf`;

    const outPutDir = path.resolve(quotePdf + `/${fileName}`);

    const uploadedPath = await sendQuote({
        companyName,
        customerEmail,
        customerName,
        description,
        quotePrice,
        sendEmail: payload.email,
        outPutDir,
    });

    const quote = await Quote.query().insert({
        customerEmail,
        companyName,
        customerName,
        quotePrice,
        description,
        uploadedPath: outPutDir
    });

    return quote;
}