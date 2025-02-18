const sharp = require("sharp");
const Cloudinary = require("../utils/cloudinary");
const Post = require("../models/post.model");
const User = require("../models/user.model");
const addNewPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const image = req.file;
    const authorId = req.id;
    if (!image) {
      return res
        .status(400)
        .json({ message: "Image is required", success: false });
    }
    const optimizeImage = await sharp(image.buffer)
      .resize({
        width: 800,
        height: 800,
        fit: "inside",
      })
      .toFormat("jpg", { quality: 80 })
      .toBuffer();

    const fileUri = `data:jpeg/;base64,${optimizeImage.toString("base64")}`;
    const cloudResponce = await Cloudinary.uploader.upload(fileUri);
    const post = await Post.create({
      caption,
      image: cloudResponce.secure_url,
      author: authorId,
    });
    const user = await User.findById(authorId);
    if (user) {
      user.posts.push(post._id);
      await user.save();
    }
    await post.populate({ path: "author", select: "-password" });
    return res.status(200).json({
      message: "Post added successfully",
      success: true,
      post,
    });
  } catch (error) {
    console.error("Error adding new post:", error.message);
    return res.status(500).json({
      message: "An error occurred while adding a new post",
      success: false,
    });
  }
};
