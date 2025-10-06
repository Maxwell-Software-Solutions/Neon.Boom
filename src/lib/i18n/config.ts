export const SUPPORTED_LOCALES = ['en', 'lt'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'lt';

export function isSupportedLocale(value: string | undefined | null): value is Locale {
  return !!value && SUPPORTED_LOCALES.includes(value as Locale);
}
