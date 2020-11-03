// Dependencies
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Container } from 'react-bootstrap'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

// Components
import BlurbVerticalDark from '../blurb/blurbVerticalDark'
import {responsive} from '../../../../data/feedConfiguration'
import config from '../../../../data/SiteConfig'
import './sectionFeedCarouselVod.scss'

export default function SectionFeedCarousel( { title, items, className, itemsVisible, id, iconCarousel, ...props } ){

    const defaultVisible = 5

    const data = useStaticQuery(graphql`
        query{
            noImage: file(relativePath: {eq: "img/global/noimage.jpg"}) {
                childImageSharp {
                    fluid {
                        src
                    }
                }
            }
        }
    `)

    const noImage = data.noImage ? data.noImage : data.noImage.childImageSharp.fluid.src

    const objLength = items.nodes.length

    return (

        <section className={`sectionFeedCarouselVod ${className}`} id={id}>
            <Container fluid>
                <h4 className="h-color-six-shade-three mb-5">{title}</h4>
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
                        items.nodes.map( (obj, index) => (
                            <BlurbVerticalDark 
                                key={index}
                                className={ (objLength === index + 1) ? 'last' : undefined }
                                featuredImage={ (obj.featuredImage) ? obj.featuredImage.node.localFile.childImageSharp.fluid : undefined }
                                noImage={noImage}
                                link={ (obj.slug) ? `${config.watchMessageDetailsSlug}/${obj.slug}` : null }
                                title={ (obj.videoDetails.serie) ? obj.title : null }
                                serieTitle={(obj.videoDetails.serie) ? obj.videoDetails.serie.title : null}
                                serieLink={(obj.videoDetails.serie) ? `/watch/serie/${obj.videoDetails.serie.slug}` : null}
                                subtitle={ (obj.videoDetails.speaker) ? (obj.videoDetails.speaker) : null }
                                excerpt={ (obj.excerpt) ? obj.excerpt : null }
                                //iconImage={ (iconCarousel) ? iconCarousel : null }
                            />
                        ))
                    }
                </Carousel>
            </Container>
        </section>

    )
}

