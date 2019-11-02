const userService = require('../services/user-service')

const getList = async (req, res) => {
  const users = await userService.getList()
  res.status(200).json(users)
}

module.exports = {
  getList,
}
