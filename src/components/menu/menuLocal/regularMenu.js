import React from 'react'
import { NavDropdown } from 'react-bootstrap'

import SubItemType from './subItemType'

export default function RegularMenu( 
    { 
        className, 
        index, 
        title, 
        menu,
        mode,
        alignRight,
    } 
) {
    return (
        <NavDropdown
            id          = {`dropdown${index ? index + '-' : ''}`}
            className   = {`regularmenu navitems ${ mode ? mode : 'light' } ${ className ? className : '' }`}
            key         = { index }
            title       = { title ? title : '' } 
            alignRight  = { alignRight }
        >
            {
                menu.map( (_, index) => (
                    <SubItemType 
                        item = { _ } 
                        key = { index } 
                        mode = { mode }
                    />
                ))
            }
        </NavDropdown>
    )
}