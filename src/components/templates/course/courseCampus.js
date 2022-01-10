import { graphql } from 'gatsby'
import React from 'react'
import { useTranslation } from 'react-i18next'

import config from '../../../../data/SiteConfig'
import { useGlobalIndeces } from '../../../hooks/useGlobalIndeces'
import RenderFeed from '../../feed/renderFeed'
import FooterSimpleText from '../../footer/footerSimpleText'
import HeaderPage from '../../headerPage'
import MenuPage from '../../menu/menuPage'
import Navigation from '../../menu/navigation'

import './courseCampus.scss'

export default function CoursesCampus ( 
    { 
        data, 
        location, 
        pageContext 
    } 
){

    const { title, featuredImage, breadcrumbs } = pageContext

    const { t } = useTranslation()
    const mode          = 'dark'
    const contentMode   = 'light'
    
    return (
        <>

            <HeaderPage 
                title       = { t('global.courses.title-plural') + ' | ' + title }
                location    = { location } 
                className   = 'coursesCampus'
                mode        = { contentMode }
                cover       = { 
                                featuredImage?.node?.localFile ?
                                    featuredImage.node.localFile.childImageSharp.gatsbyImageData.images.fallback.src
                                : 
                                    undefined 
                                }
                description = { t('global.courses.description') }
            />
            
            <Navigation
                location        = { location }
                campus          = { breadcrumbs.campus }
                searchIndices   = { useGlobalIndeces() }
                mode            = { mode }
                menuGlobal
                menuLocal
            />
            
            <MenuPage
                mode        = { mode }
                menuBrand   =   { 
                                    {
                                        'name': t('global.courses.title-plural'),
                                        'link': '/' + breadcrumbs.campus + '/' + config.coursesSlug,
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
                        view            = { 'courses' }
                        feeds           = { data.courses }
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
                mode   = { contentMode }
            />

        </>
    )
}

export const query = graphql`
    query courses ( $campusId: String! ) {
        courses: allWpCourse (
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