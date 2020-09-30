export interface IQuoteParams {
    customerName: string;
    companyName: string;
    customerEmail: string;
    quotePrice: number;
    description: string;
}

export async function getQuoteHtml(params: IQuoteParams) {
    const { customerEmail, customerName, quotePrice, description, companyName } = params;

    return `
    <html>
    <body>
    <span>Hi, ${customerName} </span>
    </body>
    </html>
    `;
}