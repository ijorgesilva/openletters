import React from 'react'
import { Container } from 'react-bootstrap'
import Carousel from 'react-multi-carousel'

import { useGetResponsive } from '../../hooks/useGetResponsive'
import BlurbVertical from '../blurb/blurbVertical'
import Background from '../UI/background'

import 'react-multi-carousel/lib/styles.css'
import './sectionCarousel.scss'

export default function SectionCarousel ( { 
        items,
        id, 
        className, 
        title, 
        content, 
        containerWidth, 
        mode, 
        size,
        backgroundLayers,
        // Behavior
        swipeable, 
        draggable, 
        infinite,
        partialVisible, 
        autoplay,
        stretchedLink,
        // Aspect
        orientation,
        itemType,
        dots,
        dotsClass,
        interval,
        gap,
        itemClass,
        truncate,
        truncateLines,
        imagePosition,
        imageFit,
        aspectRatio,
        border,
        borderColor,
        itemGrow,
        // Visibility
        hideImage,
        hideTitle,
        hideSubtitle,
        hideExcerpt,
        hideButton,
        // Responsive
        responsive,
    } ) {

    const responsiveConf = useGetResponsive(responsive)

    return (

        <section id = {id} className = {`sectionCarousel ${ size ? size : ''} ${ className ? className : ''} ${ mode ? mode : 'light' }`}>

            <Container fluid = { containerWidth === 'container' ? undefined : true }>
                {
                    ( title || content ) ?
                        <div className='general'>
                            {
                                title ?
                                    <h2 className='title' dangerouslySetInnerHTML={{__html: title}}></h2>
                                :
                                    undefined
                            }
                            { 
                                content ?
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
                        ( items?.list?.length > 0 ) ?
                            <Carousel 
                                swipeable       = { swipeable ? swipeable : true }
                                draggable       = { draggable ? draggable : true }
                                infinite        = { infinite ? infinite : false }
                                partialVisible  = { partialVisible ? partialVisible : false }
                                autoPlay        = { autoplay ? autoplay : false }
                                autoPlaySpeed   = { interval ? interval : 3000 }
                                responsive      = { responsiveConf }
                                itemClass       = {`item ${ gap ? gap.split(':')[0] : '' }`}
                                showDots        = { dots ? dots : false }
                                dotListClass    = { dotsClass }
                                containerClass  = 'carousel-container'
                            >
                                {
                                    items.list.map( (_, index) => (
                                        <BlurbVertical
                                            key                 = { index }
                                            image               = { _.image }
                                            title               = { _.title }
                                            subtitle            = { _.subtitle }
                                            content             = { _.excerpt }
                                            
                                            itemType            = { itemType }
                                            mode                = { mode }
                                            buttons             = { _.buttons }
                                            // counter             = { counter }
                                            orientation         = { orientation }
                                            truncate            = { truncate }
                                            truncateLines       = { truncateLines }
                                            stretchedLink       = { stretchedLink }
                                            className           = { `${ _.cssClass ? _.cssClass : '' } ${ itemClass ? itemClass : '' }` }
                                            removeDefaultCss    = { _.itemCssRemoveDefault }
                                            imagePosition       = { imagePosition }
                                            imageFit            = { imageFit }
                                            aspectRatio         = { aspectRatio }
                                            border              = { border }
                                            borderColor         = { borderColor }
                                            itemGrow            = { itemGrow }
                                            // Visibility
                                            hideImage           = { hideImage }
                                            hideTitle           = { hideTitle }
                                            hideSubtitle        = { hideSubtitle }
                                            hideExcerpt         = { hideExcerpt }
                                            hideButton          = { hideButton }
                                        />
                                    ))
                                }
                            </Carousel>
                        :
                            undefined
                    }
                </div>
            </Container>

            <Background
                layers  = { backgroundLayers }
            />

        </section>
        
    )

}