/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [
			'oaidalleapiprodscus.blob.core.windows.net',
			'source.unsplash.com',
			'loremflickr.com',
			'thumbs.dreamstime.com'
		],
	},
}

module.exports = nextConfig
