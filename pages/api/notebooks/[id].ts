import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/dbconnect'
import Notebook from '@/models/Notebook'
import Image from '@/models/Image'

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
				const notebook = await Notebook.findById(id)
				.populate('imageId', 'data contentType')
				if (!notebook) {
					return res.status(404).json({ error: 'Notebook not found.' })
				}
				res.status(200).json({ data: notebook })
			} catch (error) {
				res.status(500).json({ error: 'Failed to retrieve notebook.' })
			}
			break

		case 'PUT':
			try {
				const { title, image_url, content } = req.body
				const updatedNotebook = await Notebook.findByIdAndUpdate(
					id,
					{ title, image_url, content },
					{ new: true }
				)
				if (!updatedNotebook) {
					return res.status(404).json({ error: 'Notebook not found.' })
				}
				res.status(200).json({ data: updatedNotebook })
			} catch (error) {
				res.status(500).json({ error: 'Failed to update notebook.' })
			}
			break

		case 'DELETE':
			try {
				const deletedNotebook = await Notebook.findByIdAndDelete(id)
				if (!deletedNotebook) {
					return res.status(404).json({ error: 'Notebook not found.' })
				}
				if(deletedNotebook){
					await Image.findByIdAndDelete(deletedNotebook.imageId)
				}
				res.status(200).json({data:deletedNotebook, message: 'Notebook deleted successfully.' })
			} catch (error) {
				res.status(500).json({ error: 'Failed to delete notebook.' })
			}
			break

		default:
			res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
			res.status(405).json({ error: `Method ${method} Not Allowed` })
			break
	}
}
