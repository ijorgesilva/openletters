// Dependencies
import React from 'react'
import { Container } from 'react-bootstrap'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import './sectionFeedCarousel.scss'

// Components
import BlurbVerticalDark from '../../blurb/blurbVerticalDark'

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 6
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4
    },
    mobile: {
      breakpoint: { max: 375, min: 0 },
      items: 3
    }
  };

export default function SectionFeedCarousel(props){

    return (

        <section className={`sectionFeedCarousel pt-5 pb-5 ${props.className}`} id={props.id}>
            <Container fluid>
                <h4 className="h-color-six-shade-three mb-3">{props.title}</h4>
                <Carousel 
                    swipeable={true}
                    draggable={true}
                    showDots={false}
                    infinite={false}
                    responsive={responsive}
                    itemClass="carousel-item-padding-40-px"
                    containerClass="carousel-container"
                >
                    {
                        props.data.allWpVideoOnDemand.nodes.map( (obj, index) => (
                            <BlurbVerticalDark 
                                key={index}
                                featuredImage={ (obj.featuredImage) ? obj.featuredImage.node.localFile.childImageSharp.fluid : undefined }
                                noImage={ (props.noImage) ? props.noImage : null }
                                link={ (obj.slug) ? `/message/${obj.slug}` : null }
                                title={ (obj.VodVideo.serie) ? (obj.title + "<span>  |  " + obj.VodVideo.serie.title + "</span>") : (obj.title) }
                                subtitle={ (obj.VodVideo.speaker) ? (obj.VodVideo.speaker) : null }
                                excerpt={ (obj.excerpt) ? obj.excerpt : null }
                                iconImage={ (props.iconCarousel) ? props.iconCarousel : null }
                            />
                        ))
                    }
                </Carousel>
            </Container>
        </section>

    )
}

