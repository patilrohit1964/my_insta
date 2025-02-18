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
    const user = await User.findById(req.params.id).select("-password");
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
      try {
        cloudResponce = await Cloudinary.uploader.upload(fileUrl);
      } catch (uploadError) {
        console.error("Cloudinary Upload Error:", uploadError);
        return res.status(500).json({
          message: "Failed to upload profile picture",
          success: false,
        });
      }
    }

    const user = await User.findById(req.id).select("-password");

    if (!user) {
      return res.status(404).json({
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
    console.error("Error updating profile:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

const getSuggestedUser = async (req, res) => {
  try {
    const suggestedUser = await User.find({
      _id: { $ne: req.id },
    }).select("-password");
    if (!suggestedUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        users: suggestedUser,
      });
    }
    res.status(200).json({ suggestedUser, success: true });
  } catch (error) {
    console.log("something went wrong");
  }
};

const followOrUnfollow = async (req, res) => {
  try {
    const followKarneWala = req.id;
    const jiskoFollowKarenge = req.params.id;
    if (followKarneWala == jiskoFollowKarenge) {
      return res.status(400).json({
        message: "Cannot follow yourself",
        success: false,
      });
    }
    const user = await User.findById(followKarneWala);
    const targetUser = await User.findById(jiskoFollowKarenge);
    if (!user || !targetUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    const isFollowing = user.following.includes(jiskoFollowKarenge);
    if (isFollowing) {
      //unfollow logic
      await Promise.all([
        User.updateOne(
          { _id: followKarneWala },
          { $pull: { following: jiskoFollowKarenge } }
        ),
        User.updateOne(
          { _id: jiskoFollowKarenge },
          { $pull: { followers: followKarneWala } }
        ),
      ]);
      return res.status(200).json({
        message: "Unfollowed successfully",
        success: true,
      });
    } else {
      //follow logic
      await Promise.all([
        User.updateOne(
          { _id: followKarneWala },
          { $push: { following: jiskoFollowKarenge } }
        ),
        User.updateOne(
          { _id: jiskoFollowKarenge },
          { $push: { followers: followKarneWala } }
        ),
      ]);
      return res.status(200).json({
        message: "Followed successfully",
        success: true,
      });
    }
  } catch (error) {
    console.log("something went wrong");
    return res
      .status(500)
      .json({ message: "Something went wrong", success: false });
  }
};
module.exports = {
  register,
  login,
  logout,
  getProfile,
  getSuggestedUser,
  followOrUnfollow,
  editProfile,
};
