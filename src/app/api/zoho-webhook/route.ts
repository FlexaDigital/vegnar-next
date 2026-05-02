import { NextRequest, NextResponse } from 'next/server';

const ZOHO_WEBHOOK_URL = process.env.ZOHO_WEBHOOK_URL || 'https://flow.zoho.in/60070901534/flow/webhook/incoming?zapikey=1001.53d9c6fa42f0a0e261340a2c6fb6f376.06618c10c056a84af4d38fb40cfc711d&isdebug=false';

export async function POST(request: NextRequest) {
  try {
    const leadData = await request.json();
    
    const response = await fetch(ZOHO_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    });
    
    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: 'Zoho webhook failed' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}