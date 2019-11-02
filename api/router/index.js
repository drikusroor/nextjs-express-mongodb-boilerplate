const express = require('express')
const router = express.Router()
const controllers = require('../controllers/index')

const routes = ['users']

router.get('/', (req, res) => {
  res.status(200).send('Welcome to the API!')
})
routes.forEach(routeName => {
  const childRouter = express.Router()
  router.use(`/${routeName}`, childRouter)
  require(`./${routeName}`)({ router: childRouter, controllers })
})
router.get('*', function(req, res) {
  res.status(400).json({ error: 'Not a valid endpoint' })
})
module.exports = router
