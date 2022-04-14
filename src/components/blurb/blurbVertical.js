import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
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
        tags,
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
        // Visibility
        hideImage,
        hideTitle,
        hideSubtitle,
        hideExcerpt,
        hideButton,
    }
    ) {

    const cardOrientation = ( orientation === 'vertical' || orientation === 'horizontal' ) ? orientation : 'vertical'

    return (
        <Card className = {`${ removeDefaultCss ? '' : 'blurbVertical' } ${ mode ? mode : 'light' } ${ className ? className : ''}  ${ border ? border : '' } ${ borderColor ? borderColor : '' } ${ itemGrow ? 'grow' : ''} ${ cardOrientation ? cardOrientation : ''} ${ itemType ? itemType : ''} ${ hideImage ? 'no-image' : '' }`}>

            {
                hideImage ?
                    undefined
                :
                    <div className={`card-img ${ ( !image ) ? ( aspectRatio ) ? 'aspect-ratio-' + aspectRatio : 'aspect-ratio-16_9' : '' }`} aria-hidden='true'>
                        {
                            numbered ?
                                <span className='number font-weight-bolder h1 noselect'>{counter}</span>
                            :
                                undefined
                        }
                        {
                            image ?
                                <GatsbyImage
                                    className       = {`card-img-top ${ aspectRatio ? 'aspect-ratio-' + aspectRatio : 'aspect-ratio-16_9' }`}
                                    image           = { image }
                                    objectPosition  = { imagePosition }
                                    objectFit       = { imageFit }
                                    alt             = { title }
                                />
                            : undefined
                        }
                    </div>
            }

            <Card.Body>
                {
                    hideTitle ? undefined
                    : <Card.Title className='text-break' as='h3' dangerouslySetInnerHTML={{__html: title}}></Card.Title>
                }
                {
                    hideSubtitle ? undefined
                    : <h4 className='card-subtitle text-break' dangerouslySetInnerHTML={{__html: subtitle}}></h4>
                }
                {
                    hideExcerpt ? undefined
                    :
                        content ?
                        <>
                        {
                            truncate ?
                                <TextTruncate line = { ( truncateLines ) ? truncateLines : 3 } element='p' truncateText='…' text={content.replace(/<p>/, '').replace(/<\/p>/, '')} /> 
                            :
                                <Card.Text  dangerouslySetInnerHTML={{__html: content.replace(/<p>/, '').replace(/<\/p>/, '')}}></Card.Text>    
                        }
                        </>
                        : undefined
                }
                {
                    tags?.length > 0 ?
                        <div className='tags'>
                            {
                                tags.map( ( obj, index ) => (
                                    (index < 3) ?
                                        <div key={index} className={`badge badge-pill badge-image`}>
                                            {obj.name}
                                        </div>
                                    :
                                        undefined

                                ))
                            }
                        </div>
                    :
                        undefined
                }
                {
                    ( buttons?.length > 0 ) ?
                        <Buttons 
                            stretchedlink   = { stretchedlink }
                            buttons         = { buttons }
                            className       = { hideButton ? 'hide' : '' }    
                        />
                    :
                        undefined
                }
            </Card.Body>

        </Card>

    )
}