
import React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'react-i18next'


import Navigation from '../../menu/navigation'
import HeroSeries from '../../vod/hero/heroSeries'
import HeaderPage from '../../headerPage'
import SectionTags from '../../tag/sectionTags'
import MenuWatchDetails from '../../vod/menu/menuWatchDetails'
import SectionSeriesDescription from '../../vod/content/sectionSeriesDescription'
import SectionSeriesTabs from '../../vod/content/sectionSeriesTabs'
import { watchDetailsMenu } from '../../../../data/menues'
import RenderSection from '../../renderSection.js'
import FooterSimpleText from '../../footer/footerSimpleText'
import ShareSimpleIcon from '../../social/shareSimpleIcon'


import { useGlobalIndeces } from '../../../hooks/useGlobalIndeces'


import './watchSeries.scss'

export default function WatchSeries( { pageContext, location, data } ) {

    const { title, slug, excerpt, seriesDetails, campus, seriesGraphics, videoOnDemandTags, breadcrumbs } = pageContext
    
    const { t } = useTranslation()
    
    const cover = ( seriesDetails?.seriesTrailerPoster?.localFile ) ? 
                        seriesDetails.seriesTrailerPoster.localFile.childImageSharp.gatsbyImageData.images.fallback.src
                    : 
                        ( seriesGraphics.background?.localFile ) ? 
                            seriesGraphics.background.localFile.childImageSharp.gatsbyImageData.images.fallback.src
                        : 
                            undefined
    const sections = ( data.series.seriesDetails.seriesSections?.length > 0 ) ?  
                        data.series.seriesDetails.seriesSections 
                    : 
                        undefined

    const mode  = 'dark'

    return (
        <>
            <HeaderPage 
                title       = { title + ' | ' + t('global.watch.series') + ' | '  } 
                location    = { location }
                cover       = { cover }
                description = { excerpt }
                mode        = { mode }
                className   = 'watchSeries'
                article
                metaTags    =   {{
                                    noIndex: ( typeof seriesDetails.seriesHide?.seriesHideSearchEngines === 'undefined' ) ? 
                                                false : (seriesDetails.seriesHide?.seriesHideSearchEngines === true ) ? true : false,
                                }}
            />

            <Navigation
                location        = { location }
                campus          = { breadcrumbs.campus }
                searchIndices   = { useGlobalIndeces() }
                mode            = { mode }
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
                mode        = { mode }
                className   = 'transparent'
            />

            <div className={`watchSeries bg-${ mode ? mode : 'light' }`}>

                <HeroSeries 
                    title           = { title }
                    logo            = { ( seriesGraphics?.logo?.localFile ) ? 
                                            seriesGraphics.logo.localFile.childImageSharp.gatsbyImageData
                                        :
                                            undefined
                                        }
                    campus          = { campus }
                    mode            = { mode }
                    width           = 'container'
                    seriesDetails   = { seriesDetails }
                    seriesGraphics  = { seriesGraphics }
                    featuredVideo   = { data.VideosOnSerie.nodes[0] }
                />

                <div className={`container bartools ${ mode ? mode : 'light' }`}>
                    <ShareSimpleIcon 
                        location = {location} 
                        mode     = { mode }
                    />
                </div>

                <SectionSeriesDescription 
                    id          = 'description'
                    width       = 'container'
                    excerpt     = { excerpt }
                    mode        = { mode }
                />

                <SectionSeriesTabs 
                    id              = 'videos'
                    width           = 'container'
                    mode            = { mode }
                    campus          = { campus }
                    videos          = { data.VideosOnSerie?.nodes }
                    seasons         = { seriesDetails.seriesSeasonsActive ? true : false }
                    playButtonIcon  = { data.playButton?.publicURL }
                    slugSeries      = { slug }
                    resources       = { data.series.seriesDetails.seriesResources }
                    breadcrumbs     = { breadcrumbs }
                    order           = 'asc'
                    hasExcerpt
                    count
                />
                
                <SectionTags
                    id   = 'tags'
                    tags = { videoOnDemandTags?.nodes }
                    mode = { mode }
                />

            </div>

            {
                (sections) ?
                    sections.map( ( section, index ) => (
                        <RenderSection 
                            key     = {index}
                            section = {section}
                            campus  = {`/${campus}/`}
                            filter  = { {campus: campus } }
                        />
                    ))
                :
                    undefined
            }
            
            <FooterSimpleText 
                campus = { breadcrumbs.campus } 
                mode = { mode }
            />
            
        </>
    )

}

export const query = graphql`
    query getSeriesDetails( $serieId: String!, $campusId: String!, $slug: String! ){

        ########
        # Series
        ########
        series: wpSerie(
            slug: {eq: $slug}
        ) {
            slug
            seriesDetails{
                seriesResources{
                    ... on WpPost {
                        id
                        slug
                        title
                        excerpt
                        status
                        featuredImage {
                            node {
                                localFile {
                                    childImageSharp {
                                        gatsbyImageData(layout: FULL_WIDTH)
                                    }
                                }
                            }
                        }
                        postDetails {
                            postCampus {
                                ... on WpCampus {
                                    id
                                    slug
                                }
                            }
                        }
                    }
                    ... on WpLinkitem {
                        id
                        title
                        excerpt
                        status
                        featuredImage {
                            node {
                                localFile {
                                    childImageSharp {
                                        gatsbyImageData(layout: FULL_WIDTH)
                                    }
                                }
                            }
                        }
                        linkDetails {
                            linkLink {
                                linkLinkTarget
                                linkLinkType
                                linkLinkUrl
                            }
                        }
                    }
                }
                seriesSections{
                    ... on WpContentSection {
                        id
                        slug
                        databaseId
                        sectionDetails {
                            sectionContent
                            sectionTitle
                            sectionType

                            ## Call To Actions
                            sectionCta {
                                sectionCtaSubtitle
                                sectionCtaLink {
                                    sectionLinkText
                                    sectionLinkType
                                    sectionLinkUrl
                                }
                                sectionCtaButton {
                                    sectionButtonUrl
                                    sectionButtonType
                                    sectionButtonText
                                }
                                sectionCtaPhoto {
                                    localFile {
                                        childImageSharp {
                                            gatsbyImageData(layout: FULL_WIDTH)
                                        }
                                    }
                                }
                            }

                            ## Podcast
                            sectionPodcast {
                                sectionPodcastSubtitle
                                sectionPodcastItunesUrl
                                sectionPodcastSpotifyUrl
                                sectionPodcastSoundcloudUrl
                                sectionPodcastGraphic {
                                    localFile {
                                        childImageSharp {
                                            gatsbyImageData(layout: FULL_WIDTH)
                                        }
                                    }
                                }
                            }

                            ## VOD by Tag
                            sectionVodTags {
                                sectionVodTag {
                                    slug
                                    databaseId
                                    description
                                    name
                                    videosOnDemand {
                                        nodes {
                                            title
                                            slug
                                            excerpt
                                            status
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
                                                videoSeries {
                                                    ... on WpSerie {
                                                        id
                                                        title
                                                        slug
                                                    }
                                                }
                                                videoCampus {
                                                    ... on WpCampus {
                                                        id
                                                        slug
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

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