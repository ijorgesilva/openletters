import React from 'react'

import SocialItem from './social/item'
 
export default function Social ( 
    { 
        items,
        className,
        mode,
    } 
) {
    return (
        <div className={`widgetSocial ${ mode ? mode : 'light'} ${ className ? className : '' }`} 
            style = {
                { 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    padding: '1rem',
                    maxWidth: '520px',
                    margin: '0px auto',
                }
            }
        >
            {
                items.length > 0 ?
                    items.map( (_, index) => (
                        <SocialItem 
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