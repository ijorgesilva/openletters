// Dependencies
import React from 'react'

// Style
import './youVersion.scss'

export default function YouVersion ( { id, className, title, bibleUrl } ) {
    return (
        <div className="youversion">
            <iframe 
                id={`${ (id) ? id : ''}`}
                className   = {`${ (className) ? className : ''}`}
                title={` ${ (title) ? title : 'YouVersion'}`}
                src={`${ (bibleUrl) ? bibleUrl : 'https://chop.bible.com/bible/1/GEN.1.KJV' }`}
                frameborder="0"
            >
            </iframe>
        </div>
    )
}