import React from 'react'

import BlurbVertical from '../blurb/blurbVertical'

export default function ItemSelector ( {
    dataType,

    image,
    title,
    subtitle,
    content,
    buttons,

    presentation,
    orientation,
    counter,
    mode,
    stretchedlink,
    truncate,
    truncateLines,
    className,
    removeDefaultCss,
    imageAspect,
    
    } ) {
        
    switch ( true ){

        /*
        * Videos
        */
        case dataType === 'videos':
            return (
                <BlurbVertical
                    image               = { image }
                    title               = { title }
                    subtitle            = { subtitle }
                    content             = { content }
                    
                    presentation        = { presentation }
                    counter             = { counter }
                    orientation         = { orientation }
                    mode                = { mode }

                    truncate            = { truncate }
                    truncateLines       = { truncateLines }
                    stretchedlink       = { stretchedlink }
                    className           = { className }
                    removeDefaultCss    = { removeDefaultCss }
                    aspectRatio         = { imageAspect }
                />
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
        * Group dataTypes
        */
        case dataType === 'groupdataTypes':
            return (
                <>
                </>
            )
            break

        /*
        * Ministries
        */
        case dataType === 'ministries':
            return (
                <>
                </>
            )
            break

        /*
        * Ministries
        */
        case dataType === 'volunteering':
            return (
                <>
                </>
            )
            break  

        /*
        * Courses
        */
        case dataType === 'courses':
            return (
                <>
                </>
            )
            break  

        /*
        * Lessons
        */
        case dataType === 'lessons':
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
                    image               = { image }
                    title               = { title }
                    subtitle            = { subtitle }
                    content             = { content }
                    buttons             = { buttons }
                    
                    presentation        = { presentation }
                    counter             = { counter }
                    orientation         = { orientation }
                    mode                = { mode }
                    
                    truncate            = { truncate }
                    truncateLines       = { truncateLines }
                    stretchedlink       = { stretchedlink }
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
                <></>
            )
            break
    }

}