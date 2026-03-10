/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Web App — Middleware for i18n Cookie Detection
 *
 * Reads the NEXT_LOCALE cookie or Accept-Language header and sets
 * the locale cookie. No URL redirect — clean URLs preserved.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { NextResponse, type NextRequest } from 'next/server';

const SUPPORTED_LANGUAGES = ['en', 'id'];
const DEFAULT_LANGUAGE = 'en';
const COOKIE_NAME = 'NEXT_LOCALE';

function getPreferredLanguage(request: NextRequest): string {
  // 1. Check cookie first
  const cookieLang = request.cookies.get(COOKIE_NAME)?.value;
  if (cookieLang && SUPPORTED_LANGUAGES.includes(cookieLang)) {
    return cookieLang;
  }

  // 2. Check Accept-Language header
  const acceptLanguage = request.headers.get('Accept-Language');
  if (acceptLanguage) {
    const languages = acceptLanguage
      .split(',')
      .map((lang) => {
        const [code, priority] = lang.trim().split(';q=');
        return {
          code: code!.split('-')[0]!.toLowerCase(),
          priority: priority ? parseFloat(priority) : 1,
        };
      })
      .sort((a, b) => b.priority - a.priority);

    for (const { code } of languages) {
      if (SUPPORTED_LANGUAGES.includes(code)) {
        return code;
      }
    }
  }

  return DEFAULT_LANGUAGE;
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const locale = getPreferredLanguage(request);

  // Set/refresh the cookie so server components can read it
  response.cookies.set(COOKIE_NAME, locale, {
    path: '/',
    maxAge: 365 * 24 * 60 * 60, // 1 year
    sameSite: 'lax',
  });

  return response;
}

export const config = {
  matcher: [
    // Match all paths except static files, API, and Next.js internals
    '/((?!api|_next/static|_next/image|favicon|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|json)$).*)',
  ],
};
