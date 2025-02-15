const User = require("../models/user.model");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    console.log("User registered successfully");
  } catch (err) {
    console.error("Error registering user:", err.message);
  }
};

module.exports = {
  register,
};
