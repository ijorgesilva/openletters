// Dependencies
import React from 'react'
import { Container, Row, Col, Tabs, Tab, Alert } from 'react-bootstrap'
import { useTranslation } from "react-i18next"
import Img from 'gatsby-image'
import { Link } from 'gatsby'

// import { useStaticQuery, graphql } from 'gatsby'
import { useQuery, gql } from '@apollo/client';

// Components
import { getDate } from '../../utils/utils'
import HeaderPage from '../../headerPage'
import TagSimple from '../../tag/tagSimple'
import ShareSimpleIcon from '../../social/shareSimpleIcon'
import VideoJsPlayerCustom from '../../vod/player/videoJsPlayer'
import config from '../../../../data/SiteConfig'
import MenuWatchDetails from '../../vod/menu/menuWatchDetails'
import {watchDetailsBrand, watchDetailsMenu} from '../../../../data/menues'
import SectionTextPhoto from '../../content/sectionTextPhoto'
import './watchDetails.scss'


export default function WatchDetails( { pageContext, location, className, ...props } ) {
    
    const { title, node: {excerpt, content, featuredImage, videoDetails, terms} } = pageContext

    /* Standard fields */
    const { t } = useTranslation()
    
    // const { loading, error, data } = useQuery(watchData)
    
    // if (loading) return <p>Loading...</p>
    // if (error) return <p>Error :(</p>

    const poster = featuredImage ? featuredImage.node.localFile.childImageSharp.fluid.src : '' //data.noImage.childImageSharp.fluid.src
    const vodDate = getDate(videoDetails.dayDate,2,'us','LLLL d, yyyy' )

    const closeUrl = (videoDetails.serie) ? config.watchSerieDetailsSlug + '/' + videoDetails.serie.slug : config.watchSlug

    return (

        <div className={`watchDetails ${(className)? className : ''}`}>
            
            <HeaderPage 
                title={title} 
                location={location} 
                cover={poster}
                description={excerpt}
                article={true}
            />

            <MenuWatchDetails 
                menuBrand={watchDetailsBrand} 
                menu={watchDetailsMenu} 
                close={closeUrl}
            />

            <section className="watchPlayer p-0" id="video">
                <Container fluid className="h-background-six-shade-three mb-5">
                    <Row>

                        <Col className="playerLeft">
                        </Col>

                        <Col xs={12} sm={12} className="p-0">
                            {
                                (videoDetails.url) ?
                                    <VideoJsPlayerCustom 
                                        src={videoDetails.url}
                                        poster={poster}
                                        className={'p-0 vjs-16-9'}
                                    />
                                : null
                            }
                        </Col>

                        <Col className="playerRight">
                        </Col>

                    </Row>
                </Container>
            </section>

            <main className="mt-5 mb-5">
                <Container>
                    <Row>

                        <Col className="watchLeft" xs={12} md={2} lg={2}>
                            <div className="sticky">
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

                        <Col id="content" className="watchContent" xs={12} md={8} lg={8}>

                            {
                                (videoDetails.serie.slug) ?
                                    <div className="introCard introCardGrid mb-5">
                                        <Link to={`${config.watchSerieDetailsSlug}/${videoDetails.serie.slug}`}>
                                            <Img className="serieGraphic" fluid={videoDetails.serie.serieGraphics.poster.localFile.childImageSharp.fluid} alt="" />
                                        </Link>
                                        <div>
                                            <h1 className="">{title}</h1>
                                            {
                                                (videoDetails.serie.title) ? <Link to={`${config.watchSerieDetailsSlug}/${videoDetails.serie.slug}`}><h2>{videoDetails.serie.title}</h2></Link> : undefined
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

                            <div className="watchResources" id="resources">
                                
                            </div>

                            <div className="extract" dangerouslySetInnerHTML={{__html: excerpt}}></div>

                            <Tabs className="mt-5 sticky" defaultActiveKey="notes" id="">
                                <Tab eventKey="notes" title="Notes">
                                    {
                                        (content) ? 
                                            <article dangerouslySetInnerHTML={{__html: content }}></article> 
                                        : 
                                            <Alert variant="dark">
                                                {t('global.watch.content-empty')}
                                            </Alert>
                                    }
                                    
                                </Tab>
                                <Tab eventKey="transcript" title="Transcript">
                                    {
                                        (videoDetails.transcript) ? 
                                            videoDetails.transcript 
                                        :   
                                            <Alert variant="dark">
                                                {t('global.watch.transcript-empty')}
                                            </Alert>
                                    }
                                </Tab>
                            </Tabs>
                            
                            <TagSimple terms={terms} />
                            
                        </Col>

                        <Col className="watchRight" xs={12} md={2} lg={2}>
                        </Col>

                    </Row>
                </Container>
            </main>
            
            <section>
                {/* {
                    data.videos.nodes.map( (video, index) =>(
                        <p key={index}>
                            {video.title}
                        </p>
                    ))
                } */}
            </section>

            <SectionTextPhoto 
                title="Title"
                className="h-background-one"
                content="orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
                subtitle="lorem ipsum dolor sit amet"
                variant="light"
                buttonText="Text"
                buttonType="internal"
                buttonLink="/"
                linkText=""
                linkType=""
                    link=""
                   photo=""
            />

        </div>
    )
}

