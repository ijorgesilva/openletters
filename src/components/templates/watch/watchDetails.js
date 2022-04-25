import { graphql } from 'gatsby'
import React from 'react'
import { Container } from 'react-bootstrap'
import { useTranslation } from "react-i18next"

import config from '../../../../data/SiteConfig'
import { useGlobalIndeces } from '../../../hooks/useGlobalIndeces'
import { useParticipation } from '../../../hooks/useParticipation'
import { useTheme } from '../../../hooks/useTheme'
import FooterSimpleText from '../../footer/footerSimpleText'
import HeaderPage from '../../headerPage'
import Navigation from '../../menu/navigation'
import ToolbarDetails from '../../toolbar/toolbarDetails'
import WatchDetailsContent from '../../vod/content/watchDetailsContent'
import WatchDetailsSidebar from '../../vod/content/watchDetailsSidebar'
import MenuWatchDetails from '../../vod/menu/menuWatchDetails'
import PlaylistDetails from '../../vod/player/playlistDetails'

import './watchDetails.scss'

export default function WatchDetails( { pageContext, location, data } ) {
    
    const { 
            title, 
            slug, 
            excerpt, 
            content, 
            tags,
            featuredImage, 
            videoDetails, 
            participationCampus,
            breadcrumbs 
        } = pageContext
    
    const { t }     = useTranslation()

    let videos          = { nodes: [] }
    let resources       = data.resources.videoDetails.videoResources
    const theme         = useTheme()
    const modeContent   = 'light'

    /* Participation Options */
    const participationCombined = useParticipation( participationCampus, data.resources.participation )
    
    if ( data?.videos?.nodes?.length > 0 ) {
        data.videos.nodes.map( video => (
            ( video.slug === slug ) ? 
                videos.nodes.push( {'active': true, ...video } )
            : 
                videos.nodes.push( video )
        ))
    }
    
    const poster = featuredImage?.node ? 
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
        <div className={`watchDetails bg-${ theme.styles.header === 'light' ? 'dark' : theme.styles.header === 'dark' ? 'light' : theme.styles.header } ${ theme.styles.header ? theme.styles.header : 'light' }`}>
            
            <div className={`player ${ theme.styles.header ? theme.styles.header : 'light'}`}>
                <HeaderPage
                    title       = { title + ' | ' + t('global.watch.videos') } 
                    location    = { location } 
                    cover       = { poster }
                    description = { excerpt }
                    mode        = { modeContent }
                    article     = { true }
                    metaTags    =   {{
                                        noIndex: ( typeof videoDetails.videoHide?.videoHideSearchEngines === 'undefined' ) ? 
                                                        false : (videoDetails.videoHide?.videoHideSearchEngines === true ) ? true : false,
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
                                        {name: t('global:global.watch.latest'), link: `/${breadcrumbs.campus}/${config.watchSlug}/${config.watchSlugLatest}`, as: '', target: ''},
                                    ] } 
                    close       = { breadcrumbs.back }
                    mode        = { theme.styles.header }
                />

                <PlaylistDetails 
                    poster          = { poster }
                    backgroundHero  = { background }
                    videoDetails    = { videoDetails }
                    videos          = { ( videos?.nodes?.length > 0 ) ? videos.nodes : undefined }
                    campus          = { breadcrumbs.campus }
                    width           = 'fullwidth'
                    mode            = { theme.styles.header }
                    order           = 'desc'
                    count
                />
                
            </div>

            <ToolbarDetails 
                className           = {'sticky-mobile'}
                location            = { location }
                mode                = { theme.styles.header }
                participation       =  {{
                                            raiseHandList: ( participationCombined.raiseHandList?.length > 0 ) ? participationCombined.raiseHandList : undefined,
                                        }}
            />

            <div className={`content ${ modeContent ? modeContent : 'light'}`}>
                <Container>
                    <div className='columns'>

                        <WatchDetailsSidebar 
                            videoDetails    = { videoDetails }
                            mode            = { modeContent }
                            position        = 'left'
                            sticky
                        />

                        <WatchDetailsContent 
                            id              = 'content'
                            title           = { title }
                            excerpt         = { excerpt } 
                            content         = { content }
                            tags            = { tags?.nodes }
                            mode            = { modeContent }
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
                </Container>
            </div>

            <FooterSimpleText 
                campus  = { breadcrumbs.campus } 
                mode    = { theme.styles.footer }
            />
            
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
                },
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


        ########
        # Related Resources
        ########
        resources: wpVideoOnDemand (
            slug: {eq: $slug},
            status: {eq: "publish"}
        ) {
            slug
            id
            videoDetails {
                videoBible {
                    videoBibleActive
                    videoBibleUrl
                }
            }
            participation {
                participationRaisehand {
                    participationRaisehandBehavior
                    participationRaisehandCustom {
                        participationRaisehandCustomUrl
                        participationRaisehandCustomType
                        participationRaisehandCustomTitle
                        participationRaisehandCustomTarget
                        participationRaisehandCustomClass
                        participationRaisehandCustomIcon {
                            localFile {
                                childImageSharp {
                                    gatsbyImageData(
                                        layout: FIXED
                                        width: 32
                                        height: 32
                                    )
                                }
                            }
                        }
                    }
                }
            }
        }

    }
    
`