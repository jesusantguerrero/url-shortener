const mongoose = require('mongoose')

class UrlModel {
  constructor() {
    this.Model = mongoose.model('Url', new mongoose.Schema({
      original_url: String,
      shorten_url: mongoose.Schema.Types.String
    }))
  }

  addUrl(url) {
    const self = this
    return this.getOriginalUrl(url)
      .then((res) => {
        if (res){
          return res
        } else {
          return self.create(url)
        }
      })
  }

  create(url) {
    return this.Model.create({
      original_url: url
    }, ((err, newUrl) => {
      if (err)
        console.log(err)
      const shorten_url = newUrl._id.toString().slice(-6);
      return this.Model.update({
        _id: newUrl._id
      }, {
        shorten_url: shorten_url
      }, (err, data) => {
        if (err)
          console.log(err)
        return data
      })
    }))
  }

  getUrl(short) {
    return this.Model.findOne({
      shorten_url: short
    }, (err, res) => {
      if (err || !res)
        return false
      return res
    })
  }

  getOriginalUrl(originalUrl) {
    return this.Model.findOne({
      original_url: originalUrl
    }, (err, res) => {
      return (err) ? false : res 
    })
  }

  isValid(url) {
   return  /^https?:\/\/\w*\.\w{2,}/.test(url.toString())
  }
}
module.exports = new UrlModel()