// Dependencies
import React from 'react'
import './tagSimple.scss'

export default function TagSimple(props){
    return (
        <div className={(props.variant) ? `tagSimple ${props.variant}` : 'tagSimple dark'}>
            {
                (props.terms) ?
                    props.tags.nodes.map( (term, index) => (
                        <span className="user-select-none" key={index}>
                            {term.name}
                        </span>
                    ))
                : undefined
            }
        </div>
    )
}