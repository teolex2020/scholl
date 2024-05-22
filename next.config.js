const withNextIntl = require('next-intl/plugin')()

/** @type {import('next').NextConfig} */

const nextConfig = withNextIntl({
	reactStrictMode: true,
	// productionBrowserSourceMaps: false,

	// see https://nextjs.org/docs/api-reference/next.config.js/headers
	async headers() {
		return [
			{
				source: '/chat',
				headers: [
					{
						key: 'Cross-Origin-Opener-Policy',
						value: 'same-origin',
					},
					{
						key: 'Cross-Origin-Embedder-Policy',
						value: 'require-corp',
					},
				],
			},
			{
				source: '/_next/static/:slug*',
				headers: [
					{
						key: 'Cross-Origin-Opener-Policy',
						value: 'same-origin',
					},
					{
						key: 'Cross-Origin-Embedder-Policy',
						value: 'require-corp',
					},
				],
			},
		]
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'firebasestorage.googleapis.com',
				pathname: '**',
			},
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
				pathname: '**',
			},
		],
	},
})

module.exports = nextConfig
