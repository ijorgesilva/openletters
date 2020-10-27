// Dependencies
import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useTranslation } from "react-i18next"

// Components
import { getDate } from '../../utils/utils'
import HeroPost from '../../../components/hero/heroPost'
import HeaderPage from '../../headerPage'
import TagSimple from '../../tag/tagSimple'
import ShareSimpleIcon from '../../social/shareSimpleIcon'
import HorizontalScrollingMenu from '../../menu/horizontalScrollingMenu'
import { eventsBrand, eventsMenu } from '../../../../data/menues'
import './eventDetails.scss'

export default function EventDetails( { pageContext, location } ){
    
    /* Standard fields */
    const { t } = useTranslation()

    const { title, node: {excerpt, date, modified, featuredImage, content, terms, eventDetails} } = pageContext

    const htmlDate = (modified) ? getDate(modified,2,'us','yyyy-MM-dd' ) : getDate(date,2,'us','yyyy-MM-dd' )
    const createdDate = getDate(date,2,'us','LLLL d, yyyy' )
    const modifiedDate = getDate(modified,2,'us','LLLL d, yyyy' )
    
    return (
        <>

            <HeaderPage 
                title={title} 
                location={location} 
                cover={featuredImage.node.localFile.childImageSharp.fluid.src}
                description={excerpt}
                article={true}
            />
            
            <HorizontalScrollingMenu
                menuBrand={eventsBrand}
                menu={eventsMenu}
            />

            <article className="contentMain mb-5">

                <HeroPost 
                    title={title}
                    backgroundPhoto={featuredImage.node.localFile.childImageSharp.fluid.src}
                    className="z-index-0"
                />

                <Container className="mt-5">
                    
                    <Row>

                        <Col>
                            <div className="watchLeft sticky">
                                {
                                    (eventDetails.eventAddress) ?
                                        <span>{eventDetails.eventAddress}</span>
                                    : undefined
                                }
                                {
                                    (eventDetails.eventDates) ?
                                        <>
                                            <span>{eventDetails.eventDates.eventDate} {eventDetails.eventDates.time}</span>
                                        </>
                                    : undefined
                                }
                                {
                                    ( eventDetails.eventLink.eventLinkText && eventDetails.eventLink.eventLinkUrl ) ?
                                        <div>
                                            <Button className="btn btn--animation btn--dark-outline" variant="none" href={eventDetails.eventLink.eventLinkUrl} target="_blank">
                                                {eventDetails.eventLink.eventLinkText}
                                            </Button>
                                        </div>
                                    : undefined
                                }
                                <hr />
                                <ShareSimpleIcon />
                            </div>
                        </Col>

                        <Col className="" xs={12} md={7}>
                            <div dangerouslySetInnerHTML={{__html: content}}>
                            </div>
                            <TagSimple terms={terms} />

                            <div className="createdDate user-select-none">
                                {
                                    (modifiedDate) ? 
                                        <time datetime={htmlDate}> {modifiedDate} </time> 
                                    : 
                                        <time datetime={htmlDate}> {createdDate} </time>
                                }
                            </div>
                            
                        </Col>

                        <Col>
                        </Col>
                    </Row>
                </Container>

            </article>
        </>
    )
}