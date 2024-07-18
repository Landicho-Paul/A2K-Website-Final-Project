const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CompanyInformation = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  hotline: {
    type: String,
    required: true
  },
  viber: {
    type: String,
    required: true
  },
  whatsapp: {
    type: String,
    //required: true
  },
  location: {
    type: String,
    //required: true
  },
  bussinesshour: {
    type: String,
    //required: true
  },


})

module.exports = mongoose.model('company_information', CompanyInformation)