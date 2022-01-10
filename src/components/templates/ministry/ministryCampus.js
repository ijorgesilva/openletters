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

import './ministryCampus.scss'

export default function MinistryCampus ( 
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
                title       = { t('global.ministry.title') + ' | ' + title }
                location    = { location } 
                className   = 'ministryCampus'
                mode        = { contentMode }
                cover       = { 
                                featuredImage?.node?.localFile ?
                                    featuredImage.node.localFile.childImageSharp.gatsbyImageData.images.fallback.src
                                : 
                                    undefined 
                                }
                description = { t('global.ministry.description') }
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
                                        'name': t('global.ministry.title-plural'),
                                        'link': '/' + breadcrumbs.campus + '/' + config.ministrySlug,
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
                        view            = { 'ministries' }
                        feeds           = { data.ministries }
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
    query ministries ( $campusId: String! ) {
        ministries: allWpMinistry(
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