// Dependencies
import React from 'react'
import { graphql } from 'gatsby'
import { Container, Row, Col } from 'react-bootstrap'

// Components
import PaginationBasic from '../../pagination/paginationBasic'
import HorizontalScrollingMenu from '../../menu/horizontalScrollingMenu'
import BlurbHorizontal from '../../blurb/blurbHorizontal'
import HeaderPage from '../../headerPage'
import { watchBrand, watchMenu } from '../../../../data/menues'
import config from '../../../../data/SiteConfig'
import './serieList.scss'

export default function SerieList ( { location, data, pageContext } ) {

    const noImage = (data.noImage.childImageSharp) ? data.noImage.childImageSharp.fluid.src : undefined

    return (
        <>

            <HeaderPage 
                title="Series"
                location={location} 
                cover={data.blogPoster.publicURL}
                description="Series content lorem ipsum"
            />
            
            <HorizontalScrollingMenu
                menuBrand={watchBrand}
                menu={watchMenu}
            />

            <section className="messageList">
                <Container className="mt-5 mb-5">
                    <Row>
                        <Col xs={12} md={8}>
                            {data.series.edges.map( (obj, index) => (
                                <>
                                    <BlurbHorizontal 
                                        key={index}
                                        className={'mb-4'}
                                        featuredImage={ (obj.node.seriesDetails.seriesTrailerPoster) ? obj.node.seriesDetails.seriesTrailerPoster.localFile.childImageSharp.fluid.src : noImage  }
                                        title={obj.node.title}
                                        subtitle=""
                                        link={`${config.watchSeriesDetailsSlug}/${obj.node.slug}`}
                                        linkText={obj.node.title}
                                        excerpt={obj.node.excerpt}
                                    />
                                </>
                            ))}
                            <PaginationBasic pages={pageContext} slug={config.watchSerieListSlug} />
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export const query = graphql`
    query serieListQuery ( $skip: Int!, $limit: Int! ){

        series: allWpSerie (filter: {status: {eq: "publish"}}, skip: $skip, limit: $limit, sort: {fields: modified, order: DESC}) {
            nodes{
                id
                title
                slug
                seriesDetails {
                    seriesTrailer
                    seriesTrailerPoster {
                        localFile {
                            childImageSharp {
                                fluid {
                                    src 
                                }
                            }
                        }
                    }
                }
                seriesGraphics {
                    logo {
                        localFile {
                            childImageSharp {
                                fluid {
                                    src
                                }
                            }
                        }
                    }
                    background {
                        localFile {
                            childImageSharp {
                                fluid {
                                    src
                                }
                            }
                        }
                    }
                }
                videoOnDemandTags {
                    nodes {
                        slug
                        name
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