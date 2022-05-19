import React from 'react'
import { useTranslation } from 'react-i18next'

import config from '../../../../data/SiteConfig'
import { useGenerateMinistryMenu } from '../../../hooks/useGenerateMinistryMenu'
import { useGlobalIndeces } from '../../../hooks/useGlobalIndeces'
import { useTheme } from '../../../hooks/useTheme'
import FooterSimpleText from '../../footer/footerSimpleText'
import MenuPage from '../../menu/menuPage'
import Navigation from '../../menu/navigation'
import PageHeader from '../../pageHeader'

import FeedRendering from './sections/feedRendering'
import SectionRendering from './sections/sectionRendering'

import './ministryDetails.scss'

export default function MinistryDetails( 
    { 
        pageContext, 
        location 
    } 
) {

    const { t } = useTranslation()
    const theme         = useTheme()
    const contentMode   = 'light'
        
    const { title, excerpt, featuredImage, breadcrumbs, view, ministryDetails, customPageIndex } = pageContext

    const cover =   featuredImage?.node?.localFile?.localFile ?
                        featuredImage.node.localFile.localFile.childImageSharp.gatsbyImageData.images.fallback.src
                    :
                        undefined
    return (
        <>

            <PageHeader 
                title       = { title + ' | ' + t('global.blog.title') }
                location    = { location } 
                cover       = { cover }
                description = { excerpt ? excerpt : excerpt }
                article     = { true }
                mode        = { contentMode }
                className   = { `${breadcrumbs.slug} ${ breadcrumbs.currentSlug ? breadcrumbs.currentSlug : '' }` }
            />
            
            <Navigation
                mode            = { theme.styles.header }
                location        = { location }
                campus          = { breadcrumbs.campus }
                searchIndices   = { useGlobalIndeces() }
                menuGlobal
                menuLocal
            />
            
            <MenuPage
                mode        = { theme.styles.header }
                close       = { '/' + breadcrumbs.campus + '/' +  config.ministrySlug }
                menuBrand   =   { 
                                    {
                                        'name': title,
                                        'link': '/' + breadcrumbs.campus + '/' + config.ministrySlug + '/' + pageContext.slug,
                                    }
                                } 
                menu        = { useGenerateMinistryMenu(breadcrumbs, ministryDetails.ministryPages, ministryDetails.ministryPagesCustom) }
                breadcrumbs = { breadcrumbs }
            />

            <FeedRendering 
                view            = { view }
                feeds           = { ministryDetails }
                campus          = { breadcrumbs.campus }
                location        = { location }
                containerWidth  = { 'container' }
                size            = { 'md' }
                className       = { '' }
                mode            = { contentMode }
                itemsPerPage    = { 3 }
            />

            <SectionRendering 
                view            = { view }
                pages           = { ministryDetails }
                campus          = { breadcrumbs.campus }
                location        = { location }
                contentMode     = { contentMode }
                customPageIndex = { customPageIndex }
            />

            <FooterSimpleText 
                campus  = { breadcrumbs.campus }
                mode    = { theme.styles.footer }
            />
            
        </>
    )
}