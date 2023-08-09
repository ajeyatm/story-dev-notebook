import mongoose from 'mongoose'

/* ImageSchema will correspond to a collection in your MongoDB database. */
const ImageSchema = new mongoose.Schema(
	{
        // Store the image data as a Buffer
        data:  {
			type: Buffer,
			required: [true, 'Image data is required.'],
		}, 
        contentType: {
			type: String,
			required: [true, 'Image content-type is required.'],
		},
        type: {
			type: String,
            default: 'notebook',
		}
	},
	{
		// versionKey: false,
		timestamps: true,
	}
)

export default mongoose.models.Image || mongoose.model('Image', ImageSchema)
