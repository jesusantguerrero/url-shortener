const mongoose = require('mongoose')

const Url = mongoose.model('Url',new mongoose.Schema({
  original_url: String,
  shorten_url: mongoose.Schema.Types.String
}))

module.exports = Url