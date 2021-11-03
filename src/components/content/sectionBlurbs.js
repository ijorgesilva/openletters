import React from 'react'
import { Container } from 'react-bootstrap'

import BlurbVertical from '../blurb/blurbVertical'

import './sectionBlurbs.scss'

export default function SectionBlurbs ( 
    { 
        id,
        title,
        content,
        className,
        mode,
        containerWidth,
        size,
        orientation,
        items,
        itemType,
        imagePosition,
        imageFit,
        aspectRatio,
        itemClass,
        truncate,
        truncateLines,
        direction,
        gap,
        justification,
        stretchedlink,
        border,
        borderColor,
        itemGrow,
    } 
    ) {

    const flexConfig = {
        display: 'flex',
        flexDirection: direction ? direction : 'row',
        gap: gap ? gap : '1rem',
        justifyContent: justification ? justification : 'flex-start',
        alignItems: stretchedlink ? 'stretch' : 'flex-start',
        alignContent: stretchedlink ? 'stretch' : 'flex-start',
    }

    return (
        <section 
            id          = {id}
            className   = {`sectionBlurbs ${ size ? size : ''}  ${ className ? className : ''} ${ mode ? mode : 'light' }`}
        >
            <Container fluid = { containerWidth === 'container' ? false : true }>
                {
                    ( title || content ) ?
                        <div className='general'>
                            {
                                ( title ) ?
                                    <h2 className='title' dangerouslySetInnerHTML={{__html: title}}></h2>
                                :
                                    undefined
                            }
                            { 
                                ( content ) ?
                                    <div className='content' dangerouslySetInnerHTML={{__html: content}}></div>
                                :
                                    undefined
                            }
                        </div>
                    :
                        undefined
                }

                <div className="items" style={flexConfig}>
                    {
                        ( items?.list.length > 0 ) ?
                            items.list.map( (_, index) => (
                                <BlurbVertical
                                    key                 = { index }
                                    image               = { _.image }
                                    title               = { _.title }
                                    subtitle            = { _.subtitle }
                                    content             = { _.excerpt }
                                    removeDefaultCss    = { _.itemCssRemoveDefault }
                                    tags                = { _.tags }
                                    
                                    itemType            = { itemType }
                                    mode                = { mode }
                                    buttons             = { _.buttons }

                                    counter             = { index + 1 }
                                    orientation         = { orientation }
                                    
                                    truncate            = { truncate }
                                    truncateLines       = { truncateLines }
                                    stretchedlink       = { stretchedlink }
                                    className           = { `${_.cssClass} ${ itemClass ? itemClass : '' }` }
                                    aspectRatio         = { aspectRatio }
                                    imageFit            = { imageFit }
                                    imagePosition       = { imagePosition }
                                    border              = { border }
                                    borderColor         = { borderColor }
                                    itemGrow            = { itemGrow }
                                />
                            ))
                        :
                            undefined
                    }
                </div>
            </Container>

        </section>
    )
}