const mongoose = require('mongoose')

mongoose.connect(process.env.DB_STRING, {
  useMongoClient: true
})

mongoose.Promise = global.Promise
const db = mongoose.connection

db.on('error', console.error.bind('error en la conexion'))

module.exports = db