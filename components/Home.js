import { useState } from 'react'
import { pipe, pathOr } from 'ramda'
import { Header, Logo, Blockquote, Footer, Github } from 'styles/Home'
import Link from 'components/Link'

const Home = ({ children }) => (
  <>
    <Header>
      <Logo />
      <Blockquote>
        A compile-to-JS language designed to make writing code a{' '}
        <strong>delight</strong>
      </Blockquote>
    </Header>
    {children}
    <Footer>
      <Link href="//github.com/open-sorcerers/madlib">
        <Github />
      </Link>
    </Footer>
  </>
)

export default Home
