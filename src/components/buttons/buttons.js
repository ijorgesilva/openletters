import { Link } from 'gatsby'
import React from 'react'

import './buttons.scss'

export default function Buttons ( 
    {
        stretchedlink,
        buttons,
        mode,
        className,
    } 
    ) {
    
    return (
        <div className="buttons">
            {
                buttons.map ( ( _, index) => (
                    ( _.buttonType.split(":")[0] === 'internal' ) ?
                        <Link 
                            key         = {index}
                            className   = {`${ ( _.buttonCssRemoveDefault ) ? '' : 'link btn btn-outline-secondary'} ${ mode === 'dark' ? 'btn-dark' : 'btn-light' } ${ ( index === 0 && stretchedlink ) ? 'stretched-link' : '' } ${ ( _.buttonCss ) ? _.buttonCss : ''} ${ ( index === 0) ? 'first' : ( buttons.length === index + 1 ) ? 'last' : 'middle'} ${ className ? className : '' }`}
                            to          = {_.buttonLink} 
                            target      = {_.buttonTarget.split(":")[0]}
                        >
                            {_.buttonText}
                        </Link>
                    :
                        ( _.buttonType.split(":")[0] === 'external' ) ?
                            <a    
                                key         = {index}
                                className   = {`${ ( _.buttonCssRemoveDefault ) ? '' : 'link btn btn-outline-secondary'} ${ mode === 'dark' ? 'btn-dark' : 'btn-light' } ${ ( index === 0 && stretchedlink ) ? 'stretched-link' : '' }  ${ ( _.buttonCss ) ? _.buttonCss : ''} ${ ( index === 0) ? 'first' : ( buttons.length === index + 1 ) ? 'last' : 'middle'} ${ className ? className : '' }`}
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