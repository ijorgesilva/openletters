
import React from 'react'
import { Link } from 'gatsby'


import './buttons.scss'

export default function Buttons ( 
    {
        stretchedlink,
        buttons,
        mode,
    } 
    ) {
    
    return (
        <div className="buttons">
            {
                buttons.map ( ( _, index) => (
                    ( _.buttonType.split(":")[0] === 'internal' ) ?
                        <Link 
                            key         = {index}
                            className   = {`${ ( _.buttonCssRemoveDefault ) ? '' : 'link btn btn-outline-secondary'} ${ mode === 'dark' ? 'btn-dark' : 'btn-light' } ${ ( index === 0 && stretchedlink ) ? 'stretched-link' : '' } ${ ( _.buttonCss ) ? _.buttonCss : ''} ${ ( index === 0) ? 'first' : ( buttons.length === index + 1 ) ? 'last' : 'middle'}`}
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
                                className   = {`${ ( _.buttonCssRemoveDefault ) ? '' : 'link btn btn-outline-secondary'} ${ mode === 'dark' ? 'btn-dark' : 'btn-light' } ${ ( index === 0 && stretchedlink ) ? 'stretched-link' : '' }  ${ ( _.buttonCss ) ? _.buttonCss : ''} ${ ( index === 0) ? 'first' : ( buttons.length === index + 1 ) ? 'last' : 'middle'}`}
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