const express = require("express");
const {
  register,
  login,
  logout,
  getProfile,
} = require("../controllers/user.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/:id/profile").get(isAuthenticated, getProfile);
router.route("/profile/edit").post(isAuthenticated, getProfile);

module.exports = router;
