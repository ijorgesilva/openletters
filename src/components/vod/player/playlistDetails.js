import { GatsbyImage } from 'gatsby-plugin-image'
import React, {useEffect} from 'react'
import { Container } from 'react-bootstrap'

import config from '../../../../data/SiteConfig'
import SidebarFeedVod from '../../../components/vod/feed/sidebarFeedVod'
import VideoReactPlayer from '../../vod/player/videoReactPlayer'
import ModalPlaylist from '../feed/modalPlaylist'
import './playlistDetails.scss'

const isBrowser = typeof window !== "undefined"

export default function PlaylistDetails( 
    { 
        videoDetails, 
        poster, 
        backgroundHero, 
        videos, 
        campus, 
        width,
        mode,
        order,
        count,
    } 
    ) {

    /* Scrolled Player */
    const [ scrolledPlayer, setScrolledPlayer ] = React.useState(false)
    const handleScroll=() => {
        const offset=window.scrollY
        if(isBrowser) {
            if(offset > 125 ){
                setScrolledPlayer(true)
            }
            else{
                setScrolledPlayer(false)
            }
        }
    }
    useEffect(() => {
        window.addEventListener( 'scroll', handleScroll )
    })
    let playerClasses=['player']
    if( scrolledPlayer ) {
        playerClasses.push('scrolled')
    }

    return (

            <div className={`playlistDetails ${ mode ? mode : 'light' } ${ ( videos?.length > 0 ) ? '' : 'single' }`} id='video'>

                <Container 
                    fluid = { width === 'container' ? undefined : true }
                    className={`${ (videos?.length > 0) ? 'playlist-grid' : ''}`}
                >
                    <div className={playerClasses.join(' ')}>
                        {
                            (videoDetails.videoUrl) ?
                                <VideoReactPlayer
                                    src     = { videoDetails.videoUrl}
                                    height  = { videos?.length > 0 ? undefined : '680px' }
                                    config  =   {
                                                    {
                                                        file: {
                                                            attributes: {
                                                                poster: poster,
                                                                autoplay: true,
                                                            }
                                                        }
                                                    }
                                                }
                                />
                            : 
                                undefined
                        }
                    </div>

                    {
                        videos?.length > 0 ?
                            <div className = 'playlist'>

                                <SidebarFeedVod 
                                    background  = { 
                                                    config.watchDetailsViewSidebarBackground && videoDetails.videoSeries?.seriesGraphics.background?.localFile ? 
                                                        videoDetails.videoSeries.seriesGraphics.background.localFile.childImageSharp.gatsbyImageData
                                                    : 
                                                        undefined
                                                    }
                                    className   = 'd-none d-md-block'
                                    serieSlug   = { videoDetails.videoSeries?.slug ? videoDetails.videoSeries.slug : undefined }
                                    id          = { videoDetails.videoSeries?.slug ? videoDetails.videoSeries.slug : undefined }
                                    items       = { videos }
                                    campus      = { campus }
                                    mode        = { mode }
                                    order       = { order }
                                    count       = { count ? true : false}
                                />

                                <ModalPlaylist 
                                    className   = 'd-block d-md-none'
                                    mode        = { mode }
                                >
                                    <SidebarFeedVod 
                                        background  = { 
                                                        ( config.watchDetailsViewSidebarBackground && videoDetails.videoSeries?.seriesGraphics.background?.localFile ) ? 
                                                            videoDetails.videoSeries.seriesGraphics.background.localFile.childImageSharp.gatsbyImageData
                                                        : 
                                                            undefined
                                                        }
                                        className   = ''
                                        serieSlug   = { videoDetails.videoSeries?.slug ? videoDetails.videoSeries.slug : undefined}
                                        id          = { videoDetails.videoSeries?.slug ? videoDetails.videoSeries.slug : undefined }
                                        items       = { videos }
                                        campus      = { campus }
                                        mode        = { mode }
                                        order       = { order }
                                        count       = { count ? true : false}
                                    />
                                </ModalPlaylist>
                                
                            </div>
                        :
                            undefined
                    }
                </Container>

                <div className='background'>
                    <div className='overlay'></div>
                    {
                        config.watchDetailsViewHeroBackground && backgroundHero ?
                            <GatsbyImage 
                                className='poster'
                                image={backgroundHero} 
                                alt=''
                            />
                        :
                            undefined
                    }
                </div>

            </div>
    )
}

