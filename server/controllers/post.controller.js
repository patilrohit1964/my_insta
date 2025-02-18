const sharp = require("sharp");
const Cloudinary = require("../utils/cloudinary");
const Post = require("../models/post.model");
const User = require("../models/user.model");
const Comment = require("../models/comment.model");
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

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "username, profilePicture" })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "author",
          select: "username, profilePicture",
        },
      });
    return res.status(200).json({
      message: "Posts fetched successfully",
      success: true,
      posts,
    });
  } catch (error) {}
};

const getUserPost = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.id })
      .sort({ createdAt: -1 })
      .populate({
        path: "author",
        select: "username, profilePicture",
      })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "author",
          select: "username, profilePicture",
        },
      });
    return res.status(200).json({
      message: "User's posts fetched successfully",
      success: true,
      posts,
    });
  } catch (error) {
    console.error("Error fetching user's posts:", error.message);
    return res.status(500).json({
      message: "An error occurred while fetching user's posts",
      success: false,
    });
  }
};

const likePost = async (req, res) => {
  try {
    const likeKarneWalaUser = req.id;
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found", success: false });
    }

    await post.updateOne({ $addToSet: { likes: likeKarneWalaUser } });
    await post.save();

    // socket it for real time notifications
    res.status(200).json({
      message: "Liked successfully",
      success: true,
    });
  } catch (error) {}
};

// when use this api in frontend then remember pass params as postId
const dislikePost = async (req, res) => {
  try {
    const likeKarneWalaUser = req.id;
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found", success: false });
    }

    await post.updateOne({ $pull: { likes: likeKarneWalaUser } });
    await post.save();

    // socket it for real time notifications
    res.status(200).json({
      message: "Liked successfully",
      success: true,
    });
  } catch (error) {}
};

const addComment = async (req, res) => {
  try {
    const commentWalaUserId = req.id;
    const postId = req.params.postId;
    const { text } = req.body;
    const post = await Post.findById(postId);
    if (!text) {
      return res
        .status(400)
        .json({ message: "Comment text is required", success: false });
    }
    const comment = await Comment.create({
      text,
      author: commentWalaUserId,
      post: postId,
    }).populate({
      path: "author",
      select: "username, profilePicture",
    });
    post.comments.push(comment._id);
    await post.save();
    return res.status(200).json({
      message: "Comment added successfully",
      success: true,
      comment,
    });
  } catch (error) {
    console.log(error);
  }
};

const getCommentOfPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.find({ post: postId })
      .sort({ createdAt: -1 })
      .populate({
        path: "author",
        select: "username, profilePicture",
      });
    if (!comments) {
      return res
        .status(404)
        .json({ message: "Comments not found for this post", success: false });
    }
    return res.status(200).json({
      message: "Comments fetched successfully",
      success: true,
      comments,
    });
  } catch (error) {}
};

