import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});

export const uploadMedia = async (file) => {
  try {
    const uploadedResponse = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });

    return uploadedResponse;
  } catch (error) {
    console.error(error);
  }
};

export const deleteMedia = async (puclibId) => {
  try {
    await cloudinary.uploader.destroy(puclibId);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteVideo = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
  } catch (error) {
    console.log(error);
  }
};
