const Schema = require('mongoose').Schema
const connection = require('../storage/mongodb/db')

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  salt: {
    type: String,
    required: [true, 'Salt is required.'],
  },
  activationKey: {
    type: String,
  },
  activated: {
    type: Boolean,
    default: false,
  },
  blocked: {
    type: Boolean,
    default: false,
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
