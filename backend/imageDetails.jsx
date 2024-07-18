// const mongoose = require("mongoose");

// const ImageDetailsScehma = new mongoose.Schema(
//   {
//     image: String,
//   },
//   {
//     collection: "ImageDetails",
//   }
// );

// mongoose.model("ImageDetails", ImageDetailsScehma);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema(
  {
    image: String,
  },
  {
    collection: "ImageDetails",
  }
);

module.exports = mongoose.model("ImageDetails", AdminSchema);
