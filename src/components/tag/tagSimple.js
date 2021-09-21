
import React from 'react'
import './tagSimple.scss'

export default function TagSimple( { terms, mode, className } ) {
    return (
        <div className={`tagSimple ${ mode ? mode : 'light' } ${ className ? className : '' }`}>
            {
                terms?.length > 0 ?
                    terms.map( (term, index) => (
                        <span  key={index} className={`user-select-none ${ className ? className : ''}`}>
                            {term.name}
                        </span>
                    ))
                : undefined
            }
        </div>
    )
}