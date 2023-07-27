import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/dbconnect'
import Notebook from '@/models/Notebook'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await dbConnect()

	const { method } = req

	switch (method) {
		case 'GET':
			try {
				const notebooks = await Notebook.find({})
				res.status(200).json({ data: notebooks })
			} catch (error) {
				res.status(500).json({ error: 'Failed to retrieve notebooks.' })
			}
			break

		case 'POST':
			try {
				const { title, image_url, content, userId } = req.body
				const newNotebook = new Notebook({ title, image_url, content, userId })
				const notebook = await newNotebook.save()
				res.status(201).json({ data: notebook })
			} catch (error) {
				res.status(500).json({ error: 'Failed to create notebook.' })
			}
			break

		default:
			res.setHeader('Allow', ['GET', 'POST'])
			res.status(405).json({ error: `Method ${method} Not Allowed` })
			break
	}
}
