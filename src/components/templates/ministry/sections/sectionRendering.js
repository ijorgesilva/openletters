import React from 'react'

import RenderComponent from '../../../renderer'

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
                        sections?.map( ( _, index ) => (
                            <RenderComponent 
                                key         = { index }
                                section     = { _ }
                                campus      = { campus }
                                location    = { location }
                                mode        = { contentMode }
                            />
                        ))
                    }
                </>
            )
        }

        case 'videos': {
            sections = pages.ministryPages.ministryPageVideos.sections
            return(
                <>
                    {
                        sections?.map( ( _, index ) => (
                            <RenderComponent 
                                key         = { index }
                                section     = { _ }
                                campus      = { campus }
                                location    = { location }
                                mode        = { contentMode }
                            />
                        ))
                    }
                </>
            )
        }

        case 'events': {
            sections = pages.ministryPages.ministryPageEvents.sections
            return(
                <>
                    {
                        sections?.map( ( _, index ) => (
                            <RenderComponent 
                                key         = { index }
                                section     = { _ }
                                campus      = { campus }
                                location    = { location }
                                mode        = { contentMode }
                            />
                        ))
                    }
                </>
            )
        }
    
        case 'blog': {
            sections = pages.ministryPages.ministryPageBlogNews.sections
            return(
                <>
                    {
                        sections?.map( ( _, index ) => (
                            <RenderComponent 
                                key         = { index }
                                section     = { _ }
                                campus      = { campus }
                                location    = { location }
                                mode        = { contentMode }
                            />
                        ))
                    }
                </>
            )
        }

        case 'courses': {
            sections = pages.ministryPages.ministryPageCourses.sections
            return(
                <>
                    {
                        sections?.map( ( _, index ) => (
                            <RenderComponent 
                                key         = { index }
                                section     = { _ }
                                campus      = { campus }
                                location    = { location }
                                mode        = { contentMode }
                            />
                        ))
                    }
                </>
            )
        }

        case 'volunteering': {
            sections = pages.ministryPages.ministryPageVolunteering.sections
            return(
                <>
                    {
                        sections?.map( ( _, index ) => (
                            <RenderComponent 
                                key         = { index }
                                section     = { _ }
                                campus      = { campus }
                                location    = { location }
                                mode        = { contentMode }
                            />
                        ))
                    }
                </>
            )
        }

        case 'groups': {
            sections = pages.ministryPages.ministryPageGroups.sections
            return(
                <>
                    {
                        sections?.map( ( _, index ) => (
                            <RenderComponent 
                                key         = { index }
                                section     = { _ }
                                campus      = { campus }
                                location    = { location }
                                mode        = { contentMode }
                            />
                        ))
                    }
                </>
            )
        }

        case 'customPage': {
            sections = pages.ministryPagesCustom[customPageIndex].sections
            
            return(
                <>
                    {
                        sections?.map( ( _, index ) => (
                            <RenderComponent
                                key         = { index }
                                section     = { _ }
                                campus      = { campus }
                                location    = { location }
                                mode        = { contentMode }
                            />
                        ))
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