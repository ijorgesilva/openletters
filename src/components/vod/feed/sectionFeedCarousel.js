// Dependencies
import React from 'react'
import { Container } from 'react-bootstrap'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

// Components
import BlurbVerticalDarkVod from '../blurb/blurbVerticalDarkVod'
import {responsive} from '../../../../data/feedConfiguration'
import config from '../../../../data/SiteConfig'
import './sectionFeedCarousel.scss'

export default function SectionFeedCarousel( { title, items, className, itemsVisible, id, iconCarousel, count, campus, styles, infinite } ){

    const defaultVisible = 5
    const objLength = (items) ? items.length : 0

    return (

        <section className={`sectionFeedCarousel ${className}`} id={id} style={styles}>
            <Container fluid>
                {
                    (title) ? 
                        <h4 className="h-color-six-shade-three mb-5">{title}</h4>
                    : 
                        undefined
                }
                {
                    ( items?.length ) ?
                        <Carousel 
                            swipeable={true}
                            draggable={true}
                            showDots={false}
                            infinite={ (infinite) ? infinite : false }
                            partialVisible={true}
                            responsive={ (itemsVisible) ? responsive[itemsVisible] : responsive[defaultVisible] }
                            itemClass="item"
                            containerClass="carousel-container"
                        >
                            {
                                items.map( (item, index) => (
                                    <BlurbVerticalDarkVod 
                                        key             = {index}
                                        className       = { ( objLength === index + 1 ) ? 'last' : undefined }
                                        featuredImage   = { ( item.featuredImage.node ) ? item.featuredImage.node.localFile.childImageSharp.gatsbyImageData : undefined }
                                        link            = {  ( item.slug ) ? 
                                                                `${ ( campus ) ? '/' + campus : '' }/${config.watchMessageDetailsSlug}/${item.slug}` 
                                                            : 
                                                                undefined 
                                                        }
                                        serieLink       = { ( item.videoDetails.videoSeries ) ? 
                                                                    `${ ( campus ) ? '/' + campus : '' }/${config.watchSeriesDetailsSlug}/${item.videoDetails.videoSeries.slug}` 
                                                                :
                                                                    undefined
                                                            }
                                        title           = { `${ (count === true) ? '<span>' + (index + 1) + ' |</span> ' : '' }  ${item.title}` }
                                        serieTitle      = { ( item.videoDetails.videoSeries ) ? 
                                                                item.videoDetails.videoSeries.title
                                                            : 
                                                                undefined
                                                            }
                                        subtitle        = { (item.videoDetails.videoSpeaker) ? (item.videoDetails.videoSpeaker) : undefined }
                                        excerpt         = { (item.excerpt) ? item.excerpt : undefined }
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

