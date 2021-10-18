import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Card } from 'react-bootstrap'
import TextTruncate from 'react-text-truncate'

import Buttons from '../buttons/buttons'

import './blurbVertical.scss'

export default function BlurbVertical ( 
    {
        counter,
        mode,
        image,
        title,
        subtitle,
        content,
        buttons,
        itemType,
        stretchedlink,
        truncate,
        truncateLines,
        orientation,
        className,
        removeDefaultCss,
        imagePosition,
        imageFit,
        aspectRatio,
        border,
        borderColor,
        itemGrow,
        numbered,
    }
    ) {

    const cardOrientation = ( orientation === 'vertical' || orientation === 'horizontal' ) ? orientation : 'vertical'

    return (
        <Card className = {`${ removeDefaultCss ? '' : 'blurbVertical' } ${ mode ? mode : 'light' } ${ className ? className : ''}  ${ border ? border : '' } ${ borderColor ? borderColor : '' } ${ itemGrow ? 'grow' : ''} ${ cardOrientation ? cardOrientation : ''} ${ itemType ? itemType : ''}`}>

            <div className={`card-img ${ ( !image ) ? ( aspectRatio ) ? 'aspect-ratio-' + aspectRatio : 'aspect-ratio-16_9' : '' }`} aria-hidden='true'>
                {
                    ( numbered ) ?
                        <span className='number font-weight-bolder h1 noselect'>{counter}</span>
                    :
                        undefined
                }
                <GatsbyImage
                    className       = {`card-img-top ${ aspectRatio ? 'aspect-ratio-' + aspectRatio : 'aspect-ratio-16_9' }`}
                    image           = { image }
                    objectPosition  = { imagePosition }
                    objectFit       = { imageFit }
                    alt             = { title }
                />
            </div>

            <Card.Body>
                <Card.Title as='h3' dangerouslySetInnerHTML={{__html: title}}></Card.Title>
                <h4 className='card-subtitle' dangerouslySetInnerHTML={{__html: subtitle}}></h4>
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