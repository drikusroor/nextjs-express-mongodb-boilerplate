module.exports = ({ router, controllers }) => {
  router.get('/', controllers.user.getList)
}
