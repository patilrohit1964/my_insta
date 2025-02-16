const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = await req.cookies();
    if (!token) {
      return res
        .status(401)
        .json({ message: "You are not authenticated", success: false });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid Token", success: false });
    }
    req.user = decoded;
  } catch (error) {}
};
