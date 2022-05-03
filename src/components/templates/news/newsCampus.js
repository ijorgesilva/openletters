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

import './newsCampus.scss'

export default function NewsCampus ( 
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
    
    const sections =    campusDetails.campusPages.campusNews.pageSections?.length > 0 ? 
                            campusDetails.campusPages.campusNews.pageSections 
                        : 
                            undefined

    return (
        <>

            <HeaderPage 
                title       = { t('global.news.title') + ' | ' + title }
                location    = { location } 
                className   = 'newsCampus'
                mode        = { contentMode }
                cover       = { 
                                featuredImage?.node ?
                                    featuredImage.node.localFile.childImageSharp.gatsbyImageData.images.fallback.src
                                : 
                                    undefined 
                                }
                description = { t('global.news.description') }
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
                                        'name': t('global.blog.title'),
                                        'link': '/' + breadcrumbs.campus + '/' + config.blogPostDetailsSlug,
                                    }
                                } 
                menu        =   { 
                                    [
                                        {
                                            name: t('global.news.title'), 
                                            link: '/' + breadcrumbs.campus + '/' + config.newsPostDetailsSlug, 
                                            as: '', 
                                            target: ''
                                        }
                                    ]
                                }
            />

            {
                config.archiveMode === 'internal' ?
                    <RenderFeed 
                        view            = { 'news' }
                        feeds           = { data.news }
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
    query news ( $campusId: String! ) {

        news: allWpNewspost (
            filter: {
                status: {
                    eq: "publish"
                },
                newsDetails: {
                    newsCampusId: {regex: $campusId}
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
                newsDetails {
                    newsCampus {
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