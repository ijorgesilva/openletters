import { graphql } from 'gatsby'
import React from 'react'
import { useTranslation } from 'react-i18next'

import config from '../../../../data/SiteConfig'
import { useGlobalIndeces } from '../../../hooks/useGlobalIndeces'
import { useTheme } from '../../../hooks/useTheme'
import RenderFeed from '../../feed/renderFeed'
import FooterSimpleText from '../../footer/footerSimpleText'
import HeaderPage from '../../headerPage'
import MenuPage from '../../menu/menuPage'
import Navigation from '../../menu/navigation'
import RenderSection from '../../renderSection'

import './groupCampus.scss'

export default function GroupTypeCampus ( 
    { 
        data, 
        location, 
        pageContext 
    } 
){

    const { title, featuredImage, breadcrumbs, campusDetails } = pageContext

    const { t } = useTranslation()
    const theme         = useTheme()
    const contentMode   = 'light'
    
    const sections =    campusDetails.campusPages.campusGroups.pageSections?.length > 0 ? 
                            campusDetails.campusPages.campusGroups.pageSections 
                        : 
                            undefined

    return (
        <>

            <HeaderPage 
                title       = { t('global.groupTypes.title') + ' | ' + title }
                location    = { location } 
                className   = 'groupTypesCampus'
                mode        = { contentMode }
                cover       = { 
                                featuredImage?.node?.localFile ?
                                    featuredImage.node.localFile.childImageSharp.gatsbyImageData.images.fallback.src
                                : 
                                    undefined 
                                }
                description = { t('global.groupTypes.description') }
            />
            
            <Navigation
                location        = { location }
                campus          = { breadcrumbs.campus }
                searchIndices   = { useGlobalIndeces() }
                mode            = { theme.styles.header }
                menuGlobal
                menuLocal
            />
            
            <MenuPage
                mode        = { theme.styles.header }
                menuBrand   =   { 
                                    {
                                        'name': t('global.groups.title-plural'),
                                        'link': '/' + breadcrumbs.campus + '/' + config.groupsSlug,
                                    }
                                } 
                menu        =   { 
                                    [
                                        {
                                            'name': t('global.groupTypes.title-plural'),
                                            'link': '/' + breadcrumbs.campus + '/' + config.groupTypesSlug,
                                        }
                                        
                                    ]
                                }
            />

            {
                config.archiveMode === 'internal' ?
                    <RenderFeed 
                        view            = { 'groupTypes' }
                        feeds           = { data.groupTypes }
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
                sections ?
                    sections.map( ( _, index ) => (
                        <RenderSection 
                            key         = { index }
                            section     = { _ }
                            campus      = { breadcrumbs.campus }
                            filter      = { { campus: breadcrumbs.campus } }
                            location    = { location }
                            mode        = { contentMode }
                        />
                    ))
                :
                    undefined
            }
            
            <FooterSimpleText 
                campus = { breadcrumbs.campus } 
                mode   = { theme.styles.footer }
            />

        </>
    )
}

export const query = graphql`
query groupTypes ( $campusId: String! ) {

    groupTypes: allWpGroupType (
        filter: {
            status: {
                eq: "publish"
            },
            general: {
                campusId: {regex: $campusId}
            }
        },
        sort: {
            fields: modified, 
            order: DESC
        }
        limit: 100
    ) {
        nodes{
            id
            title
            slug
            date(formatString: "YYYYMMDD")
            modified(formatString: "YYYYMMDD")
            general {
                summary
                campus {
                    ... on WpCampus {
                        id
                        slug
                        title
                        status
                    }
                }
                featuredPhoto {
                    localFile {
                        childImageSharp {
                            gatsbyImageData(layout: FULL_WIDTH)
                        }
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