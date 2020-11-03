// Dependencies
import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from "react-i18next"
import TextTruncate from 'react-text-truncate'
import sanitizeHtml from 'sanitize-html'

// Components
import HeaderPage from '../../headerPage'
import ShareSimpleIcon from '../../social/shareSimpleIcon'
import TagSimple from '../../tag/tagSimple'
import config from '../../../../data/SiteConfig'
import MenuWatchDetails from '../../vod/menu/menuWatchDetails'
import VideoJsPlayerTrailer from '../../vod/player/VideoJsPlayerTrailer'
import {watchDetailsBrand, watchDetailsMenu} from '../../../../data/menues'
import SectionFeedCarousel from '../../vod/feed/sectionFeedCarousel'
import './watchSeries.scss'

export default function WatchSeries( { pageContext, location } ) {

    const { title, node: {excerpt, content, terms, serieDetails, serieGraphics} } = pageContext

    /* Standard fields */
    const { t } = useTranslation()

    const closeUrl = config.watchSlug

    const poster = serieDetails.trailerPoster ? serieDetails.trailerPoster.localFile.childImageSharp.fluid.src : undefined

    return (
        <>
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

            <div className="WatchSeries">

                {
                    (serieDetails.trailer) ?
                        <section className="trailer">
                            <VideoJsPlayerTrailer 
                                src={serieDetails.trailer}
                                poster={poster}
                            />
                        </section>
                    : (serieDetails.trailerPoster) ?
                        undefined
                        // <HeroSimple 
                        //     id="hero" 
                        //     iconSerie={(data.hero.nodes[0].videoDetails.serie.serieGraphics.logo) ? data.hero.nodes[0].videoDetails.serie.serieGraphics.logo.localFile.childImageSharp.fluid : undefined}
                        //     iconSerieTitle={data.hero.nodes[0].videoDetails.serie.title}
                        //     iconSerieLink={`/watch/serie/`+getSerieLink(data.hero.nodes[0])}
                        //     title={data.hero.nodes[0].title}
                        //     playText={t('global.watch.watch-now')}
                        //     serieLinkText={t('global.watch.more-info')}
                        //     playUrl={ (data.hero.nodes[0].slug) ? `/watch/message/${data.hero.nodes[0].slug}` : undefined }
                        //     seriesUrl={ (data.hero.nodes[0].slug) ? `/watch/message/${data.hero.nodes[0].slug}` : undefined }
                        //     backgroundImage={getHeroBackground(data.hero.nodes[0], data.noImage.childImageSharp)}
                        //     iconPlay={data.playButton.publicURL}
                        // />
                    : undefined
                }

                <section className="h-background-six-shade-three">
                    <Container fluid className="">
                        <Row>
                            <Col>
                                {
                                    (serieGraphics.logo) ?
                                        <div className="position-relative z-index-2 iconSerie mb-4">
                                            <Img fluid={serieGraphics.logo.localFile.childImageSharp.fluid} 
                                                objectFit="contain" 
                                                objectPosition="left center" 
                                                alt={title}
                                            />
                                        </div>
                                    : <h1 className="display-1">{title}</h1>
                                }
                                <ShareSimpleIcon variant="light" />
                                {
                                    (content) ?
                                        <p>
                                            <TextTruncate 
                                                line={6} 
                                                element="span"
                                                truncateText="…" 
                                                text={sanitizeHtml(content).replace( /(<([^>]+)>)/ig, '')}
                                            />
                                        </p>
                                    : undefined
                                }
                                {
                                    (terms) ?
                                        <TagSimple terms={terms} variant="" />
                                    : undefined
                                }
                            </Col>
                            <Col></Col>
                        </Row>
                    </Container>
                </section>
                
                {
                    // (isEmpty(data.latest.nodes)) ?
                    //     undefined
                    // : 
                    // <SectionFeedCarousel 
                    //     className="h-background-six-shade-three pb-5" 
                    //     id="season" 
                    //     title={t('global.watch.section-latest-title')}
                    //     data={data.latest}
                    //     iconCarousel={data.playButton.publicURL}
                    // />
                }
            
            </div>

        </>
    )

}

export const query = graphql`
    query {
        vods: allWpVideoOnDemand (filter: {status: {eq: "publish"}}, sort: {fields: videoDetails___dayDate, order: DESC}, limit: 10, skip: 1) {
            nodes {
                title
                slug
                excerpt
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
                    oneLiner
                    dayDate
                    url
                    serie {
                        ... on WpSerie {
                            id
                            title
                            slug
                        }
                    }
                    speaker {
                        ... on WpSpeaker {
                            id
                            title
                            uri
                        }
                    }
                }
            }
        }
    }
`