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
  addComment,
  deletePost,
  bookMark,
} = require("../controllers/post.controller");

const router = express.Router();

router
  .route("/addPost")
  .post(isAuthenticated, upload.single("image"), addNewPost);

router.route("/all").get(isAuthenticated, getAllPosts);
router.route("/userpost/all").get(isAuthenticated, getUserPost);
router.route("/:id/like").get(isAuthenticated, likePost);
router.route("/:id/dislike").get(isAuthenticated, dislikePost);
router.route("/:id/comment").post(isAuthenticated, addComment);
router.route("/:id/comment/all").get(isAuthenticated, getCommentOfPost);
router.route("/delete/:post").delete(isAuthenticated, deletePost);
router.route("/:id/bookmark").post(isAuthenticated, bookMark);
module.exports = router;
