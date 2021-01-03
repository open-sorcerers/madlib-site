import mailjet from 'node-mailjet'
import { pipe, prop, of, ap, propOr, __ as $ } from 'ramda'

const UNKNOWN = '???'

const user = process.env.mailjetusername || UNKNOWN
const pass = process.env.mailjetpass || UNKNOWN

const orUnknown = propOr(UNKNOWN)

const getSubject = orUnknown('subject')
const getTextPart = orUnknown('text')
const getHTML = orUnknown('html')
const getCustomIdOr = propOr(undefined, 'customID')

export default async (req, res) => {
  const { body } = req
  mailjet.connect(user, pass)
  const [Subject, TextPart, HTMLPart, CustomID] = pipe(
    prop('body'),
    of,
    ap([getSubject, getTextPart, getHTML, getCustomID])
  )(body)
  try {
    const mailerRes = await mailjet
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: 'community@madlib.space',
              Name: 'Brekk'
            },
            To: [
              {
                Email: 'community@madlib.space',
                Name: 'Brekk'
              }
            ],
            Subject,
            TextPart,
            HTMLPart,
            CustomID
          }
        ]
      })
    res.status(200).send(mailerRes.body)
  } catch (e) {
    res.status(403).send(e.toString())
  }
}
