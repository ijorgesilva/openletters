// Dependencies
import React from 'react'
import { graphql } from 'gatsby'
import { Tabs, Tab } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import sanitizeHtml from 'sanitize-html'

// Components
import Navigation from '../../menu/navigation'
import HeroSeries from '../../vod/hero/heroSeries'
import FeedListEven from '../../feed/feedListEven'
import HeaderPage from '../../headerPage'
import ShareSimpleIcon from '../../social/shareSimpleIcon'
import TagSimple from '../../tag/tagSimple'
import MenuWatchDetails from '../../vod/menu/menuWatchDetails'
import { watchDetailsMenu } from '../../../../data/menues'
import SectionFeedCarousel from '../../vod/feed/sectionFeedCarousel'
import FooterSimpleText from '../../footer/footerSimpleText'
import TabSeasons from '../../vod/tab/tabSeasons'
import './watchSeries.scss'

export default function WatchSeries( { pageContext, location, data } ) {

    const { title, slug, excerpt, seriesDetails, campus, seriesGraphics, videoOnDemandTags, breadcrumbs } = pageContext
    
    /* Standard fields */
    const { t } = useTranslation()
    
    const cover = ( seriesDetails?.seriesTrailerPoster?.localFile ) ? 
                        seriesDetails.seriesTrailerPoster.localFile.childImageSharp.gatsbyImageData.images.fallback.src
                    : 
                        ( seriesGraphics.background?.localFile ) ? 
                            seriesGraphics.background.localFile.childImageSharp.gatsbyImageData.images.fallback.src
                        : 
                            undefined
    
    
    return (
        <>
            <HeaderPage 
                title       = { title + ' | ' + t('global.watch.series') + ' | '  } 
                location    = { location }
                cover       = { cover }
                description = { excerpt }
                article
            />

            <Navigation
                location    = { location }
                campus      = { breadcrumbs.campus }
                menuGlobal
            />

            <MenuWatchDetails 
                menuBrand   = 
                                { 
                                    {
                                        'link': breadcrumbs.rootApp,
                                        'name': t('global.watch.title')
                                    }
                                } 
                menu        = { watchDetailsMenu } 
                close       = { breadcrumbs.back }
                className   = "transparent"
                styles      =   {
                                    { 
                                        position: 'absolute', 
                                        marginTop: '50px' 
                                    }
                                }
            />

            <div className="watchSeries">

                <HeroSeries 
                    title           = { title}
                    logo            = { ( seriesGraphics?.logo?.localFile ) ? 
                                            seriesGraphics.logo.localFile.childImageSharp.gatsbyImageData
                                        :
                                            undefined
                                        }
                    items           = { data.VideosOnSerie.nodes }
                    path            = { `/${campus}/` }
                    seriesDetails   = { seriesDetails }
                    seriesGraphics  = { seriesGraphics }
                    featuredVideo   = { data.VideosOnSerie.nodes[0] }
                />

                <section className="content h-background-six-shade-three">
                    <div className="content-container">
                        <div className="bartools">
                            <ShareSimpleIcon location={location} variant="light" />
                        </div>
                        {
                            (excerpt) ?
                                <>
                                    <div className="title h-color-six-shade-three">
                                        <h4>{t('global.watch.about-series')}</h4> 
                                    </div>
                                    <p>
                                        {sanitizeHtml(excerpt).replace( /(<([^>]+)>)/ig, '')}
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
                                    ( data.VideosOnSerie && seriesDetails.seriesSeasonsActive === false ) ? 
                                        t('global.watch.videos') 
                                    : 
                                        t('global.watch.videos')  
                            }>
                                {
                                    ( data.VideosOnSerie?.nodes && seriesDetails.seriesSeasonsActive === false ) ?
                                        <SectionFeedCarousel 
                                            className="h-background-six-shade-three" 
                                            id="episodes" 
                                            title=""
                                            items={data.VideosOnSerie.nodes}
                                            path={`/${campus}/`}
                                            itemsVisible={5}
                                            iconCarousel={data.playButton.publicURL}
                                        />
                                    :
                                        (data.VideosOnSerie && seriesDetails.seriesSeasonsActive === true) ?
                                            <TabSeasons
                                                className="h-background-six-shade-three" 
                                                id="episodes" 
                                                title=""
                                                items={data.VideosOnSerie.nodes}
                                                itemsVisible={5}
                                                campus={`/${campus}/`}
                                                // iconCarousel={data.playButton.publicURL}
                                                serie={slug}
                                                count
                                            />
                                        :
                                            <SectionFeedCarousel 
                                                className="h-background-six-shade-three" 
                                                id="episodes" 
                                                title=""
                                                items={data.VideosOnSerie.nodes}
                                                path={`/${campus}/`}
                                                itemsVisible={4}
                                                iconCarousel={data.playButton.publicURL}
                                                count
                                            />
                                }
                            </Tab>
                            {
                                ( seriesDetails.seriesRelatedPosts ) ?
                                    <Tab eventKey="1" title={t('global.related-resources')}>
                                        <FeedListEven
                                            className   = "h-background-six-shade-three"
                                            items       = { seriesDetails.seriesRelatedPosts} 
                                            variant     = 'light'
                                            campus      = { breadcrumbs.campus }
                                        />
                                    </Tab>
                                :
                                    undefined
                            }
                        </Tabs>
                    </div>
                </section>


                {
                    (videoOnDemandTags?.nodes?.length > 0) ?
                        <section className={'pb-5 h-background-six-shade-three'}>
                            <div className="content-container">
                                <TagSimple terms={videoOnDemandTags} variant="" />
                            </div>
                        </section>
                    :
                        undefined
                }

            </div>

            <FooterSimpleText campus={ breadcrumbs.campus } />
            
        </>
    )

}

export const query = graphql`
    query getSeriesDetails( $serieId: String!, $campusId: String! ){

        ########
        # Videos on Series 
        ########
        VideosOnSerie: allWpVideoOnDemand (
                filter: {
                    videoDetails: {
                        videoCampusId: {regex: $campusId},
                        videoSerieId: {eq: $serieId}
                    }, 
                    status: {eq: "publish"}
                }, 
                sort: {
                    fields: videoDetails___videoDayDate, 
                    order: DESC
                }
            ) {
            nodes {
                title
                slug
                excerpt
                featuredImage {
                    node {
                        localFile {
                          childImageSharp {
                            gatsbyImageData(layout: FULL_WIDTH)
                          }
                        }
                    }
                }
                videoDetails {
                    videoOneLiner
                    videoDayDate
                    videoUrl
                    videoSeason {
                        ... on WpSeason {
                            slug
                            status
                            seasonDetails {
                                seasonTitle
                                seasonOrder
                            }
                        }
                    }
                }
            }
        }
 
        ########
        # Assets
        ########
        playButton: file(relativePath: {eq: "img/global/button__play-white.svg"}) {
            publicURL
        }
        
    }
`