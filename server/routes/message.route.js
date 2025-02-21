const express = require("express");

const isAuthenticated = require("../middlewares/isAuthenticated");
const upload = require("../middlewares/multer");
const {
  sendMessage,
  getMessages,
} = require("../controllers/message.controller");
const router = express.Router();

router.route("/send/:id").post(isAuthenticated, sendMessage);
router.route("/all/:id").get(isAuthenticated, getMessages);

module.exports = router;
