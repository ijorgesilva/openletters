import React from 'react'

import RenderComponent from '../../../renderer'
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
                sections?.map( ( _, index ) => (
                    <RenderComponent 
                        key         = { index }
                        section     = { _ }
                        campus      = { campus }
                        location    = { location }
                        mode        = { mode }
                    />
                ))
            }
        </>
    )
}