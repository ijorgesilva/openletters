// Dependencies
import React from 'react'
import './tagSimple.scss'

export default function TagSimple( { terms, variant } ) {
    return (
        <div className={(variant) ? `tagSimple ${variant}` : 'tagSimple dark'}>
            {
                (terms) ?
                    terms.nodes.map( (term, index) => (
                        <span className="user-select-none" key={index}>
                            {term.name}
                        </span>
                    ))
                : undefined
            }
        </div>
    )
}