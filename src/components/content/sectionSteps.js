// Dependencies
import React from 'react'

// Components
import './sectionSteps.scss'

export default function SectionSteps( { 
    itemType,
    title,
    id,
    content,
    className,
    variant,
    containerWidth,
    items,
} ) {
    return (
        <section 
            id          = {id}
            className   = {`sectionSteps ${ (className) ? className : ''} ${ (variant) ? variant : 'light' }`}
        >
            <div className={`${ ( containerWidth ) ? containerWidth : 'container' }`}>

                {
                    ( title ) ?
                        <h2 className='title'
                            dangerouslySetInnerHTML={{__html: title}}
                        ></h2>
                    :
                        undefined
                }
                
                {
                    ( content ) ?
                        <div className='content'
                            dangerouslySetInnerHTML={{__html: content}}
                        ></div>
                    :
                        undefined
                }
                
                {/* {
                        ( items?.length > 0 ) ?
                            items.map( (_, index) => (
                                <div
                                >
                                    <ItemSelector
                                        key              = { index }
                                        type             = { itemType }
                                        image            = { _.itemImage?.localFile.childImageSharp.gatsbyImageData }
                                        title            = { _.itemTitle }
                                        subtitle         = { _.itemSubtitle }
                                        content          = { _.itemContent }
                                        truncate         = { truncate }
                                        truncateLines    = { trucanteLines }
                                        className        = { `${ 'item-'+index } ${_.itemCss} ${ ( itemClass ) ? itemClass : '' }` }
                                        removeDefaultCss = { _.itemCssRemoveDefault }
                                        buttons          = { _.itemButtons?.sectionCarouselItemButtonsButton }
                                        aspectRatio      = { aspectRatio }
                                        campus           = { campus }
                                    />
                                </div>
                            ))
                        :
                            undefined
                    } */}

            </div>
        </section>
    )
}