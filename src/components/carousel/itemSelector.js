import React from 'react'

import BlurbVertical from '../blurb/blurbVertical'

export default function ItemSelector ( {
    dataType,
    blurbType,
    orientation,
    counter,
    image,
    title,
    subtitle,
    content,
    buttons,
    mode,
    stretchedlink,
    truncate,
    truncateLines,
    className,
    removeDefaultCss,
    imageAspect,
    campus,
    } ) {
        
    switch ( true ){

        /*
        * Videos
        */
        case dataType === 'videos':
            return (
                <>
                </>
            )
            break

        /*
        * Series
        */
        case dataType === 'series':
            return (
                <>
                </>
            )
            break
            
        /*
        * Events
        */
        case dataType === 'events':
            return (
                <>
                </>
            )
            break
            
        /*
        * Posts
        */
        case dataType === 'posts':
            return (
                <>
                </>
            )
            break
            
        /*
        * News
        */
        case dataType === 'news':
            return (
                <>
                </>
            )
            break
            
        /*
        * Groups
        */
        case dataType === 'groups':
            return (
                <>
                </>
            )
            break
            
        /*
        * Group Types
        */
        case dataType === 'grouptypes':
            return (
                <>
                </>
            )
            break
                
        /*
        * Custom
        */
        case dataType === 'custom':
            
            return (
                <BlurbVertical
                    type                = { blurbType }
                    counter             = { counter }
                    orientation         = { orientation }
                    mode                = { mode }
                    image               = { image }
                    title               = { title }
                    subtitle            = { subtitle }
                    content             = { content }
                    truncate            = { truncate }
                    truncateLines       = { truncateLines }
                    stretchedlink       = { stretchedlink }
                    buttons             = { buttons }
                    className           = { className }
                    removeDefaultCss    = { removeDefaultCss }
                    aspectRatio         = { imageAspect }
                />
            )
            break
   
        /*
        * Default
        */
        default:
            
            return (
                <BlurbVertical
                    type                = { blurbType }
                    counter             = { counter }
                    orientation         = { orientation }
                    image               = { image }
                    title               = { title }
                    subtitle            = { subtitle }
                    mode                = { mode }
                    content             = { content }
                    truncate            = { truncate }
                    truncateLines       = { truncateLines }
                    buttons             = { buttons }
                    className           = { className }
                    removeDefaultCss    = { removeDefaultCss }
                    aspectRatio         = { imageAspect }
                />
            )
            break
    }

}