/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Web App — i18n Initialization
 *
 * Initializes the shared i18n with web-specific translations.
 * The locale is provided from the server cookie (no browser detection).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { initI18n } from '@repo/i18n';

import webEn from './locales/en.json';
import webId from './locales/id.json';

export function initWebI18n(locale: string) {
  return initI18n({
    lng: locale,
    detection: false, // Server provides locale via cookie
    defaultNS: 'web',
    resources: {
      en: { web: webEn },
      id: { web: webId },
    },
  });
}
