
import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Card } from 'react-bootstrap'
import TextTruncate from 'react-text-truncate'


import Buttons from '../buttons/buttons'


import './blurbVertical.scss'

export default function BlurbVertical ( {
    type,
    counter,
    mode,
    image,
    title,
    subtitle,
    content,
    buttons,
    stretchedlink,
    truncate,
    truncateLines,
    orientation,
    className,
    removeDefaultCss,
    aspectRatio,
    }) {

    const cardOrientation = ( orientation === 'vertical' || orientation === 'horizontal' ) ? orientation : 'vertical'

    return (
        <Card className = {`${ removeDefaultCss ? '' : 'blurbVertical' } ${ mode ? mode : 'light' } ${ className ? className : ''} ${cardOrientation}`}>

            <div className={`card-img ${ ( !image ) ? ( aspectRatio ) ? 'aspect-ratio-' + aspectRatio : 'aspect-ratio-16_9' : '' }`} aria-hidden='true'>
                {
                    ( type === 'numbered' ) ?
                        <span className='number font-weight-bolder h1 noselect'>{counter}</span>
                    :
                        undefined
                }
                <GatsbyImage
                    className   = {`card-img-top ${ ( aspectRatio ) ? 'aspect-ratio-' + aspectRatio : 'aspect-ratio-16_9' }`}
                    image       = { image }
                    alt         = ''
                />
            </div>

            <Card.Body>
                <Card.Title as='h3' dangerouslySetInnerHTML={{__html: title}}></Card.Title>
                <Card.Title as='h4' dangerouslySetInnerHTML={{__html: subtitle}}></Card.Title>
                {
                    ( truncate ) ?
                        <TextTruncate line = { ( truncateLines ) ? truncateLines : 3 } element='p' truncateText='…' text={content.replace(/<p>/, '').replace(/<\/p>/, '')} /> 
                    :
                        <Card.Text  dangerouslySetInnerHTML={{__html: content}}></Card.Text>    
                }
                {
                    ( buttons?.length > 0 ) ?
                        <Buttons 
                            stretchedlink   = { stretchedlink }
                            buttons         = { buttons }
                        />
                    :
                        undefined
                }
            </Card.Body>

        </Card>

    )
}