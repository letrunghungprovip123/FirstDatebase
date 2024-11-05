import express from "express";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config;

//cấu hình cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//cấu hình multer với cloudinary

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "avatar",
    format: async (req, file) => {
      const validFormats = ["jpeg", "png", "gif", "webp", "jpg"];
      // lấy định dạng file
      const fileFormat = file.mimetype.split("/")[1];

      //kiểm tra định dạng file có trong list hợp lệ hay không
      if (validFormats.includes(fileFormat)) {
        return fileFormat;
      }
      return "png"; // return default định dạng file ảnh
    },
    public_id: (req, file) => {
      const newName = new Date() + "_" + file.originalname;
    },
  },
});

export const uploadCloud = multer({ storage });
