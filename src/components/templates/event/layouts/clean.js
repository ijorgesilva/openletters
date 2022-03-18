import React from 'react'

import RenderSection from '../../../renderSection'
import '../eventDetails.scss'

export default function CleanLayoutDetails ( 
    { 
        location,
        sections,
        campus,
        mode
    } 
) {

    return (
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
                            mode        = { mode }
                        />
                    ))
                :
                    undefined
            }
        </>
    )
}