/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Web App — Client I18n Wrapper
 *
 * Client component that initializes i18n with the server-provided locale
 * and provides the LanguageSwitcher with cookie persistence.
 * ─────────────────────────────────────────────────────────────────────────────
 */

'use client';

import type { ReactNode } from 'react';
import { I18nProvider } from '@repo/i18n';
import { LanguageSwitcher, type SupportedLanguage } from '@repo/i18n';
import { useRouter } from 'next/navigation';

import webEn from '@/i18n/locales/en.json';
import webId from '@/i18n/locales/id.json';

function setCookie(name: string, value: string, days: number) {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${value};path=/;max-age=${maxAge};samesite=lax`;
}

function WebLanguageSwitcher() {
  const router = useRouter();

  const handleLanguageChange = (lang: SupportedLanguage) => {
    setCookie('NEXT_LOCALE', lang, 365);
    router.refresh();
  };

  return <LanguageSwitcher onLanguageChange={handleLanguageChange} />;
}

interface WebI18nProviderProps {
  locale: string;
  children: ReactNode;
}

export function WebI18nProvider({ locale, children }: WebI18nProviderProps) {
  return (
    <I18nProvider
      lng={locale}
      detection={false}
      defaultNS="web"
      resources={{
        en: { web: webEn },
        id: { web: webId },
      }}
    >
      {children}
    </I18nProvider>
  );
}

export { WebLanguageSwitcher };
