const Schema = require('mongoose').Schema
const connection = require('../storage/mongodb/db')

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    validate: {
      validator: value => validator.isEmail(value),
      message: "'{Value}' is not a valid email",
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  name: String,
})

UserSchema.methods.verifyPassword = async function(password) {
  try {
    return compare(password, this.password)
  } catch (err) {
    throw err
  }
}

UserSchema.index({ email: 1 })

const UserModel = connection.model('user', UserSchema)

module.exports = UserModel
