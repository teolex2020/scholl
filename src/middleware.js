import createMiddleware from 'next-intl/middleware'
import { locales } from './navigation'

export default createMiddleware({
	locales,
	defaultLocale: 'uk',
})


export const config = {
	images: {
		domains: ['localhost'],
	},
	matcher: [
		'/',
		'/(uk|en|ru)/:path*',
		'/((?!_next|_next/public|_next/static|_next/static/media|_vercel|next|favicon.ico|public|assets|public/assets).*)',
	],
}
