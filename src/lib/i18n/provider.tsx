'use client';
import React, { createContext, useContext, useCallback, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { DEFAULT_LOCALE, Locale, isSupportedLocale } from './config';
import enDict from '@/locales/en.json';
import { withLocale } from './paths';

interface I18nContextValue {
  lang: Locale;
  t: (key: string) => string;
  setLocale: (next: Locale) => void;
  dict: Record<string, string>;
}

const I18NContext = createContext<I18nContextValue | undefined>(undefined);

// simple runtime cache (module scoped)
const dictionaries: Record<string, Record<string, string>> = {};

async function loadDict(lang: Locale): Promise<Record<string, string>> {
  if (dictionaries[lang]) return dictionaries[lang];
  const mod = await import(`@/locales/${lang}.json`).catch(() => ({ default: {} }));
  dictionaries[lang] = mod.default as Record<string, string>;
  return dictionaries[lang];
}

export function I18nProvider({ lang, children }: { lang: Locale; children: React.ReactNode }) {
  const [dict, setDict] = React.useState<Record<string, string>>({});
  React.useEffect(() => {
    loadDict(lang).then(setDict);
  }, [lang]);

  const router = useRouter();
  const pathname = usePathname();

  const t = useCallback(
    (key: string) => {
      if (dict && key in dict) return dict[key];
      if (lang !== DEFAULT_LOCALE) {
        const fallback = dictionaries[DEFAULT_LOCALE];
        if (fallback && key in fallback) return fallback[key];
      }
      return key;
    },
    [dict, lang]
  );

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === lang || !isSupportedLocale(next)) return;
      // set cookie
      document.cookie = `NEXT_LOCALE=${next}; Path=/; Max-Age=${60 * 60 * 24 * 365}`;
      // navigate preserving rest of path sans first segment
      let target = '/';
      if (pathname) {
        const parts = pathname.split('/').filter(Boolean);
        if (parts.length > 0 && isSupportedLocale(parts[0])) parts.shift();
        target = '/' + [next, ...parts].join('/');
      } else {
        target = '/' + next;
      }
      router.push(target || '/');
    },
    [lang, pathname, router]
  );

  const value: I18nContextValue = useMemo(() => ({ lang, t, setLocale, dict }), [lang, t, setLocale, dict]);

  return <I18NContext.Provider value={value}>{children}</I18NContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18NContext);
  if (!ctx) {
    // Fallback (e.g. if a root page outside localized layout still imports a component using i18n)
    return {
      lang: DEFAULT_LOCALE,
      t: (key: string) => (enDict as Record<string, string>)[key] || key,
      setLocale: () => {},
      dict: enDict as Record<string, string>,
    } as const;
  }
  return ctx;
}

export { withLocale };
