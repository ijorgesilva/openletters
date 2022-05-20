import { graphql } from 'gatsby'
import React from 'react'
import { useTranslation } from 'react-i18next'

import config from '../../../../data/SiteConfig'
import { useGlobalIndeces } from '../../../hooks/useGlobalIndeces'
import { useTheme } from '../../../hooks/useTheme'
import FooterSimpleText from '../../footer/footerSimpleText'
import Navigation from '../../menu/navigation'
import PageHeader from '../../pageHeader'
import RenderComponent from '../../renderer'
import ShareSimpleIcon from '../../social/shareSimpleIcon'
import SectionTags from '../../tag/sectionTags'
import SectionSeriesDescription from '../../vod/content/sectionSeriesDescription'
import SectionSeriesTabs from '../../vod/content/sectionSeriesTabs'
import HeroSeries from '../../vod/hero/heroSeries'
import MenuWatchDetails from '../../vod/menu/menuWatchDetails'

import './watchSeries.scss'

export default function WatchSeries( { pageContext, location, data } ) {

    const { title, slug, excerpt, seriesDetails, campus, seriesGraphics, breadcrumbs } = pageContext

    const { t } = useTranslation()

    const cover = seriesDetails?.seriesTrailerPoster?.localFile ? 
                        seriesDetails.seriesTrailerPoster.localFile.childImageSharp.gatsbyImageData.images.fallback.src
                    : 
                        ( seriesGraphics.background?.localFile ) ? 
                            seriesGraphics.background.localFile.childImageSharp.gatsbyImageData.images.fallback.src
                        : 
                            undefined
    const sections = data.series.seriesDetails.seriesSections?.length > 0 ?  
                        data.series.seriesDetails.seriesSections 
                    : 
                        undefined

    const theme = useTheme()
    const contentMode  = 'dark'

    return (
        <>
            <PageHeader 
                title       = { title + ' | ' + t('global.watch.series') + ' | '  }
                cover       = { cover }
                description = { excerpt }
                mode        = { contentMode }
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
                mode            = { theme.styles.header }
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
                menu        = { [
                                    {name: t('global:global.watch.latest'), link: `/${campus}/${config.watchSlug}/${config.watchSlugLatest}`, as: '', target: ''},
                                ] } 
                close       = { breadcrumbs.back }
                mode        = { contentMode }
                className   = 'transparent'
            />

            <div className={`watchSeries bg-${ contentMode ? contentMode : 'light' }`}>

                <HeroSeries 
                    title           = { title }
                    logo            = { ( seriesGraphics?.logo?.localFile ) ? 
                                            seriesGraphics.logo.localFile.childImageSharp.gatsbyImageData
                                        :
                                            undefined
                                        }
                    campus          = { campus }
                    mode            = { contentMode }
                    width           = 'container'
                    seriesDetails   = { seriesDetails }
                    seriesGraphics  = { seriesGraphics }
                    featuredVideo   = { data.VideosOnSerie.nodes[0] }
                />

                <div className={`container bartools ${ contentMode ? contentMode : 'light' }`}>
                    <ShareSimpleIcon 
                        location = {location} 
                        style    = { 'toolbar' }
                        mode     = { contentMode }
                    />
                </div>

                <SectionSeriesDescription 
                    id          = 'description'
                    width       = 'container'
                    excerpt     = { excerpt }
                    mode        = { contentMode }
                />

                <SectionSeriesTabs 
                    id              = 'videos'
                    width           = 'container'
                    mode            = { contentMode }
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
                    id      = 'tags'
                    width   = 'container'
                    mode    = { contentMode }
                    tags    = { data.series.tags?.nodes }
                />

            </div>

            {
                sections?.map( ( section, index ) => (
                    <RenderComponent 
                        key     = {index}
                        section = {section}
                        campus  = {`/${campus}/`}
                    />
                ))
            }
            
            <FooterSimpleText 
                campus = { breadcrumbs.campus } 
                mode = { theme.styles.footer }
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
            tags {
                nodes {
                    id
                    slug
                    name
                }
            }
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