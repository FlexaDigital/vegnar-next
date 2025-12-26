import { NextRequest, NextResponse } from 'next/server';

interface PartnerInquiryData {
  fullname: string;
  company: string;
  email: string;
  mobile: string;
  country: string;
  businessType: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: PartnerInquiryData = await request.json();
    
    // Create FormData for CF7 API
    const formData = new FormData();
    formData.append('your-name', body.fullname);
    formData.append('your-company', body.company);
    formData.append('your-email', body.email);
    formData.append('your-phone', body.mobile);
    formData.append('your-country', body.country);
    formData.append('business-type', body.businessType);
    formData.append('your-message', body.message);

    // Send to CF7 API
    const response = await fetch('https://cms.vegnar.com/wp-json/contact-form-7/v1/contact-forms/dab1340/feedback', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (result.status === 'mail_sent') {
      return NextResponse.json({ success: true, message: 'Partnership inquiry submitted successfully' });
    } else {
      return NextResponse.json({ success: false, message: 'Failed to submit inquiry' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}