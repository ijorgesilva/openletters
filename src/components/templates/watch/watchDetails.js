// Dependencies
import React from 'react'
import { useTranslation } from "react-i18next"
import { graphql } from 'gatsby'
import ToolbarDetails from '../../toolbar/toolbarDetails'

// Components
import Navigation from '../../menu/navigation'
import WatchDetailsSidebar from '../../vod/content/watchDetailsSidebar'
import WatchDetailsContent from '../../vod/content/watchDetailsContent'
import PlaylistDetails from '../../vod/player/playlistDetails'
import { watchDetailsMenu } from '../../../../data/menues'
import HeaderPage from '../../headerPage'
import FooterSimpleText from '../../footer/footerSimpleText'
import MenuWatchDetails from '../../vod/menu/menuWatchDetails'
import './watchDetails.scss'

export default function WatchDetails( { pageContext, location, data } ) {
    
    const { title, slug, excerpt, content, featuredImage, videoDetails, videoOnDemandTags, breadcrumbs } = pageContext
    
    /* Standard fields */
    const { t }     = useTranslation()
    let videos      = { nodes: [] }
    let resources   = data.resources.videoDetails.videoResources

    if ( data?.videos?.nodes?.length > 0 ) {
        data.videos.nodes.map( video => (
            ( video.slug === slug ) ? 
                videos.nodes.push( {'active': true, ...video } )
            : 
                videos.nodes.push( video )
        ))
    }
    
    const poster = ( featuredImage?.node?.localFile ) ? 
                        featuredImage.node.localFile.childImageSharp.gatsbyImageData.images.fallback.src
                    : 
                        ( videoDetails.videoSeries?.seriesGraphics?.background?.localFile ) ?
                            videoDetails.videoSeries.seriesGraphics.background.localFile.childImageSharp.gatsbyImageData.images.fallback.src
                        :
                            undefined
    
    const background =  ( videoDetails.videoSeries?.seriesGraphics?.background?.localFile ) ?
                            videoDetails.videoSeries.seriesGraphics.background.localFile.childImageSharp.gatsbyImageData
                        : 
                            undefined

    const searchIndices = [{ name: `vod`, title: `Messages` }, { name: `pages`, title: `Pages`} ]
    
    return (
        <div className={"watchDetails"}>
            
            <HeaderPage
                title       = { title + ' | ' + t('global.watch.videos') } 
                location    = { location } 
                cover       = { poster }
                description = { excerpt }
                article     = { true }
                metaTags    =   {{
                                    noIndex: ( videoDetails.videoHide.videoHideSearchResults ) ? true : false,
                                }}
            />

            <Navigation
                location        = { location }
                campus          = { breadcrumbs.campus }
                searchIndices   = { searchIndices }
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
            />

            <PlaylistDetails 
                poster          = { poster }
                backgroundHero  = { background }
                videoDetails    = { videoDetails }
                videos          = { ( videos?.nodes?.length > 0 ) ? videos.nodes : undefined }
                campus          = { breadcrumbs.campus }
            />
            
            <ToolbarDetails 
                location = {location}
                variant  = 'dark'
            />

            <main className="main">
                <div className="columns">

                    <WatchDetailsSidebar 
                        location        = { location }
                        videoDetails    = { videoDetails }
                    />

                    <WatchDetailsContent 
                        title           = { title }
                        excerpt         = { excerpt } 
                        content         = { content }
                        tags            = { videoOnDemandTags }
                        videoDetails    = { videoDetails }
                        resources       = { resources }
                        backUrl         = { breadcrumbs.back }
                        campus          = { breadcrumbs.campus }
                        bible           =   { 
                                                ( data.resources.videoDetails.videoBible?.videoBibleActive === true) ? 
                                                    data.resources.videoDetails.videoBible.videoBibleActive 
                                                : 
                                                    true 
                                            }
                        bibleUrl        =   { 
                                                ( data.resources.videoDetails.videoBible?.videoBibleUrl ) ? 
                                                    data.resources.videoDetails.videoBible.videoBibleUrl
                                                :
                                                    undefined
                                            }
                    />

                </div>
            </main>

            <FooterSimpleText campus={ breadcrumbs.campus } />
            
        </div>
    )

}

export const query = graphql`
    query getAllVideosOnSerie( $serieId: String!, $campusId: String!, $slug: String! ){
        
        ########
        # Videos on Series 
        ########
        videos: allWpVideoOnDemand (
                filter: {
                    videoDetails: {
                        videoCampusId: {regex: $campusId},
                        videoSerieId: {eq: $serieId}
                    }, 
                    status: {eq: "publish"},
                }, 
                sort: {
                    fields: videoDetails___videoDayDate, 
                    order: DESC
                }
            ) {
            nodes{
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
                    videoSeries {
                        ... on WpSerie {
                            id
                            title
                            slug
                        }
                    }
                }

            }
        }


        ########
        # Related Resources
        ########
        resources: wpVideoOnDemand (
            slug: {eq: $slug}
        ) {
            slug
            id
            videoDetails {
                videoBible {
                    videoBibleActive
                    videoBibleUrl
                }
                videoResources {
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
            }
        }

    }
    
`