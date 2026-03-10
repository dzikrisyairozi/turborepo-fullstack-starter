/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Docs App — Fumadocs i18n Configuration
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { defineI18n } from 'fumadocs-core/i18n';

export const i18n = defineI18n({
  defaultLanguage: 'en',
  languages: ['en', 'id'],
  hideLocale: 'never',
});
