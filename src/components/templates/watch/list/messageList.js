// Dependencies
import React from 'react'
import { graphql } from 'gatsby'
import { Container, Row, Col } from 'react-bootstrap'

// Components
import PaginationBasic from '../../../pagination/paginationBasic'
import HorizontalScrollingMenu from '../../../menu/horizontalScrollingMenu'
import BlurbHorizontal from '../../../blurb/blurbHorizontal'
import HeaderPage from '../../../headerPage'
import { watchBrand, watchMenu } from '../../../../../data/menues'
import config from '../../../../../data/SiteConfig'
import './messageList.scss'

export default function MessageList ( { location, data, pageContext } ) {

    const noImage = (data.noImage.childImageSharp) ? data.noImage.childImageSharp.fluid.src : undefined

    return (
        <>

            <HeaderPage 
                title="Watch"
                location={location} 
                cover={data.blogPoster.publicURL}
                description="Watch content lorem ipsum"
            />
            
            <HorizontalScrollingMenu
                menuBrand={watchBrand}
                menu={watchMenu}
            />

            <section className="messageList">
                <Container className="mt-5 mb-5">
                    <Row>
                        <Col xs={12} md={8}>
                            {data.videosOnSerie.nodes.map( (obj, index) => (
                                <>
                                    <BlurbHorizontal 
                                        key={index}
                                        className={'mb-4'}
                                        featuredImage={ (obj.node.featuredImage) ? obj.node.featuredImage.node.localFile.childImageSharp.fluid.src : noImage  }
                                        title={obj.node.title}
                                        subtitle={ (obj.node.videoDetails.videoSeries) ? obj.node.videoDetails.videoSeries.title : undefined }
                                        link={`/watch/message/${obj.node.slug}`}
                                        linkText={obj.node.title}
                                        excerpt={obj.node.excerpt}
                                    />
                                </>
                            ))}
                            <PaginationBasic pages={pageContext} slug={config.watchMessageListSlug} />
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export const query = graphql`
    query watchListQuery ( $skip: Int!, $limit: Int! ){

        videosOnSerie: allWpVideoOnDemand (filter: {status: {eq: "publish"}}, skip: $skip, limit: $limit, sort: {fields: modified, order: DESC}) {
            nodes{
                id
                title
                slug
                content
                excerpt
                modified(formatString: "YYYYMMDD")
                videoOnDemandTags {
                    nodes {
                        slug
                        name
                    }
                }
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
                videoDetails {
                    videoOneLiner
                    videoTranscript
                    videoDayDate
                    videoUrl
                    videoCampus {
                        ... on WpCampus {
                            id
                            title
                            slug
                        }
                    }
                    videoSeries {
                        ... on WpSerie {
                            id
                            title
                            slug
                        }
                    }
                    videoSpeaker {
                        ... on WpSpeaker {
                            id
                            title
                            uri
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