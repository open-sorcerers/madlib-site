import { Box } from 'rebass'
import styled from '@emotion/styled'
import isPropValid from '@emotion/is-prop-valid'
import { pipe, not } from 'ramda'

import RawMail from 'svg/mail.svg'
import RawLogo from 'svg/logo.svg'
import GithubLogo from 'svg/github.svg'

export const Logo = styled(RawLogo)(`
  fill: white;
  padding: 0.5rem;
  max-width: 18rem;
  position: relative;
`)

export const Header = styled.header(`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &::before {
    font-size: 0.9rem;
    color: cyan;
    content: '#-';
    margin-bottom: -1rem;
    align-self: flex-start;
  }
  &::after {
    font-size: 0.9rem;
    color: cyan;
    content: '-#';
    align-self: flex-end;
  }
`)

export const Blockquote = styled.blockquote(`
  border-left: 1px solid #41d3ff;
  padding-left: 0.5rem;
  strong {
    color: yellow;
    text-shadow: 0 0 5px rgba(255,255,0,0.5);
  }
`)

export const Triangle = styled(Box)(`
  position: absolute;
  width: 4rem;
  height: 4rem;
  border-radius: 10rem;
  bottom: 2rem;
  left: calc(50% - 2rem);
  z-index: 10;
  &::before {
    content: "|>";
    display: inline-block;
    font-size: 4rem;
    text-align: center;
  }
`)

export const SignUp = styled(Box)(`
  transition: width 1s ease-out;
  border: 4px double rgba(255,255,255,0.2);
  margin-top: 1.5rem;
  padding: 0 2rem 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 40rem;
  overflow: hidden;
`)

export const NoSpam = styled.span(`
  display: inline;
  font-size: 0.75rem;
`)

export const SignUpForm = styled('form', {
  shouldForwardProp: x =>
    isPropValid(x) && !['active', 'valid', 'status'].includes(x)
})(
  ({ active: a, valid: v, status: s }) => `
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: width 0.6s ease-out,
             height 0.6s ease-out;
  width: ${s === 'sent' ? '3rem' : '100%'};
  height: auto;
`
)

const senting = x => ['sending', 'sent'].includes(x)
const notSenting = pipe(senting, not)

export const Send = styled('button', {
  shouldForwardProp: x =>
    isPropValid(x) && !['active', 'valid', 'status'].includes(x)
})(
  ({ active: a, valid: v, status: s }) =>
    `
  font-weight: bolder;
  background-color: ${
    senting(s)
      ? '#00ffab'
      : v
      ? '#00ffab'
      : a
      ? 'cyan'
      : 'transparent'
  };
  background: ${
    senting(s)
      ? 'repeating-linear-gradient(-45deg, #00ffab, #00ffab 10px, #109f8b 10px, #109f8b 20px)'
      : v
      ? '#00ffab'
      : a
      ? 'cyan'
      : 'transparent'
  };
  color: ${a || v ? '#000000' : 'cyan'};
  border: ${s === 'sent' ? '0' : '1px'} solid ${
      v ? '#00ffab' : 'cyan'
    };
  border-radius: ${a || v ? '0' : '2px'}; 
  ${
    s === 'sent'
      ? ''
      : v
      ? 'animation: 0.6s ease-out infinite goodpulse;'
      : a
      ? 'animation: 1s ease-out infinite alternate pulse;'
      : ''
  }
  opacity: ${s === 'sent' ? '0' : '1'};
  width: ${s === 'sending' ? '100%' : s === 'sent' ? '0' : '40%'};
  font-size: 0.9rem;
  height: 2.375rem;
  padding: ${s !== 'sent' ? '0.5rem' : '0'};
  overflow: hidden;
  text-transform: uppercase;
  transition: background 0.3s ease-out,
                   color 0.3s ease-out,
                  border 0.3s ease-out,
                   width ${s === 'sent' ? '0.6s' : '0.3s'} ease-out;
  cursor: pointer;
  align-self: flex-end;
  @keyframes pulse { from {
    box-shadow: 0 0 0px cyan, 0 0 1px white;
  } to {
    box-shadow: 0 0 10px rgba(0,255,255,0.6), 0 0 20px rgba(255,255,255,0.2);
  }}
  @keyframes goodpulse{ from {
    box-shadow: 0 0 0px #00ffab, 0 0 1px white;
  } to {
    box-shadow: 0 0 10px rgba(0,255,0,0.6), 0 0 20px rgba(255,255,255,0.2);
  }}
  &:hover {
    border-radius: 2px;
    background-color: ${v ? '#00ffab' : 'cyan'};
    color: #000000;
    border-color: ${v ? '#00ffab' : 'cyan'};
    animation: 1s ease-out infinite alternate ${
      v ? 'goodpulse' : 'pulse'
    };
  }
`
)

