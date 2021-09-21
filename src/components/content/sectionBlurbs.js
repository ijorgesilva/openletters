import React from 'react'
import { Container } from 'react-bootstrap'

import ItemSelector from '../carousel/itemSelector'

import './sectionBlurbs.scss'

export default function SectionBlurbs ( { 
    id,
    campus,
    title,
    content,
    className,
    mode,
    containerWidth,
    size,
    orientation,
    blurbType,
    dataType,
    items,
    imageAspect,
    itemClass,
    truncate,
    truncateLines,
    direction,
    gap,
    justification,
    stretch,
} ) {

    const flexConfig = {
        display: 'flex',
        flexDirection: ( direction ) ? direction : 'row',
        gap: ( gap ) ? gap : '1rem',
        justifyContent: ( justification ) ? justification : 'flex-start',
        alignItems: ( stretch ) ? 'stretch' : 'flex-start',
        alignContent: ( stretch ) ? 'stretch' : 'flex-start',
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
                        ( items?.length > 0 ) ?
                            items.map( (_, index) => (
                                <ItemSelector
                                    key              = { index }
                                    counter          = { index + 1}
                                    dataType         = { dataType }
                                    blurbType        = { blurbType }
                                    orientation      = { orientation }
                                    image            = { _.itemImage?.localFile.childImageSharp.gatsbyImageData }
                                    title            = { _.itemTitle }
                                    subtitle         = { _.itemSubtitle }
                                    content          = { _.itemContent }
                                    mode             = { mode }
                                    stretchedlink    = { _.itemButtons?.itemButtonsStretchedlink }
                                    buttons          = { _.itemButtons?.itemButtonsButton }
                                    truncate         = { truncate }
                                    truncateLines    = { truncateLines }
                                    className        = { `${ 'item-'+index } ${ ( _.itemCss ) ? _.itemCss : ''} ${ ( itemClass ) ? itemClass : '' }` }
                                    removeDefaultCss = { _.itemCssRemoveDefault }
                                    imageAspect      = { imageAspect }
                                    campus           = { campus }
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