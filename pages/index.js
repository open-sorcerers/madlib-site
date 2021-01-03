import Head from 'next/head'

import Home from 'components/Home'
import SignUp from 'components/SignUp'

export default () => (
  <>
    <Head>
      <title>madlib ✨</title>
    </Head>
    <Home>
      <SignUp />
    </Home>
  </>
)
