// Dependencies
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from "react-i18next"
import { graphql } from 'gatsby'

// Components
import AlertEmptyState from '../../alert/alertEmptyState'
import Navigation from '../../menu/navigation'
import { getDate } from '../../utils/utils'
import BlurbHorizontal from '../../blurb/blurbHorizontal'
import MenuPage from '../../menu/menuPage'
import HeaderPage from '../../headerPage'
import FooterSimpleText from '../../footer/footerSimpleText'
import config from '../../../../data/SiteConfig'
import './eventCampus.scss'

export default function EventsCampus ( { data, location, pageContext } ) {

    const { title, featuredImage, breadcrumbs } = pageContext

    /* Standard fields */
    const { t } = useTranslation()

    return (
        <>

            <HeaderPage
                title       = { t('global.events.title') + ' | ' + title }
                location    = { location } 
                cover       = { 
                                (featuredImage?.node?.localFile) ?
                                    featuredImage.node.localFile.childImageSharp.gatsbyImageData.images.fallback.src
                                : 
                                    undefined 
                                }
                description = { t('global.events.description') }
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

            <section className="">
                <Container className="mt-5 mb-5">
                    <Row>
                        <Col xs={12} md={8}>
                            {
                                ( data.events?.nodes.length > 0 ) ?
                                    data.events.nodes.map( ( event, index ) => (
                                        <BlurbHorizontal 
                                            key             = { index }
                                            className       = { 'mb-4' }
                                            featuredImage   =   {  
                                                                    ( event.featuredImage?.node?.localFile ) ? 
                                                                        event.featuredImage.node.localFile.childImageSharp.gatsbyImageData
                                                                    : 
                                                                        undefined    
                                                                }
                                            title           = { event.title }
                                            subtitle        = { getDate(event.modified.toString(), 2, 'us', 'LLLL d, yyyy' ) }
                                            tags            =   { 
                                                                    ( event.eventTags?.nodes ) ? 
                                                                        event.eventTags 
                                                                    : 
                                                                        undefined  
                                                                }
                                            link            = { `/${breadcrumbs.campus}/${config.eventPostDetailsSlug}/${event.slug}` }
                                            linkText        = { event.title }
                                            excerpt         = { event.excerpt }
                                        />
                                    ))
                                :
                                    <AlertEmptyState variant="transparent" className="mt-5" content="" />
                            }
                        </Col>
                    </Row>
                </Container>
            </section>


            <FooterSimpleText campus={ breadcrumbs.campus } />

        </>
    )
}
export const query = graphql`
    query events ( $campusId: String! ) {

        events: allWpEvent(
            filter: {
                status: {
                    eq: "publish"
                }, 
                eventDetails: {
                    eventCampusId: {regex: $campusId}
                }
            },
            sort: {
                fields: modified, 
                order: DESC
            }
            limit: 12
        ) {
            nodes{
                id
                title
                excerpt
                slug
                date(formatString: "YYYYMMDD")
                modified(formatString: "YYYYMMDD")
                featuredImage {
                    node {
                        localFile {
                            childImageSharp {
                                gatsbyImageData(layout: FULL_WIDTH)
                            }
                        }
                    }
                }
                eventDetails {
                    eventAddress
                    eventDates {
                        eventDate
                        eventTime
                    }
                    eventLink {
                        eventLinkText
                        eventLinkUrl
                    }
                }
                eventTags {
                    nodes {
                        slug
                        name
                    }
                }
            }
        }
    }

`