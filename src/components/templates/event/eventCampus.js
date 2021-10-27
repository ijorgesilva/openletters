import { graphql } from 'gatsby'
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import config from '../../../../data/SiteConfig'
import { useGlobalIndeces } from '../../../hooks/useGlobalIndeces'
import AlertEmptyState from '../../alert/alertEmptyState'
import BlurbHorizontal from '../../blurb/blurbHorizontal'
import FooterSimpleText from '../../footer/footerSimpleText'
import HeaderPage from '../../headerPage'
import MenuPage from '../../menu/menuPage'
import Navigation from '../../menu/navigation'
import { getDate } from '../../utils/utils'
import './eventCampus.scss'

export default function EventsCampus ( { data, location, pageContext } ) {

    const { title, featuredImage, breadcrumbs } = pageContext
    
    const { t } = useTranslation()
    const mode          = 'dark'
    const contentMode   = 'light'
    
    return (
        <>

            <HeaderPage
                title       = { t('global.events.title') + ' | ' + title }
                location    = { location } 
                className   = 'eventCampus'
                mode        = { contentMode }
                cover       = { 
                                (featuredImage?.node?.localFile) ?
                                    featuredImage.node.localFile.childImageSharp.gatsbyImageData.images.fallback.src
                                : 
                                    undefined 
                                }
                description = { t('global.events.description') }
            />
            
            <Navigation
                location        = { location }
                mode            = { mode }
                campus          = { breadcrumbs.campus }
                searchIndices   = { useGlobalIndeces() }
                menuGlobal
                menuLocal
            />
            
            <MenuPage
                mode        = { mode }
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

            <section className = {`content ${ contentMode ? contentMode : 'light' }`}>
                <Container className='mt-3 mb-3'>
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
                                            mode            = { contentMode }
                                            title           = { event.title }
                                            eventDate       = { event.eventDetails.eventDates }
                                            subtitle        = { getDate(event.modified.toString(), 2, 'us', 'LLLL d, yyyy' ) }
                                            tags            =   { 
                                                                    ( event.tags?.nodes ) ? 
                                                                        event.tags 
                                                                    : 
                                                                        undefined  
                                                                }
                                            excerpt         = { event.excerpt }
                                            type            = 'event'
                                            link            = { `/${breadcrumbs.campus}/${config.eventPostDetailsSlug}/${event.slug}` }
                                            linkText        = { event.title }
                                        />
                                    ))
                                :
                                    <AlertEmptyState mode = { mode } className='mt-5' content='' />
                            }
                        </Col>
                    </Row>
                </Container>
            </section>

            <FooterSimpleText 
                campus = { breadcrumbs.campus } 
                mode   = { contentMode }
            />

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
                tags {
                    nodes {
                        slug
                        name
                    }
                }
            }
        }
    }

`