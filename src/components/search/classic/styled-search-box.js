import styled, { css } from "styled-components"

import SearchBox from "./search-box"

const open = css`
  width: 20em;
  max-width: 70vw;
  background: ${({ theme }) => theme.background};
  cursor: text;
  margin-left: -2em;
  padding-left: 2em;
`

const closed = css`
  width: 0;
  background: transparent;
  cursor: pointer;
  padding: 4px 20px;
  margin-left: -40px;
`

export default styled( SearchBox )`

  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  margin-bottom: 0;

  .SearchInput {
    outline: none;
    &.light {
      border: ${({ hasFocus }) => ( hasFocus ? "2px solid hsla(var(--dark-h), var(--dark-s), var(--dark-l), 0.7)" : "none")};
    }
    &.dark {
      border: ${({ hasFocus }) => ( hasFocus ? "2px solid hsla(var(--light-h), var(--light-s), var(--light-l), 0.7)" : "none")};
    }
    font-size: 1em;
    transition: 100ms;
    border-radius: 5px;
    color: ${({ theme }) => theme.foreground};
    ::placeholder {
      color: ${({ theme }) => theme.faded};
    }
    ${({ hasFocus }) => (hasFocus ? open : closed)}
  }

  .SearchIcon {
    width: 1em;
    margin: 0.3em;
    pointer-events: none;
    &.light {
      color: ${({ hasFocus }) => ( hasFocus ? "hsla(var(--dark-h), var(--dark-s), var(--dark-l), 0.7)" : "hsla(var(--dark-h), var(--dark-s), var(--dark-l), 0.7)")};
    }
    &.dark {
      color: ${({ hasFocus }) => ( hasFocus ? "hsla(var(--dark-h), var(--dark-s), var(--dark-l), 0.7)" : "hsla(var(--light-h), var(--light-s), var(--light-l), 0.7)")};
    }
  }
  
`