import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// IMPORTANT: configure environment variables for secure credentials.
// Provide SMTP settings in .env.local:
// SMTP_HOST=...
// SMTP_PORT=587
// SMTP_USER=...
// SMTP_PASS=...
// TO_EMAIL=hex0@live.com (or override as needed)

const toEmail = process.env.TO_EMAIL || 'hex0@live.com';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { email, phone, comment, designText, font } = data || {};

    if (!email || !comment) {
      return NextResponse.json({ error: 'Missing required fields: email, comment' }, { status: 400 });
    }

    // Basic sanitization / length checks
    const safe = (v: string) => String(v || '').slice(0, 2000);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const html = `<!DOCTYPE html><html><body style="font-family:system-ui,Arial,sans-serif;line-height:1.5;color:#111">
      <h2 style="margin:0 0 16px">Neon Sign Request</h2>
      <p><strong>From:</strong> ${safe(email)}</p>
      <p><strong>Phone:</strong> ${safe(phone || '—')}</p>
      <p><strong>Design Text:</strong> ${safe(designText || '—')}</p>
      <p><strong>Font:</strong> ${safe(font || '—')}</p>
      <p><strong>Comment:</strong><br/>${safe(comment).replace(/\n/g, '<br/>')}</p>
      <hr style="margin:24px 0"/>
      <p style="font-size:12px;color:#555">Sent via Neon Boomerang contact form.</p>
    </body></html>`;

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER || toEmail,
      to: toEmail,
      subject: 'New Neon Sign Request',
      replyTo: email,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Request-sign error', err);
    return NextResponse.json({ error: 'Failed to send request' }, { status: 500 });
  }
}
