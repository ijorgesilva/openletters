// Dependencies
import React from 'react'
import { Helmet } from 'react-helmet'
import {Link} from 'gatsby'
import Img from 'gatsby-image'
import { Container, Row, Col } from 'react-bootstrap'
import config from '../../../../data/SiteConfig'

// Components
import './watchDetails.scss'
import VideoJsPlayerCustom from '../../player/videoJsPlayerVod'


export default function  WatchDetails( props ){
    
    const { title, excerpt, content, featuredImage, VodVideo } = props.pageContext

    return (
        <>
            <Helmet>
                <title> {title} {config.separator} {config.siteTitle}</title>
            </Helmet>

            <section className="watchDetails">
                {
                    (VodVideo.url) ?
                        <VideoJsPlayerCustom 
                            src={VodVideo.url}
                            poster={ (featuredImage) ? featuredImage.node.sourceUrl : null}
                        />
                    : null
                }
                <Container fluid>
                    <Row>
                    
                        <Col>
                            <div className="sticky">
                                <div className="extract" dangerouslySetInnerHTML={{__html: excerpt}}></div>
                                {
                                    (VodVideo.dayDate) ? <div className="date">{VodVideo.dayDate}</div>: null
                                }
                                {
                                    (VodVideo.speaker) ? <address className="author">{VodVideo.speaker.map ( ( speaker, index ) => (<>{(index) ? ', ': ''} <span key={index}>{speaker.title}</span></>))}</address> : null
                                }
                                <hr />
                            </div>
                        </Col>

                        <Col xs={6}>
                            <div className="mt-5 mb-5">
                                {/* <Img fluid="" /> */}
                                {VodVideo.campus.title}
                                <h1 className="">{title}</h1>
                            </div>
                            <article dangerouslySetInnerHTML={{__html: content }}></article>
                        </Col>

                        <Col>
                        </Col>

                    </Row>
                </Container>
            </section>
        </>
    )
}