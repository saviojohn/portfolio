import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

// Rate limiting in-memory store for Edge (Note: In a true multi-region edge deployment, this is local to the edge node.
// For a personal portfolio, this is usually sufficient, but Upstash Redis would be better for a real distributed app).
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_MAX = 5;
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
    const validTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
    
    if (validTimestamps.length >= RATE_LIMIT_MAX) {
      return NextResponse.json({ success: false, message: 'Too many requests. Please try again later.' }, { status: 429 });
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
      return NextResponse.json({ success: false, message: 'Missing required fields.' }, { status: 400 });
    }

    if (!isValidEmail(cleanEmail)) {
      return NextResponse.json({ success: false, message: 'Invalid email address.' }, { status: 400 });
    }

    // Here we would typically send an email using Resend, SendGrid, etc.
    // For the portfolio skeleton, we log it and return success.
    console.warn(`New contact message from ${cleanName} (${cleanEmail}) [Context: ${cleanContext}]`);
    console.warn(`Message: ${cleanMessage}`);

    return NextResponse.json({ success: true, message: 'Message received.' });
  } catch (error) {
    // Never expose internal errors
    console.error('Contact form error:', error);
    return NextResponse.json({ success: false, message: 'An internal error occurred.' }, { status: 500 });
  }
}
