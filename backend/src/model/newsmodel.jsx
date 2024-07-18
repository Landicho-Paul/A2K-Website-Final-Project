const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewsInformation = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
  },
  activation: {
    type: String,
    //required: true
  },
  body: {
    type: String,
  },
});

module.exports = mongoose.model("news_informations", NewsInformation);
