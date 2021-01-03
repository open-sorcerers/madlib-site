import axios from 'axios'

const addSubscriber = async email => {
  const data = { email }
  try {
    const res = await axios({
      method: 'post',
      url: '/api/subscribe',
      headers: { 'Content-Type': 'application/json' },
      data: { email }
    })
    return res
  } catch (e) {
    return e
  }
}

const api = { addSubscriber }

export default api
