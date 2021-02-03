// Dependencies
import React from 'react'
import { graphql } from 'gatsby'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from "react-i18next"

// Components
// import PaginationBasic from '../../components/pagination/paginationBasic'
import AlertEmptyState from '../../components/alert/alertEmptyState'
import SectionEmpty from '../../components/content/sectionEmpty'
import { getDate } from '../../components/utils/utils'
import HorizontalScrollingMenu from '../../components/menu/horizontalScrollingMenu'
import BlurbHorizontal from '../../components/blurb/blurbHorizontal'
import HeaderPage from '../../components/headerPage'
import { smallGroupBrand, smallGroupMenu } from '../../../data/menues'
import config from '../../../data/SiteConfig'
import './blog.scss'

export default function SmallGroupEventPage ( { data, location } ) {

    /* Standard fields */
    const { t } = useTranslation()

    const noImage = (data.noImage.childImageSharp) ? data.noImage.childImageSharp.fluid.src : undefined

    return (
        <>

            <HeaderPage 
                title="Events"
                location={location} 
                cover={data.eventPoster.publicURL}
                description="Small Group's Blog"
            />
            
            <HorizontalScrollingMenu
                menuBrand={smallGroupBrand}
                menu={smallGroupMenu}
            />

            <section className="">
                <Container className="mt-5 mb-5">
                    <Row>
                        <Col xs={12} md={8}>
                            {
                                (data.news.nodes.length === 0 && data.post.nodes.length === 0) ?
                                    <AlertEmptyState variant="transparent" className="mt-5" content="" />
                                : 
                                    undefined
                            }
                            
                            {
                                (data.posts.nodes.length > 0) ?
                                    data.posts.nodes.map( (obj, index) => (
                                        <BlurbHorizontal 
                                            key={index}
                                            className={'mb-4'}
                                            featuredImage={ (obj.featuredImage) ? obj.featuredImage.node.localFile.childImageSharp.fluid.src : noImage  }
                                            
                                            title={obj.title}
                                            subtitle={ getDate(obj.modified,2,'us','LLLL d, yyyy' )}
                                            excerpt={ (obj.excerpt) ? obj.excerpt : undefined }
                                            tag={t('global.article')}

                                            link={`${config.blogPostDetailsSlug}/${obj.slug}`}
                                            linkText={obj.title}
                                        />
                                    ))
                                :
                                    undefined
                            }

                            {
                                (data.news.nodes.length > 0) ?
                                    data.news.nodes.map( (obj, index) => (
                                        <BlurbHorizontal 
                                            key={index}
                                            className={'mb-4'}
                                            featuredImage={ (obj.featuredImage) ? obj.featuredImage.node.localFile.childImageSharp.fluid.src : noImage  }
                                            
                                            title={obj.title}
                                            subtitle={ getDate(obj.modified,2,'us','LLLL d, yyyy' )}
                                            excerpt={ (obj.excerpt) ? obj.excerpt : undefined }
                                            tag={t('global.news')}

                                            link={`${config.newsPostListSlug}/${obj.slug}`}
                                            linkText={obj.title}
                                        />
                                    ))
                                :
                                    undefined
                            }
                            
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export const query = graphql`
    query{

        posts: allWpPost(filter: {tags: {nodes: {elemMatch: {slug: {in: "small-groups"}}}}, status: {eq: "publish"}}, sort: {fields: date, order: DESC}, limit: 10) {
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
                                fluid {
                                    src
                                }
                            }
                        }
                    }
                }
            }
        }

        news: allWpNewspost(filter: {newsTags: {nodes: {elemMatch: {slug: {in: "small-groups"}}}}, status: {eq: "publish"}}, limit: 10, sort: {fields: modified, order: DESC}) {
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
                                fluid {
                                    src
                                }
                            }
                        }
                    }
                }
            }
        }

        noImage: file(relativePath: {eq: "img/global/noimage.jpg"}) {
            childImageSharp {
                fluid {
                    src
                }
            }
        }

        eventPoster: file(relativePath: {eq: "img/smallgroups/Background.jpg"}) {
            publicURL
        }


    }
`