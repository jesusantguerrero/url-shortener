const mongoose = require('mongoose')
const stringConn = 'mongodb://freesgen:samielfuerte@ds135966.mlab.com:35966/learnyoumongo'

mongoose.connect(stringConn, {
  useMongoClient: true
})

mongoose.Promise = global.Promise
const db = mongoose.connection

db.on('error', console.error.bind('error en la conexion'))

module.exports = db