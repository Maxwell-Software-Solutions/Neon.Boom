import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import ApolloProviders from '../ApolloProviders';
import { I18nProvider } from '@/lib/i18n/provider';
import { DEFAULT_LOCALE, isSupportedLocale, Locale } from '@/lib/i18n/config';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Using loose typing due to Next.js inference issues; acceptable for layout wrapper
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function LangLayout(props: any) {
  const { children, params: paramsPromise } =
    (props as { children: React.ReactNode; params?: Promise<{ lang?: string }> }) || {};
  const params = paramsPromise ? await paramsPromise : {};
  const seg = params?.lang;
  const lang: Locale = isSupportedLocale(seg) ? (seg as Locale) : DEFAULT_LOCALE;
  return (
    <html lang={lang}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ApolloProviders>
          <I18nProvider lang={lang}>
            {/* Shared header/footer moved here */}
            <div className="flex flex-col min-h-screen bg-neutral-950 text-white">
              <SiteHeader />
              <div className="flex-1">{children}</div>
              <SiteFooter variant="home" />
            </div>
          </I18nProvider>
        </ApolloProviders>
      </body>
    </html>
  );
}
