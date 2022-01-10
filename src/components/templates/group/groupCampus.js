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

import './groupCampus.scss'

export default function GroupCampus ( 
    { 
        data, 
        location, 
        pageContext 
    } 
){

    const { title, featuredImage, breadcrumbs } = pageContext

    const { t } = useTranslation()
    const theme         = useTheme()
    const contentMode   = 'light'
    
    return (
        <>

            <HeaderPage 
                title       = { t('global.groups.title') + ' | ' + title }
                location    = { location } 
                className   = 'groupsCampus'
                mode        = { contentMode }
                cover       = { 
                                featuredImage?.node?.localFile ?
                                    featuredImage.node.localFile.childImageSharp.gatsbyImageData.images.fallback.src
                                : 
                                    undefined 
                                }
                description = { t('global.groups.description') }
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
                        view            = { 'groups' }
                        feeds           = { data.groups }
                        campus          = { breadcrumbs.campus }
                        containerWidth  = { 'container' }
                        size            = { 'md' }
                        className       = { '' }
                        mode            = { contentMode }
                        itemsPerPage    = { 3 }
                    />
                : undefined
            }
            
            <FooterSimpleText 
                campus = { breadcrumbs.campus } 
                mode   = { theme.styles.footer }
            />

        </>
    )
}

export const query = graphql`
    query groups ( $campusId: String! ) {

        groups: allWpGroup (
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