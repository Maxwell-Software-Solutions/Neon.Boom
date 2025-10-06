import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_LOCALE, isSupportedLocale } from './src/lib/i18n/config';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Allow next internals and assets
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.startsWith('/favicon')) {
    return NextResponse.next();
  }

  const segments = pathname.split('/').filter(Boolean);
  const cookieLocale = req.cookies.get('NEXT_LOCALE')?.value;
  const locale = isSupportedLocale(cookieLocale) ? cookieLocale : DEFAULT_LOCALE;

  if (segments.length === 0) {
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  const first = segments[0];
  if (!isSupportedLocale(first)) {
    return NextResponse.redirect(new URL(`/${locale}/${segments.join('/')}`.replace(/\/+$/g, ''), req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|.*.|api).*)'],
};
