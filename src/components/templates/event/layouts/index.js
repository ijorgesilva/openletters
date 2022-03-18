import React from 'react'

import CleanLayoutDetails from './clean'
import DefaultLayoutDetails from './default'

export default function Layout ( 
    { 
        layout,
        title, 
        date,
        excerpt,
        breadcrumbs,
        modified, 
        featuredImage, 
        content, 
        tags, 
        eventDetails, 
        location,
        mode,
        sections,
        campus,
    } 
) {

    switch( layout ){

        case 'clean': {
            return (
                <CleanLayoutDetails 
                    location    = { location }
                    sections    = { sections }
                    campus      = { campus }
                    mode        = { mode }
                />
            )
        }

        default:
        case 'default': {
            return(
                <DefaultLayoutDetails 
                    location        = { location }
                    title           = { title }
                    excerpt         = { excerpt }
                    date            = { date }
                    modified        = { modified }
                    featuredImage   = { featuredImage }
                    content         = { content }
                    tags            = { tags }
                    eventDetails    = { eventDetails }
                    breadcrumbs     = { breadcrumbs }
                    sections        = { sections }
                    campus          = { campus }
                    mode            = { mode }
                />
            )
        }

    }

}