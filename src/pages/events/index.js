// Dependencies
import React from 'react'
// import { useTranslation } from "react-i18next"
import { graphql } from 'gatsby'
import { Container, Row, Col } from 'react-bootstrap'

// Components
import HeaderPage from '../../components/headerPage'
import { getDate } from '../../components/utils/utils'
import HorizontalScrollingMenu from '../../components/menu/horizontalScrollingMenu'
import BlurbHorizontal from '../../components/blurb/blurbHorizontal'
import { eventsBrand, eventsMenu } from '../../../data/menues'
import './events.scss'

export default function eventsPage( { data, location } ){
    
    /* Standard fields */
    // const { t } = useTranslation()

    const noImage = (data.noImage.childImageSharp) ? data.noImage.childImageSharp.fluid.src : undefined
    
    return (

        <>

            <HeaderPage 
                title="Events"
                location={location} 
                cover={data.heroImage.publicURL}
                description="Test"
            />
            
            <HorizontalScrollingMenu
                menuBrand={eventsBrand}
                menu={eventsMenu}
            />

            <section className="">
                <Container className="mt-5 mb-5">
                    <Row>
                        <Col xs={12} md={8}>
                            {data.events.nodes.map( (obj, index) => (
                                <>
                                    <BlurbHorizontal 
                                        key={index}
                                        className={'mb-4'}
                                        featuredImage={ (obj.featuredImage) ? obj.featuredImage.node.localFile.childImageSharp.fluid.src : noImage  }
                                        title={obj.title}
                                        subtitle={getDate(obj.modified.toString(),2,'us','LLLL d, yyyy' )}
                                        // subtitle={obj.modified.toString()}
                                        link={`/events/${obj.slug}`}
                                        linkText={obj.title}
                                        excerpt={obj.excerpt}
                                    />
                                </>
                            ))}
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export const query = graphql`
    query {

        noImage: file(relativePath: {eq: "img/global/noimage.jpg"}) {
            childImageSharp {
                fluid {
                    src
                }
            }
        }

        heroImage: file(relativePath: {eq: "img/smallgroups/Background.jpg"}) {
            childImageSharp {
                fluid {
                    src
                }
            }
            publicURL
        }

        events: allWpEvent(filter: {status: {eq: "publish"}}, skip: 0, sort: {fields: modified, order: DESC}) {
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

    }
`