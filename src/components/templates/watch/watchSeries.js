// Dependencies
import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import { Tabs, Tab } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import sanitizeHtml from 'sanitize-html'
import { faPlay } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// Components
import FeedListEven from '../../feed/feedListEven'
import HeaderPage from '../../headerPage'
import ShareSimpleIcon from '../../social/shareSimpleIcon'
import TagSimple from '../../tag/tagSimple'
import config from '../../../../data/SiteConfig'
import MenuWatchDetails from '../../vod/menu/menuWatchDetails'
import VideoReactPlayer from '../../vod/player/videoReactPlayer'
import {watchDetailsBrand, watchDetailsMenu} from '../../../../data/menues'
import SectionFeedCarousel from '../../vod/feed/sectionFeedCarousel'
import TabSeasons from '../../vod/tab/tabSeasons'
import SectionTextPhoto from '../../content/sectionTextPhoto'
import './watchSeries.scss'

export default function WatchSeries( { pageContext, location, data } ) {

    const { title, slug, node: {excerpt, content, videoOnDemandTags, serieDetails, serieGraphics} } = pageContext

    /* Standard fields */
    const { t } = useTranslation()

    const closeUrl = config.watchSlug

    const poster = serieDetails.trailerPoster ? serieDetails.trailerPoster.localFile.childImageSharp.fluid.src : undefined
    
    const styleBackgroundHero = {
        backgroundImage: (serieGraphics.background) ? "url("+ serieGraphics.background.localFile.childImageSharp.fluid.src+")" : "none"
    }
    const styleFeaturedPhoto = {
        backgroundImage: "none"
    }
    const styleNoPhoto = {
        backgroundImage: (data.noImage) ? "url("+ data.noImage.childImageSharp.fluid.src +")" : 'none'
    }

    console.log(videoOnDemandTags)

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
                className="transparent"
            />

            <div className="watchSeries">

                <section className="hero h-background-six-shade-three">

                    {
                        (serieGraphics.logo) ?
                            <div className={`serieName`}>
                                <Img fluid={serieGraphics.logo.localFile.childImageSharp.fluid} 
                                    objectFit="contain" 
                                    objectPosition="left center" 
                                    alt={title}
                                />
                            </div>
                        :
                            <div className={`serieName`}>
                                <h1 className="display-1">{title}</h1>
                            </div>
                    }

                    <div className="jumbotron content-container h-background-six-shade-three">

                        <div className="about">
                            {
                                data.videos.nodes.map( (item, index) => (
                                    (index === 0) ?
                                        <>
                                            <h2>{item.title}</h2>
                                            <p>{ (item.excerpt) ? item.excerpt.replace(/<p>/, '').replace(/<\/p>/, '') : t('global.empty.text-not-available') }</p>
                                            <Link to={config.watchMessageDetailsSlug + '/' + item.slug} className="btn btn--animation btn--light-outline z-index-2" >
                                                <FontAwesomeIcon icon={faPlay} size="lg" /> {t('global.watch.watch-now')}
                                            </Link>
                                        </>
                                    : 
                                        undefined
                                ))
                            }
                        </div>

                        <div className="trailer">
                            {
                                (serieDetails.trailer) ?
                                    <section className="trailer">
                                        <VideoReactPlayer
                                            src={serieDetails.trailer}
                                            controls={false}
                                            config={{
                                                file: {
                                                    attributes: {
                                                        poster: poster,
                                                        autoplay: true,
                                                    }
                                                }
                                            }}
                                        />
                                    </section>
                                : 
                                    
                                    data.videos.nodes.map( (item, index) => (
                                        (index === 0) ?
                                            (item.featuredImage) ?
                                                <Img className="noTrailer" fluid={item.featuredImage.node.localFile.childImageSharp.fluid} alt="" />
                                            :
                                                <div className="noTrailer" style={styleNoPhoto}></div>
                                        : 
                                            undefined
                                    ))
                                    
                            }
                        </div>

                    </div>

                    <div className="background">
                        <div className="overlay"></div>
                        <div className="poster" style={styleBackgroundHero}></div>
                    </div>

                </section>

                <section className="h-background-six-shade-three content">
                    <div className="content-container">
                        <div className="bartools">
                            <ShareSimpleIcon location={location} variant="light" />
                        </div>
                        {
                            (content) ?
                                <>
                                    <div className="title h-color-six-shade-three">
                                        <h4>{t('global.about-serie')}</h4> 
                                    </div>
                                    <p>
                                        {sanitizeHtml(content).replace( /(<([^>]+)>)/ig, '')}
                                    </p>
                                </>
                            : 
                                undefined
                        }
                    </div>
                </section>
                
                <section className="h-background-six-shade-three">
                    <div className="content-container">
                        <Tabs defaultActiveKey="0" className="light" id="">

                            <Tab eventKey="0" title={ 
                                    (data.videos && serieDetails.serieSeasonsActive === false) ? 
                                        t('global.watch.videos') 
                                    : 
                                        t('global.watch.videos')  
                            }>
                                {
                                    (data.videos && serieDetails.serieSeasonsActive === false) ?
                                        <SectionFeedCarousel 
                                            className="h-background-six-shade-three" 
                                            id="episodes" 
                                            title=""
                                            items={data.videos}
                                            itemsVisible={5}
                                            iconCarousel={data.playButton.publicURL}
                                        />
                                    : 
                                        (data.videos && serieDetails.serieSeasonsActive === true) ?
                                            <TabSeasons
                                                className="h-background-six-shade-three" 
                                                id="episodes" 
                                                title=""
                                                items={data.videos}
                                                itemsVisible={5}
                                                iconCarousel={data.playButton.publicURL}
                                                serie={slug}
                                                count={true}
                                            />
                                        :
                                            <SectionFeedCarousel 
                                                className="h-background-six-shade-three" 
                                                id="episodes" 
                                                title=""
                                                items={data.videos}
                                                itemsVisible={4}
                                                iconCarousel={data.playButton.publicURL}
                                                count={true}
                                            />
                                }
                            </Tab>

                            {
                                (serieDetails.serieRelatedResources) ?
                                    <Tab eventKey="1" title={t('global.related-resources')}>
                                        <FeedListEven
                                            className="h-background-six-shade-three"
                                            items={serieDetails.serieRelatedResources}
                                            variant='light'
                                        />
                                    </Tab>
                                :
                                    undefined
                            }
                        </Tabs>
                    </div>
                    
                </section>

                <section className={'pb-5 h-background-six-shade-three'}>
                    <div className="content-container">
                        {
                            (videoOnDemandTags) ?
                                <TagSimple terms={videoOnDemandTags} variant="" />
                            : 
                                undefined
                        }
                    </div>
                </section>


                {
                    (serieDetails.serieDetailsSectionFooter) ? 
                        <SectionTextPhoto 
                            title={serieDetails.serieDetailsSectionFooter.sectionDetails.sectionTitle}
                            className={(serieDetails.serieDetailsSectionFooter.sectionDetails.sectionClassname) ? serieDetails.serieDetailsSectionFooter.sectionDetails.sectionClassname : undefined}
                            content={(serieDetails.serieDetailsSectionFooter.sectionDetails.sectionContent) ? serieDetails.serieDetailsSectionFooter.sectionDetails.sectionContent : undefined}
                            subtitle={(serieDetails.serieDetailsSectionFooter.sectionDetails.sectionSubtitle) ? serieDetails.serieDetailsSectionFooter.sectionDetails.sectionSubtitle : undefined}
                            variant={serieDetails.serieDetailsSectionFooter.sectionDetails.sectionVariant}
                            buttonText={(serieDetails.serieDetailsSectionFooter.sectionDetails.sectionButton) ? serieDetails.serieDetailsSectionFooter.sectionDetails.sectionButton.sectionButtonText : undefined}
                            buttonType={(serieDetails.serieDetailsSectionFooter.sectionDetails.sectionButton) ? serieDetails.serieDetailsSectionFooter.sectionDetails.sectionButton.sectionButtonType : undefined}
                            buttonLink={(serieDetails.serieDetailsSectionFooter.sectionDetails.sectionButton) ? serieDetails.serieDetailsSectionFooter.sectionDetails.sectionButton.sectionButtonUrl : undefined}
                            linkText={(serieDetails.serieDetailsSectionFooter.sectionDetails.sectionLink) ? serieDetails.serieDetailsSectionFooter.sectionDetails.sectionLink.sectionLinkText : undefined}
                            linkType={(serieDetails.serieDetailsSectionFooter.sectionDetails.sectionLink) ? serieDetails.serieDetailsSectionFooter.sectionDetails.sectionLink.sectionLinkType : undefined}
                            link={(serieDetails.serieDetailsSectionFooter.sectionDetails.sectionLink) ? serieDetails.serieDetailsSectionFooter.sectionDetails.sectionLink.sectionLinkUrl : undefined}
                            photo={(serieDetails.serieDetailsSectionFooter.sectionDetails.sectionPhoto) ? serieDetails.serieDetailsSectionFooter.sectionDetails.sectionPhoto.localFile.childImageSharp.fluid : undefined}
                        />
                    : undefined
                }


            </div>

        </>
    )

}

export const query = graphql`
    query getVideosOnSeries($serieId: String!){

        videos: allWpVideoOnDemand (filter: {videoDetails: {videoSerieId: {eq: $serieId}}, status: {eq: "publish"}}, sort: {fields: videoDetails___dayDate, order: DESC}, limit: 10) {
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
                    videoSeason {
                        ... on WpSeason {
                            slug
                            status
                            seasonDetails {
                                seasonTitle
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
        
        playButton: file(relativePath: {eq: "img/global/button__play-white.svg"}) {
            publicURL
        }

        playIcon: file(relativePath: {eq: "img/global/icon_play_white.svg"}) {
            publicURL
        }
        
    }
`