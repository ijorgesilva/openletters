import React from 'react'
import './tagSimple.scss'

export default function TagSimple( { items, mode, className } ) {
    console.log(items)
    return (
        <div className={`tagSimple ${ mode ? mode : 'light' } ${ className ? className : '' }`}>
            {
                items?.length > 0 ?
                    items.map( (term, index) => (
                        <span  key={index} className={`user-select-none ${ className ? className : ''}`}>
                            {term.name}
                        </span>
                    ))
                : undefined
            }
        </div>
    )
}