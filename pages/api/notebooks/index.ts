import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbconnect";
import { getImageBufferFromURL } from "@/lib/image-helpers";
import Notebook from "@/models/Notebook";
import Image from "@/models/Image";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const notebooks = await Notebook.find({})
          .sort({ updatedAt: -1 })
          .populate("imageId", "data contentType");
        if (!notebooks) {
          return res
            .status(500)
            .json({ error: "Failed to retrieve notebooks." });
        }
        return res.status(200).json({ data: notebooks });
      } catch (error) {
        return res.status(500).json({ error: "Failed to retrieve notebooks." });
      }
      break;

    case "POST":
      try {
        const { title, image_url, content, userId } = req.body;
        let imageBuffer = null;
        try {
          imageBuffer = await getImageBufferFromURL(image_url);
        } catch (error) {
          res.status(500).json({ error: "Failed to create Image Buffer." });
          return;
        }

        // Create a new instance of your Image model
        const newImage = new Image({
          data: imageBuffer,
          contentType: "image/jpeg", // Set the appropriate content type
        });

        // Save the image to MongoDB
        const image = await newImage.save();
        if (!image) {
          res.status(500).json({ error: "Failed to store Image." });
          return;
        }

        const newNotebook = new Notebook({
          title,
          image_url,
          content,
          userId: userId || "64c290e572c6759614dfe861",
          imageId: image._id,
        });
        const notebook = await newNotebook.save();
        res.status(201).json({ data: notebook });
      } catch (error) {
        console.log({ error });

        res.status(500).json({ error: "Failed to create notebook." });
        return;
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).json({ error: `Method ${method} Not Allowed` });
      break;
  }
}
