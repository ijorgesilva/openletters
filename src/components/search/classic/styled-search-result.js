import styled, { css } from 'styled-components'

import SearchResult from './search-result'

const Popover = css`
  background: ${({ theme }) => theme.background};
`

export default styled(SearchResult)`
  display: ${props => (props.show ? `block` : `none`)};
  ${Popover}
`