const axios = require('axios');

// Function to fetch image data and convert to buffer
export async function getImageBufferFromURL(imageURL : URL):Promise<Buffer> {
  try {
    const response = await axios.get(imageURL, {
      responseType: 'arraybuffer', // This ensures that the response data is treated as binary data
    });

    // Convert the response data (Buffer) to a buffer
    const imageBuffer = Buffer.from(response.data, 'binary');
    return imageBuffer;
  } catch (error) {
    console.error('Error fetching image:', error);
    throw error;
  }
}

export const getImageDataURL = (imageData: Buffer | null): string | null => {
	if (imageData) {
	  const base64Data: string = Buffer.from(imageData).toString('base64');
	  
	  return `data:image/jpeg;base64,${base64Data}`;
	}
	return null
  };
