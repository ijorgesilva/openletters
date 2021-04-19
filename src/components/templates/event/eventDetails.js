// Dependencies
import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useTranslation } from "react-i18next"

// Components
import { getDate } from '../../utils/utils'
import Navigation from '../../menu/navigation'
import HeroPost from '../../../components/hero/heroPost'
import HeaderPage from '../../headerPage'
import TagSimple from '../../tag/tagSimple'
import ToolbarDetails from '../../toolbar/toolbarDetails'
import MenuPage from '../../menu/menuPage'
import FooterSimpleText from '../../footer/footerSimpleText'
import config from '../../../../data/SiteConfig'
import './eventDetails.scss'

export default function EventDetails( { pageContext, location } ){
    
    /* Standard fields */
    const { t } = useTranslation()

    const { title, excerpt, date, modified, featuredImage, content, eventTags, eventDetails, breadcrumbs } = pageContext

    const htmlDate = ( modified ) ? 
                        getDate(modified,2,'us','yyyy-MM-dd' ) 
                    : 
                        getDate(date,2,'us','yyyy-MM-dd' )
    const createdDate = getDate(date,2,'us','LLLL d, yyyy' )
    const modifiedDate = getDate(modified,2,'us','LLLL d, yyyy' )
    
    const cover = ( featuredImage?.node?.localFile?.localFile ) ?
                        featuredImage.node.localFile.localFile.childImageSharp.gatsbyImageData.images.fallback.src
                    :
                        undefined
    


    return (
        <>
            <HeaderPage 
                title       = { title + ' | ' + t('global.events.title') }
                location    = { location } 
                cover       = { cover }
                description = { ( excerpt ) ? excerpt : excerpt}
                article     = { true }
            />
            
            <Navigation
                location    = { location }
                campus      = { breadcrumbs.campus }
                menuGlobal
                menuLocal
            />
            
            <MenuPage
                menuBrand   =   { 
                                    {
                                        'name': t('global.events.title'),
                                        'link': '/' + breadcrumbs.campus + '/' + config.eventPostDetailsSlug,
                                    }
                                } 
                menu        =   { 
                                    [
                                        
                                    ]
                                }
            />

            <article className="contentMain mb-5">

                <HeroPost 
                    title           = { title }
                    backgroundPhoto =   {
                                            ( featuredImage ) ? 
                                                featuredImage.node.localFile.childImageSharp.gatsbyImageData
                                            : 
                                                undefined
                                        }
                    className       = "z-index-0"
                />

                <Container className="mt-5">
                    
                    <Row>

                        <Col>
                            <div className="watchLeft sticky">
                                {
                                    ( eventDetails.eventLink.eventLinkText && eventDetails.eventLink.eventLinkUrl ) ?
                                        <div>
                                            <Button className="btn btn--animation btn--dark-outline" variant="none" href={eventDetails.eventLink.eventLinkUrl} target="_blank">
                                                {eventDetails.eventLink.eventLinkText}
                                            </Button>
                                        </div>
                                    : 
                                    undefined
                                }
                                {
                                    ( eventDetails.eventDates.length > 0 ) ?
                                        <div className="mb-3">
                                            <h6>{t('global.events.date-time')}</h6>
                                                {
                                                    eventDetails.eventDates.map( (date, index) => (
                                                        <span key={index}>
                                                            <time datetime={getDate(date.eventDate,2,'us','yyyy-MM-dd' )}> 
                                                                {getDate(date.eventDate,2,'us','LLLL d, yyyy' )} | 
                                                                {date.eventTime}
                                                            </time> 
                                                        </span>
                                                    ))
                                                }
                                        </div>
                                    : 
                                        undefined
                                }
                                {
                                    ( eventDetails.eventAddress ) ?
                                        <div className="mb-3">
                                            <h6>{t('global.events.location')}</h6>
                                            <span>{eventDetails.eventAddress}</span>
                                        </div>
                                    :
                                        undefined
                                }
                                {
                                    (eventDetails.eventCampus) ? 
                                        <div className="mb-3">
                                            <h6>{t('global.events.organized-by')}</h6>
                                            {
                                                eventDetails.eventCampus.map ( (campus, index) => (
                                                    <span key={index} className="user-select-none d-block">
                                                        {campus.title}
                                                    </span>
                                                ))
                                            }
                                        </div> 
                                    : 
                                        undefined
                                }
                                <hr />
                                <ToolbarDetails location={location} />
                            </div>
                        </Col>

                        <Col className="" xs={12} md={7}>
                            <div dangerouslySetInnerHTML={{__html: content}}>
                            </div>
                            
                            {
                                ( eventTags ) ?
                                    <TagSimple terms={eventTags} />
                                :
                                    undefined
                            }

                            {
                                ( config.blogShowDates ) ?
                                    <div className="createdDate user-select-none">
                                        { 
                                            (modifiedDate) ? 
                                                <time datetime={htmlDate}> {t('global.modified-on')} {modifiedDate} </time> 
                                            : 
                                                <time datetime={htmlDate}> {t('global.created-on')} {createdDate} </time>
                                        }
                                    </div>
                                :
                                    undefined
                            }
                            
                        </Col>

                        <Col>
                        </Col>
                    </Row>
                </Container>

            </article>

            <FooterSimpleText campus={ breadcrumbs.campus } />
        </>
    )
}