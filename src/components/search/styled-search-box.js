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
    border: ${({ hasFocus }) => (hasFocus ? "2px solid #0C8DA0" : "none")};
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
    color: ${({ hasFocus }) => (hasFocus ? "black" : "#ADA1b6")};
    pointer-events: none;
  }
  

`