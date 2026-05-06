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
      const encoded = Buffer.from(JSON.stringify(data)).toString('base64url');
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
      const confirmUrl = `${siteUrl}/api/schedule-meeting?action=confirm&token=${encoded}`;
      const cancelUrl = `${siteUrl}/schedule-meeting/cancel?token=${encoded}`;

      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: process.env.SMTP_USER,
        subject: `📅 New Meeting Request - ${data.fullName} (${data.company})`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;border:1px solid #e0e0e0;border-radius:10px;overflow:hidden;">
            <div style="background:linear-gradient(135deg,#0f4d3a,#1a7a5e);padding:30px;text-align:center;">
              <h1 style="color:white;margin:0;font-size:24px;">📅 New Meeting Request</h1>
              <p style="color:#a8e6cf;margin:8px 0 0;font-size:14px;">Vegnar Greens — Schedule Meeting Portal</p>
            </div>
            <div style="padding:30px;background:#ffffff;">
              <p style="color:#333;font-size:15px;margin-top:0;">A new meeting request has been submitted. Review the details below and take action.</p>
              <table style="width:100%;border-collapse:collapse;margin-top:10px;">
                <tr><td colspan="2" style="padding:12px 8px 6px;background:#f0faf5;border-left:4px solid #0f4d3a;font-weight:bold;color:#0f4d3a;font-size:14px;">👤 PERSONAL INFORMATION</td></tr>
                <tr style="border-bottom:1px solid #f0f0f0;"><td style="padding:10px 8px;color:#666;width:38%;font-size:13px;">Full Name</td><td style="padding:10px 8px;font-weight:600;color:#111;font-size:13px;">${data.fullName}</td></tr>
                <tr style="border-bottom:1px solid #f0f0f0;"><td style="padding:10px 8px;color:#666;font-size:13px;">Email Address</td><td style="padding:10px 8px;font-weight:600;color:#111;font-size:13px;">${data.email}</td></tr>
                <tr style="border-bottom:1px solid #f0f0f0;"><td style="padding:10px 8px;color:#666;font-size:13px;">Phone Number</td><td style="padding:10px 8px;font-weight:600;color:#111;font-size:13px;">${data.phone}</td></tr>
                <tr style="border-bottom:1px solid #f0f0f0;"><td style="padding:10px 8px;color:#666;font-size:13px;">Country</td><td style="padding:10px 8px;font-weight:600;color:#111;font-size:13px;">${data.country}</td></tr>
                <tr><td colspan="2" style="padding:16px 8px 6px;background:#f0faf5;border-left:4px solid #0f4d3a;font-weight:bold;color:#0f4d3a;font-size:14px;">🏢 BUSINESS INFORMATION</td></tr>
                <tr style="border-bottom:1px solid #f0f0f0;"><td style="padding:10px 8px;color:#666;font-size:13px;">Company Name</td><td style="padding:10px 8px;font-weight:600;color:#111;font-size:13px;">${data.company}</td></tr>
                <tr style="border-bottom:1px solid #f0f0f0;"><td style="padding:10px 8px;color:#666;font-size:13px;">Designation</td><td style="padding:10px 8px;font-weight:600;color:#111;font-size:13px;">${data.designation}</td></tr>
                <tr style="border-bottom:1px solid #f0f0f0;"><td style="padding:10px 8px;color:#666;font-size:13px;">Business Type</td><td style="padding:10px 8px;font-weight:600;color:#111;font-size:13px;">${data.businessType}</td></tr>
                <tr style="border-bottom:1px solid #f0f0f0;"><td style="padding:10px 8px;color:#666;font-size:13px;">Industry</td><td style="padding:10px 8px;font-weight:600;color:#111;font-size:13px;">${data.industry}</td></tr>
                <tr style="border-bottom:1px solid #f0f0f0;"><td style="padding:10px 8px;color:#666;font-size:13px;">Annual Order Volume</td><td style="padding:10px 8px;font-weight:600;color:#111;font-size:13px;">${data.orderVolume || '—'}</td></tr>
                <tr><td colspan="2" style="padding:16px 8px 6px;background:#f0faf5;border-left:4px solid #0f4d3a;font-weight:bold;color:#0f4d3a;font-size:14px;">📅 MEETING DETAILS</td></tr>
                <tr style="border-bottom:1px solid #f0f0f0;"><td style="padding:10px 8px;color:#666;font-size:13px;">Preferred Date</td><td style="padding:10px 8px;font-weight:600;color:#111;font-size:13px;">${data.preferredDate}</td></tr>
                <tr style="border-bottom:1px solid #f0f0f0;"><td style="padding:10px 8px;color:#666;font-size:13px;">Preferred Time</td><td style="padding:10px 8px;font-weight:600;color:#111;font-size:13px;">${data.preferredTime}</td></tr>
                <tr style="border-bottom:1px solid #f0f0f0;"><td style="padding:10px 8px;color:#666;font-size:13px;">Timezone</td><td style="padding:10px 8px;font-weight:600;color:#111;font-size:13px;">${data.timezone}</td></tr>
                <tr style="border-bottom:1px solid #f0f0f0;"><td style="padding:10px 8px;color:#666;font-size:13px;">Meeting Type</td><td style="padding:10px 8px;font-weight:600;color:#111;font-size:13px;">${data.meetingType}</td></tr>
                <tr style="border-bottom:1px solid #f0f0f0;"><td style="padding:10px 8px;color:#666;font-size:13px;">Meeting Purpose</td><td style="padding:10px 8px;font-weight:600;color:#111;font-size:13px;">${data.meetingPurpose}</td></tr>
                <tr><td colspan="2" style="padding:16px 8px 6px;background:#f0faf5;border-left:4px solid #0f4d3a;font-weight:bold;color:#0f4d3a;font-size:14px;">💬 ADDITIONAL NOTES</td></tr>
                <tr><td colspan="2" style="padding:10px 8px;color:#444;font-size:13px;line-height:1.7;">${data.message || 'No additional notes provided.'}</td></tr>
              </table>
            </div>
            <div style="padding:25px 30px;background:#f9f9f9;text-align:center;border-top:1px solid #e8e8e8;">
              <p style="color:#555;font-size:14px;margin:0 0 20px;">Take action on this meeting request:</p>
              <div style="display:inline-flex;gap:16px;flex-wrap:wrap;justify-content:center;">
                <a href="${confirmUrl}" style="display:inline-block;background:linear-gradient(135deg,#0f4d3a,#1a7a5e);color:white;text-decoration:none;font-weight:bold;font-size:15px;padding:14px 36px;border-radius:8px;">
                  ✅ Confirm Meeting
                </a>
                <a href="${cancelUrl}" style="display:inline-block;background:linear-gradient(135deg,#c0392b,#e74c3c);color:white;text-decoration:none;font-weight:bold;font-size:15px;padding:14px 36px;border-radius:8px;">
                  ❌ Cancel Meeting
                </a>
              </div>
              <p style="color:#999;font-size:11px;margin:16px 0 0;">Confirm will send approval email. Cancel will ask for a reason before notifying the customer.</p>
            </div>
            <div style="background:#0f4d3a;padding:14px;text-align:center;">
              <p style="color:#a8e6cf;margin:0;font-size:12px;">© Vegnar Greens | vegnar.com</p>
            </div>
          </div>
        `,
      });

      return NextResponse.json({ success: true });
    }

    // Cancel with reason — called from cancel page form
    if (action === 'cancel') {
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: data.email,
        subject: `❌ Meeting Cancelled — Vegnar Greens`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:650px;margin:0 auto;border:1px solid #e0e0e0;border-radius:10px;overflow:hidden;">
            <div style="background:linear-gradient(135deg,#c0392b,#e74c3c);padding:35px;text-align:center;">
              <div style="font-size:48px;margin-bottom:10px;">❌</div>
              <h1 style="color:white;margin:0;font-size:26px;">Meeting Cancelled</h1>
              <p style="color:#ffd5d5;margin:8px 0 0;font-size:14px;">Vegnar Greens — Meeting Update</p>
            </div>
            <div style="padding:30px;background:#ffffff;">
              <p style="color:#333;font-size:16px;margin-top:0;">Dear <strong>${data.fullName}</strong>,</p>
              <p style="color:#555;line-height:1.8;font-size:14px;">We regret to inform you that your scheduled meeting with <strong>Vegnar Greens</strong> has been cancelled.</p>
              <div style="background:#fff5f5;border:1px solid #fcc;border-radius:8px;padding:20px;margin:20px 0;">
                <p style="margin:0 0 8px;color:#c0392b;font-weight:bold;font-size:13px;">📋 Cancelled Meeting Details</p>
                <table style="width:100%;border-collapse:collapse;">
                  <tr style="border-bottom:1px solid #fdd;"><td style="padding:8px 5px;color:#666;width:40%;font-size:13px;">📅 Date</td><td style="padding:8px 5px;font-weight:600;color:#333;font-size:13px;">${data.preferredDate}</td></tr>
                  <tr style="border-bottom:1px solid #fdd;"><td style="padding:8px 5px;color:#666;font-size:13px;">⏰ Time</td><td style="padding:8px 5px;font-weight:600;color:#333;font-size:13px;">${data.preferredTime}</td></tr>
                  <tr style="border-bottom:1px solid #fdd;"><td style="padding:8px 5px;color:#666;font-size:13px;">📞 Meeting Type</td><td style="padding:8px 5px;font-weight:600;color:#333;font-size:13px;">${data.meetingType}</td></tr>
                  <tr><td style="padding:8px 5px;color:#666;font-size:13px;">🎯 Purpose</td><td style="padding:8px 5px;font-weight:600;color:#333;font-size:13px;">${data.meetingPurpose}</td></tr>
                </table>
              </div>
              <div style="background:#fff8e1;border:1px solid #ffe082;border-radius:8px;padding:16px;margin:16px 0;">
                <p style="margin:0 0 6px;color:#e65100;font-weight:bold;font-size:13px;">📝 Reason for Cancellation</p>
                <p style="margin:0;color:#555;font-size:14px;line-height:1.7;">${data.cancelReason}</p>
              </div>
              <p style="color:#555;line-height:1.8;font-size:14px;">We apologize for any inconvenience. If you'd like to reschedule, please visit our website and submit a new meeting request.</p>
              <p style="color:#333;font-weight:600;font-size:14px;margin-bottom:0;">Best Regards,<br/>Team Vegnar Greens</p>
            </div>
            <div style="background:#c0392b;padding:15px;text-align:center;">
              <p style="color:#ffd5d5;margin:0;font-size:12px;">© Vegnar Greens | <a href="https://vegnar.com" style="color:#ffd5d5;text-decoration:none;">vegnar.com</a></p>
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
    const action = searchParams.get('action');

    if (!token || action !== 'confirm') {
      return new Response(errorPage('Invalid Link', 'This link is invalid or has expired.'), { headers: { 'Content-Type': 'text/html' } });
    }

    const data = JSON.parse(Buffer.from(token, 'base64url').toString('utf-8'));

    // --- Build datetime strings for ICS and Google Calendar ---
    // preferredDate = "YYYY-MM-DD", preferredTime = "HH:MM"
    const [year, month, day] = data.preferredDate.split('-');
    const [hour, minute] = data.preferredTime.split(':');

    // ICS format: YYYYMMDDTHHMMSS (1 hour duration)
    const dtStart = `${year}${month}${day}T${hour}${minute}00`;
    const endHour = String(Number(hour) + 1).padStart(2, '0');
    const dtEnd = `${year}${month}${day}T${endHour}${minute}00`;

    // Google Calendar URL format
    const gcStart = dtStart;
    const gcEnd = dtEnd;
    const gcTitle = encodeURIComponent(`Meeting with Vegnar Greens — ${data.meetingPurpose}`);
    const gcDetails = encodeURIComponent(`Company: ${data.company}\nMeeting Type: ${data.meetingType}\nPurpose: ${data.meetingPurpose}`);
    const gcLocation = encodeURIComponent(data.meetingType);
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${gcTitle}&dates=${gcStart}/${gcEnd}&details=${gcDetails}&location=${gcLocation}`;

    // .ics file content
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Vegnar Greens//Meeting//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:REQUEST',
      'BEGIN:VEVENT',
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:Meeting with Vegnar Greens — ${data.meetingPurpose}`,
      `DESCRIPTION:Company: ${data.company}\nMeeting Type: ${data.meetingType}\nPurpose: ${data.meetingPurpose}`,
      `LOCATION:${data.meetingType}`,
      `ORGANIZER;CN=Vegnar Greens:mailto:${process.env.SMTP_FROM}`,
      `ATTENDEE;CN=${data.fullName}:mailto:${data.email}`,
      'BEGIN:VALARM',
      'TRIGGER:-PT30M',
      'ACTION:DISPLAY',
      'DESCRIPTION:Meeting with Vegnar Greens in 30 minutes',
      'END:VALARM',
      'BEGIN:VALARM',
      'TRIGGER:-PT1H',
      'ACTION:DISPLAY',
      'DESCRIPTION:Meeting with Vegnar Greens in 1 hour',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: data.email,
      subject: `✅ Your Meeting is Confirmed — Vegnar Greens`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:650px;margin:0 auto;border:1px solid #e0e0e0;border-radius:10px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#0f4d3a,#1a7a5e);padding:35px;text-align:center;">
            <div style="font-size:48px;margin-bottom:10px;">✅</div>
            <h1 style="color:white;margin:0;font-size:26px;">Meeting Confirmed!</h1>
            <p style="color:#a8e6cf;margin:8px 0 0;font-size:14px;">Vegnar Greens — Your meeting has been scheduled</p>
          </div>
          <div style="padding:30px;background:#ffffff;">
            <p style="color:#333;font-size:16px;margin-top:0;">Dear <strong>${data.fullName}</strong>,</p>
            <p style="color:#555;line-height:1.8;font-size:14px;">We are pleased to confirm your meeting with the <strong>Vegnar Greens</strong> team. Here are your confirmed meeting details:</p>
            <div style="background:#f0faf5;border:1px solid #c3e6d4;border-radius:8px;padding:20px;margin:20px 0;">
              <table style="width:100%;border-collapse:collapse;">
                <tr style="border-bottom:1px solid #d4edda;"><td style="padding:10px 5px;color:#555;width:40%;font-size:13px;">📅 Date</td><td style="padding:10px 5px;font-weight:700;color:#0f4d3a;font-size:13px;">${data.preferredDate}</td></tr>
                <tr style="border-bottom:1px solid #d4edda;"><td style="padding:10px 5px;color:#555;font-size:13px;">⏰ Time</td><td style="padding:10px 5px;font-weight:700;color:#0f4d3a;font-size:13px;">${data.preferredTime}</td></tr>
                <tr style="border-bottom:1px solid #d4edda;"><td style="padding:10px 5px;color:#555;font-size:13px;">🌍 Timezone</td><td style="padding:10px 5px;font-weight:700;color:#0f4d3a;font-size:13px;">${data.timezone}</td></tr>
                <tr style="border-bottom:1px solid #d4edda;"><td style="padding:10px 5px;color:#555;font-size:13px;">📞 Meeting Type</td><td style="padding:10px 5px;font-weight:700;color:#0f4d3a;font-size:13px;">${data.meetingType}</td></tr>
                <tr style="border-bottom:1px solid #d4edda;"><td style="padding:10px 5px;color:#555;font-size:13px;">🏢 Company</td><td style="padding:10px 5px;font-weight:700;color:#0f4d3a;font-size:13px;">${data.company}</td></tr>
                <tr><td style="padding:10px 5px;color:#555;font-size:13px;">🎯 Purpose</td><td style="padding:10px 5px;font-weight:700;color:#0f4d3a;font-size:13px;">${data.meetingPurpose}</td></tr>
              </table>
            </div>

            <!-- Calendar Buttons -->
            <div style="background:#f8f9fa;border:1px solid #e9ecef;border-radius:8px;padding:20px;margin:20px 0;text-align:center;">
              <p style="margin:0 0 14px;color:#333;font-weight:600;font-size:14px;">📆 Add to Your Calendar</p>
              <div style="display:inline-flex;gap:12px;flex-wrap:wrap;justify-content:center;">
                <a href="${googleCalendarUrl}" target="_blank"
                  style="display:inline-flex;align-items:center;gap:8px;background:#4285F4;color:white;text-decoration:none;font-weight:600;font-size:13px;padding:11px 22px;border-radius:7px;">
                  <img src="https://www.gstatic.com/images/branding/product/1x/calendar_48dp.png" width="18" height="18" style="vertical-align:middle;" />
                  Add to Google Calendar
                </a>
              </div>
              <p style="margin:12px 0 0;color:#888;font-size:12px;">Or open the attached <strong>meeting.ics</strong> file to add to any calendar (Outlook, Apple Calendar, etc.)</p>
            </div>

            <p style="color:#555;line-height:1.8;font-size:14px;">Our team will reach out to you shortly with the meeting link or further instructions.</p>
            <p style="color:#333;font-weight:600;font-size:14px;margin-bottom:0;">Best Regards,<br/>Team Vegnar Greens</p>
          </div>
          <div style="background:#0f4d3a;padding:15px;text-align:center;">
            <p style="color:#a8e6cf;margin:0;font-size:12px;">© Vegnar Greens | <a href="https://vegnar.com" style="color:#a8e6cf;text-decoration:none;">vegnar.com</a></p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: 'meeting.ics',
          content: icsContent,
          contentType: 'text/calendar; method=REQUEST',
        },
      ],
    });

    return new Response(successPage(data.fullName, data.email, googleCalendarUrl, icsContent), { headers: { 'Content-Type': 'text/html' } });
  } catch (error) {
    console.error('Confirm meeting error:', error);
    return new Response(errorPage('Error', 'Something went wrong. Please try again.'), { headers: { 'Content-Type': 'text/html' } });
  }
}

function successPage(name: string, email: string, googleCalendarUrl: string, icsContent: string) {
  const icsBase64 = Buffer.from(icsContent).toString('base64');
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Meeting Confirmed</title></head><body style="font-family:Arial,sans-serif;background:#f0faf5;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:20px;box-sizing:border-box;">
    <div style="background:white;border-radius:12px;padding:40px;text-align:center;max-width:500px;width:100%;box-shadow:0 4px 20px rgba(0,0,0,0.1);">
      <div style="font-size:60px;margin-bottom:12px;">✅</div>
      <h1 style="color:#0f4d3a;margin:0 0 8px;font-size:24px;">Meeting Confirmed!</h1>
      <p style="color:#555;line-height:1.7;margin:0 0 24px;font-size:14px;">Confirmation email sent to <strong>${email}</strong>.<br/>Add this meeting to your own calendar:</p>
      <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:24px;">
        <a href="${googleCalendarUrl}" target="_blank" style="display:flex;align-items:center;justify-content:center;gap:10px;background:#4285F4;color:white;text-decoration:none;font-weight:600;font-size:14px;padding:13px 20px;border-radius:8px;">
          <img src="https://www.gstatic.com/images/branding/product/1x/calendar_48dp.png" width="20" height="20" />Add to Google Calendar
        </a>
        <a href="data:text/calendar;base64,${icsBase64}" download="meeting.ics" style="display:flex;align-items:center;justify-content:center;gap:10px;background:#f0faf5;color:#0f4d3a;text-decoration:none;font-weight:600;font-size:14px;padding:13px 20px;border-radius:8px;border:2px solid #0f4d3a;">
          📎 Download .ics (Outlook / Apple Calendar)
        </a>
      </div>
      <a href="https://vegnar.com" style="display:inline-block;background:#0f4d3a;color:white;text-decoration:none;padding:11px 28px;border-radius:8px;font-weight:bold;font-size:13px;">Go to Website</a>
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
