import React from 'react'
import { Container } from 'react-bootstrap'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import './sectionFeedCarouselResources.scss'
import {responsive} from '../../../data/feedConfiguration'
import config from '../../../data/SiteConfig'
import BlurbVertical from '../blurb/blurbVertical'

export default function SectionFeedCarouselResources ( { title, items, className, variant, itemsVisible, id, excerpt } ) {
    
    const defaultVisible = 5

    return(
        <div className={`sectionFeedCarouselResources ${ className ? className : ''} ${variant ? variant : 'dark'}`} id={id}>
            <Container fluid>

                <h4 className='h-color-six-shade-three mb-5'>{title}</h4>
                    <Carousel 
                        swipeable={true}
                        draggable={true}
                        showDots={false}
                        infinite={true}
                        responsive={ (itemsVisible) ? responsive[itemsVisible] : responsive[defaultVisible] }
                        itemClass='item'
                        containerClass='carousel-container'
                    >
                        {
                            (items) ?
                                items.map( (item, index) => (
                                    (item.status === 'publish' && item.linkDetails) ? 
                                        <div key={index}>
                                            <BlurbVertical 
                                                title={item.title}
                                                link={ (item.linkDetails.linkLink.linkLinkUrl) ? item.linkDetails.linkLink.linkLinkUrl : undefined }
                                                target={ (item.linkDetails.linkLink.linkLinkTarget) ? item.linkDetails.linkLink.linkLinkTarget : undefined }
                                                linkType={ (item.linkDetails.linkLink.linkLinkType) ? item.linkDetails.linkLink.linkLinkType : undefined }
                                                featuredImage={ item.featuredImage?.node ? item.featuredImage.node.localFile.childImageSharp.fluid : undefined }
                                                excerpt={ (item.excerpt && excerpt === true) ? item.excerpt : undefined }
                                                variant={ (variant) ? variant : undefined }
                                            />
                                        </div>
                                    :
                                        (item.status === 'publish') ?
                                            <div key={index}>
                                                <BlurbVertical 
                                                    title={item.title}
                                                    link={`${config.blogPostDetailsSlug}/${item.slug}`}
                                                    featuredImage={ item.featuredImage?.node ? item.featuredImage.node.localFile.childImageSharp.fluid : undefined}
                                                    excerpt={ (item.excerpt && excerpt === true) ? item.excerpt : undefined }
                                                    variant={ (variant) ? variant : undefined }
                                                />
                                            </div>
                                        : undefined
                                ))
                            : 
                                undefined
                        }
                
                    </Carousel>
            </Container>
        </div>
    )
}