import React from 'react'
import { useTranslation } from "react-i18next"

import { useTheme } from '../../../hooks/useTheme'
import FooterSimpleText from '../../footer/footerSimpleText'
import PageHeader from '../../pageHeader'
import RenderComponent from '../../renderer'

import Menu from './menu'

import './landingDetails.scss'

export default function landingDetails( { location, pageContext } ){
    
    const { title, seo, featuredImage, pageLayout, pageSettings, breadcrumbs } = pageContext

    // eslint-disable-next-line no-unused-vars
    const { t } = useTranslation()

    const theme         = useTheme()
    const contentMode   = 'light'

    const cover =   featuredImage?.node?.localFile?.localFile ?
                        featuredImage.node.localFile.localFile.childImageSharp.gatsbyImageData.images.fallback.src
                    :
                        undefined
    
    const sections =    pageLayout.pageLayout?.length > 0 ? 
                            pageLayout.pageLayout
                        : 
                            undefined

    return (
        <>

            <PageHeader 
                mode        = { contentMode }
                title       = { title }
                className   = 'landingDetails'
                cover       = { cover }
                description = { seo.metaDesc }
                article     = { true }
                metaTags    =   {{
                                    noIndex: true,
                                }}
            />

            <Menu 
                campus      = { breadcrumbs.campus }
                mode        = { pageSettings.settingsStyles.settingsStylesHeader?.settingsStylesHeaderColor || theme.styles.header }
                logo        = { pageSettings.settingsStyles.settingsStylesGraphics.settingsStylesGraphicsLogo?.localFile?.childImageSharp.gatsbyImageData }
            />
            
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
                campus  = { breadcrumbs.campus } 
                mode    = { pageSettings.settingsStyles.settingsStylesFooter?.settingsStylesFooterColor || theme.styles.footer }
                hideLinks
            />
            
        </>
    )
}