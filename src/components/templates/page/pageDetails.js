import React from 'react'
import { useTranslation } from "react-i18next"

import { useGlobalIndeces } from '../../../hooks/useGlobalIndeces'
import MainContent from '../../content/mainContent'
import FooterSimpleText from '../../footer/footerSimpleText'
import HeaderPage from '../../headerPage'
import MenuPage from '../../menu/menuPage'
import Navigation from '../../menu/navigation'
import RenderSection from '../../renderSection'
import ToolbarDetails from '../../toolbar/toolbarDetails'

import './pageDetails.scss'

export default function PageDetails( { location, pageContext } ){
    
    const { title, seo, date, modified, featuredImage, content, pageDetails, breadcrumbs, campus } = pageContext

    // eslint-disable-next-line no-unused-vars
    const { t } = useTranslation()

    const mode          = 'dark'
    const contentMode   = 'light'

    const cover =   featuredImage?.node?.localFile?.localFile ?
                        featuredImage.node.localFile.localFile.childImageSharp.gatsbyImageData.images.fallback.src
                    :
                        undefined
    
    const sections =    pageDetails.pageSections?.length > 0 ? 
                            pageDetails.pageSections
                        : 
                            undefined

    return (
        <>

            <HeaderPage 
                mode        = { contentMode }
                title       = { title }
                location    = { location }
                className   = 'pageDetails'
                cover       = { cover }
                description = { seo.metaDesc }
                article     = { true }
                metaTags    =   {{
                                    noIndex: ( typeof pageDetails.pageHide?.pageHideSearchEngines === 'undefined' ) ? 
                                                    false : (pageDetails.pageHide?.pageHideSearchEngines === true ) ? true : false,
                                }}
            />
            
            <Navigation
                mode            = { mode }
                location        = { location }
                campus          = { breadcrumbs.campus }
                searchIndices   = { useGlobalIndeces() }
                menuGlobal
                menuLocal
            />

            {
                pageDetails.pageMenues ?
                    <MenuPage
                        menues      = { pageDetails.pageMenues }
                        campus      = { breadcrumbs.campus }
                        location    = { location }
                        className   = { pageDetails.pageMenues.menuDetails.menuCss }
                        id          = { pageDetails.pageMenues.menuDetails.menuId }
                        bg          = { pageDetails.pageMenues.menuDetails.menuColorScheme?.split(':')[0] }
                        mode        = { mode ? mode : pageDetails.pageMenues.menuDetails.menuColorScheme?.split(':')[0] }
                    />
                :
                    undefined
            }

            {
                sections ?
                    sections.map( ( _, index ) => (
                        <RenderSection 
                            key         = { index }
                            section     = { _ }
                            campus      = { campus }
                            filter      = { { campus: campus } }
                            location    = { location }
                            mode        = { contentMode }
                        />
                    ))
                :
                    undefined
            }

            {
                !pageDetails.pageHideShare ?
                    <ToolbarDetails 
                        location    = { location } 
                        mode        = { contentMode } 
                    /> 
                :
                    undefined
            }

            {
                !pageDetails.pageHideContent ?
                    <MainContent 
                        date        = { date }
                        modified    = { modified }
                        content     = { content }
                    />
                :
                    undefined
            }

            <FooterSimpleText 
                campus  = { breadcrumbs.campus } 
                mode    = { contentMode }
            />
            
        </>
    )
}