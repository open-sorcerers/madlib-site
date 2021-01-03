import mj from 'node-mailjet'
import { pipe, prop, of, ap, propOr, __ as $ } from 'ramda'

const UNKNOWN = '???'

const user = process.env.MAILJET_USER || UNKNOWN
const pass = process.env.MAILJET_PASS || UNKNOWN

const orUnknown = propOr(UNKNOWN)

const getSubject = orUnknown('subject')
const getTextPart = orUnknown('text')
const getHTML = orUnknown('html')
const getCustomId = propOr(undefined, 'customID')

export default (req, res) => {
  const mailjet = mj.connect(user, pass)
  const [Subject, TextPart, HTMLPart, CustomID] = pipe(
    prop('body'),
    of,
    ap([getSubject, getTextPart, getHTML, getCustomId])
  )(req)
  return mailjet
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
    .catch(e => res.status(500).send(e.toString()))
    .then(x => res.status(200).send(''))
}
