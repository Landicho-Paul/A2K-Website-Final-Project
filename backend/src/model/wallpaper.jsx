const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Wallpaper = new Schema({
  text: {
    type: String,
    
  },
  image: {
    type: String,
  },
  title: {
    type: String,
  },


});

module.exports = mongoose.model("wallpaper", Wallpaper);
