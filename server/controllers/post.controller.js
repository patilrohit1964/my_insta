const sharp = require("sharp");

const addNewPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const image = req.body;
    if (!image) {
      return res
        .status(400)
        .json({ message: "Image is required", success: false });
    }
    const optimizeImage = await sharp(image.buffer)
      .resize({
        width: 800,
        height: 800,
        fit: "inside",
      })
      .toFormat("jpg", { quality: 80 })
      .toBuffer();

    const fileUri = `data:jpeg/;base64,${optimizeImage.toString("base64")}`;
  } catch (error) {
    console.error("Error adding new post:", error.message);
    return res.status(500).json({
      message: "An error occurred while adding a new post",
      success: false,
    });
  }
};
