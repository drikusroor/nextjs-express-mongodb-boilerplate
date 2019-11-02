const mongoose = require('mongoose')
const dbUri = process.env.MONGODB_URI

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  keepAlive: 30000,
  connectTimeoutMS: 30000,
}

mongoose.Promise = global.Promise

const connection = mongoose.createConnection(dbUri, options)

connection.on('connected', () => {
  console.log('DB connection successful')
})

connection.on('error', error => {
  console.log(`DB connection erroneous ${error}`)
})

connection.on('disconnected', () => {
  console.log('DB connection disconnected')
})

module.exports = connection
