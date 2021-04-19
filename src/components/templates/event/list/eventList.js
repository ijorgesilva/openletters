// Dependencies
import React from 'react'
import { graphql } from 'gatsby'
import { Container, Row, Col } from 'react-bootstrap'

// Components
import PaginationBasic from '../../../pagination/paginationBasic'
import { getDate } from '../../../utils/utils'
import HorizontalScrollingMenu from '../../../menu/horizontalScrollingMenu'
import BlurbHorizontal from '../../../blurb/blurbHorizontal'
import HeaderPage from '../../../headerPage'
import { blogMenu, blogMenuBrand } from '../../../../../data/menues'
import config from '../../../../../data/SiteConfig'
import './eventList.scss'

export default function PostList ( { location, data, pageContext } ) {

    const noImage = (data.noImage.childImageSharp) ? data.noImage.childImageSharp.fluid.src : undefined
                        
    return (
        <>

            <HeaderPage 
                title="Events"
                location={location} 
                cover={data.eventPoster.publicURL}
                description="Event content lorem ipsum"
            />
            
            <HorizontalScrollingMenu
                menuBrand={blogMenuBrand}
                menu={blogMenu}
            />

            <section className="">
                <Container className="mt-5 mb-5">
                    <Row>
                        <Col xs={12} md={8}>
                            {data.events.edges.map( (obj, index) => (
                                <>

                                    <BlurbHorizontal 
                                        key={index}
                                        className={'mb-4'}
                                        featuredImage={ (obj.node.featuredImage) ? obj.node.featuredImage.node.localFile.childImageSharp.fluid.src : noImage  }
                                        title={obj.node.title}
                                        subtitle={getDate(obj.node.modified.toString(),2,'us','LLLL d, yyyy' )}
                                        link={`${config.eventPostDetailsSlug}/${obj.node.slug}`}
                                        linkText={obj.node.title}
                                        excerpt={obj.node.excerpt}
                                    />
                                </>
                            ))}
                            <PaginationBasic pages={pageContext} slug={config.eventsPostListSlug}/>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export const query = graphql`
    query eventListQuery ( $skip: Int!, $limit: Int! ){

        events: allWpEvent(filter: {status: {eq: "publish"}}, skip: $skip, limit: $limit, sort: {fields: modified, order: DESC}) {
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