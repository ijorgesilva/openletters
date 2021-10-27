import React from 'react'
import { Container } from 'react-bootstrap'
import { useTranslation } from "react-i18next"
import Carousel from 'react-multi-carousel'

import 'react-multi-carousel/lib/styles.css'
import { responsive } from '../../../data/feedConfiguration'
import './sectionFeedCarousel.scss'
import { getDate } from '../../components/utils/utils'
import BlurbHorizontal from '../blurb/blurbHorizontal'

export default function SectionFeedCarouselMultipleSources ( { title, itemsNews, itemsEvents, slugOne, slugTwo, itemsVisible, className, id } ) {

    
    const { t } = useTranslation()
    
    const defaultVisible = 4

    const objLengthOne = itemsNews.nodes.length
    const objLengthTwo = itemsEvents.nodes.length

    return (
        <section className={`sectionFeedCarousel ${ className ? className : '' }`} id={id}>
            <Container fluid>
                <h4 className="h-color-six-shade-three mb-5" dangerouslySetInnerHTML={{__html: title}}></h4>
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
                        (itemsNews && slugOne) ?
                            itemsNews.nodes.map( (obj, index) => (
                                <BlurbHorizontal 
                                    key={ index }
                                    title={ obj.title }
                                    featuredImage={ (obj.featuredImage) ? obj.featuredImage.node.localFile.childImageSharp.fluid.src : undefined }
                                    className={ (objLengthOne === index + 1) ? 'last' : undefined }
                                    // tag={"<img src='"+data.newsIcon.publicURL+"' alt='News'/> News"}
                                    tag={t('global.news')}
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
                                <BlurbHorizontal 
                                    key = { index }
                                    keyIndex={ index }
                                    title={ obj.title }
                                    featuredImage={ (obj.featuredImage) ? obj.featuredImage.node.localFile.childImageSharp.fluid.src : undefined }
                                    className={ (objLengthTwo === index + 1) ? 'last' : undefined }
                                    // tag={"<img src='"+data.eventIcon.publicURL+"' alt='Event'/> Event"}
                                    tag={t('global.event')}
                                    link={ (obj.slug) ? `${slugTwo}${obj.slug}` : null }
                                    subtitle={
                                        (obj.eventDetails.eventDates[0].eventDate && obj.eventDetails.eventDates[0].eventTime) ? 
                                                getDate(obj.eventDetails.eventDates[0].eventDate,2,'us','LLLL d, yyyy' ) + ' | ' + obj.eventDetails.eventDates[0].eventTime
                                        : 
                                            (obj.eventDetails.eventDates[0].eventDate) ? 
                                                getDate(obj.eventDetails.eventDates[0].eventDate,2,'us','LLLL d, yyyy' )
                                            :
                                                undefined
                                    }
                                    excerpt={ (obj.excerpt) ? obj.excerpt : null }
                                />
                            ))
                        : undefined
                    }
                </Carousel>
            </Container>
        </section>
    )
}
