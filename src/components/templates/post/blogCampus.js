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
import './blogCampus.scss'

export default function BlogCampus ( { data, location, pageContext } ){

    const { title, featuredImage, breadcrumbs } = pageContext

    const { t } = useTranslation()
    const theme         = useTheme()
    const contentMode   = 'light'
    
    return (
        <>

            <HeaderPage 
                title       = { t('global.blog.title') + ' | ' + title }
                location    = { location } 
                className   = 'blogCampus'
                mode        = { contentMode }
                cover       = { 
                                featuredImage?.node ?
                                    featuredImage.node.localFile.childImageSharp.gatsbyImageData.images.fallback.src
                                : 
                                    undefined 
                                }
                description = { t('global.blog.description') }
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
                                        'link': breadcrumbs.rootApp,
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
                        view            = { 'posts' }
                        feeds           = { data.posts }
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
                campus  = { breadcrumbs.campus }
                mode    = { theme.styles.footer }
            />
            
        </>
    )
}

export const query = graphql`
    query posts ( $campusId: String! ) {

        posts: allWpPost(
            filter: {
                status: {
                    eq: "publish"
                },
                postDetails: {
                    postCampusId: {regex: $campusId}
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
                postDetails {
                    postCampus {
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