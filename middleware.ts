import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory rate limiting (for production, use Redis or similar)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 60; // 60 requests per minute

function getRateLimitKey(request: NextRequest): string {
  // Use IP address or fall back to a default key
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'anonymous';
  return `rate-limit:${ip}`;
}

function checkRateLimit(key: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimit.get(key);

  if (!record || now > record.resetTime) {
    // New window
    rateLimit.set(key, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  if (record.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: MAX_REQUESTS - record.count };
}

export function middleware(request: NextRequest) {
  // Apply rate limiting to API routes and contact form
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const key = getRateLimitKey(request);
    const { allowed, remaining } = checkRateLimit(key);

    if (!allowed) {
      return new NextResponse(
        JSON.stringify({
          error: 'Rate limit exceeded. Please try again later.',
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '60',
            'X-RateLimit-Limit': MAX_REQUESTS.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
          },
        }
      );
    }

    // Add rate limit headers to response
    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Limit', MAX_REQUESTS.toString());
    response.headers.set('X-RateLimit-Remaining', remaining.toString());
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico|images/).*)',
  ],
};
