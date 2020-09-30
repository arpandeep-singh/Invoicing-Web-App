import nodemailer from 'nodemailer';
import logger from './logger';
import pdf from 'html-pdf';
import path from 'path';
import { v1 as uuidv1 } from 'uuid';
import { getCustomerById } from './customer';
import { getInvoiceHtml } from '../templates/invoice';
import { getQuoteHtml } from '../templates/quote';


export interface ISendInvoice {
  customerId: string;
  date: Date,
  dueDate: Date,
  emailInvoice: boolean;
  includeGst: boolean;
}

export interface ISendQoute {
    customerName: string;
    companyName: string;
    customerEmail: string;
    quotePrice: number;
    description: string;
    sendEmail?: boolean;
    outPutDir: string;
}

const gmail = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'kbuilders32@gmail.com',
    pass: 'ksbuilder@123'
  },
});


export async function sendQuote(params: ISendQoute) {
  try {
  
    const outPutDir = params.outPutDir;

    const html = await getQuoteHtml({
      companyName: params.companyName,
      customerEmail: params.customerEmail,
      customerName: params.customerName,
      description: params.description,
      quotePrice: params.quotePrice,
    });

  pdf.create(html).toFile(outPutDir, (err, doc) => {
      if (err) {
        logger.error(err);
      } else {
        const mailOptions = {
          from: 'noreply <kbuilders32@gmail.com>',
          to: params.customerEmail,
          subject: `Quotation`,
          text:"Please find the attached Quote!",
          attachments: [
            {
              filename: `Quote.pdf`,
              path: path.resolve(outPutDir),
            }
          ]
        };

        if (params.sendEmail) {
          gmail.sendMail(mailOptions, (err) => {
            if (err) logger.error(err);
          });
        }

        return outPutDir;

      }
    })

  } catch (error) {
    console.log(error);
  }
}


export async function sendInvoice(params: ISendInvoice) {

  try {

    const customer = await getCustomerById(params.customerId);

    if(!customer.data) return;

    const padDir = path.resolve('./public/pdf');
    const fileName = `${customer.data.firstName}-${uuidv1()}.pdf`;

    const outPut = path.resolve(padDir + `/${fileName}`)

    const html = await getInvoiceHtml({
      customerId: customer.data.id,
      customerName: `${customer.data.firstName} ${customer.data.lastName}` ,
      customerEmail: customer.data.email,
      amountRecived: customer.data.payments.recivedAmount,
      currentDate: new Date(),
      dueDate: customer.data.payments.dueDate,
      task: { name: customer.data.tasks[0].task },
      taxRate: params.includeGst ? 13 : 0,
      totalDue: customer.data.payments.totalAmount,
      outDir: `/pdf/${fileName}`,
    });

    

    pdf.create(html).toFile(outPut, (error, res) => {
      if(error) {
        logger.error(error);
      } else {

        const mailOptions = {
          from: 'noreply <kbuilders32@gmail.com>',
          to: customer.data.email,
          subject: `Invoice Generated for ${customer.data.firstName + ' ' + customer.data.lastName}`,
          text:"Please find the attached Invoice!",
          attachments: [
            {
              filename: `${fileName}`,
              path: path.resolve(outPut),
            }
          ]
        
        
        };

        if (params.emailInvoice && params.includeGst) {
        gmail.sendMail(mailOptions, (err, respnse) => {
          if(err) {
            logger.error(err)
          }
        })
      }

      }
    })


  } catch (error) {
    logger.error(error);
  }

}