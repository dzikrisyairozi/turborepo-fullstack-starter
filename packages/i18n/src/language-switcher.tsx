/**
 * ─────────────────────────────────────────────────────────────────────────────
 * @repo/i18n — Language Switcher Component
 *
 * Dropdown for switching between supported languages.
 * Supports an optional onLanguageChange callback for custom persistence
 * (e.g., setting a cookie and refreshing the page in Next.js).
 * ─────────────────────────────────────────────────────────────────────────────
 */

'use client';

import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect, useCallback } from 'react';
import {
  SUPPORTED_LANGUAGES,
  LANGUAGE_LABELS,
  type SupportedLanguage,
} from './config';

interface LanguageSwitcherProps {
  /** Called after language change. Use to set cookies, refresh router, etc. */
  onLanguageChange?: (lang: SupportedLanguage) => void;
  /** Optional className for styling the trigger button */
  className?: string;
}

export function LanguageSwitcher({
  onLanguageChange,
  className = '',
}: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = (i18n.language || 'en') as SupportedLanguage;
  const currentLabel = LANGUAGE_LABELS[currentLang] || LANGUAGE_LABELS.en;

  const handleSelect = useCallback(
    (lang: SupportedLanguage) => {
      i18n.changeLanguage(lang);
      setIsOpen(false);
      onLanguageChange?.(lang);
    },
    [i18n, onLanguageChange],
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex h-9 items-center justify-between gap-2 rounded-md border border-input bg-background/50 backdrop-blur-md px-3 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Switch language"
      >
        <span className="text-sm font-semibold tracking-wide">
          {currentLabel.flag}
        </span>
        <svg
          className={`h-4 w-4 opacity-50 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 z-50 mt-2 min-w-[160px] origin-top-right rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg animate-in fade-in-0 zoom-in-95"
          role="listbox"
          aria-label="Available languages"
        >
          {SUPPORTED_LANGUAGES.map((lang) => {
            const { label, flag } = LANGUAGE_LABELS[lang];
            const isActive = lang === currentLang;

            return (
              <button
                key={lang}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => handleSelect(lang)}
                className={`relative flex w-full cursor-default select-none items-center rounded-sm py-2 pl-3 pr-9 text-sm outline-none transition-colors ${
                  isActive
                    ? 'bg-accent text-accent-foreground font-medium'
                    : 'text-popover-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-muted-foreground w-5 text-left">
                    {flag}
                  </span>
                  <span className="whitespace-nowrap">{label}</span>
                </div>
                {isActive && (
                  <span className="absolute right-3 flex h-3.5 w-3.5 items-center justify-center">
                    <svg
                      className="h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
