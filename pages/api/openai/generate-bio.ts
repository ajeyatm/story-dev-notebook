import { NextApiRequest, NextApiResponse } from 'next'
import openai from '@/lib/openai-api'

function generatePrompt(
	name: string,
	about: string,
	hobbies: string,
	interests?: string
) {
	let _prompt = `${about}\n`

	_prompt += `Name: ${name}\n`
	_prompt += `Hobbies: ${hobbies}\n`
	_prompt += `Interests: ${interests}`

	_prompt += `Create me a bio using above information in third person view.\n`


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
				const { name, about, hobbies, interests, temperature, maxTokens } =
					req.body

				if (
					name.length === 0 ||
					about.length === 0 ||
					hobbies.length === 0 ||
					interests.length === 0
				) {
					res.status(400).json({ error: 'Invalid input' })
					break
				}

				let _temperature = parseInt(temperature ?? '0')

				const completion = await openai.createChatCompletion({
					model: 'gpt-3.5-turbo',
					messages: [
						{ role: 'system', content: 'You are a helpful assistant.' },
						{
							role: 'user',
							content: generatePrompt(name, about, hobbies, interests),
						},
					],
					n: 1,
					temperature: _temperature || 1,
					max_tokens: 200,
				})

				console.log(completion.data.choices)

				res.status(201).json({ data: completion.data.choices[0].message })
			} catch (error: any) {
				console.error('error--', error?.response)
				res.status(500).json({ error: 'Failed to create bio.' })
			}
			break

		default:
			res.setHeader('Allow', ['POST'])
			res.status(405).json({ error: `Method ${method} Not Allowed` })
			break
	}
}
