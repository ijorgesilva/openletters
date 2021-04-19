// Dependencies
import React from 'react'
import { graphql } from 'gatsby'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from "react-i18next"

// Components
import PaginationBasic from '../../../pagination/paginationBasic'
import { getDate } from '../../../utils/utils'
import HorizontalScrollingMenu from '../../../menu/horizontalScrollingMenu'
import BlurbHorizontal from '../../../blurb/blurbHorizontal'
import HeaderPage from '../../../headerPage'
import { blogMenu, blogMenuBrand } from '../../../../../data/menues'
import config from '../../../../../data/SiteConfig'
import './newsList.scss'

export default function PostList ( { location, data, pageContext } ) {

    /* Standard fields */
    const { t } = useTranslation()

    const noImage = (data.noImage.childImageSharp) ? data.noImage.childImageSharp.fluid.src : undefined

    return (
        <>

            <HeaderPage 
                title={t('global.news-title')}
                location={location} 
                cover={ (data.newsPoster) ? data.newsPoster.publicURL : undefined }
                description={t('global.news-description')}
            />
            
            <HorizontalScrollingMenu
                menuBrand={blogMenuBrand}
                menu={blogMenu}
            />

            <section className="">
                <Container className="mt-5 mb-5">
                    <Row>
                        <Col xs={12} md={8}>
                            {data.news.edges.map( (obj, index) => (
                                <>
                                    <BlurbHorizontal 
                                        key={index}
                                        className={'mb-4'}

                                        featuredImage={ ( obj.node.featuredImage.node != null ) ? obj.node.featuredImage.node.localFile.childImageSharp.fluid.src : noImage }
                                        title={obj.node.title}
                                        subtitle={getDate(obj.node.modified.toString(),2,'us','LLLL d, yyyy' )}

                                        tags={ ( obj.node.newTags ) ? obj.node.newTags : undefined }

                                        link={`${config.newsPostDetailsSlug}/${obj.node.slug}`}
                                        linkText={obj.node.title}
                                        excerpt={obj.node.excerpt}
                                    />
                                </>
                            ))}
                            <PaginationBasic pages={pageContext} slug={config.newsPostListSlug} />
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export const query = graphql`
    query newsListQuery ( $skip: Int!, $limit: Int! ){

        news: allWpNewspost(filter: {status: {eq: "publish"}}, skip: $skip, limit: $limit, sort: {fields: modified, order: DESC}) {
            edges{
                node{
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
                    newsTags {
                        nodes {
                            slug
                            name
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

        newsPoster: file(relativePath: {eq: "img/smallgroups/Background.jpg"}) {
            publicURL
        }

    }  
`