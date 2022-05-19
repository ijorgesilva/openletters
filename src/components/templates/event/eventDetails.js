import React from 'react'
import { useTranslation } from 'react-i18next'

import config from '../../../../data/SiteConfig'
import { useTheme } from '../../../hooks/useTheme'
import FooterSimpleText from '../../footer/footerSimpleText'
import MenuPage from '../../menu/menuPage'
import Navigation from '../../menu/navigation'
import PageHeader from '../../pageHeader'

import Layout from './layouts'
import './eventDetails.scss'

export default function EventDetails( { pageContext, location } ){
    
    const { title, excerpt, date, modified, featuredImage, content, tags, eventDetails, breadcrumbs } = pageContext

    const { t } = useTranslation()
    const theme         = useTheme()
    const contentMode   = 'light'

    const searchIndices = [{ name: `vod`, title: `Messages` }, { name: `pages`, title: `Pages`} ]
    
    const cover =   featuredImage?.node?.localFile?.localFile ?
                        featuredImage.node.localFile.localFile.childImageSharp.gatsbyImageData.images.fallback.src
                    :
                        undefined
    const sections =    eventDetails.eventSections?.length > 0 ? 
                            eventDetails.eventSections
                        : 
                            undefined

    return (
        <>
            <PageHeader 
                title       = { title + ' | ' + t('global.events.title') }
                location    = { location }
                className   = 'eventDetails'
                mode        = { contentMode }
                cover       = { cover }
                description = { ( excerpt ) ? excerpt : excerpt}
                article     = { true }
            />
            
            <Navigation
                location        = { location }
                campus          = { breadcrumbs.campus }
                searchIndices   = { searchIndices }
                mode            = { theme.styles.header }
                menuGlobal
                menuLocal
            />
            
            <MenuPage
                mode        = { theme.styles.header }
                close       = { '/' + breadcrumbs.campus + '/' +  config.eventPostDetailsSlug }
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
        
            <Layout
                layout          = { eventDetails.eventLayout }
                location        = { location }
                title           = { title }
                excerpt         = { excerpt }
                date            = { date }
                modified        = { modified }
                featuredImage   = { featuredImage }
                content         = { content }
                tags            = { tags }
                eventDetails    = { eventDetails }
                breadcrumbs     = { breadcrumbs }
                sections        = { sections }
                campus          = { breadcrumbs.campus }
                mode            = { contentMode }
            />

            <FooterSimpleText 
                campus  = { breadcrumbs.campus } 
                mode    = { theme.styles.footer }
            />
        </>
    )
}