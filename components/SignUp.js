import Head from 'next/head'

import { useState } from 'react'
import { pipe, pathOr } from 'ramda'

import Layout from 'components/Layout'
import {
  Main,
  Success,
  MailIcon,
  Link,
  Footer,
  Github,
  CTA,
  SignUpForm,
  Send,
  NoSpam,
  SignUp as SignUpWrapper,
  EmailInput,
  Header,
  Page,
  Logo
} from 'components/Main'
import api from 'server/mail'

const SignUp = () => {
  const [$email, setEmailRaw] = useState('')
  const [$valid, setValid] = useState(false)
  // const [$attempt, setAttempt] = useState(0)
  const [$status, setStatus] = useState('loaded')
  const setEmail = pipe(pathOr($email, ['target', 'value']), raw => {
    const at = raw.indexOf('@')
    const dot = raw.lastIndexOf('.')
    setValid(at > -1 && dot + 1 > at && raw.length - 2 > dot)
    setEmailRaw(raw)
  })
  const handleEnter = e => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }
  const handleSubmit = e => {
    e.preventDefault()
    setStatus('sending')
    api.addSubscriber($email).then(res => {
      if (res.status < 300) {
        setStatus('sent')
        setEmailRaw('')
      } else {
        setStatus('error')
      }
    })
  }
  return (
    <SignUpWrapper>
      <CTA>
        Want to hear more? Sign up for the newsletter!
        <NoSpam>No spam, we promise.</NoSpam>
      </CTA>
      <SignUpForm status={$status}>
        <Success status={$status}>Sent!</Success>
        <MailIcon
          active={!!$email.length}
          valid={$valid}
          status={$status}
        />
        <EmailInput
          name="email"
          placeholder="Your Email"
          defaultValue={$email}
          onChange={setEmail}
          status={$status}
          type="text"
        />
        <Send
          active={!!$email.length}
          valid={$valid}
          status={$status}
          type="button"
          onClick={handleSubmit}
        >
          {['sending', 'sent'].includes($status)
            ? 'Sending…'
            : 'Sign Up'}
        </Send>
      </SignUpForm>
    </SignUpWrapper>
  )
}

export default SignUp
