const dotenv = require('dotenv')
dotenv.config()
module.exports = {
  mongoDbUri: process.env.MONGODB_URI,
}
