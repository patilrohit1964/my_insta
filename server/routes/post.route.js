const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const upload = require("../middlewares/multer");
const {
  addNewPost,
  getAllPosts,
  getUserPost,
  likePost,
  dislikePost,
  getCommentOfPost,
} = require("../controllers/post.controller");

const router = express.Router();

router
  .get("/addPost")
  .post(isAuthenticated, upload.single("image"), addNewPost);

router.route("/all").get(isAuthenticated, getAllPosts);
router.route("/userpost/all").get(isAuthenticated, getUserPost);
router.route("/:id/like").get(isAuthenticated, likePost);
router.route("/:id/dislike").get(isAuthenticated, dislikePost);
router.route("/:id/comment").post(isAuthenticated, getCommentOfPost);
router.route("/")
