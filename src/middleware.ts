import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Global Security & Routing Middleware
 * 1. Separate framing policy for Studio Preview and Production.
 * 2. Custom Domain (White-label) detection logic.
 */
export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = (request.headers.get('host') || '')
    .toLowerCase()
    .split(':')[0];
  
  // PRIMARY DOMAIN CONFIG
  const mainDomains = [
    'linkqr.in',
    'www.linkqr.in',
    'localhost',
  ];

  const isCustomHostname =
    !mainDomains.includes(hostname) &&
    !hostname.endsWith('.cloudworkstations.dev') &&
    !hostname.endsWith('.run.app');

  const response = NextResponse.next();

  // CSP FOR STUDIO PREVIEW AND PRODUCTION
  // Let Google AI Studio manage framing for its temporary Preview host.
  const isStudioPreviewHost = hostname.endsWith('.run.app');
    
  // Only set CSP if NOT in Preview mode
  if (!isStudioPreviewHost) {
    const isPrimaryDomain =
      hostname === 'linkqr.in' ||
      hostname === 'www.linkqr.in';

    const frameAncestors = isPrimaryDomain
      ? "'self' https://linkqr.in https://www.linkqr.in"
      : "'self'";

    response.headers.set(
      'Content-Security-Policy',
      `frame-ancestors ${frameAncestors}`
    );
  }
  // If in Preview, we skip setting Content-Security-Policy header entirely
  // allowing platform defaults to take over.


  // Security headers
  // Do not re-add X-Frame-Options: DENY; it breaks Studio Preview.
  response.headers.delete('X-Frame-Options');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set(
    'Referrer-Policy',
    'strict-origin-when-cross-origin'
  );

  // Custom Domain Signal Header
  if (isCustomHostname) {
    response.headers.set('x-custom-hostname', hostname);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
