// Dependencies
import React from 'react'

// Components
import FeedListEvenRenderer from './feedListEvenRenderer'

// Style
import './feedListEven.scss'

export default function FeedListEven ( { items, className, variant, hasExcerpt, campus } ) {
    
    return (
        <div className={`feedListEven ${ (className) ? className : '' }`}>
            <div className="list">

                <FeedListEvenRenderer
                    items       = { items }
                    variant     = { variant }
                    hasExcerpt  = { hasExcerpt }
                    campus      = { campus }
                />

            </div>
        </div>
    )

}