export const EmailInput = styled('input', {
  shouldForwardProp: x =>
    isPropValid(x) && !['active', 'status'].includes(x)
})(
  ({ active: a, status: s }) => `
  box-sizing: border-box;
  margin: 0;
  min-width: 0;
  display: block;
  padding: ${senting(s) ? '0' : '0.5rem'};
  appearance: none;
  font-size: inherit;
  line-height: inherit;
  border: ${s !== 'sent' ? '1px' : '0'} solid white;
  color: inherit;
  background-color: transparent;
  height: ${s === 'sent' ? '0' : '2.375rem'};
  font-size: 1rem;  
  width: ${notSenting(s) ? '60%' : '0'};
  outline: none;
  font-family: "Fira Code", monospace;
  color: white;
  transition: background 0.3s ease-out,
                   color 0.3s ease-out,
                  border 0.3s ease-out,
                   width 0.2s ease-out,
                  height 0.2s ease-out,
                 opacity 0.3s ease-out;
  background: ${a ? 'rgba(255,255,255,0.8)' : 'transparent'};
  opacity: ${senting(s) ? '0' : '1'};
  &:focus {
    background: rgba(255,255,255,0.8);
    color: black;
    border-color: white;
  }
`
)

export const CTA = styled.p(`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 2rem;
`)

export const Footer = styled.footer(`
  width: calc(100% - 2rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  padding: 1rem;
`)

export const Github = styled(GithubLogo)(`
  fill: white;
  max-width: 2rem;
  max-height: 2rem;
`)

export const Link = styled.a(`
  svg {
    fill: white;
  }
  &:hover {
    svg {
      fill: yellow;
      stroke: white;
    }
  }
`)

export const MailIcon = styled(RawMail, {
  shouldForwardProp: x =>
    isPropValid(x) && !['active', 'valid'].includes(x)
})(
  ({ active: a, valid: v, status: s }) => `
  position: relative;
  max-width: 4rem;
  margin-right: ${v ? '0.5rem' : '0'};
  width: ${s === 'sent' ? '0' : v ? '5rem' : '0'};
  height: ${v ? 'auto' : '0'};
  transition: width 0.3s ease-out,
          translate 1.5s ease-out;
  transform: ${s === 'sent' ? 'translateX(5rem)' : 'translateX(0)'};
  fill: white;
  .back {
    z-index: 4;
    fill: transparent;
  }
  .star {
    width: 2rem;
    height: 2rem;
    transition: fill 0.3s ease-out, opacity 0.3s ease-out, transform 0.3s ease-out;
    opacity: ${a ? '0' : '1'};
    transform: ${a ? 'scale(2)' : 'scale(1)'};
    transform-origin: center;
    &.star--1 {
      fill: ${v ? 'magenta' : 'white'};
    }
    &.star--2 {
      fill: ${v ? 'yellow' : 'white'};
    }
    &.star--3 {
      fill: ${v ? 'cyan' : 'white'};
    }
  }
`
)

export const Success = styled('strong', {
  shouldForwardProp: x =>
    isPropValid(x) && !['active', 'valid', 'status'].includes(x)
})(
  ({ active: a, valid: v, status: s }) => `
    transition: opacity 0.6s ease-out,
                  width 0.6s ease-out,
              transform 0.9s ease-out;
    opacity: ${s === 'sent' ? '1' : '0'};
    width: ${s === 'sent' ? '4rem' : '0'};
    transform: ${
      s !== 'sent' ? 'translateX(-5rem)' : 'translateX(0)'
    };
        
  `
)
