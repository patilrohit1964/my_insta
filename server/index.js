const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectDb = require("./config/db");
const morgan = require("morgan");
const { app, server } = require("./socket/socket");
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
connectDb();
const userRouter = require("./routes/user.route");
const postRoute = require("./routes/post.route");
const messageRoute = require("./routes/message.route");
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);
const PORT = 4050;
server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
