import axios from 'axios'

const addSubscriber = async email => {
  const data = { email }
  try {
    const res = await axios({
      method: 'post',
      url: '/api/subscribe',
      headers: { 'Content-Type': 'application/json' },
      data: {
        subject: `New Subscriber: ${email}`,
        text: `email: ${email}`,
        html: `<strong>${email}</strong>`
      }
    })
    return res
  } catch (e) {
    return e
  }
}

const api = { addSubscriber }

export default api
