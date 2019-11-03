const nodemailer = require('nodemailer')

const host = process.env.SMTP_SERVER_URI
const port = process.env.SMTP_SERVER_PORT
const auth = {
  user: process.env.SMTP_USERNAME,
  pass: process.env.SMTP_PASSWORD,
}

const transport = nodemailer.createTransport({
  host,
  port,
  auth,
  tls: {
    rejectUnauthorized: false,
  },
  secure: false,
})

const sendEmail = message => {
  return new Promise((resolve, reject) => {
    transport.sendMail(message, (reject, resolve))
  })
}

module.exports = { transport, sendEmail }
