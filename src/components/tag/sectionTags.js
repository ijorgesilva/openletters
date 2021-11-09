import React from 'react'
import { Container } from 'react-bootstrap'

import TagSimple from './tagSimple'

export default function SectionTags ( 
    { 
        id, 
        className, 
        mode, 
        tags, 
        tagClass,
        width,
    } 
    ) {
    return (
        <section 
            className = {`sectionTags pb-5 ${ mode ? mode : '' } ${ className ? className : '' }`} 
            id        = { id } 
        >
            <Container fluid = { width === 'container' ? false : true }>
                {
                    ( tags?.length > 0 ) ?
                        <TagSimple 
                            items       = { tags } 
                            mode        = { mode } 
                            className   = { tagClass }
                        />
                    :
                        undefined
                }
            </Container>
        </section>
    )
}