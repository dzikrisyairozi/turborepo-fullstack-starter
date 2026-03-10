/**
 * ─────────────────────────────────────────────────────────────────────────────
 * @repo/i18n — Public API
 * ─────────────────────────────────────────────────────────────────────────────
 */

// Core config and factory
export {
  initI18n,
  resetI18n,
  i18n,
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  LANGUAGE_LABELS,
  type SupportedLanguage,
  type InitI18nOptions,
} from './config';

// React components
export { I18nProvider } from './provider';
export { LanguageSwitcher } from './language-switcher';

// Re-export hooks from react-i18next for convenience
export { useTranslation, Trans } from 'react-i18next';
