// Dependencies
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Container, Row, Col, Tabs, Tab, Alert } from 'react-bootstrap'
import { useTranslation } from "react-i18next"
import Img from 'gatsby-image'
import { Link } from 'gatsby'

// Components
import { getDate } from '../../utils/utils'
import HeaderPage from '../../headerPage'
import TagSimple from '../../tag/tagSimple'
import ShareSimpleIcon from '../../social/shareSimpleIcon'
import VideoJsPlayerCustom from '../../vod/player/videoJsPlayer'
import './watchDetails.scss'

export default function WatchDetails( { pageContext, location } ) {
    
    const { title, excerpt, content, featuredImage, videoDetails, terms } = pageContext

    /* Standard fields */
    const { t } = useTranslation()

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

    const poster = featuredImage ? featuredImage.node.localFile.childImageSharp.fluid.src : data.noImage.childImageSharp.fluid.src
    const vodDate = getDate(videoDetails.dayDate,2,'us','LLLL d, yyyy' )

    return (
        <>
            
            <HeaderPage 
                title={title} 
                location={location} 
                cover={poster}
                description={excerpt}
                article={true}
            />

            <section className="watchPlayer">
                <Container fluid className="h-background-six-shade-three mb-5">
                    <Row>

                        <Col>
                        </Col>

                        <Col xs={12} sm={8} className="p-2">
                            {
                                (videoDetails.url) ?
                                    <VideoJsPlayerCustom 
                                        src={videoDetails.url}
                                        poster={poster}
                                    />
                                : null
                            }
                        </Col>

                        <Col>
                        </Col>

                    </Row>
                </Container>
            </section>

            <section className="watchDetails mt-5 mb-5">
                <Container>
                    <Row>
                        <Col>
                            <div className="watchLeft sticky">
                                {
                                    (videoDetails.campus) ? 
                                        <div className="watchCampus mb-3">
                                            {
                                                videoDetails.campus.map ( (campus, index) => (
                                                    <span key={index} className="user-select-none d-block">{campus.title}</span>
                                                ))
                                            }
                                        </div> 
                                        : undefined
                                }
                                {
                                    (videoDetails.speaker) ? 
                                        <div className="watchSpeaker">
                                            <address className="watchAuthor">
                                                {videoDetails.speaker.map ( ( speaker, index ) => (
                                                            <>{(index) ? ', ': ''}
                                                                 <span className="user-select-none" key={index}>{speaker.title}</span>
                                                            </>
                                                        )
                                                    )
                                                }
                                            </address>
                                        </div> 
                                        : null
                                }
                                {
                                    (videoDetails.dayDate) ? 
                                        <div className="watchDate user-select-none">
                                            {vodDate}
                                        </div>
                                        : null
                                }
                                <hr />
                                <ShareSimpleIcon />
                            </div>
                        </Col>

                        <Col className="watchContent" xs={8}>

                            
                            {
                                (videoDetails.serie.slug) ?
                                    <div className="introCard introCardGrid mb-5">
                                        <Link to={`/watch/serie/${videoDetails.serie.slug}`}>
                                            <Img className="serieGraphic" fluid={videoDetails.serie.serieGraphics.poster.localFile.childImageSharp.fluid} alt="" />
                                        </Link>
                                        <div>
                                            <h1 className="">{title}</h1>
                                            {
                                                (videoDetails.serie.title) ? <Link to={`/watch/serie/${videoDetails.serie.slug}`}><h2>{videoDetails.serie.title}</h2></Link> : undefined
                                            }
                                        </div>
                                    </div>
                                : 
                                    <div className="introCard mb-5">
                                        <div>
                                            <h1 className="">{title}</h1>
                                            {
                                                (videoDetails.serie.title) ? <h2 className="">{videoDetails.serie.title}</h2> : undefined
                                            }
                                        </div>
                                    </div>
                            }

                            <div className="extract" dangerouslySetInnerHTML={{__html: excerpt}}></div>

                            <Tabs className="mt-5 sticky" defaultActiveKey="notes" id="">
                                <Tab eventKey="notes" title="Notes">
                                    {
                                        (content) ? <article dangerouslySetInnerHTML={{__html: content }}></article> : 
                                        <Alert variant="dark">
                                            {t('global.watch.content-empty')}
                                        </Alert>
                                    }
                                    
                                </Tab>
                                <Tab eventKey="transcript" title="Transcript">
                                    {
                                        (videoDetails.transcript) ? videoDetails.transcript :   
                                        <Alert variant="dark">
                                            {t('global.watch.transcript-empty')}
                                        </Alert>
                                    }
                                </Tab>
                            </Tabs>
                            
                            <TagSimple terms={terms} />
                            
                        </Col>

                        <Col className="watchRigth">
                        </Col>

                    </Row>
                </Container>
            </section>

        </>
    )
}