import nodemailer from 'nodemailer'

const user = process.env.mailjetusername || '???'
const pass = process.env.mailjetpass || '???'

const transporter = nodemailer.createTransport({
  host: 'in-v3.mailjet.com',
  port: 25,
  auth: { user, pass }
})

const mailer = ({ email }) => {
  const message = {
    from: email,
    to: `community@madlib.space`,
    subject: `Newsletter subscription for: ${email}`,
    text: email,
    replyTo: email
  }
  return new Promise((good, bad) => {
    transporter.sendMail(message, (error, info) =>
      error ? bad(error) : good(info)
    )
  })
}

const validate = ({ name }) => {
  console.log('validating', name)
  if (name == '') return false
  return true
}

export default async (req, res) => {
  console.log('subscribing...')
  if (!validate(req.body)) {
    res.status(403).send('')
    return
  }
  const mailerRes = await mailer(req.body)
  res.send(mailerRes)
}
