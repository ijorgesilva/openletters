import React from 'react'

import NewsletterItem from './newsletter/item'
 
export default function Newsletter ( 
    { 
        items,
        className,
        mode 
    }
) {
    return (
        <div className={`widgetMailchimp ${ mode ? mode : 'light'} ${ className ? className : '' }`}
            style = {
                { 
                    display: 'flex', 
                    justifyContent: 'center', 
                    padding: '1rem',
                    maxWidth: '520px',
                    margin: '0px auto',
                }
            }
        >
            {
                items.length > 0 ?
                    items.map( (_, index) => (
                        <NewsletterItem 
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