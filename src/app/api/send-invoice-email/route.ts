import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getInvoiceEmailHtml, getInvoiceHtml, InvoiceData } from '../../../lib/invoice';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    const data: InvoiceData = await request.json();

    if (!data.customerEmail) {
      return NextResponse.json({ success: false, message: 'Customer email is required' }, { status: 400 });
    }

    const htmlContent = getInvoiceEmailHtml(data);
    const printableHtml = getInvoiceHtml(data);

    // Send email to Customer, with BCC copy to Admin (vegnarglobal@gmail.com)
    await transporter.sendMail({
      from: process.env.SMTP_FROM || `Vegnar Global <${process.env.SMTP_USER}>`,
      to: data.customerEmail,
      bcc: process.env.SMTP_USER,
      subject: `🧾 Tax Invoice #${data.invoiceNumber} - Vegnar Green`,
      html: htmlContent,
      attachments: [
        {
          filename: `Invoice-${data.invoiceNumber}.html`,
          content: printableHtml,
          contentType: 'text/html',
        },
      ],
    });

    return NextResponse.json({ success: true, message: 'Invoice email sent successfully' });
  } catch (error: any) {
    console.error('Error sending invoice email:', error);
    return NextResponse.json({ success: false, message: error.message || 'Server error' }, { status: 500 });
  }
}
