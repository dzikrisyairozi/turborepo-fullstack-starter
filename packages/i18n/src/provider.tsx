/**
 * ─────────────────────────────────────────────────────────────────────────────
 * @repo/i18n — React Provider
 *
 * Wraps the app with i18next context.
 * ─────────────────────────────────────────────────────────────────────────────
 */

'use client';

import { I18nextProvider } from 'react-i18next';
import { initI18n, type InitI18nOptions } from './config';
import type { ReactNode } from 'react';

interface I18nProviderProps extends InitI18nOptions {
  children: ReactNode;
}

export function I18nProvider({ children, ...options }: I18nProviderProps) {
  const i18nInstance = initI18n(options);

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}
