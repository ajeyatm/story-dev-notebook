import mongoose from 'mongoose'

/* NotebookSchema will correspond to a collection in your MongoDB database. */
const NoteBookSchema = new mongoose.Schema(
	{
		title: {
			/* The title of the Notebook */
			type: String,
			required: [true, 'Please provide a title for this Notebook.'],
			// maxlength: [60, 'Name cannot be more than 60 characters'],
		},
		image_url: {
			/* The image url of the Notebook */

			type: String,
			// required: [true, "Please provide the Notebook Url"],
		},
		content: {
			/* The content of the Notebook */

			type: String,
			required: [true, 'Please specify the content of your Notebook.'],
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'Please provide the user ID for this Notebook.'],
		},
	},
	{
		// versionKey: false,
		timestamps: true,
	}
)

export default mongoose.models.NoteBook ||
	mongoose.model('NoteBook', NoteBookSchema)
