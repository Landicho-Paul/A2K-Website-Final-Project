const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Transformative = new Schema({
  title: {
    type: String,
    required: true
  },
  secondarytitle: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  validation: {
    type: String,
    //required: true
  },



})

module.exports = mongoose.model('transformative_services', Transformative)