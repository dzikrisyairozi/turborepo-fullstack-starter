/**
 * ─────────────────────────────────────────────────────────────────────────────
 * @repo/i18n — Shared i18n Configuration
 *
 * Factory function to initialize i18next with common translations
 * and app-specific resources.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import i18n, { type InitOptions, type Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import commonEn from './locales/en/common.json';
import commonId from './locales/id/common.json';

export const SUPPORTED_LANGUAGES = ['en', 'id'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

export const LANGUAGE_LABELS: Record<
  SupportedLanguage,
  { label: string; flag: string }
> = {
  en: { label: 'English', flag: 'EN' },
  id: { label: 'Bahasa Indonesia', flag: 'ID' },
};

/**
 * Deep-merge app resources with common translations.
 */
function mergeResources(appResources?: Resource): Resource {
  const base: Resource = {
    en: { common: commonEn },
    id: { common: commonId },
  };

  if (!appResources) return base;

  for (const lang of Object.keys(appResources)) {
    if (!base[lang]) {
      base[lang] = {};
    }
    for (const ns of Object.keys(appResources[lang]!)) {
      const resourceKey = appResources[lang]![ns];
      if (resourceKey) {
        base[lang]![ns] = resourceKey;
      }
    }
  }

  return base;
}

export interface InitI18nOptions {
  /** Initial language (e.g., from server cookie). Overrides auto-detection. */
  lng?: string;
  /** App-specific translation resources */
  resources?: Resource;
  /** Default namespace for the app */
  defaultNS?: string;
  /** Whether to use browser language detection (default: true) */
  detection?: boolean;
}

let initialized = false;

export function initI18n(options: InitI18nOptions = {}) {
  if (initialized) return i18n;

  const { lng, resources, defaultNS = 'common', detection = true } = options;

  const mergedResources = mergeResources(resources);

  const config: InitOptions = {
    resources: mergedResources,
    fallbackLng: DEFAULT_LANGUAGE,
    defaultNS,
    ns: Object.keys(mergedResources.en || {}),
    interpolation: {
      escapeValue: false, // React already escapes
    },
    react: {
      useSuspense: false,
    },
  };

  // If a specific language is provided (e.g., from server cookie), use it
  if (lng) {
    config.lng = lng;
  }

  // Use browser detection for SPAs (dashboard), skip for SSR (web)
  if (detection && !lng) {
    i18n.use(LanguageDetector);
  }

  i18n.use(initReactI18next);
  i18n.init(config);

  initialized = true;
  return i18n;
}

/**
 * Reset the initialized state (useful for testing or HMR).
 */
export function resetI18n() {
  initialized = false;
}

export { i18n };
