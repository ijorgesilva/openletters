// Dependencies
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { useTranslation } from "react-i18next"
import { Container } from 'react-bootstrap'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

// Components
import BlurbHorizonal from '../blurb/blurbHorizontal'
import { responsive } from '../../../data/feedConfiguration'
import './sectionFeedCarousel.scss'
import { getDate } from '../../components/utils/utils'

export default function SectionFeedCarouselMultipleSources ( { title, itemsNews, itemsEvents, slugOne, slugTwo, itemsVisible, date, className, id, ...props } ) {

    /* Standard fields */
    const { t } = useTranslation()
    
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
            eventIcon: file(relativePath: {eq: "img/global/icon-calendar-white.svg"}) {
                publicURL
            }
            newsIcon: file(relativePath: {eq: "img/global/icon-news-white.svg"}) {
                publicURL
            }
        }
    `)

    const noImage = data.noImage ? data.noImage : data.noImage.childImageSharp.fluid.src

    const objLengthOne = itemsNews.nodes.length
    const objLengthTwo = itemsEvents.nodes.length

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
                        (itemsNews && slugOne) ?
                            itemsNews.nodes.map( (obj, index) => (
                                <BlurbHorizonal 
                                    key={ index }
                                    title={ obj.title }
                                    featuredImage={ (obj.featuredImage) ? obj.featuredImage.node.localFile.childImageSharp.fluid.src : undefined }
                                    className={ (objLengthOne === index + 1) ? 'last' : undefined }
                                    noImage={ noImage }
                                    // tag={"<img src='"+data.newsIcon.publicURL+"' alt='News'/> News"}
                                    tag={t('components.feed.SectionFeedCarouselMultipleSources.news')}
                                    tagClassName={"h-background-six"}
                                    link={ (obj.slug) ? `${slugOne}${obj.slug}` : null }
                                    // subtitle = { (obj.date) ? getDate(obj.date,2,'us','LLLL d, yyyy') : undefined }
                                    excerpt = { (obj.excerpt) ? obj.excerpt : null }
                                />
                            ))
                        : undefined
                    }
                    {
                        (itemsEvents && slugTwo) ?
                            itemsEvents.nodes.map( (obj, index) => (
                                <BlurbHorizonal 
                                    keyIndex={ index }
                                    title={ obj.title }
                                    featuredImage={ (obj.featuredImage) ? obj.featuredImage.node.localFile.childImageSharp.fluid.src : undefined }
                                    className={ (objLengthTwo === index + 1) ? 'last' : undefined }
                                    noImage={ noImage }
                                    // tag={"<img src='"+data.eventIcon.publicURL+"' alt='Event'/> Event"}
                                    tag={t('components.feed.SectionFeedCarouselMultipleSources.event')}
                                    link={ (obj.slug) ? `${slugTwo}${obj.slug}` : null }
                                    subtitle = { (obj.eventDetails.eventDates[0].eventDate) ? getDate(obj.eventDetails.eventDates[0].eventDate,2,'us','LLLL d, yyyy')+' - '+obj.eventDetails.eventDates[0].time : undefined }
                                    excerpt = { (obj.excerpt) ? obj.excerpt : null }
                                />
                            ))
                        : undefined
                    }
                </Carousel>
            </Container>
        </section>
    )
}
