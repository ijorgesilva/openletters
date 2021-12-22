import React from 'react'

import RenderSection from '../../../renderSection'

export default function SectionRendering(
    {
        view,
        pages,
        campus,
        location,
        contentMode,
        customPageIndex,
    }
) {
    let sections
    
    switch (view) {

        case 'frontpage': {
            sections = pages.ministryPages.ministryPageFrontpage.sections
            return(
                <>
                    {
                        sections ?
                            sections.map( ( _, index ) => (
                                <RenderSection 
                                    key         = { index }
                                    section     = { _ }
                                    campus      = { campus }
                                    filter      = { { campus: campus } }
                                    location    = { location }
                                    mode        = { contentMode }
                                />
                            ))
                        :
                            undefined
                    }
                </>
            )
        }

        case 'videos': {
            sections = pages.ministryPages.ministryPageVideos.sections
            return(
                <>
                    {
                        sections ?
                            sections.map( ( _, index ) => (
                                <RenderSection 
                                    key         = { index }
                                    section     = { _ }
                                    campus      = { campus }
                                    filter      = { { campus: campus } }
                                    location    = { location }
                                    mode        = { contentMode }
                                />
                            ))
                        :
                            undefined
                    }
                </>
            )
        }

        case 'events': {
            sections = pages.ministryPages.ministryPageEvents.sections
            return(
                <>
                    {
                        sections ?
                            sections.map( ( _, index ) => (
                                <RenderSection 
                                    key         = { index }
                                    section     = { _ }
                                    campus      = { campus }
                                    filter      = { { campus: campus } }
                                    location    = { location }
                                    mode        = { contentMode }
                                />
                            ))
                        :
                            undefined
                    }
                </>
            )
        }
    
        case 'blog': {
            sections = pages.ministryPages.ministryPageBlogNews.sections
            return(
                <>
                    {
                        sections ?
                            sections.map( ( _, index ) => (
                                <RenderSection 
                                    key         = { index }
                                    section     = { _ }
                                    campus      = { campus }
                                    filter      = { { campus: campus } }
                                    location    = { location }
                                    mode        = { contentMode }
                                />
                            ))
                        :
                            undefined
                    }
                </>
            )
        }

        case 'courses': {
            sections = pages.ministryPages.ministryPageClasses.sections
            return(
                <>
                    {
                        sections ?
                            sections.map( ( _, index ) => (
                                <RenderSection 
                                    key         = { index }
                                    section     = { _ }
                                    campus      = { campus }
                                    filter      = { { campus: campus } }
                                    location    = { location }
                                    mode        = { contentMode }
                                />
                            ))
                        :
                            undefined
                    }
                </>
            )
        }

        case 'volunteering': {
            sections = pages.ministryPages.ministryPageServe.sections
            return(
                <>
                    {
                        sections ?
                            sections.map( ( _, index ) => (
                                <RenderSection 
                                    key         = { index }
                                    section     = { _ }
                                    campus      = { campus }
                                    filter      = { { campus: campus } }
                                    location    = { location }
                                    mode        = { contentMode }
                                />
                            ))
                        :
                            undefined
                    }
                </>
            )
        }

        case 'groups': {
            sections = pages.ministryPages.ministryPageGroups.sections
            return(
                <>
                    {
                        sections ?
                            sections.map( ( _, index ) => (
                                <RenderSection 
                                    key         = { index }
                                    section     = { _ }
                                    campus      = { campus }
                                    filter      = { { campus: campus } }
                                    location    = { location }
                                    mode        = { contentMode }
                                />
                            ))
                        :
                            undefined
                    }
                </>
            )
        }

        case 'customPage': {
            sections = pages.ministryPagesCustom[customPageIndex].sections
            
            return(
                <>
                    {
                        sections ?
                            sections.map( ( _, index ) => (
                                <RenderSection 
                                    key         = { index }
                                    section     = { _ }
                                    campus      = { campus }
                                    filter      = { { campus: campus } }
                                    location    = { location }
                                    mode        = { contentMode }
                                />
                            ))
                        :
                            undefined
                    }
                </>
            )
        }

        default:{
            return(
                <>
                </>
            )
        }   

    }
}