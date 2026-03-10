/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Docs App — i18n Middleware
 *
 * Handles locale detection and redirect using Fumadocs middleware.
 * Default locale (en) prefix is hidden in URLs.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { createI18nMiddleware } from 'fumadocs-core/i18n/middleware';
import { i18n } from '@/lib/i18n';

export default createI18nMiddleware(i18n);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|favicon|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|json)$).*)',
  ],
};
