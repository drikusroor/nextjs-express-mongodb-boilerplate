const { UserModel } = require('../models')

const getList = async () => {
  const users = await UserModel.find({})
  return users
}

module.exports = {
  getList,
}
