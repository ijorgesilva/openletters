import React from 'react'

import SocialNetwork from './socialNetwork'
import './socialNetworkList.scss'

export default function socialNetworkList ( 
    { 
        items, 
        mode, 
        itemClass, 
        location 
    } 
    ) {

    return (
        <div className = {`socialNetworkList ${ mode ? mode : 'light' }`}>
            {
                ( items?.length > 0 ) ?
                    items.map( ( _, index ) => (
                        <SocialNetwork 
                            key         = { index }
                            type        = { _.type }
                            params      = { _.params }
                            mode        = { mode }
                            location    = { location }
                            itemClass   = { itemClass }
                        />
                    ))
                :
                    undefined
            }
        </div>
    )
}