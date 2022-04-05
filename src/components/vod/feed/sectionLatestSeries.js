import React from 'react'
import { Container } from 'react-bootstrap'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import {responsive} from '../../../../data/feedConfiguration'
import config from '../../../../data/SiteConfig'
import { useLatestSeries } from '../../../hooks/useLatestSeries'
import BlurbVerticalSeries from '../blurb/blurbVerticalSeries'


import './sectionLatestSeries.scss'

export default function SectionLatestSeries ( 
    { 
        title, 
        className, 
        id, 
        campus, 
        styles, 
        infinite, 
        configLayout, 
        mode, 
        width,
        size,
    } 
    ) {
    
    const latestSeries = useLatestSeries( campus )
    const objLength = ( latestSeries ) ? latestSeries.length : 0
    let defaultConfig = ( configLayout ) ?
                            configLayout
                        :
                            {
                                excerpt: true,
                                itemsVisible: 5,
                            }
    

    return (
        <section 
            className   = {`sectionLatestSeries ${ size ? size : 'mf' } ${ mode ? mode : 'light' } ${ className ? className : '' }`} 
            id          = {id} 
            style       = {styles}
        >
            <Container fluid = { width === 'container' ? undefined : false }>
                {
                    (title) ? 
                        <h4 className="title">{title}</h4>
                    : 
                        undefined
                }
                {
                    ( latestSeries?.length > 0 ) ?
                        <Carousel 
                            swipeable       = { true }
                            draggable       = { true }
                            showDots        = { false }
                            infinite        = { (infinite) ? infinite : false }
                            partialVisible  = { true }
                            responsive      = { responsive[defaultConfig.itemsVisible] }
                            itemClass       = "item"
                            containerClass  = "carousel-container"
                        >
                            {
                                latestSeries.map ( ( _, index ) => (
                                    <BlurbVerticalSeries 
                                        key             = { index }
                                        className       = { ( objLength === index + 1 ) ? 'last' : undefined }
                                        mode            = { mode }
                                        title           = { _.title }
                                        link            = {  ( _.slug ) ? 
                                                                `${ ( campus ) ? '/' + campus : '' }/${config.watchSeriesDetailsSlug}/${_.slug}` 
                                                            : 
                                                                undefined 
                                                            }
                                        poster          =    { 
                                                                ( _.seriesGraphics.poster?.localFile ) ? 
                                                                    _.seriesGraphics.poster.localFile.childImageSharp.gatsbyImageData
                                                                : 
                                                                    undefined
                                                            }
                                        logo            =   { 
                                                                ( _.seriesGraphics.logo?.localFile ) ? 
                                                                    _.seriesGraphics.logo.localFile.childImageSharp.gatsbyImageData
                                                                : 
                                                                    undefined
                                                            }
                                        background      =   { 
                                                                ( _.seriesGraphics.background?.localFile ) ?
                                                                    _.seriesGraphics.background.localFile.childImageSharp.gatsbyImageData
                                                                :
                                                                    undefined
                                                            }
                                    />
                                ))
                            }
                        </Carousel>
                    :
                        undefined
                }
            </Container>
        </section>
    )

}