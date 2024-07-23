

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
