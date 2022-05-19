import { graphql } from 'gatsby'
import React from 'react'
import { useTranslation } from 'react-i18next'

import config from '../../../../data/SiteConfig'
import { useGlobalIndeces } from '../../../hooks/useGlobalIndeces'
import { useTheme } from '../../../hooks/useTheme'
import RenderFeed from '../../feed/renderFeed'
import FooterSimpleText from '../../footer/footerSimpleText'
import MenuPage from '../../menu/menuPage'
import Navigation from '../../menu/navigation'
import PageHeader from '../../pageHeader'
import RenderComponent from '../../renderer'

import './courseCampus.scss'

export default function CoursesCampus ( 
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
    
    const sections =    campusDetails.campusPages.campusCourses.pageSections?.length > 0 ? 
                            campusDetails.campusPages.campusCourses.pageSections 
                        : 
                            undefined
    
    return (
        <>

            <PageHeader 
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
                mode            = { theme.styles.header }
                menuGlobal
                menuLocal
            />
            
            <MenuPage
                mode        = { theme.styles.header }
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
            
            {
                sections ?
                    sections.map( ( _, index ) => (
                        <RenderComponent 
                            key         = { index }
                            section     = { _ }
                            campus      = { breadcrumbs.campus }
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