const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BoardMember = new Schema({
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    
  },
  image: {
    type: String,

  },




})

module.exports = mongoose.model('board_member', BoardMember)