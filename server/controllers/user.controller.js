const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getDataUrl = require("../utils/dataUri");
const Cloudinary = require("../utils/cloudinary");
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already exists", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res
      .status(200)
      .json({ message: "Account Registerd Successfully", success: true });
  } catch (err) {
    console.error("Error registering user:", err.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "Logged in successfully",
        success: true,
        user,
        token,
      });
  } catch (err) {
    console.error("Error logging in user:", err.message);
  }
};

const logout = async (req, res) => {
  try {
    res
      .status(200)
      .clearCookie("token", { path: "/", maxAge: 0 })
      .json({ message: "Logged out successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false, user });
    }
    res.status(200).json({ user, success: true });
  } catch (error) {
    console.log("something went wrong");
  }
};

const editProfile = async (req, res) => {
  try {
    const { bio, gender } = req.body;
    const profilePicture = req.file;
    let cloudResponce;
    if (profilePicture) {
      const fileUrl = getDataUrl(profilePicture);
      cloudResponce = await Cloudinary.uploader.upload(fileUrl);
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    if (bio) user.bio = bio;
    if (gender) user.gender = gender;
    if (profilePicture) user.profilePicture = cloudResponce.secure_url;
    await user.save();
    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log("User not found");
    return res.status(404).json({ message: "User not found", success: false });
  }
};

const getSuggestedUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false, user });
    }
    const users = await User.find({
      _id: { $ne: user._id },
      username: { $regex: new RegExp(user.username, "i") },
    });
    res.status(200).json({ users, success: true });
  } catch (error) {
    console.log("something went wrong");
  }
};
module.exports = {
  register,
  login,
  logout,
  getProfile,
};
