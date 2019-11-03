const bugsnag = require('@bugsnag/js')
const bugsnagExpress = require('@bugsnag/plugin-express')
const bugsnagClient = bugsnag(process.env.BUGSNAG_API_KEY)
bugsnagClient.use(bugsnagExpress)
const middleware = bugsnagClient.getPlugin('express')
module.exports = { bugsnagClient, middleware }
