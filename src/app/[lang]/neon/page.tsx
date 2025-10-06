'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { SiteFooter } from '@/components/SiteFooter';
import { useI18n } from '@/lib/i18n/provider';
import { buildNeon } from '@/lib/neon';
import { Pacifico, Dancing_Script, Great_Vibes, Sacramento, Satisfy, Caveat, Courgette } from 'next/font/google';

const pacifico = Pacifico({ subsets: ['latin'], weight: '400' });
const dancing = Dancing_Script({ subsets: ['latin'], weight: ['400', '600'] });
const greatVibes = Great_Vibes({ subsets: ['latin'], weight: '400' });
const sacramento = Sacramento({ subsets: ['latin'], weight: '400' });
const satisfy = Satisfy({ subsets: ['latin'], weight: '400' });
const caveat = Caveat({ subsets: ['latin'], weight: ['400', '600'] });
const courgette = Courgette({ subsets: ['latin'], weight: '400' });

const fonts = [
  { label: 'Pacifico', family: 'Pacifico', className: pacifico.className },
  { label: 'Dancing Script', family: 'Dancing Script', className: dancing.className },
  { label: 'Great Vibes', family: 'Great Vibes', className: greatVibes.className },
  { label: 'Sacramento', family: 'Sacramento', className: sacramento.className },
  { label: 'Satisfy', family: 'Satisfy', className: satisfy.className },
  { label: 'Caveat', family: 'Caveat', className: caveat.className },
  { label: 'Courgette', family: 'Courgette', className: courgette.className },
];

