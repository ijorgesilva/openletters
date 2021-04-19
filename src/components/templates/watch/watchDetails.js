// Dependencies
import React from 'react'
import { useTranslation } from "react-i18next"
import { graphql } from 'gatsby'

// Components
import Navigation from '../../menu/navigation'
import WatchDetailsSidebar from '../../vod/content/watchDetailsSidebar'
import WatchDetailsContent from '../../vod/content/watchDetailsContent'
import PlaylistDetails from '../../vod/player/playlistDetails'
import { watchDetailsMenu } from '../../../../data/menues'
import HeaderPage from '../../headerPage'
import MenuWatchDetails from '../../vod/menu/menuWatchDetails'
import './watchDetails.scss'

export default function WatchDetails( { pageContext, location, data } ) {
    
    const { title, slug, excerpt, content, featuredImage, videoDetails, videoOnDemandTags, breadcrumbs } = pageContext
    
    /* Standard fields */
    const { t } = useTranslation()
    let videos = { nodes: [] }

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

    return (
        <div className={"watchDetails"}>
            
            <HeaderPage
                title       = { title + ' | ' + t('global.watch.videos') } 
                location    = { location } 
                cover       = { poster }
                description = { excerpt }
                article     = { true }
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
            />

            <PlaylistDetails 
                poster          = { poster }
                backgroundHero  = { background }
                videoDetails    = { videoDetails }
                videos          = { ( videos?.nodes?.length > 0 ) ? videos.nodes : undefined }
                campus          = { breadcrumbs.campus }
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
                        backUrl         = { breadcrumbs.back }
                    />

                </div>
            </main>

        </div>
    )

}

export const query = graphql`
    query getAllVideosOnSerie( $serieId: String!, $campusId: String! ){
        
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

    }
    
`