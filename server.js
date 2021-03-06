// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel
const express = require('express')
const next = require('next')
const { bugsnag } = require('./config')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const apiRouter = require('./api/router')

app.prepare().then(() => {
  const server = express()
  server.use(express.json())

  server.use(bugsnag.middleware.requestHandler)

  server.use('/api', apiRouter)

  server.use(bugsnag.middleware.errorHandler)

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
