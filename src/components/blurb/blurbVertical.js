// Dependencies
import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Card } from 'react-bootstrap'
import TextTruncate from 'react-text-truncate'

// Components
import Buttons from '../buttons/buttons'

// Styles
import './blurbVertical.scss'

export default function BlurbVertical ( {
    image,
    title,
    subtitle,
    content,
    truncate,
    truncateLines,
    className,
    removeDefaultCss,
    buttons,
    aspectRatio,
    }) {

    return (
        <Card 
            className = {`blurbVertical ${ ( removeDefaultCss ) ? '' : 'blurbVertical' } ${ ( className ) ? className : ''}`}
        >

            <div className={`card-img ${ ( !image ) ? ( aspectRatio ) ? 'aspect-ratio-' + aspectRatio : 'aspect-ratio-16_9' : '' }`} aria-hidden="true">
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
                        <TextTruncate line = { ( truncateLines ) ? truncateLines : 3 } element="p" truncateText="…" text={content.replace(/<p>/, '').replace(/<\/p>/, '')} /> 
                    :
                        <Card.Text  dangerouslySetInnerHTML={{__html: content}}></Card.Text>    
                }
                {
                    ( buttons?.length > 0 ) ?
                        <Buttons 
                            buttons = {buttons}
                        />
                    :
                        undefined
                }
            </Card.Body>

        </Card>

    )
}