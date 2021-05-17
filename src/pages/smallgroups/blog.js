// Dependencies
import React from 'react'
import { graphql } from 'gatsby'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

// Components
import AlertEmptyState from '../../components/alert/alertEmptyState'
import Navigation from '../../components/menu/navigation'
import { getDate } from '../../components/utils/utils'
import MenuPage from '../../components/menu/menuPage'
import BlurbHorizontal from '../../components/blurb/blurbHorizontal'
import HeaderPage from '../../components/headerPage'
import FooterSimpleText from '../../components/footer/footerSimpleText'
import { smallGroupBrand, smallGroupMenu } from '../../../data/menues'
import config from '../../../data/SiteConfig'
import './blog.scss'

export default function SmallGroupEventPage ( { data, location } ) {

    /* Standard fields */
    const { t } = useTranslation()
    
    const searchIndices = [{ name: `vod`, title: `Messages` }, { name: `pages`, title: `Pages`} ]
    
    return (
        <>

            <HeaderPage 
                title="Events"
                location={location} 
                cover={data.eventPoster.publicURL}
                description="Small Group's Blog"
            />
            
            <Navigation
                location    = { location }
                searchIndices   = { searchIndices }
                menuGlobal
                menuLocal
            />
            
            <MenuPage
                menuBrand={smallGroupBrand}
                menu={smallGroupMenu}
            />

            <section className="">
                <Container className="mt-5 mb-5">
                    <Row>
                        <Col xs={12} md={8}>
                            {
                                (data.news.nodes.length === 0 && data.posts.nodes.length === 0) ?
                                    <AlertEmptyState variant="transparent" className="mt-5" content="" />
                                : 
                                    undefined
                            }
                            
                            {
                                (data.posts?.nodes?.length > 0) ?
                                    data.posts.nodes.map( (obj, index) => (
                                        <BlurbHorizontal 
                                            key             = {index}
                                            className       = {'mb-4'}
                                            featuredImage   =   { (obj.featuredImage?.node?.localFile) ? 
                                                                    obj.featuredImage.node.localFile.childImageSharp.gatsbyImageData
                                                                : 
                                                                    undefined  
                                                                }
                                            
                                            title={obj.title}
                                            subtitle        = { getDate(obj.modified,2,'us','LLLL d, yyyy' )}
                                            excerpt         = { (obj.excerpt) ? obj.excerpt : undefined }
                                            tag             = {t('global.blog.title')}
                                            link            = {`/${obj.postDetails.postCampus[0].slug}/${config.blogPostDetailsSlug}/${obj.slug}`}
                                            linkText        = {obj.title}
                                        />
                                    ))
                                :
                                    undefined
                            }

                            {
                                (data.news?.nodes?.length > 0) ?
                                    data.news.nodes.map( (obj, index) => (
                                        <BlurbHorizontal 
                                            key             = {index}
                                            className       = {'mb-4'}
                                            featuredImage   =   { (obj.featuredImage?.node?.localFile) ? 
                                                                    obj.featuredImage.node.localFile.childImageSharp.gatsbyImageData
                                                                : 
                                                                    undefined  
                                                                }
                                            
                                            title           = {obj.title}
                                            subtitle        = { getDate(obj.modified,2,'us','LLLL d, yyyy' )}
                                            excerpt         = { (obj.excerpt) ? obj.excerpt : undefined }
                                            tag             = {t('global.news.title')}
                                            link            = {`/${obj.newsDetails.newsCampus[0].slug}/${config.newsPostDetailsSlug}/${obj.slug}`}
                                            linkText        = {obj.title}
                                        />
                                    ))
                                :
                                    undefined
                            }
                            
                        </Col>
                    </Row>
                </Container>
            </section>
            
            <FooterSimpleText />
        </>
    )
}

export const query = graphql`
    query{

        posts: allWpPost(
            filter: {
                tags: {
                    nodes: {
                        elemMatch: {
                            slug: {
                                in: "small-groups"
                            }
                        }
                    }
                }, 
                status: {
                    eq: "publish"
                }
            }, 
            sort: {
                fields: date, order: DESC
            }, 
            limit: 10
        ) {
            nodes{
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
                            title
                            slug
                        }
                    }
                }
            }
        }

        news: allWpNewspost(
            filter: {
                newsTags: {
                    nodes: {
                        elemMatch: {
                            slug: {
                                in: "small-groups"
                            }
                        }
                    }
                }, 
                status: {
                        eq: "publish"
                }
            },
            sort: {
                fields: modified, 
                order: DESC
            }, 
            limit: 10
        ) {
            nodes{
                title
                excerpt
                slug
                content
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
                            title
                            slug
                        }
                    }
                }
            }
        }

        eventPoster: file(relativePath: {eq: "img/smallgroups/Background.jpg"}) {
            publicURL
        }

    }
`