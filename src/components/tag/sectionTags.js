import React from 'react'
import TagSimple from './tagSimple'

export default function SectionTags ( 
    { id, className, mode, tags, tagClass } 
    ) {
    return (
        <section 
            className = {`sectionTags pb-5 ${ mode ? mode : '' } ${ className ? className : '' }`} 
            id        = { id } 
        >
            <div className = "content-container" >
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
            </div>
        </section>
    )
}