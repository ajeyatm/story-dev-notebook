export interface INotebook {
	_id: string
	title: string
	image_url?: string
	content: string
	userId: string
	createdAt: string
	updatedAt: string
	imageId:{
		data: Buffer,
		contentType: string
	}
}

export interface ITextCompletion {
	context?: string
	prompt: string
}
export interface IImageCompletion {
	prompt: string
}
