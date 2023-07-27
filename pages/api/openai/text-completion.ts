import { NextApiRequest, NextApiResponse } from 'next'
import openai from '@/lib/openai-api'

function generatePrompt(prompt: string, context?: string) {
	let _prompt = ``

	if (context) {
		_prompt += `${context}.\n`
		// _prompt += `Context: ${context}.\n`
	}
	_prompt += `Topic: ${prompt}\n`

	_prompt += `Content format should follow the following Exaple:\n Title: "Sample Title".\n Content: Sample Content`
	console.log(_prompt)

	return _prompt
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method } = req

	switch (method) {
		case 'POST':
			try {
				const { context, prompt, temperature, maxTokens } = req.body

				if (prompt.length < 10) {
					res
						.status(400)
						.json({ error: 'Please provide prompt with enough words' })
					break
				}

				let _temperature = parseInt(temperature ?? '0')
				let _maxTokens = parseInt(maxTokens ?? '0')

				const completion = await openai.createCompletion({
					model: 'text-davinci-003',
					prompt: generatePrompt(prompt, context),
					temperature: _temperature || 0.6,
					max_tokens: _maxTokens > 500 ? 500 : _maxTokens,
				})

				console.log(completion.data.choices)

				res.status(201).json({ data: completion.data.choices[0].text })
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
