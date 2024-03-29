import { graphql } from 'gatsby'
import React from 'react'
import { useTranslation } from 'react-i18next'

import config from '../../../../data/SiteConfig'
import { useGlobalIndeces } from '../../../hooks/useGlobalIndeces'
import { useTheme } from '../../../hooks/useTheme'
import RenderFeed from '../../feed/renderFeed'
import FooterSimpleText from '../../footer/footerSimpleText'
import MenuPage from '../../menu/menuPage'
import Navigation from '../../menu/navigation'
import PageHeader from '../../pageHeader'
import RenderComponent from '../../renderer'
import './eventCampus.scss'

export default function EventsCampus ( { data, location, pageContext } ) {

    const { title, featuredImage, breadcrumbs, campusDetails } = pageContext
    
    const { t } = useTranslation()
    const theme         = useTheme()
    const contentMode   = 'light'

    const sections =    campusDetails.campusPages.campusEvents.pageSections?.length > 0 ? 
                            campusDetails.campusPages.campusEvents.pageSections 
                        : 
                            undefined
    return (
        <>

            <PageHeader
                title       = { t('global.events.title') + ' | ' + title }
                className   = 'eventCampus'
                mode        = { contentMode }
                cover       = { 
                                featuredImage?.node ?
                                    featuredImage.node.localFile.childImageSharp.gatsbyImageData.images.fallback.src
                                : 
                                    undefined 
                                }
                description = { t('global.events.description') }
            />
            
            <Navigation
                location        = { location }
                mode            = { theme.styles.header }
                campus          = { breadcrumbs.campus }
                searchIndices   = { useGlobalIndeces() }
                menuGlobal
                menuLocal
            />
            
            <MenuPage
                mode        = { theme.styles.header }
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

            {
                config.archiveMode === 'internal' ?
                    <RenderFeed 
                        view            = { 'events' }
                        feeds           = { data.events }
                        campus          = { breadcrumbs.campus }
                        containerWidth  = { 'container' }
                        size            = { 'md' }
                        className       = { '' }
                        mode            = { contentMode }
                        itemsPerPage    = { 3 }
                    />
                : undefined
            }

            {
                sections?.map( ( _, index ) => (
                    <RenderComponent 
                        key         = { index }
                        section     = { _ }
                        campus      = { breadcrumbs.campus }
                        location    = { location }
                        mode        = { contentMode }
                    />
                ))
            }

            <FooterSimpleText 
                campus = { breadcrumbs.campus } 
                mode   = { theme.styles.footer }
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
                    eventExternalOnly
                    eventAddress
                    eventDates {
                        eventDate
                        eventTime
                    }
                    eventLink {
                        eventLinkText
                        eventLinkUrl
                    }
                    eventCampus {
                        ... on WpCampus {
                            id
                            slug
                            title
                            status
                        }
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