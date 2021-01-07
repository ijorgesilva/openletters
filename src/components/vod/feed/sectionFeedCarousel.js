// Dependencies
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Container } from 'react-bootstrap'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

// Components
import BlurbVerticalDarkVod from '../blurb/blurbVerticalDarkVod'
import {responsive} from '../../../../data/feedConfiguration'
import config from '../../../../data/SiteConfig'
import './sectionFeedCarouselVod.scss'

export default function SectionFeedCarousel( { title, items, className, itemsVisible, id, iconCarousel, count, ...props } ){

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

    const objLength = (items) ? items.nodes.length : 0

    return (

        <section className={`sectionFeedCarouselVod ${className}`} id={id}>
            <Container fluid>
                {
                    (title) ? 
                        <h4 className="h-color-six-shade-three mb-5">{title}</h4>
                    : 
                        undefined
                }
                <Carousel 
                    swipeable={true}
                    draggable={true}
                    showDots={false}
                    infinite={true}
                    partialVisible={true}
                    responsive={ (itemsVisible) ? responsive[itemsVisible] : responsive[defaultVisible] }
                    itemClass="item"
                    containerClass="carousel-container"
                >
                    {
                        items.nodes.map( (item, index) => (
                            <BlurbVerticalDarkVod 
                                key={index}
                                className={ (objLength === index + 1) ? 'last' : undefined }
                                featuredImage={ (item.featuredImage) ? item.featuredImage.node.localFile.childImageSharp.fluid : undefined }
                                noImage={noImage}
                                link={ (item.slug) ? `${config.watchMessageDetailsSlug}/${item.slug}` : null }
                                title={ `${ (count === true) ? '<span>' + (index + 1) + ' |</span> ' : '' }  ${item.title}` }
                                serieTitle={(item.videoDetails.serie) ? item.videoDetails.serie.title : null}
                                serieLink={(item.videoDetails.serie) ? `${config.watchSerieDetailsSlug}/${item.videoDetails.serie.slug}` : null}
                                subtitle={ (item.videoDetails.speaker) ? (item.videoDetails.speaker) : null }
                                excerpt={ (item.excerpt) ? item.excerpt : null }
                                iconImage={ (iconCarousel) ? iconCarousel : null }
                            />
                        ))
                    }
                </Carousel>
            </Container>
        </section>

    )
}

