import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Global Security & Routing Middleware
 * 1. Frame ancestors for Studio/Production.
 * 2. Custom Domain (White-label) detection logic.
 */
export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';
  
  // PRIMARY DOMAIN CONFIG
  const mainDomains = ['linkqr.in', 'www.linkqr.in', 'localhost:3000', 'localhost:9005'];
  const isCustomHostname = !mainDomains.some(d => hostname.includes(d)) && !hostname.endsWith('.cloudworkstations.dev');

  const response = NextResponse.next();

  // CSP for Framing
  const frameAncestors = [
    "'self'",
    "https://linkqr.in",
    "https://www.linkqr.in",
    "https://studio.firebase.google.com",
    "https://*.firebase.google.com",
    "https://*.cloudworkstations.dev",
    "https://*.firebaseapp.com",
    "https://*.web.app",
    "https://*.firebase-preview.app",
    "https://*.aistudio.google.com",
    "https://*.googleusercontent.com"
  ].join(' ');

  // response.headers.set('Content-Security-Policy', `frame-ancestors ${frameAncestors}`);
  response.headers.delete('X-Frame-Options');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Custom Domain Signal Header
  // If request is from a custom domain, we tag it for the app to resolve
  if (isCustomHostname) {
    response.headers.set('x-custom-hostname', hostname);
    
    // Redirect root of custom domain to a branded page if needed
    // if (url.pathname === '/') {
    //   return NextResponse.rewrite(new URL(`/s/branded-home`, request.url));
    // }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
