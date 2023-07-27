import { NextApiRequest, NextApiResponse } from 'next'
import openai from '@/lib/openai-api'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method } = req

	switch (method) {
		case 'POST':
			try {
				const { prompt } = req.body

				if (prompt.length < 10) {
					res
						.status(400)
						.json({ error: 'Please provide prompt with enough words' })
					break
				}

				const response = await openai.createImage({
					prompt,
					n: 1, //2,
					// size: '1024x1024',
					size: '512x512',
				})
				res.status(201).json(response.data)
			} catch (error: any) {
				console.error('error--', error?.response)

				res.status(500).json({ error: 'Failed to create image.' })
			}
			break

		default:
			res.setHeader('Allow', ['POST'])
			res.status(405).json({ error: `Method ${method} Not Allowed` })
			break
	}
}
