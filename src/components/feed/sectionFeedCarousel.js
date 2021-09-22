
import React from 'react'
import { Container } from 'react-bootstrap'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import BlurbHorizonal from '../blurb/blurbHorizontal'
import { responsive } from '../../../data/feedConfiguration'
import './sectionFeedCarousel.scss'
import { getDate } from '../../components/utils/utils'

export default function SectionFeedCarousel ( { title, items, className, id, slug, itemsVisible, date, count, ...props } ) {

    const defaultVisible = 4

    const objLength = items.nodes.length

    return (
        <section className={`sectionFeedCarousel ${className}`} id={id}>
            <Container fluid>
                <h4 className="h-color-six-shade-three mb-5" dangerouslySetInnerHTML={{__html: title}}></h4>
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
                            <BlurbHorizonal 
                                key={ index }
                                title={` ${ (count === true) ? index + 1 : '' } obj.title `}
                                featuredImage={ (obj.featuredImage) ? obj.featuredImage.node.localFile.childImageSharp.fluid.src : undefined }
                                className={ (objLength === index + 1) ? 'last' : undefined }
                                link={ (obj.slug) ? `${slug}${obj.slug}` : null }
                                subtitle = { (obj.date) ? getDate(obj.date,2,'us','LLLL d, yyyy') : undefined }
                                excerpt = { (obj.excerpt) ? obj.excerpt : null }
                            />
                        ))
                    }
                </Carousel>
            </Container>
        </section>
    )
}
