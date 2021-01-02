import { useState, useEffect } from 'react'
import blem from 'blem'
import { pipe, pathOr } from 'ramda'
import {
  Success,
  MailIcon,
  Link,
  Footer,
  Github,
  CTA,
  SignUpForm,
  Send,
  NoSpam,
  SignUp,
  EmailInput,
  Header,
  Page,
  Logo,
  Blockquote
} from './App.styled'

// import api from './api'

const App = ({ autofetch = true }) => {
  const [$email, setEmailRaw] = useState('')
  const [$valid, setValid] = useState(false)
  const [$attempt, setAttempt] = useState(0)
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
    setEmailRaw('')
    setStatus('sending')
    console.log('submittto')
    setTimeout(() => {
      setStatus('sent')
    }, 2000)
  }
  return (
    <Page onKeyDown={handleEnter}>
      <Header>
        <Logo />
        <Blockquote>
          A compile-to-JS language designed to make writing code a{' '}
          <strong>delight</strong>
        </Blockquote>
      </Header>
      <SignUp>
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
      </SignUp>
      <Footer>
        <Link href="//github.com/open-sorcerers/madlib">
          <Github />
        </Link>
      </Footer>
    </Page>
  )
}

export default App
