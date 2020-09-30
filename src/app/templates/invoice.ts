import { createInvoice } from "../services/payment";


interface htmlInvoice {
  customerId: string;
  customerName: string;
  customerEmail: string;
  currentDate: Date;
  dueDate: Date;
  task: {
    name: string,
  };
  taxRate: number;
  amountRecived: number;
  totalDue: number;
  outDir: string;

}

export async function getInvoiceHtml(params: htmlInvoice) {

  const total = params.totalDue;
  const preTax = Math.round(total/1.13);
  const tax = params.taxRate !== 0 ? total-preTax : 0;
  const totalDue = total - params.amountRecived;

  const invoice = await createInvoice(params.customerId, params.outDir);

  const html = `<html>
  <head>
      <style>
          .row-heading{
              background-color: #ffe8cc;
              color: #ffa02d;
              font-size: 12;  
          }
          td,th{
              border: none;
              padding: 6px;
              padding-top: 5px;
              padding-bottom: 5px;
          }
          p{
            line-height:16px
          }
      </style>
  </head>
  <body style="padding: 40px;font-family: Helvetica, sans-serif; font-size: 12">
  
  <div>
  <h2>KS BUILDERS INC.</h2>
  <p>
  7 River Rock Crescent<br>
  Brampton ON L6X5H5<br>
  (647)-309-8009<br>
  kbuilders32@gmail.com<br>
  HST No.: 80748 2112 RT0001
  </p>
  <h2 style="color: #ff8d03">INVOICE</h2>
  </div>
          <div>
      <div style="float: left;">
      <p>
  <b>BILL TO</b><br>
  ${params.customerName.toUpperCase()}<br>
  ${params.customerEmail}<br>
  </p>
      </div>
      <div style="float: right;">
  <div style="text-align: start;float: left;padding-right: 10px">
      <p><b>INVOICE</b><br><b>DATE</b><br><b>DUE DATE</b></p>
  </div>
          <div style="float: right;text-align:start">
              <p>${invoice?.id}<br>${params.currentDate.toLocaleDateString()}<br>${params.dueDate.toLocaleDateString()}</p>
          </div>
      </div>
              <br><br><br><br><br><br>
      </div>
  <div >
  <table  style="width: 100%;">
  <tr class="row-heading">
      <td style="text-align: center;padding-right: 10px">DATE</td>
  <td >DESCRIPTION</td>
          <td style="text-align: end">RATE</td>
      </tr> 
      <tr>
          <td></td>
      <td style="font-size: 12">${params.task.name.toUpperCase()}</td>
          <td style="text-align: end;font-size:12">$${preTax}.00</td>
      </tr>
  </table> 
  
  </div>
      <hr>
         <div>
      <div style="float: right;text-align: end">
      <p>
  ${preTax}.00<br>
  ${tax}<br>
  ${total}<br>
  ${params.amountRecived}<br>
  <b style="font-size: 18">$${totalDue}</b>
  </p>
      </div>
      <div style="float: right;padding-right: 60px;text-align: start;font-size: 12">
       <p>
  
  SUBTOTAL<br>
  HST(ON) 13%<br>
  TOTAL<br>
  PAYMENT<br>
  BALANCE DUE         
  </p>
  </div>
              
      </div>
  <br><br><br><br><br><br><br><br>
  <div>
  <p>TAX SUMMARY</p>
      <table style="width: 100%;font-size: 12">
  <tr class="row-heading">
      <td style="text-align: center">RATE</td>
  <td style="text-align: center">TAX</td>
          <td style="text-align: end">NET</td>
      </tr> 
      <tr>
          <td style="text-align: center">HST(ON) 13%</td>
      <td style="text-align: center">${tax}</td>
          <td style="text-align: end">${preTax}</td>
      </tr>
  </table> 
  </div>
  </body>
  </html>
  `
  return html;
}