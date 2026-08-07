import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function sanitize(str: string): string {
  if (!str) return '';
  return str.replace(/<[^>]*>?/gm, '').trim();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';

    // Rate limit check
    const now = Date.now();
    const timestamps = rateLimitMap.get(ip) || [];
    const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

    if (validTimestamps.length >= RATE_LIMIT_MAX) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    validTimestamps.push(now);
    rateLimitMap.set(ip, validTimestamps);

    const body = await req.json();
    const { name, email, message, context } = body;

    // Validation & Sanitization
    const cleanName = sanitize(name);
    const cleanEmail = sanitize(email);
    const cleanMessage = sanitize(message);
    const cleanContext = sanitize(context);

    if (!cleanName || !cleanEmail || !cleanMessage) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields.' },
        { status: 400 }
      );
    }

    if (!isValidEmail(cleanEmail)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address.' },
        { status: 400 }
      );
    }

    const recipientEmail = 'savio.john.t@gmail.com';
    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    const smtpPass = process.env.SMTP_PASS?.trim();

    // 1. Dispatch via Resend API matching Resend documentation
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);

      const { data, error } = await resend.emails.send({
        from: process.env.EMAIL_FROM || 'Portfolio Contact <onboarding@resend.dev>',
        to: recipientEmail,
        replyTo: cleanEmail,
        subject: `New Portfolio Message from ${cleanName} [${cleanContext || 'ROOT'}]`,
        text: `Name: ${cleanName}\nEmail: ${cleanEmail}\nContext: ${cleanContext}\n\nMessage:\n${cleanMessage}`,
        html: `
          <h3>New Portfolio Message</h3>
          <p><strong>Name:</strong> ${cleanName}</p>
          <p><strong>Email:</strong> ${cleanEmail}</p>
          <p><strong>Context:</strong> ${cleanContext}</p>
          <hr />
          <p style="white-space: pre-wrap;">${cleanMessage}</p>
        `,
      });

      if (error) {
        console.error('[Resend API Error]:', error);
        return NextResponse.json(
          {
            success: false,
            message: `Resend error: ${error.message}`,
          },
          { status: 400 }
        );
      }

      console.log(`[Email Sent via Resend] ID: ${data?.id} | From: ${cleanEmail} -> To: ${recipientEmail}`);
      return NextResponse.json({ success: true, message: 'Message sent successfully!' });
    }

    // 2. Dispatch via SMTP if SMTP_PASS is available
    if (smtpPass) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER || recipientEmail,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"${cleanName}" <${process.env.SMTP_USER || recipientEmail}>`,
        to: recipientEmail,
        replyTo: cleanEmail,
        subject: `New Portfolio Message from ${cleanName} [${cleanContext || 'ROOT'}]`,
        text: `Name: ${cleanName}\nEmail: ${cleanEmail}\nContext: ${cleanContext}\n\nMessage:\n${cleanMessage}`,
      });

      console.log(`[Email Sent via SMTP] From: ${cleanEmail} -> To: ${recipientEmail}`);
      return NextResponse.json({ success: true, message: 'Message sent successfully!' });
    }

    // 3. Fallback: Log to console if RESEND_API_KEY is not loaded into process.env
    console.error('[Contact Form API] RESEND_API_KEY is missing in process.env. Please restart `npm run dev` in your terminal.');
    console.log(`[Contact Form Fallback] From: ${cleanName} (${cleanEmail}) [Message: ${cleanMessage}]`);

    return NextResponse.json({
      success: false,
      message: 'RESEND_API_KEY is not loaded yet. Please restart `npm run dev` in your terminal so Next.js reads your .env.local file.',
    }, { status: 400 });
  } catch (error: any) {
    console.error('Contact Form API Exception:', error);
    return NextResponse.json(
      { success: false, message: error?.message || 'Failed to process message. Please try again.' },
      { status: 500 }
    );
  }
}
