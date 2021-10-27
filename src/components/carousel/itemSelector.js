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
        case dataType === 'videos': {
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
        }

        /*
        * Series
        */
        case dataType === 'series': {
            return (
                <>
                </>
            )
        }
            
        /*
        * Events
        */
        case dataType === 'events': {
            return (
                <>
                </>
            )
        }
            
        /*
        * Posts
        */
        case dataType === 'posts': {
            return (
                <>
                </>
            )
        }
            
        /*
        * News
        */
        case dataType === 'news': {
            return (
                <>
                </>
            )
        }
            
        /*
        * Groups
        */
        case dataType === 'groups': {
            return (
                <>
                </>
            )
        }
            
        /*
        * Group dataTypes
        */
        case dataType === 'groupdataTypes': {
            return (
                <>
                </>
            )
        }

        /*
        * Ministries
        */
        case dataType === 'ministries': {
            return (
                <>
                </>
            )
        }

        /*
        * Ministries
        */
        case dataType === 'volunteering': {
            return (
                <>
                </>
            )
        }

        /*
        * Courses
        */
        case dataType === 'courses': {
            return (
                <>
                </>
            )
        }

        /*
        * Lessons
        */
        case dataType === 'lessons': {
            return (
                <>
                </>
            )
        }

        /*
        * Custom
        */
        case dataType === 'custom': {
            
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
        }
   
        /*
        * Default
        */
        default: {
            return (
                <></>
            )
        }

    }

}