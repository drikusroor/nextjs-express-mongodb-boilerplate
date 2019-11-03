module.exports = ({ router, controllers }) => {
  router.get('/', controllers.user.getList)
  router.post('/create', controllers.user.createUser)
  router.post('/activate', controllers.user.activateUser)
}
