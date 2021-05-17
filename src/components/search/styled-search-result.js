import styled, { css } from "styled-components"
import SearchResult from "./search-result"
import { device } from '../../../data/mediaQueries'

const Popover = css`
  max-height: 80vh;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  z-index: 2;
  right: 0;
  top: 100%;
  margin-top: 0.5em;
  box-shadow: 0 0 5px 0;
  padding: 0;
  border-radius: 5px;
  background: ${({ theme }) => theme.background};
`

export default styled(SearchResult)`
  display: ${props => (props.show ? `block` : `none`)};

  ${Popover}

  .HitCount {
    display: flex;
    justify-content: flex-end;
    padding: 1em 1em 0 1em;
  }

  @media ${device.mobileS} {
    width: unset;
    .Hits {
      li.ais-Hits-item {
        > div {
          margin: 1em 2em;
        }
      }
    }
  }

  @media ${device.tablet} {
    width: 95vw;
    .Hits {
      li.ais-Hits-item {
        > div {
          margin: 1em 3em;
        }
      }
    }
  }

  .Hits {
    ul {
      list-style: none;
      margin-left: 0;
      padding-left: 0;
    }

    li.ais-Hits-item {
      margin: 0;
      border-bottom: 1px solid #eee;

      > div {
        .tags {
          display: flex;
          flex-direction: columns;
          gap: 30px;
          .tag {
            color: #aaa;
            font-weight: lighter;
            margin-top: 5px;
            span {
              color: #777;
              font-weight: normal;
            }
          }
        }
      }
      .ais-Snippet {
        color: #777;
      }

      a {
        color: ${({ theme }) => theme.foreground};

        h4 {
          font-size: 1.3em;
          margin-bottom: 0.2em;
          span {
            font-weight: lighter;
          }
        }
      }
      
    }
  }

`