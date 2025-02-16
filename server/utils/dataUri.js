const dataUriParser = require("datauri/parser");
const path = require("path");

const parser = new dataUriParser();
const getDataUrl = (file) => {
  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer).content;
};
module.exports = getDataUrl;
