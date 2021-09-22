import React from 'react'
import TagSimple from './tagSimple'
import { Container } from 'react-bootstrap'

export default function SectionTags ( 
    { id, className, mode, tags, tagClass } 
    ) {
    return (
        <section 
            className = {`sectionTags pb-5 ${ mode ? mode : '' } ${ className ? className : '' }`} 
            id        = { id } 
        >
            <Container fluid>
                {
                    ( tags?.length > 0 ) ?
                        <TagSimple 
                            terms       = { tags } 
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