export default function NeonSimplePage() {
  const [text, setText] = useState('OPEN');
  const [font, setFont] = useState(fonts[0]);
  const [ready, setReady] = useState(false);
  const colors = [
    { name: 'Cyan', value: '#4df5ff' },
    { name: 'Hot Pink', value: '#ff4de3' },
    { name: 'Electric Purple', value: '#b966ff' },
    { name: 'Lime', value: '#b9ff4d' },
    { name: 'Amber', value: '#ffc04d' },
    { name: 'Coral', value: '#ff7a4d' },
    { name: 'White', value: '#ffffff' },
  ];
  const [color, setColor] = useState(colors[0]);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<null | 'ok' | 'err'>(null);

  useEffect(() => {
    (async () => {
      try {
        await (document.fonts as FontFaceSet).ready;
      } catch {}
      setReady(true);
    })();
  }, []);

  const { t } = useI18n();
  return (
    <div className="flex flex-col min-h-screen bg-neutral-950 text-white">
      <div className="relative flex-1 w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(0,50,60,.30),rgba(0,0,0,.70))]" />
        <div className="relative z-10 flex flex-col md:flex-row gap-8 w-full max-w-7xl mx-auto p-6">
          <div className="order-2 md:order-1 backdrop-blur-sm bg-black/30 md:w-72 flex flex-col gap-4 rounded-lg p-4 ring-1 ring-cyan-500/20 shadow-lg shadow-cyan-500/10">
            <h1 className="text-lg font-semibold tracking-wide mb-1">{t('designer.title')}</h1>
            <label className="flex flex-col gap-1 text-sm">
              <span className="uppercase tracking-wider text-xs opacity-70">{t('designer.text')}</span>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
                className="rounded border border-cyan-700/30 bg-black/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 p-2 resize-none"
                placeholder={t('designer.text')}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="uppercase tracking-wider text-xs opacity-70">{t('designer.font')}</span>
              <select
                value={font.family}
                onChange={(e) => setFont(fonts.find((f) => f.family === e.target.value) || fonts[0])}
                className="rounded border border-cyan-700/30 bg-black/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 p-2"
              >
                {fonts.map((f) => (
                  <option key={f.family} value={f.family}>
                    {f.label}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex flex-col gap-2">
              <span className="uppercase tracking-wider text-xs opacity-70">{t('designer.color')}</span>
              <div className="flex flex-wrap gap-2">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    aria-label={c.name}
                    onClick={() => setColor(c)}
                    className={`h-7 w-7 rounded-full border transition shadow-inner ${
                      color.value === c.value
                        ? 'ring-2 ring-offset-2 ring-cyan-400 ring-offset-black scale-110'
                        : 'hover:scale-105'
                    }`}
                    style={{ background: c.value, borderColor: '#0a0a0a80' }}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              The image spans the full screen. Swap <code>public/room.jpg</code> for any background to instantly change
              the vibe.
            </p>
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent my-2" />
            <form
              className="flex flex-col gap-3"
              onSubmit={async (e) => {
                e.preventDefault();
                setSending(true);
                setSent(null);
                try {
                  const res = await fetch('/api/request-sign', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      email,
                      phone,
                      comment,
                      designText: text,
                      font: font.family,
                      color: color.value,
                    }),
                  });
                  if (res.ok) {
                    setSent('ok');
                    setEmail('');
                    setPhone('');
                    setComment('');
                  } else setSent('err');
                } catch {
                  setSent('err');
                } finally {
                  setSending(false);
                }
              }}
            >
              <label className="flex flex-col gap-1 text-xs">
                <span className="uppercase tracking-wider opacity-70">{t('designer.email')}</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded border border-cyan-700/30 bg-black/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 px-2 py-1.5 text-sm"
                  placeholder="you@example.com"
                />
              </label>
              <label className="flex flex-col gap-1 text-xs">
                <span className="uppercase tracking-wider opacity-70">{t('designer.phone')}</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="rounded border border-cyan-700/30 bg-black/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 px-2 py-1.5 text-sm"
                  placeholder="Optional"
                />
              </label>
              <label className="flex flex-col gap-1 text-xs">
                <span className="uppercase tracking-wider opacity-70">{t('designer.comment')}</span>
                <textarea
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  className="rounded border border-cyan-700/30 bg-black/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 p-2 resize-none text-sm"
                  placeholder={t('designer.comment.placeholder')}
                />
              </label>
              <button
                type="submit"
                disabled={sending}
                className="mt-1 rounded-md bg-cyan-400/10 hover:bg-cyan-400/20 disabled:opacity-50 border border-cyan-300/30 text-cyan-200 text-sm font-medium py-2 px-4"
              >
                {sending ? t('designer.sending') : t('designer.request')}
              </button>
              {sent === 'ok' && <div className="text-[10px] text-emerald-400">{t('designer.sent.ok')}</div>}
              {sent === 'err' && <div className="text-[10px] text-rose-400">{t('designer.sent.err')}</div>}
            </form>
          </div>

          <div className="order-1 md:order-2 flex-1 relative h-[70vh] md:h-[78vh] min-h-[450px] rounded-lg overflow-hidden ring-1 ring-cyan-500/20 bg-black/10">
            <Image
              src="/room.jpg"
              alt="Interior background"
              fill
              priority
              className="object-cover object-center opacity-95 select-none"
            />
            <div className="absolute inset-0 flex items-center justify-start md:justify-center p-6 md:p-12 text-center">
              <div className="w-full max-w-4xl">
                <NeonText text={text} fontClass={font.className} color={color.value} />
              </div>
            </div>
            {!ready && (
              <div className="absolute bottom-2 right-3 text-[10px] tracking-wide text-cyan-300 animate-pulse">
                Loading fonts…
              </div>
            )}
          </div>
        </div>
      </div>
      <SiteFooter variant="sub" />
    </div>
  );
}

interface NeonTextProps {
  text: string;
  fontClass: string;
  color: string;
}
const NeonText: React.FC<NeonTextProps> = ({ text, fontClass, color }) => {
  const neon = useMemo(() => buildNeon(color, { size: 1.1, intensity: 1 }), [color]);
  const lines = (text || '').split(/\r?\n/).filter((l, i, arr) => l.length || arr.length === 1);
  if (!text.trim()) return <span className="text-neutral-600 text-5xl font-light">&nbsp;</span>;
  return (
    <div className={`flex flex-col gap-2 ${fontClass}`}>
      {lines.map((line, idx) => (
        <span
          key={idx}
          className={`relative mx-auto whitespace-pre-wrap tracking-wide leading-none ${fontClass} text-[clamp(1.6rem,6.5vw,5rem)] font-light inline-block`}
          style={{
            color: neon.tubeColor,
            textShadow: neon.textShadow,
            filter: `${neon.filter} brightness(1.05)`,
            boxShadow: neon.boxShadow,
          }}
        >
          {line}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-[-18px] -z-10"
            style={{
              background: `radial-gradient(circle, ${neon.halo(0.25)} 0%, ${neon.halo(0.12)} 38%, transparent 68%)`,
              filter: 'blur(12px)',
            }}
          />
        </span>
      ))}
    </div>
  );
};
