const userService = require('../services/user-service')

const getList = async (req, res) => {
  const users = await userService.getList()
  res.status(200).json(users)
}

const createUser = async (req, res) => {
  const { email, password, passwordRepeat } = await req.body
  if (!email || !password || !passwordRepeat)
    res.status(400).json('All fields should be submitted.')
  if (password !== passwordRepeat)
    res.status(400).json('Passwords are not equal.')
  try {
    userService.createUser({ email, password })
    res.status(200).json('User created.')
  } catch (error) {
    res.status(500).json('Something went wrong while creating new user.')
  }
}

const activateUser = async (req, res) => {
  const { email, activationKey } = req.body
  if (!email || !activationKey) {
    res.status(400).json('All fields should be submitted.')
  } else {
    try {
      await userService.activateUser({ email, activationKey })
      res.status(200).json('User activated.')
    } catch (error) {
      res.status(500).json('Something went wrong activating the user.')
    }
  }
}

module.exports = {
  getList,
  createUser,
  activateUser,
}
