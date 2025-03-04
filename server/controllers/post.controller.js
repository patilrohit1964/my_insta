const sharp = require("sharp");
const Cloudinary = require("../utils/cloudinary");
const Post = require("../models/post.model");
const User = require("../models/user.model");
const Comment = require("../models/comment.model");

const addNewPost = async (req, res) => {
  try {
    console.log("Request received:", req.body); // Check if caption is received
    console.log("File received:", req.file); // Check if image is received

    const { caption } = req.body;
    const image = req.file;
    const authorId = req.id;

    if (!image) {
      return res
        .status(400)
        .json({ message: "Image is required", success: false });
    }

    // Optimize Image
    const optimizeImage = await sharp(image.buffer)
      .resize({ width: 800, height: 800, fit: "inside" })
      .toFormat("jpg", { quality: 80 })
      .toBuffer();

    // Convert Image to Base64 for Cloudinary
    const fileUri = `data:image/jpeg;base64,${optimizeImage.toString(
      "base64"
    )}`;
    console.log("Optimized image size:", optimizeImage.length); // Debug image size

    // Upload to Cloudinary
    const cloudResponse = await Cloudinary.uploader.upload(fileUri);
    console.log("Cloudinary response:", cloudResponse); // Debug Cloudinary upload

    // Save Post in Database
    const post = await Post.create({
      caption,
      image: cloudResponse.secure_url,
      author: authorId,
    });

    // Link Post to User
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

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const authorId = req.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found", success: false });
    }
    if (post.author.toString() !== authorId) {
      return res
        .status(403)
        .json({ message: "Author not found Unauthorized", success: false });
    }
    await Post.findByIdAndDelete(postId);
    let user = await User.findById(authorId);
    user.posts = user.posts.filter((postId) => id.toString() !== postId);
    await user.save();
    // delete comments from post
    await Comment.deleteMany({ post: postId });
    return res
      .status(200)
      .json({ message: "Post deleted successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

const bookMark = async (req, res) => {
  try {
    const postId = req.params.id;
    const authorId = req.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found", success: false });
    }
    const user = await User.findById(authorId);
    if (user.bookmarks.includes(post._id)) {
      // if already exists
      await user.updateOne({ $pull: { bookmarks: post._id } });
      await user.save();
      return res.status(200).json({
        type: "unsaved",
        message: "Post removed successfully",
        success: true,
      });
    } else {
      await user.updateOne({ $addToSet: { bookmarks: post._id } });
      await user.save();
      return res.status(200).json({
        type: "saved",
        message: "Post saved successfully",
        success: true,
      });
    }
  } catch (error) {}
};

module.exports = {
  addNewPost,
  getAllPosts,
  getUserPost,
  likePost,
  dislikePost,
  addComment,
  getCommentOfPost,
  deletePost,
  bookMark,
};
