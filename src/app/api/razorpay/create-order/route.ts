import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request: NextRequest) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const { amount, currency = 'INR', receipt, notes } = await request.json();

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // paise
      currency,
      receipt,
      notes,
    });

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    console.error('Razorpay order creation error:', error);
    const errorMsg = error.error?.description || error.message || error.description || 'Razorpay order creation failed';
    return NextResponse.json({ success: false, message: errorMsg }, { status: 500 });
  }
}
