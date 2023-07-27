import mongoose from 'mongoose'

/* UserSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please provide a name.'],
		},
		image_url: {
			type: String,
			// required: [true, "Please provide the image Url"],
		},
		bio: {
			type: String,
			required: [true, 'Please add your bio.'],
		},
	},
	{
		// versionKey: false,
		timestamps: true,
	}
)

export default mongoose.models.User || mongoose.model('User', UserSchema)
