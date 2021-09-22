
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import TextTruncate from 'react-text-truncate'

import BlurbVerticalDarkVod from '../blurb/blurbVerticalDarkVod'
import {responsive} from '../../../../data/feedConfiguration'
import './sectionFeedCarousel.scss'

export default function SectionFeedCarouselDescription( { title, description, items, className, itemsVisible, id, iconCarousel, ...props} ){
    
    const defaultVisible = 3

    const objLength = items.length

    return (

        <section className={`sectionFeedCarousel withDescription ${className}`} id={id}>
            <Container fluid>
                <h4 className="h-color-six-shade-three mb-5">{title}</h4>
                <Row>
                    <Col sm="12" md="3" lg="3" xl="3">
                        <div className="description position-relative z-index-2">
                            {
                                (description) ? 
                                    <TextTruncate
                                        line={6} 
                                        element="p" 
                                        truncateText="…" 
                                        text={description.replace(/<p>/, '').replace(/<\/p>/, '')} 
                                    /> 
                                : undefined
                            }
                        </div>
                    </Col>
                    <Col sm="12" md="9" lg="9" xl="9">
                        <Carousel 
                            swipeable={true}
                            draggable={true}
                            showDots={false}
                            infinite={true}
                            responsive={ (itemsVisible) ? responsive[itemsVisible] : responsive[defaultVisible] }
                            itemClass="item"
                            containerClass="carousel-container"
                        >
                            {
                                items.map( (obj, index) => (
                                    <BlurbVerticalDarkVod 
                                        key={index}
                                        className={ (objLength === index + 1) ? 'last' : undefined }
                                        featuredImage={ (obj.featuredImage) ? obj.featuredImage.node.localFile.childImageSharp.fluid : undefined }
                                        link={ (obj.slug) ? `/watch/message/${obj.slug}` : null }
                                        title={ (obj.videoDetails.videoSeries) ? obj.title : null }
                                        serieTitle={(obj.videoDetails.videoSeries.title) ? obj.videoDetails.videoSeries.title : null}
                                        serieLink={(obj.videoDetails.videoSeries.slug) ? `/watch/serie/${obj.videoDetails.videoSeries.slug}` : null}
                                        subtitle={ (obj.videoDetails.speaker) ? (obj.videoDetails.speaker) : null }
                                        excerpt={ (obj.excerpt) ? obj.excerpt : null }
                                    />
                                ))
                            }
                        </Carousel>
                    </Col>
                </Row>
            </Container>
        </section>

    )
}

