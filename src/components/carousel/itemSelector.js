// Dependencies
import React from 'react'

// Components
import BlurbVertical from '../blurb/blurbVertical'

export default function ItemSelector ( {
    type,
    image,
    title,
    subtitle,
    content,
    truncate,
    truncateLines,
    buttons,
    className,
    removeDefaultCss,
    aspectRatio,
    campus,
    } ) {
    
    switch ( type ){
        case 'default':
            return (
                <BlurbVertical
                    image               = { image }
                    title               = { title }
                    subtitle            = { subtitle }
                    content             = { content }
                    truncate            = { truncate }
                    truncateLines       = { truncateLines }
                    buttons             = { buttons }
                    className           = { className }
                    removeDefaultCss    = { removeDefaultCss }
                    aspectRatio         = { aspectRatio }
                />
            )
            break

        default:
            return <></>
            break
    }

}