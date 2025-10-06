'use client';
import React from 'react';
import { useI18n } from '@/lib/i18n/provider';

export default function HomeClient() {
  const { t } = useI18n();
  return (
    <div>
      <section className="relative isolate overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-32 flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight max-w-4xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 via-teal-100 to-cyan-300 drop-shadow-[0_0_25px_rgba(56,244,255,0.35)]">
            {t('home.hero.title')}
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg text-neutral-300">{t('home.hero.subtitle')}</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="#features"
              className="px-8 py-3 rounded-full border border-cyan-300/40 text-cyan-200 font-medium text-sm sm:text-base hover:bg-cyan-300/10 transition-colors"
            >
              {t('home.hero.seeFeatures')}
            </a>
          </div>
        </div>
      </section>
      <section id="gallery" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl sm:text-4xl font-semibold mb-8 tracking-tight">{t('home.gallery.heading')}</h2>
          <p className="text-neutral-400 text-sm max-w-2xl mb-10">{t('home.gallery.intro')}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {['IMG_1.jpg', 'IMG_2.jpg', 'IMG_3.jpg', 'IMG_4.jpg', 'IMG_5.jpg', 'IMG_6.jpg'].map((name) => (
              <figure
                key={name}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-neutral-900/40"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/${name}`}
                  alt={t('gallery.caption.prefix') + name.replace('IMG_', '')}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-110"
                  loading="lazy"
                />
                <figcaption className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 text-[11px] tracking-wide text-neutral-200">
                  {t('gallery.caption.prefix')}
                  {name.replace('IMG_', '').replace('.jpg', '')}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <section id="features" className="py-28 bg-gradient-to-b from-neutral-950 to-neutral-900/40">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl sm:text-4xl font-semibold mb-14 tracking-tight">{t('home.features.heading')}</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              ['feature.instant.title', 'feature.instant.body'],
              ['feature.typography.title', 'feature.typography.body'],
              ['feature.glow.title', 'feature.glow.body'],
              ['feature.production.title', 'feature.production.body'],
              ['feature.brand.title', 'feature.brand.body'],
              ['feature.fast.title', 'feature.fast.body'],
            ].map(([titleKey, bodyKey]) => (
              <div
                key={titleKey}
                className="group rounded-xl border border-white/10 bg-neutral-900/40 p-6 backdrop-blur-sm shadow-[0_0_0_1px_rgba(255,255,255,0.02)] hover:shadow-[0_0_25px_-4px_rgba(34,211,238,0.35)] transition-all"
              >
                <h3 className="font-semibold mb-2 text-cyan-200 tracking-wide text-sm uppercase">{t(titleKey)}</h3>
                <p className="text-sm text-neutral-300 leading-relaxed">{t(bodyKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="pricing" className="py-24 bg-neutral-900/40">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl sm:text-4xl font-semibold mb-10 tracking-tight">{t('home.pricing.heading')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              ['pricing.starter', '$149', 'pricing.starter.body'],
              ['pricing.pro', '$349', 'pricing.pro.body'],
              ['pricing.custom', 'Quote', 'pricing.custom.body'],
            ].map(([tierKey, price, bodyKey]) => (
              <div
                key={tierKey as string}
                className="relative rounded-2xl border border-cyan-300/30 bg-neutral-950/60 p-8 flex flex-col gap-4 shadow-[0_0_25px_-6px_rgba(34,211,238,0.4)]"
              >
                <h3 className="text-sm uppercase tracking-wide text-cyan-200 font-semibold">{t(tierKey as string)}</h3>
                <div className="text-3xl font-semibold">{price}</div>
                <p className="text-sm text-neutral-300 flex-1 leading-relaxed">{t(bodyKey as string)}</p>
                <a
                  href="#contact"
                  className="rounded-md bg-cyan-400/10 hover:bg-cyan-400/20 text-cyan-200 border border-cyan-300/30 px-4 py-2 text-sm font-medium text-center"
                >
                  {t('contact.launch')}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="contact" className="py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-6">{t('home.contact.heading')}</h2>
          <p className="text-neutral-300 max-w-2xl mx-auto mb-10">{t('home.contact.body')}</p>
          <a
            href="#pricing"
            className="px-10 py-4 rounded-full bg-cyan-400 text-neutral-900 font-semibold shadow-[0_0_35px_-5px_#22d3ee] hover:shadow-[0_0_45px_-4px_#22d3ee] transition-shadow"
          >
            {t('contact.launch')}
          </a>
        </div>
      </section>
    </div>
  );
}
