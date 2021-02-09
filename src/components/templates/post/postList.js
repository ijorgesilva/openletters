// Dependencies
import React from 'react'
import { graphql } from 'gatsby'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from "react-i18next"

// Components
import PaginationBasic from '../../pagination/paginationBasic'
import { getDate } from '../../../components/utils/utils'
import HorizontalScrollingMenu from '../../../components/menu/horizontalScrollingMenu'
import BlurbHorizontal from '../../../components/blurb/blurbHorizontal'
import HeaderPage from '../../../components/headerPage'
import { blogMenu, blogMenuBrand } from '../../../../data/menues'
import config from '../../../../data/SiteConfig'
import './postList.scss'

export default function PostList ( { location, data, pageContext } ) {

    /* Standard fields */
    const { t } = useTranslation()

    const noImage = (data.noImage.childImageSharp) ? data.noImage.childImageSharp.fluid.src : undefined

    return (
        <>

            <HeaderPage 
                title={t('blog.title')}
                location={location} 
                cover={ (data.blogPoster) ? data.blogPoster.publicURL : undefined }
                description={t('blog.description')}
            />
            
            <HorizontalScrollingMenu
                menuBrand={blogMenuBrand}
                menu={blogMenu}
            />

            <section className="">
                <Container className="mt-5 mb-5">
                    <Row>
                        <Col xs={12} md={8}>
                            {data.posts.edges.map( (obj, index) => (
                                <>
                                    <BlurbHorizontal 
                                        key={index}
                                        className={'mb-4'}
                                        featuredImage={ ( obj.node.featuredImage != null ) ? obj.node.featuredImage.node.localFile.childImageSharp.fluid.src : noImage }
                                        title={obj.node.title}
                                        subtitle={ getDate(obj.node.modified.toString(), 2, 'us', 'LLLL d, yyyy' ) }

                                        tags={ ( obj.node.tags.nodes ) ? obj.node.tags : undefined }
                                        
                                        link={`${config.blogPostDetailsSlug}/${obj.node.slug}`}
                                        linkText={obj.node.title}
                                        excerpt={obj.node.excerpt}
                                    />
                                </>
                            ))}
                            <PaginationBasic pages={pageContext} slug={config.blogPostListSlug}/>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export const query = graphql`
    query blogListQuery ( $skip: Int!, $limit: Int! ){

        posts: allWpPost(filter: {status: {eq: "publish"}}, skip: $skip, limit: $limit, sort: {fields: modified, order: DESC}) {
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
                    tags {
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

        blogPoster: file(relativePath: {eq: "img/smallgroups/Background.jpg"}) {
            publicURL
        }

    }  
`