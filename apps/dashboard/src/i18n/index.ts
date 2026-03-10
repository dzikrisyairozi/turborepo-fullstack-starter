/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Dashboard App — i18n Initialization
 *
 * Initializes the shared i18n with dashboard-specific translations.
 * Uses browser language detection + localStorage persistence.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { initI18n } from '@repo/i18n';

import dashboardEn from './locales/en.json';
import dashboardId from './locales/id.json';

export function initDashboardI18n() {
  return initI18n({
    detection: true, // Use browser language detection + localStorage
    defaultNS: 'dashboard',
    resources: {
      en: { dashboard: dashboardEn },
      id: { dashboard: dashboardId },
    },
  });
}
