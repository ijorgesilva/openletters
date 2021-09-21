
import React from 'react'
import { Tab, Row, Col, Nav } from 'react-bootstrap'


import BlurbVerticalDarkVod from '../blurb/blurbVerticalDarkVod'
import config from '../../../../data/SiteConfig'
import './tabSeasons.scss'

export default function TabSeasons ( 
    { 
        className, id, title, series, items, itemsVisible, iconCarousel, count, campus, mode
    } 
    ) {

    const objLength = (items?.length) ? items.length : 0

    /* Get Seasons */
    let seasonsList = []
    items.map( item => (
        (item.videoDetails.videoSeason) ?
            (item.videoDetails.videoSeason.status === 'publish') ?
                ( seasonsList.some(series => series['slug'] === item.videoDetails.videoSeason.slug) ) ?
                    undefined
                : 
                    seasonsList.push(
                        {
                            title: item.videoDetails.videoSeason?.seasonDetails?.seasonTitle,
                            slug: item.videoDetails.videoSeason?.slug,
                            order: item.videoDetails.videoSeason?.seasonDetails.seasonOrder
                        }
                    )
            : undefined
        : undefined
    ))

    function sortByOrderNumber(a, b) {
        const dateA = parseInt(a.order, 10)
        const dateB = parseInt(b.order, 10)
        let comparison = 0
        if (dateA > dateB) {
          comparison = 1
        } else if (dateA < dateB) {
          comparison = -1
        }
        return comparison
    }

    function sortByDate(a, b) {
        const dateA = parseInt(a.videoDetails.videoDayDate, 10)
        const dateB = parseInt(b.videoDetails.videoDayDate, 10)
        let comparison = 0
        if (dateA < dateB) {
          comparison = 1
        } else if (dateA > dateB) {
          comparison = -1
        }
        return comparison
    }

    return (
        
        <section className={`tabSeasons ${ mode ? mode : 'light'} ${ className ? className : ''}`} id={id}>

                {
                    ( title ) ? 
                        <h4 className="mb-5">{title}</h4>
                    : 
                        undefined
                }

                <Tab.Container className="tabs" defaultActiveKey={0}>
                    <Row>

                        <Col xs={12} sm={4} md={3} lg={2}>
                            <Nav variant="pills" className="flex-column">
                                {
                                    seasonsList.sort(sortByOrderNumber).map( (season, index) => (
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
                                        <Tab.Pane 
                                            eventKey    = {index} 
                                            key         = {index}
                                        >

                                            <div className="list">
                                                {   
                                                    items.sort(sortByDate).map( (item, index) => (
                                                        (item.videoDetails.videoSeason?.slug) ?
                                                            ( item.videoDetails.videoSeason.slug === season.slug ) ?
                                                                <BlurbVerticalDarkVod 
                                                                    key             = {index}
                                                                    className       = { (objLength === index + 1) ? 'last' : undefined }
                                                                    featuredImage   = { ( item.featuredImage.node ) ? 
                                                                                            item.featuredImage.node.localFile.childImageSharp.gatsbyImageData 
                                                                                        : 
                                                                                            undefined 
                                                                                        }
                                                                    link            = { (item.slug) ? `${ (campus) ? '/' + campus : '' }/${config.watchMessageDetailsSlug}/${item.slug}` : undefined }
                                                                    title           = { `${item.title}` }
                                                                    subtitle        = { (item.videoDetails.speaker) ? (item.videoDetails.speaker) : undefined }
                                                                    excerpt         = { (item.excerpt) ? item.excerpt : undefined }
                                                                />
                                                            : undefined
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
