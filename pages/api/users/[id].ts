import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/dbconnect'
import User from '@/models/User'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await dbConnect()

	const {
		query: { id },
		method,
	} = req

	switch (method) {
		case 'GET':
			try {
				const user = await User.findById(id)
				if (!user) {
					return res.status(404).json({ error: 'User not found.' })
				}
				res.status(200).json({ data: user })
			} catch (error) {
				res.status(500).json({ error: 'Failed to retrieve user.' })
			}
			break

		case 'PUT':
			try {
				const { name, image_url, bio } = req.body
				const updatedUser = await User.findByIdAndUpdate(
					id,
					{ name, image_url, bio },
					{ new: true }
				)
				if (!updatedUser) {
					return res.status(404).json({ error: 'User not found.' })
				}
				res.status(200).json({ data: updatedUser })
			} catch (error) {
				res.status(500).json({ error: 'Failed to update user.' })
			}
			break

		case 'DELETE':
			try {
				const deletedUser = await User.findByIdAndDelete(id)
				if (!deletedUser) {
					return res.status(404).json({ error: 'User not found.' })
				}
				res.status(200).json({ message: 'User deleted successfully.' })
			} catch (error) {
				res.status(500).json({ error: 'Failed to delete user.' })
			}
			break

		default:
			res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
			res.status(405).json({ error: `Method ${method} Not Allowed` })
			break
	}
}
