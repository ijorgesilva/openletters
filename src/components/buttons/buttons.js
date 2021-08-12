// Dependencies
import React from 'react'
import { Link } from 'gatsby'

// Styles
import './buttons.scss'

export default function Buttons ( {
    buttons
} ) {
    
    return (
        <div className="buttons">
            {
                buttons.map ( ( _, index) => (
                    ( _.buttonType.split(":")[0] === 'internal' ) ?
                        <Link 
                            key         = {index}
                            className   = {`${ ( _.buttonCssRemoveDefault ) ? '' : 'link btn btn--animation btn--dark-outline'} ${ ( _.buttonCss ) ? _.buttonCss : ''} ${ ( index === 0) ? 'f' : ( buttons.length === index + 1 ) ? 'l' : 'm'}`}
                            href        = {_.buttonLink} 
                            target      = {_.buttonTarget.split(":")[0]} 
                            rel         = "noreferrer"
                        >
                            {_.buttonText}
                        </Link>
                    :
                        ( _.buttonType.split(":")[0] === 'external' ) ?
                            <a    
                                key         = {index}
                                className   = {`${ ( _.buttonCssRemoveDefault ) ? '' : 'link btn btn--animation btn--dark-outline'} ${ ( _.buttonCss ) ? _.buttonCss : ''} ${ ( index === 0) ? 'f' : ( buttons.length === index + 1 ) ? 'l' : 'm'}`}
                                href        = {_.buttonUrl} 
                                target      = {_.buttonTarget.split(":")[0]} 
                                rel         = "noreferrer"
                            >
                                {_.buttonText}
                            </a>
                        :
                            undefined
                ))
            }
        </div>
    )
}