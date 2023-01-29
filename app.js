const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')

const app = express()
app.use(bodyParser.json())

app.post('/contact', (req, res) => {
  const { name, surname,phone,email,company ,message,reciverEmail,projectCategory,projectBudge } = req.body
  // Use nodemailer to send email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'centirir.info@gmail.com',
      pass: 'pdtpcrpumywmbkkw',
    },
  })
  const mailOptions = {
    from: email,
    to: reciverEmail,
    subject: `New message from ${name} ${surname}, phone: ${phone}, email: ${email}, company: ${company}, projectCategory: ${projectCategory}, projectBudge: ${projectBudge}`,
    text: message,
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
      res.status(500).json({ message: 'Error sending email' })
    } else {
      console.log('Email sent: ' + info.response)
      res.json({ message: 'Email sent' })
    }
  })
})

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000')
})