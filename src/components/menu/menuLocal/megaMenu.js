import { filter } from 'lodash'
import React from 'react'
import { NavDropdown } from 'react-bootstrap'

import SubItemType from './subItemType'

export default function MegaMenu( 
    { 
        index, 
        className, 
        title, 
        content,
        columns,
        mode,
    } 
){
    let organizedByColumns = []
    for(let i = 1; i <= columns; i++) {
        organizedByColumns[i] = filter(content, function(o) { 
            return o.columns == i; 
        })
    }

    return (
        <NavDropdown 
            id          = {`dropdown${index ? '-'+index : ''}` }
            key         = { index} 
            className   = { `megamenu navitems ${ className ? className : ''}` }
            title       = { title } 
        >
            <div 
                className={`navcontent`} 
                style={
                    {
                        display: 'grid',
                        gridTemplateColumns: `repeat(${columns}, 1fr)`,
                        gridTemplateRows: 'auto',
                        gridTemplateAreas: `'${Array.from(Array(columns), (_,i) => i+1).map(i => 'c' + i).join(' ')}'`,
                    }
                }
            >
                {
                    organizedByColumns.map( (_, i1) => (
                        <div key = { i1 } style = { { gridArea: `c${i1}` } } >
                            {
                                _.map( (m, i2) => (
                                    <SubItemType 
                                        item = { m } 
                                        key = { i2 } 
                                        mode = { mode }
                                    />
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </NavDropdown>
    )
}