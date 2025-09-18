import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a post"));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Please provide all required fields"));
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "-");

  let imageUrl = "";

  if(req.file){
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "blog_images",
    })
    imageUrl = result.secure_url;
    fs.unlinkSync(req.file.path)
  }
    const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
    image: imageUrl,
  });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};
