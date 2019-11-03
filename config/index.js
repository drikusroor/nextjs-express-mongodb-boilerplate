const dotenv = require('dotenv')
dotenv.config()

const bugsnag = require('./bugsnag')

module.exports = {
  bugsnag,
  env: {
    mongoDbUri: process.env.MONGODB_URI,
  },
}
