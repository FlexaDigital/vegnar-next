import { NextRequest, NextResponse } from 'next/server';
import { QuotePDFGenerator } from '@/lib/quote-pdf-generator';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { formData, cart, orderType, quoteNo } = body;

    if (!cart || cart.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        form.append(key, value as string);
      }
    });

    const pdfGenerator = new QuotePDFGenerator();
    const pdfBuffer = await pdfGenerator.generateQuotePDF(form, cart, orderType, quoteNo);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Vegnar_Quote_${quoteNo}.pdf"`,
      },
    });
  } catch (error) {
    console.error('PDF generation error details:', error instanceof Error ? error.message : error);
    console.error('Stack:', error instanceof Error ? error.stack : 'no stack');
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
