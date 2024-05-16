import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dplvfkrwb",
  api_key: "233595997339115",
  api_secret: "5wVUzNxw9o5lzXBNasW7U9m2Fdk",
});

export const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "posts",
  });
};

export const deleteImage = async (id) => {
  return await cloudinary.uploader.destroy(id);
};
