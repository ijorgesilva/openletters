import React from 'react'
import { Container } from 'react-bootstrap'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import {responsive} from '../../../../data/feedConfiguration'
import config from '../../../../data/SiteConfig'
import BlurbVerticalDarkVod from '../blurb/blurbVerticalDarkVod'
import './sectionFeedCarousel.scss'

export default function SectionFeedCarousel( 
    { 
        title, 
        items, 
        className, 
        id, 
        iconCarousel, 
        count, 
        campus, 
        styles, 
        infinite, 
        configLayout, 
        mode, 
        width,
        order,
        size,
    } 
    ){

    const objLength = (items) ? items.length : 0
    let sortedItems = []
    let defaultConfig = ( configLayout ) ?
                            configLayout
                        :
                            {
                                excerpt: true,
                                itemsVisible: 5,
                            }

    switch ( order ) {
        case 'asc':
            sortedItems = items.sort().reverse()
            break
        case 'desc':
        default:
            sortedItems = items
            break
    }
    
    return (

        <section className={`sectionFeedCarousel ${ size ? size : 'md' } ${ mode ? mode : 'light' } ${ ( className ) ? className : '' }`} id={id} style={styles}>
            <Container fluid = { width === 'container' ? false : true }>
                {
                    (title) ? 
                        <h4 className="title">{title}</h4>
                    : 
                        undefined
                }
                {
                    ( items?.length > 0 ) ?
                        <Carousel 
                            swipeable={true}
                            draggable={true}
                            showDots={false}
                            infinite={ (infinite) ? infinite : false }
                            partialVisible={true}
                            responsive={ responsive[defaultConfig.itemsVisible] }
                            itemClass="item"
                            containerClass="carousel-container"
                        >
                            {
                                sortedItems.map( (item, index) => (
                                    <BlurbVerticalDarkVod 
                                        key             = {index}
                                        className       = { ( objLength === index + 1 ) ? 'last' : undefined }
                                        mode            = { mode }
                                        featuredImage   = { item.featuredImage?.node ? item.featuredImage.node.localFile.childImageSharp.gatsbyImageData : undefined }
                                        link            = { item.slug ? 
                                                                `${ ( campus ) ? '/' + campus : '' }/${config.watchMessageDetailsSlug}/${item.slug}` 
                                                            : 
                                                                undefined 
                                                        }
                                        serieLink       = { item.videoDetails.videoSeries ? 
                                                                    `${ ( campus ) ? '/' + campus : '' }/${config.watchSeriesDetailsSlug}/${item.videoDetails.videoSeries.slug}` 
                                                                :
                                                                    undefined
                                                            }
                                        title           = { `${ ( count === true ) ? ( order === 'asc' ) ? '<span>' + (index + 1) + ' |</span> ' : ( order === 'desc' ) ? '<span>' + Math.abs( index - sortedItems.length ) + ' |</span> ' : '' : ''}  ${item.title}` }
                                        serieTitle      = { ( item.videoDetails.videoSeries ) ? 
                                                                item.videoDetails.videoSeries.title
                                                            : 
                                                                undefined
                                                            }
                                        subtitle        = { (item.videoDetails.videoSpeaker) ? (item.videoDetails.videoSpeaker) : undefined }
                                        excerpt         = { ( item.excerpt && defaultConfig.excerpt === true ) ? item.excerpt : undefined }
                                        iconImage       = { (iconCarousel) ? iconCarousel : undefined }
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

