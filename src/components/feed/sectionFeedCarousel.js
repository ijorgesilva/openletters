// Dependencies
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Container } from 'react-bootstrap'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

// Components
import BlurbHorizonal from '../blurb/blurbHorizontal'
import { responsive } from '../../../data/feedConfiguration'
import './sectionFeedCarousel.scss'
import { getDate } from '../../components/utils/utils'

export default function SectionFeedCarousel ( { title, items, className, id, slug, itemsVisible, date, ...props } ) {

    const defaultVisible = 4

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
                                title={ obj.title }
                                featuredImage={ (obj.featuredImage) ? obj.featuredImage.node.localFile.childImageSharp.fluid.src : undefined }
                                className={ (objLength === index + 1) ? 'last' : undefined }
                                noImage={ noImage }
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
