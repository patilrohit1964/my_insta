const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:5173"] 
}));
app.use(express.urlencoded({ extended: true }));

const PORT = 4050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
