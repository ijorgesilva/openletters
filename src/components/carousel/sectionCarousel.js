
import React from 'react'
import Carousel from 'react-multi-carousel'
import { Container } from 'react-bootstrap'


import { responsive as breakpoints } from '../../../data/feedConfiguration'
import ItemSelector from './itemSelector'


import 'react-multi-carousel/lib/styles.css'
import './sectionCarousel.scss'

export default function SectionCarousel ( { 
        id, 
        className, 
        title, 
        content, 
        items, 
        containerWidth, 
        mode, 
        size, 
        campus,
        itemType,
        swipeable, 
        draggable, 
        infinite,
        partialVisible, 
        autoplay,
        interval,
        dots,
        dotsClass,
        gap,
        itemClass,
        truncate,
        truncateLines,
        aspectRatio,
        responsive,
    } ) {

    // TODO: Convert into external hook
    const responsiveConf = {
        largeDesktop: {
            breakpoint:     { 
                                max: ( responsive.responsiveXlMax ) ? responsive.responsiveXlMax : 4000, 
                                min: ( responsive.responsiveXlMin ) ? responsive.responsiveXlMin : 3000 
                            },
            items: ( responsive.responsiveXlItems ) ? responsive.responsiveXlItems : 6
        },
        desktop: {
            breakpoint:     { 
                max: ( responsive.responsiveLMax ) ? responsive.responsiveLMax : 3000, 
                min: ( responsive.responsiveLMin ) ? responsive.responsiveLMin : 1024 
            },
            items: ( responsive.responsiveLItems ) ? responsive.responsiveLItems : 5
        },
        tablet: {
            breakpoint:     { 
                max: ( responsive.responsiveSMax ) ? responsive.responsiveSMax : 1024, 
                min: ( responsive.responsiveSMin ) ? responsive.responsiveSMin : 464 
            },
            items: ( responsive.responsiveSItems ) ? responsive.responsiveSItems : 3
        },
        mobile: {
            breakpoint:     { 
                max: ( responsive.responsiveXsMax ) ? responsive.responsiveXsMax : 464, 
                min: ( responsive.responsiveXsMin ) ? responsive.responsiveXsMin : 0 
            },
            items: ( responsive.responsiveXsItems ) ? responsive.responsiveXsItems : 1
        }
    }
    
    return (

        <section id = {id} className = {`sectionCarousel ${ size ? size : ''} ${ className ? className : ''} ${ mode ? mode : 'light' }`}>

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
                <div className='carousel'>
                    {
                        ( items?.length > 0 ) ?
                            <Carousel 
                                swipeable       = { ( swipeable ) ? swipeable : true }
                                draggable       = { ( draggable ) ? draggable : true }
                                infinite        = { ( infinite ) ? infinite : false }
                                partialVisible  = { ( partialVisible ) ? partialVisible : false }
                                autoPlay        = { ( autoplay ) ? autoplay : false }
                                autoPlaySpeed   = { ( interval ) ? interval : 3000 }
                                responsive      = { responsiveConf }
                                itemClass       = {`item ${ ( gap ) ? gap.split(':')[0] : '' }`}
                                showDots        = { ( dots ) ? dots : false }
                                dotListClass    = { dotsClass }
                                containerClass  = "carousel-container"
                            >
                                {
                                    items.map( (_, index) => (
                                        <ItemSelector
                                            key              = { index }
                                            type             = { itemType }
                                            image            = { _.itemImage?.localFile.childImageSharp.gatsbyImageData }
                                            title            = { _.itemTitle }
                                            subtitle         = { _.itemSubtitle }
                                            content          = { _.itemContent }
                                            truncate         = { truncate }
                                            mode             = { mode }
                                            truncateLines    = { truncateLines }
                                            className        = { `${ 'item-'+index } ${_.itemCss} ${ ( itemClass ) ? itemClass : '' }` }
                                            removeDefaultCss = { _.itemCssRemoveDefault }
                                            buttons          = { _.itemButtons?.sectionCarouselItemButtonsButton }
                                            aspectRatio      = { aspectRatio }
                                            campus           = { campus }
                                        />
                                    ))
                                }
                            </Carousel>
                        :
                            undefined
                    }
                </div>
            </Container>

        </section>
        
    )

}