// Dependencies
import React, {useEffect} from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'

// Components
import VideoReactPlayer from '../../vod/player/videoReactPlayer'
import SidebarFeedVod from '../../../components/vod/feed/sidebarFeedVod'
import config from '../../../../data/SiteConfig'
import './playlistDetails.scss'

export default function PlaylistDetails( { videoDetails, poster, backgroundHero, videos, campus } ) {

    /* Scrolled Player */
    const [ scrolledPlayer, setScrolledPlayer ] = React.useState(false)
    const handleScroll=() => {
        const offset=window.scrollY
        if(offset > 700 ){
            setScrolledPlayer(true)
        }
        else{
            setScrolledPlayer(false)
        }
    }
    useEffect(() => {
        window.addEventListener( 'scroll', handleScroll )
    })
    let playerClasses=['player']
    if( scrolledPlayer ) {
        playerClasses.push('scrolled')
    }
    /*. Scrolled Player */

    console.log(poster)

    return (

            <div className={`watchPlayer h-background-six-shade-three ${ ( videos?.length > 0 ) ? '' : 'single' }`} id="video">

                <div className={`content-container ${ (videos?.length > 0) ? 'playlist-grid' : ''}`}>
                    
                    <div className={playerClasses.join(" ")}>
                        {
                            (videoDetails.videoUrl) ?
                                <VideoReactPlayer
                                    src={videoDetails.videoUrl}
                                    height={ ( videos?.length > 0  ) ? undefined : '680px' }
                                    config={{
                                        file: {
                                            attributes: {
                                                poster: poster,
                                                autoplay: true,
                                            }
                                        }
                                    }}
                                />
                            : 
                                undefined
                        }
                    </div>


                    {
                        ( videos?.length > 0  ) ?
                            <div className="playlist">
                                <SidebarFeedVod 
                                    title       = { ( videoDetails.videoSeries?.title ) ? videoDetails.videoSeries.title : undefined}
                                    background  = { 
                                                    ( config.watchDetailsViewSidebarBackground && videoDetails.videoSeries?.seriesGraphics.background?.localFile ) ? 
                                                        videoDetails.videoSeries.seriesGraphics.background.localFile.childImageSharp.gatsbyImageData
                                                    : 
                                                        undefined
                                                    }
                                    className   = "h-background-six-shade-three" 
                                    serieSlug   = { ( videoDetails.videoSeries?.slug ) ? videoDetails.videoSeries.slug : undefined}
                                    id          = { ( videoDetails.videoSeries?.slug ) ? videoDetails.videoSeries.slug : undefined }
                                    items       = { videos }
                                    campus      = { campus }
                                />
                            </div>
                        :
                            undefined
                    }
                    
                </div>

                <div className="background">
                    <div className="overlay"></div>
                    {
                        (config.watchDetailsViewHeroBackground) ?
                            <GatsbyImage 
                                className="poster"
                                image={backgroundHero} 
                                alt=""
                            />
                        :
                            undefined
                    }
                </div>

            </div>
    )
}

