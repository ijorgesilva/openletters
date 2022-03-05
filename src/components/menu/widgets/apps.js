import React from 'react'

import AppItem from "./apps/item"
 
export default function Apps ( 
    { 
        items, 
        mode 
    } 
) {

    return (
        <div className={`widgetApps ${ mode ? mode : 'light'}`} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
            {
                items.length > 0 ?
                    items.map( (_, index) => (
                        <AppItem 
                            key         = { index }
                            type        = { _.name.toLowerCase() }
                            link        = { _.link }
                            itemClass   = { '' }
                            mode        = { mode }
                        />
                    ))
                : undefined
            }
        </div>
    )
}