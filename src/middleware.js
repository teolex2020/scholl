import createMiddleware from 'next-intl/middleware'
import { locales } from './navigation'

export default createMiddleware({
	locales,
	defaultLocale: 'uk',
})

export const config = {
	matcher: [
		// Enable a redirect to a matching locale at the root
		'/',

		// Set a cookie to remember the previous locale for
		// all requests that have a locale prefix
		'/(uk|en|ru)/:path*',

		// Enable redirects that add missing locales
		// (e.g. `/pathnames` -> `/en/pathnames`)
		'/((?!_next|_next/image|images|_vercel|favicon.ico|public|assets|public/assets).*)',
	],
}
