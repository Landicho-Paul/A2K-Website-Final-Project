const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Specialize = new Schema({
  image: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },


})

module.exports = mongoose.model('Specialize', Specialize)