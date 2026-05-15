import { NextRequest, NextResponse } from 'next/server';
import { QuotePDFGenerator } from '@/lib/quote-pdf-generator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { formData, cart, orderType, quoteNo } = body;

    // Convert formData object back to FormData
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
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}