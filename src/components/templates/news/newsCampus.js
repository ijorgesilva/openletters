// Dependencies
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { graphql } from 'gatsby'

// Components
import AlertEmptyState from '../../alert/alertEmptyState'
import Navigation from '../../menu/navigation'
import { getDate } from '../../utils/utils'
import BlurbHorizontal from '../../blurb/blurbHorizontal'
import HorizontalScrollingMenu from '../../menu/horizontalScrollingMenu'
import HeaderPage from '../../headerPage'
import config from '../../../../data/SiteConfig'
import './newsCampus.scss'

export default function NewsCampus ( { data, location, pageContext } ){

    const { title, slug, featuredImage, breadcrumbs } = pageContext

    /* Standard fields */
    const { t } = useTranslation()

    return (
        <>

            <HeaderPage 
                title       = { t('global.news.title') + ' | ' + title }
                location    = { location } 
                cover       = { 
                                (featuredImage?.node?.localFile) ?
                                    featuredImage.node.localFile.childImageSharp.gatsbyImageData.images.fallback.src
                                : 
                                    undefined 
                                }
                description = { t('global.news.description') }
            />
            
            <Navigation
                location    = { location }
                campus      = { breadcrumbs.campus }
                menuGlobal
                menuLocal
            />
            
            <HorizontalScrollingMenu
                menuBrand   =   { 
                                    {
                                        'name': t('global.news.title'),
                                        'link': '/' + breadcrumbs.campus + '/' + config.blogPostDetailsSlug,
                                    }
                                } 
                menu        =   { 
                                    [
                                        {
                                            name: t('global.news.title'), 
                                            link: '/' + breadcrumbs.campus + '/' + config.newsPostDetailsSlug, 
                                            as: "", 
                                            target: ""
                                        }
                                    ]
                                }
            />

            <section className="">
                <Container className="mt-5 mb-5">
                    <Row>
                        <Col xs={12} md={8}>
                            {
                                ( data.news?.nodes.length > 0 ) ?
                                    data.news.nodes.map( ( news, index ) => (
                                        <BlurbHorizontal 
                                            key             = { index }
                                            className       = { 'mb-4' }
                                            featuredImage   =   {  
                                                                    ( news.featuredImage?.node?.localFile ) ? 
                                                                        news.featuredImage.node.localFile.childImageSharp.gatsbyImageData
                                                                    : 
                                                                        undefined    
                                                                }
                                            title           = { news.title }
                                            subtitle        = { getDate(news.modified.toString(), 2, 'us', 'LLLL d, yyyy' ) }
                                            tags            =   { 
                                                                    ( news.newsTags?.nodes ) ? 
                                                                        news.newsTags 
                                                                    : 
                                                                        undefined  
                                                                }
                                            link            = { `/${breadcrumbs.campus}/${config.newsPostDetailsSlug}/${news.slug}` }
                                            linkText        = { news.title }
                                            excerpt         = { news.excerpt }
                                        />
                                    ))
                                :
                                    <AlertEmptyState variant="transparent" className="mt-5" content="" />
                            }
                        </Col>
                    </Row>
                </Container>
            </section>

        </>
    )
}


export const query = graphql`
    query news ( $campusId: String! ) {

        news: allWpNewspost(
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
                newsTags {
                    nodes {
                        slug
                        name
                    }
                }
            }
        }
    }
`