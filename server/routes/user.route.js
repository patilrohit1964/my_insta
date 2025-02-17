const express = require("express");
const {
  register,
  login,
  logout,
  getProfile,
  editProfile,
  getSuggestedUser,
  followOrUnfollow,
} = require("../controllers/user.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");
const upload = require("../middlewares/multer");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/:id/profile").get(isAuthenticated, getProfile);
router
  .route("/profile/edit")
  .put(isAuthenticated, editProfile);

router.route("/suggested").get(isAuthenticated, getSuggestedUser);
router.route("/followorunfollow/:id").post(isAuthenticated, followOrUnfollow);

module.exports = router;
