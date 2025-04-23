const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config({ path: "./config/.env" });
const cookieParser = require("cookie-parser");
const connectDb = require("./config/db");
const morgan = require("morgan");
const path = require("path");
const { app, server } = require("./socket/socket");
const _dirname = path.resolve();

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
const PORT = process.env.PORT || 4050;

app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});
console.log(__dirname);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
