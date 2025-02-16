const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectDb = require("./config/db");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);
app.use(express.urlencoded({ extended: true }));
connectDb();
const userRouter = require("./routes/user.route");
app.use("/api/v1/user", userRouter);
const PORT = 4050;
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
