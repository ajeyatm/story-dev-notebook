/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [
			//chatgpt
			'oaidalleapiprodscus.blob.core.windows.net',
			//unsplash
			'source.unsplash.com',
			'images.unsplash.com',
			//others
			'loremflickr.com',
			'thumbs.dreamstime.com',
		],
	},
}

module.exports = nextConfig
