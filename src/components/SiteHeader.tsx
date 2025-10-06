'use client';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/lib/i18n/provider';
import { withLocale } from '@/lib/i18n/paths';
import { Locale } from '@/lib/i18n/config';

export interface SiteHeaderProps {
  showLaunchDesigner?: boolean;
  active?: 'designer' | 'features' | 'gallery' | 'pricing' | 'contact';
}

const rawNav: Array<{ href: string; key: SiteHeaderProps['active']; labelKey: string }> = [
  { href: '/neon', key: 'designer', labelKey: 'nav.designer' },
  { href: '/#features', key: 'features', labelKey: 'nav.features' },
  { href: '/#gallery', key: 'gallery', labelKey: 'nav.gallery' },
  { href: '/#pricing', key: 'pricing', labelKey: 'nav.pricing' },
  { href: '/#contact', key: 'contact', labelKey: 'nav.contact' },
];

export const SiteHeader: React.FC<SiteHeaderProps> = ({ showLaunchDesigner = true, active }) => {
  const { lang, t, setLocale } = useI18n();
  // Derive active section automatically if not explicitly provided
  const pathname = usePathname();
  let derivedActive: SiteHeaderProps['active'] | undefined = undefined;
  if (!active && pathname) {
    const segments = pathname.split('/').filter(Boolean);
    // Expect pattern /{lang}/neon
    if (segments.length >= 2 && segments[1] === 'neon') {
      derivedActive = 'designer';
    }
  }
  const effectiveActive = active || derivedActive;
  const navItems = rawNav.map((n) => ({ ...n, label: t(n.labelKey) }));
  const switchTo = (l: Locale) => () => setLocale(l);
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-neutral-950/70 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href={withLocale(lang, '/')} className="flex items-center gap-2 font-semibold tracking-wide text-lg">
          <span className="bg-gradient-to-r from-cyan-300 via-teal-200 to-cyan-400 bg-clip-text text-transparent">
            Neon Boomerang
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={withLocale(lang, item.href)}
              className={
                (effectiveActive === item.key ? 'text-cyan-300 ' : 'hover:text-cyan-300 ') + 'transition-colors'
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-2 text-xs">
            <button
              type="button"
              onClick={switchTo('en')}
              className={`hover:text-cyan-300 ${lang === 'en' ? 'text-cyan-300 font-semibold' : 'text-neutral-300'}`}
            >
              EN
            </button>
            <span className="opacity-40">|</span>
            <button
              type="button"
              onClick={switchTo('lt')}
              className={`hover:text-cyan-300 ${lang === 'lt' ? 'text-cyan-300 font-semibold' : 'text-neutral-300'}`}
            >
              LT
            </button>
          </div>
          {showLaunchDesigner && (
            <Link
              href={withLocale(lang, '/neon')}
              className="rounded-full bg-cyan-400/10 hover:bg-cyan-400/20 text-cyan-300 border border-cyan-300/30 px-5 py-2 text-sm font-medium backdrop-blur-sm"
            >
              {t('cta.launchDesigner')}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
