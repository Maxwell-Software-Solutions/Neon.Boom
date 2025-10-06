import { Locale } from './config';

export function withLocale(lang: Locale, href: string) {
  if (!href.startsWith('/')) return href; // external or hash
  // If href already has a locale segment, replace it
  const parts = href.split('/').filter(Boolean);
  if (parts.length && parts[0].length === 2) {
    parts[0] = lang;
    return '/' + parts.join('/');
  }
  return `/${lang}${href === '/' ? '' : href}`;
}
