// Dependencies
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
// import Carousel from 'react-multi-carousel'
import { Tab, Row, Col, Nav } from 'react-bootstrap'

// Components
import BlurbVerticalDarkVod from '../blurb/blurbVerticalDarkVod'
// import {responsive} from '../../../../data/feedConfiguration'
import config from '../../../../data/SiteConfig'
import './tabSeasons.scss'

export default function TabSeasons ( { className, id, title, serie, items, itemsVisible, iconCarousel, count, ...props } ) {

    const defaultVisible = 5

    const data = useStaticQuery(graphql`
        query{
            noImage: file(relativePath: {eq: "img/global/noimage.jpg"}) {
                childImageSharp {
                    fluid {
                        src
                    }
                }
            }
        }  
    `)

    const noImage = data.noImage ? data.noImage : data.noImage.childImageSharp.fluid.src

    const objLength = (items) ? items.nodes.length : 0

    /* Get Seasons */
    let seasonsList = []
    items.nodes.map( (item, index) => (
        (item.videoDetails.videoSeason) ?
            (item.videoDetails.videoSeason.status === 'publish') ?
                ( seasonsList.some(serie => serie['slug'] === item.videoDetails.videoSeason.slug) ) ?
                    undefined
                : 
                    seasonsList.push(
                        {
                            title: item.videoDetails.videoSeason.seasonDetails.seasonTitle,
                            slug: item.videoDetails.videoSeason.slug
                        }
                    )
            : undefined
        : undefined
    ))

    return (
        
        <section className={`tabSeasons ${className}`} id={id}>


                {
                    (title) ? 
                        <h4 className="h-color-six-shade-three mb-5">{title}</h4>
                    : 
                        undefined
                }

                <Tab.Container className="tabs" defaultActiveKey={0}>
                    <Row>

                        <Col xs={12} sm={4} md={3} lg={2}>

                            <Nav variant="pills" className="flex-column">
                                {
                                    seasonsList.map( (season, index) => (
                                        <Nav.Item key={index}>
                                            <Nav.Link eventKey={index}>{season.title}</Nav.Link>
                                        </Nav.Item>
                                    ))
                                }
                            </Nav>

                        </Col>

                        <Col xs={12} sm={8} md={9} lg={10}>

                            <Tab.Content>
                                {
                                    seasonsList.map( (season, index) => (
                                        <Tab.Pane eventKey={index}>

                                            <div className="list">
                                                {
                                                    items.nodes.map( (item, index) => (
                                                        ( item.videoDetails.videoSeason.slug === season.slug ) ?
                                                            <BlurbVerticalDarkVod 
                                                                key={index}
                                                                className={ (objLength === index + 1) ? 'last' : undefined }
                                                                featuredImage={ (item.featuredImage) ? item.featuredImage.node.localFile.childImageSharp.fluid : undefined }
                                                                noImage={noImage}
                                                                link={ (item.slug) ? `${config.watchMessageDetailsSlug}/${item.slug}` : null }
                                                                title={ `${ (count === true) ? '<span>' + (index + 1) + ' |</span> ' : '' }  ${item.title}` }
                                                                serieTitle={(item.videoDetails.serie) ? item.videoDetails.serie.title : null}
                                                                serieLink={(item.videoDetails.serie) ? `${config.watchSerieDetailsSlug}/${item.videoDetails.serie.slug}` : null}
                                                                subtitle={ (item.videoDetails.speaker) ? (item.videoDetails.speaker) : null }
                                                                excerpt={ (item.excerpt) ? item.excerpt : null }
                                                                iconImage={ (iconCarousel) ? iconCarousel : null }
                                                            />
                                                        : undefined
                                                    ))
                                                }
                                            </div>

                                        </Tab.Pane>
                                    ))
                                }
                            </Tab.Content>

                        </Col>

                    </Row>
                </Tab.Container>

        </section>

    )
}
