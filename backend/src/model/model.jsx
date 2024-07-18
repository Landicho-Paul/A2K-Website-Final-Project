const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdminSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  superadmin: {
    type: String,
    //required: true
  },
  newsadmin: {
    type: String,
    //required: true
  },
  specializedadmin: {
    type: String,
    //required: true
  },
  coverphotoadmin: {
    type: String,
    //required: true
  },
  informationadmin: {
    type: String,
    //required: true
  },

})

module.exports = mongoose.model('admin_accounts', AdminSchema)