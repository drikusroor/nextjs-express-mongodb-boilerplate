const { UserModel } = require('../models')
const { crypto, email: emailHelper } = require('../helpers')

const getList = async () => {
  const users = await UserModel.find({})
  return users
}

const createUser = async ({ email, password }) => {
  const { hashedPassword, salt } = crypto.saltHashPassword(password)
  const activationKey = crypto.getRandomString(16)
  const user = new UserModel({
    email,
    password: hashedPassword,
    salt,
    activationKey,
  })
  const created = await UserModel.create(user)
  const emailInfo = await emailHelper.sendEmail({
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: 'New user created at website example.com',
    text: `A new user has been created at example.com. If this was not you, please ignore this e-mail. \n\n To activate this account: ${activationKey}`,
  })
}

const activateUser = async ({ email, activationKey }) => {
  const user = await UserModel.findOne({ email })
  if (!user) throw Error('User not found.')
  if (user.activationKey === activationKey) {
    user.activated = true
    await UserModel.updateOne({ _id: user._id }, user)
  } else {
    throw new Error('Activation key incorrect.')
  }
}

module.exports = {
  getList,
  createUser,
  activateUser,
}
