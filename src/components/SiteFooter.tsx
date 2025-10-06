'use client';
import React from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/provider';
import { withLocale } from '@/lib/i18n/paths';

export interface SiteFooterProps {
  variant?: 'home' | 'sub';
}

const sectionLinks = (variant: 'home' | 'sub') => {
  const prefix = variant === 'home' ? '' : '/';
  return {
    features: `${prefix}#features`,
    pricing: `${prefix}#pricing`,
    contact: `${prefix}#contact`,
    gallery: `${prefix}#gallery`,
  };
};

export const SiteFooter: React.FC<SiteFooterProps> = ({ variant = 'home' }) => {
  const { t, lang } = useI18n();
  const links = sectionLinks(variant);

  return (
    <footer className="mt-auto border-t border-white/10 bg-neutral-950/80 backdrop-blur-md py-10 text-sm">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row gap-6 sm:gap-10 justify-between">
        <div>
          <div className="font-semibold tracking-wide text-cyan-200">Neon Boomerang</div>
          <p className="text-neutral-400 mt-2 max-w-xs">{t('footer.tagline')}</p>
        </div>
        <div className="flex gap-10">
          <div className="flex flex-col gap-2">
            <div className="uppercase text-neutral-500 text-[11px] tracking-wide">{t('footer.product')}</div>
            <Link href={withLocale(lang, '/neon')} className="hover:text-cyan-300">
              {t('nav.designer')}
            </Link>
            <Link href={withLocale(lang, links.features)} className="hover:text-cyan-300">
              {t('nav.features')}
            </Link>
            <Link href={withLocale(lang, links.pricing)} className="hover:text-cyan-300">
              {t('nav.pricing')}
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <div className="uppercase text-neutral-500 text-[11px] tracking-wide">{t('footer.company')}</div>
            <Link href={withLocale(lang, links.contact)} className="hover:text-cyan-300">
              {t('nav.contact')}
            </Link>
            <Link href={withLocale(lang, links.gallery)} className="hover:text-cyan-300">
              {t('nav.gallery')}
            </Link>
          </div>
        </div>
        <div className="text-neutral-500">
          © {new Date().getFullYear()} Neon Boomerang. {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
