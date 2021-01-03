import styled from '@emotion/styled'
import { Box } from 'rebass'

export const Layout = styled(Box)(`
  min-width: 100vw;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #101020;
  justify-content: center;
  align-items: center;
  background: linear-gradient(-20deg, #000, #18182a);
  color: white;
`)

export default Layout
