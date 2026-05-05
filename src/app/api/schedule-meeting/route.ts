import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...data } = body;

    if (action === 'submit') {
      // Encode customer data into a confirm URL
      const encoded = Buffer.from(JSON.stringify(data)).toString('base64url');
      const confirmUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/schedule-meeting?token=${encoded}`;

      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: process.env.SMTP_USER,
        subject: `📅 New Meeting Request - ${data.fullName} (${data.company})`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 680px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #0f4d3a, #1a7a5e); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">📅 New Meeting Request</h1>
              <p style="color: #a8e6cf; margin: 8px 0 0; font-size: 14px;">Vegnar Greens — Schedule Meeting Portal</p>
            </div>

            <div style="padding: 30px; background: #ffffff;">
              <p style="color: #333; font-size: 15px; margin-top: 0;">A new meeting request has been submitted. Review the details below and click <strong>Confirm Meeting</strong> to send a confirmation email to the customer.</p>

              <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <tr><td colspan="2" style="padding: 12px 8px 6px; background: #f0faf5; border-left: 4px solid #0f4d3a; font-weight: bold; color: #0f4d3a; font-size: 14px; letter-spacing: 0.5px;">👤 PERSONAL INFORMATION</td></tr>
                <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 8px; color: #666; width: 38%; font-size: 13px;">Full Name</td><td style="padding: 10px 8px; font-weight: 600; color: #111; font-size: 13px;">${data.fullName}</td></tr>
                <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 8px; color: #666; font-size: 13px;">Email Address</td><td style="padding: 10px 8px; font-weight: 600; color: #111; font-size: 13px;">${data.email}</td></tr>
                <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 8px; color: #666; font-size: 13px;">Phone Number</td><td style="padding: 10px 8px; font-weight: 600; color: #111; font-size: 13px;">${data.phone}</td></tr>
                <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 8px; color: #666; font-size: 13px;">Country</td><td style="padding: 10px 8px; font-weight: 600; color: #111; font-size: 13px;">${data.country}</td></tr>

                <tr><td colspan="2" style="padding: 16px 8px 6px; background: #f0faf5; border-left: 4px solid #0f4d3a; font-weight: bold; color: #0f4d3a; font-size: 14px; letter-spacing: 0.5px;">🏢 BUSINESS INFORMATION</td></tr>
                <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 8px; color: #666; font-size: 13px;">Company Name</td><td style="padding: 10px 8px; font-weight: 600; color: #111; font-size: 13px;">${data.company}</td></tr>
                <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 8px; color: #666; font-size: 13px;">Designation</td><td style="padding: 10px 8px; font-weight: 600; color: #111; font-size: 13px;">${data.designation}</td></tr>
                <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 8px; color: #666; font-size: 13px;">Business Type</td><td style="padding: 10px 8px; font-weight: 600; color: #111; font-size: 13px;">${data.businessType}</td></tr>
                <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 8px; color: #666; font-size: 13px;">Industry</td><td style="padding: 10px 8px; font-weight: 600; color: #111; font-size: 13px;">${data.industry}</td></tr>
                <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 8px; color: #666; font-size: 13px;">Annual Order Volume</td><td style="padding: 10px 8px; font-weight: 600; color: #111; font-size: 13px;">${data.orderVolume || '—'}</td></tr>

                <tr><td colspan="2" style="padding: 16px 8px 6px; background: #f0faf5; border-left: 4px solid #0f4d3a; font-weight: bold; color: #0f4d3a; font-size: 14px; letter-spacing: 0.5px;">📅 MEETING DETAILS</td></tr>
                <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 8px; color: #666; font-size: 13px;">Preferred Date</td><td style="padding: 10px 8px; font-weight: 600; color: #111; font-size: 13px;">${data.preferredDate}</td></tr>
                <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 8px; color: #666; font-size: 13px;">Preferred Time</td><td style="padding: 10px 8px; font-weight: 600; color: #111; font-size: 13px;">${data.preferredTime}</td></tr>
                <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 8px; color: #666; font-size: 13px;">Timezone</td><td style="padding: 10px 8px; font-weight: 600; color: #111; font-size: 13px;">${data.timezone}</td></tr>
                <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 8px; color: #666; font-size: 13px;">Meeting Type</td><td style="padding: 10px 8px; font-weight: 600; color: #111; font-size: 13px;">${data.meetingType}</td></tr>
                <tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 10px 8px; color: #666; font-size: 13px;">Meeting Purpose</td><td style="padding: 10px 8px; font-weight: 600; color: #111; font-size: 13px;">${data.meetingPurpose}</td></tr>

                <tr><td colspan="2" style="padding: 16px 8px 6px; background: #f0faf5; border-left: 4px solid #0f4d3a; font-weight: bold; color: #0f4d3a; font-size: 14px; letter-spacing: 0.5px;">💬 ADDITIONAL NOTES</td></tr>
                <tr><td colspan="2" style="padding: 10px 8px; color: #444; font-size: 13px; line-height: 1.7;">${data.message || 'No additional notes provided.'}</td></tr>
              </table>
            </div>

            <div style="padding: 25px 30px; background: #f9f9f9; text-align: center; border-top: 1px solid #e8e8e8;">
              <p style="color: #555; font-size: 14px; margin: 0 0 18px;">Click the button below to confirm this meeting and send a confirmation email to <strong>${data.email}</strong></p>
              <a href="${confirmUrl}" style="display: inline-block; background: linear-gradient(135deg, #0f4d3a, #1a7a5e); color: white; text-decoration: none; font-weight: bold; font-size: 16px; padding: 14px 40px; border-radius: 8px; letter-spacing: 0.3px;">
                ✅ Confirm Meeting
              </a>
              <p style="color: #999; font-size: 11px; margin: 16px 0 0;">This link will send a confirmation email to the customer. Click only once.</p>
            </div>

            <div style="background: #0f4d3a; padding: 14px; text-align: center;">
              <p style="color: #a8e6cf; margin: 0; font-size: 12px;">© Vegnar Greens | vegnar.com</p>
            </div>
          </div>
        `,
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, message: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Schedule meeting error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return new Response(errorPage('Invalid Link', 'No token found in the URL.'), { headers: { 'Content-Type': 'text/html' } });
    }

    const data = JSON.parse(Buffer.from(token, 'base64url').toString('utf-8'));

    // Send confirmation email to customer
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: data.email,
      subject: `✅ Your Meeting is Confirmed — Vegnar Greens`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #0f4d3a, #1a7a5e); padding: 35px; text-align: center;">
            <div style="font-size: 48px; margin-bottom: 10px;">✅</div>
            <h1 style="color: white; margin: 0; font-size: 26px;">Meeting Confirmed!</h1>
            <p style="color: #a8e6cf; margin: 8px 0 0; font-size: 14px;">Vegnar Greens — Your meeting has been scheduled</p>
          </div>

          <div style="padding: 30px; background: #ffffff;">
            <p style="color: #333; font-size: 16px; margin-top: 0;">Dear <strong>${data.fullName}</strong>,</p>
            <p style="color: #555; line-height: 1.8; font-size: 14px;">We are pleased to confirm your meeting with the <strong>Vegnar Greens</strong> team. Here are your confirmed meeting details:</p>

            <div style="background: #f0faf5; border: 1px solid #c3e6d4; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #d4edda;"><td style="padding: 10px 5px; color: #555; width: 40%; font-size: 13px;">📅 Date</td><td style="padding: 10px 5px; font-weight: 700; color: #0f4d3a; font-size: 13px;">${data.preferredDate}</td></tr>
                <tr style="border-bottom: 1px solid #d4edda;"><td style="padding: 10px 5px; color: #555; font-size: 13px;">⏰ Time</td><td style="padding: 10px 5px; font-weight: 700; color: #0f4d3a; font-size: 13px;">${data.preferredTime}</td></tr>
                <tr style="border-bottom: 1px solid #d4edda;"><td style="padding: 10px 5px; color: #555; font-size: 13px;">🌍 Timezone</td><td style="padding: 10px 5px; font-weight: 700; color: #0f4d3a; font-size: 13px;">${data.timezone}</td></tr>
                <tr style="border-bottom: 1px solid #d4edda;"><td style="padding: 10px 5px; color: #555; font-size: 13px;">📞 Meeting Type</td><td style="padding: 10px 5px; font-weight: 700; color: #0f4d3a; font-size: 13px;">${data.meetingType}</td></tr>
                <tr style="border-bottom: 1px solid #d4edda;"><td style="padding: 10px 5px; color: #555; font-size: 13px;">🏢 Company</td><td style="padding: 10px 5px; font-weight: 700; color: #0f4d3a; font-size: 13px;">${data.company}</td></tr>
                <tr><td style="padding: 10px 5px; color: #555; font-size: 13px;">🎯 Purpose</td><td style="padding: 10px 5px; font-weight: 700; color: #0f4d3a; font-size: 13px;">${data.meetingPurpose}</td></tr>
              </table>
            </div>

            <p style="color: #555; line-height: 1.8; font-size: 14px;">Our team will reach out to you shortly with the meeting link or further instructions. If you have any questions, please feel free to contact us.</p>
            <p style="color: #555; line-height: 1.8; font-size: 14px;">We look forward to speaking with you!</p>
            <p style="color: #333; font-weight: 600; font-size: 14px; margin-bottom: 0;">Best Regards,<br/>Team Vegnar Greens</p>
          </div>

          <div style="background: #0f4d3a; padding: 15px; text-align: center;">
            <p style="color: #a8e6cf; margin: 0; font-size: 12px;">© Vegnar Greens | <a href="https://vegnar.com" style="color: #a8e6cf; text-decoration: none;">vegnar.com</a></p>
          </div>
        </div>
      `,
    });

    return new Response(successPage(data.fullName, data.email), { headers: { 'Content-Type': 'text/html' } });
  } catch (error) {
    console.error('Confirm meeting error:', error);
    return new Response(errorPage('Error', 'Something went wrong. Please try again.'), { headers: { 'Content-Type': 'text/html' } });
  }
}

function successPage(name: string, email: string) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Meeting Confirmed</title></head><body style="font-family:Arial,sans-serif;background:#f0faf5;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;">
    <div style="background:white;border-radius:12px;padding:50px 40px;text-align:center;max-width:480px;box-shadow:0 4px 20px rgba(0,0,0,0.1);">
      <div style="font-size:60px;margin-bottom:16px;">✅</div>
      <h1 style="color:#0f4d3a;margin:0 0 12px;">Meeting Confirmed!</h1>
      <p style="color:#555;line-height:1.7;">A confirmation email has been sent to <strong>${email}</strong> for their meeting with Vegnar Greens.</p>
      <a href="https://vegnar.com" style="display:inline-block;margin-top:24px;background:#0f4d3a;color:white;text-decoration:none;padding:12px 30px;border-radius:8px;font-weight:bold;">Go to Website</a>
    </div>
  </body></html>`;
}

function errorPage(title: string, message: string) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${title}</title></head><body style="font-family:Arial,sans-serif;background:#fff5f5;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;">
    <div style="background:white;border-radius:12px;padding:50px 40px;text-align:center;max-width:480px;box-shadow:0 4px 20px rgba(0,0,0,0.1);">
      <div style="font-size:60px;margin-bottom:16px;">❌</div>
      <h1 style="color:#c0392b;margin:0 0 12px;">${title}</h1>
      <p style="color:#555;">${message}</p>
    </div>
  </body></html>`;
}
