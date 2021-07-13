// Dependencies
import React from 'react'
import { useTranslation } from "react-i18next"

// Components
import MainContent from '../../content/mainContent'
import Navigation from '../../menu/navigation'
import HeaderPage from '../../headerPage'
import ToolbarDetails from '../../toolbar/toolbarDetails'
import MenuPage from '../../menu/menuPage'
import FooterSimpleText from '../../footer/footerSimpleText'
import RenderSection from '../../renderSection'

// Hooks
import { useGlobalIndeces } from '../../../hooks/useGlobalIndeces'

// Styles
import './pageDetails.scss'

export default function PageDetails( { location, pageContext } ){
    
    const { title, seo, date, modified, featuredImage, content, pageDetails, breadcrumbs, campus } = pageContext

    /* Standard fields */
    const { t } = useTranslation()

    const cover = ( featuredImage?.node?.localFile?.localFile ) ?
                        featuredImage.node.localFile.localFile.childImageSharp.gatsbyImageData.images.fallback.src
                    :
                        undefined
    
    const sections =    ( pageDetails.pageSections?.length > 0 ) ? 
                            pageDetails.pageSections
                        : 
                            undefined

    return (
        <>

            <HeaderPage 
                title       = { title }
                location    = { location } 
                cover       = { cover }
                description = { seo.metaDesc }
                article     = { true }
                metaTags    =   {{
                                    noIndex: ( typeof pageDetails.pageHide?.pageHideSearchEngines === 'undefined' ) ? 
                                                    false : (pageDetails.pageHide?.pageHideSearchEngines === true ) ? true : false,
                                }}
            />
            
            <Navigation
                location        = { location }
                campus          = { breadcrumbs.campus }
                searchIndices   = { useGlobalIndeces() }
                menuGlobal
                menuLocal
            />

            {
                (pageDetails.pageMenues) ?
                    <MenuPage
                        menues      = { pageDetails.pageMenues }
                        campus      = { breadcrumbs.campus }
                        location    = { location }
                    />
                :
                    undefined
            }

            {
                ( sections ) ?
                    sections.map( ( section, index ) => (
                        <RenderSection 
                            index   = { index }
                            section = { section }
                            campus  = { campus }
                            filter  = { { campus: campus } }
                            location= { location }
                        />
                    ))
                :
                    undefined
            }

            {
                ( !pageDetails.pageHideShare ) ?
                    <ToolbarDetails 
                        location = {location} 
                        variant  = 'light'
                    />
                :
                    undefined
            }

            {
                ( !pageDetails.pageHideContent ) ?
                    <MainContent 
                        date        = {date}
                        modified    = {modified}
                        content     = {content}
                    />
                :
                    undefined
            }

            <FooterSimpleText campus={ breadcrumbs.campus } />
            
        </>
    )
}