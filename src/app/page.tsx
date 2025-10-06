import Image from 'next/image';
import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

// Gallery images now expected directly under /public (root). Move files from /public/gallery to /public.
const GALLERY_IMAGES = ['IMG_1.jpg', 'IMG_2.jpg', 'IMG_3.jpg', 'IMG_4.jpg', 'IMG_5.jpg', 'IMG_6.jpg'];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-950 text-white">
      <SiteHeader />

      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src="/room.jpg" alt="Ambient interior background" fill priority className="object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-neutral-950/80 to-neutral-950" />
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-32 flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight max-w-4xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 via-teal-100 to-cyan-300 drop-shadow-[0_0_25px_rgba(56,244,255,0.35)]">
            Custom Neon Signs That Make Your Brand Glow
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg text-neutral-300">
            Design luminous statements in seconds. Premium LED neon aesthetics, instant text + font preview, and
            production‑ready output. Built for creators, venues, and brands that want unforgettable ambience.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/neon"
              className="px-8 py-3 rounded-full bg-cyan-400 text-neutral-900 font-semibold text-sm sm:text-base shadow-[0_0_25px_-5px_#22d3ee] hover:shadow-[0_0_35px_-2px_#22d3ee] transition-shadow"
            >
              Start Designing
            </Link>
            <a
              href="#features"
              className="px-8 py-3 rounded-full border border-cyan-300/40 text-cyan-200 font-medium text-sm sm:text-base hover:bg-cyan-300/10 transition-colors"
            >
              See Features
            </a>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-28 bg-gradient-to-b from-neutral-950 to-neutral-900/40">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl sm:text-4xl font-semibold mb-14 tracking-tight">Why Neon Boomerang</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: 'Instant Preview',
                body: 'Type anything and watch it glow immediately with real neon-style rendering.',
              },
              {
                title: 'Crisp Typography',
                body: 'Curated premium script & display fonts optimized for luminous display.',
              },
              {
                title: 'True-to-Life Glow',
                body: 'Layered light simulation for depth, bloom, and realistic edge falloff.',
              },
              {
                title: 'Production Ready',
                body: 'Exportable specs sized for fabrication & marketing assets.',
              },
              {
                title: 'Brand Consistency',
                body: 'Lock colors & styles for teams; keep every install on‑brand.',
              },
              {
                title: 'Fast Turnaround',
                body: 'From idea to ready-to-manufacture file in minutes, not days.',
              },
            ].map((f) => (
              <div
                key={f.title}
                className="group rounded-xl border border-white/10 bg-neutral-900/40 p-6 backdrop-blur-sm shadow-[0_0_0_1px_rgba(255,255,255,0.02)] hover:shadow-[0_0_25px_-4px_rgba(34,211,238,0.35)] transition-all"
              >
                <h3 className="font-semibold mb-2 text-cyan-200 tracking-wide text-sm uppercase">{f.title}</h3>
                <p className="text-sm text-neutral-300 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl sm:text-4xl font-semibold mb-8 tracking-tight">Showcase</h2>
          <p className="text-neutral-400 text-sm max-w-2xl mb-10">
            A glimpse at recent custom neon concepts & installations. Each piece is tailored to brand tone, scale and
            mounting environment.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_IMAGES.map((name) => (
              <figure
                key={name}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-neutral-900/40"
              >
                <Image
                  src={`/${name}`}
                  alt={`Neon Boomerang project ${name.replace(/_/g, ' ').replace(/\.jpg$/, '')}`}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-110"
                />
                <figcaption className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 text-[11px] tracking-wide text-neutral-200">
                  {name.replace('IMG_', 'Project #').replace('.jpg', '')}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing placeholder */}
      <section id="pricing" className="py-24 bg-neutral-900/40">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl sm:text-4xl font-semibold mb-10 tracking-tight">Simple Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { tier: 'Starter', price: '$149', blurb: 'Small personal neon up to 60cm.' },
              { tier: 'Pro', price: '$349', blurb: 'Larger statement piece up to 120cm.' },
              { tier: 'Custom', price: 'Quote', blurb: 'Bespoke shapes, layering & enterprise branding.' },
            ].map((card) => (
              <div
                key={card.tier}
                className="relative rounded-2xl border border-cyan-300/30 bg-neutral-950/60 p-8 flex flex-col gap-4 shadow-[0_0_25px_-6px_rgba(34,211,238,0.4)]"
              >
                <h3 className="text-sm uppercase tracking-wide text-cyan-200 font-semibold">{card.tier}</h3>
                <div className="text-3xl font-semibold">{card.price}</div>
                <p className="text-sm text-neutral-300 flex-1 leading-relaxed">{card.blurb}</p>
                <Link
                  href="/neon"
                  className="rounded-md bg-cyan-400/10 hover:bg-cyan-400/20 text-cyan-200 border border-cyan-300/30 px-4 py-2 text-sm font-medium text-center"
                >
                  Design Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-6">Have a concept? Let’s build it.</h2>
          <p className="text-neutral-300 max-w-2xl mx-auto mb-10">
            Send us your logo, sketch or phrase. Our team will refine the layout, advise sizing & mounting, and ship a
            brilliant LED neon that lasts.
          </p>
          <Link
            href="/neon"
            className="px-10 py-4 rounded-full bg-cyan-400 text-neutral-900 font-semibold shadow-[0_0_35px_-5px_#22d3ee] hover:shadow-[0_0_45px_-4px_#22d3ee] transition-shadow"
          >
            Launch Designer
          </Link>
        </div>
      </section>

      <SiteFooter variant="home" />
    </div>
  );
}
