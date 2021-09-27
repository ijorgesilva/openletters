
import React from 'react'


import FeedListEvenRenderer from './feedListEvenRenderer'


import './feedListEven.scss'

export default function FeedListEven ( 
    { items, className, hasExcerpt, campus, mode } 
    ) {

    return (
        <div className={`feedListEven pt-4 ${ mode ? mode : '' } ${ className ? className : '' }`}>
            <div className="list">
                <FeedListEvenRenderer
                    items       = { items }
                    mode        = { mode }
                    hasExcerpt  = { hasExcerpt }
                    campus      = { campus }
                />
            </div>
        </div>
    )

}