import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbconnect'
import User from '../../../models/User'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await dbConnect()

	const { method } = req

	switch (method) {
		case 'GET':
			try {
				const users = await User.find({})
				res.status(200).json({ data: users })
			} catch (error) {
				res.status(500).json({ error: 'Failed to retrieve users.' })
			}
			break

		case 'POST':
			try {
				const { name, image_url, bio } = req.body
				const newUser = new User({ name, image_url, bio })
				const user = await newUser.save()
				res.status(201).json({ data: user })
			} catch (error) {
				res.status(500).json({ error: 'Failed to create user.' })
			}
			break

		default:
			res.setHeader('Allow', ['GET', 'POST'])
			res.status(405).json({ error: `Method ${method} Not Allowed` })
			break
	}
}
