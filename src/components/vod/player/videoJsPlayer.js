/*
        Deprecated
*/

import React, { useRef, useState, useEffect } from 'react'

// Player
import videojs from 'video.js'
import 'videojs-logo'
import 'videojs-logo/dist/videojs-logo.css'
import 'video.js/dist/video-js.css'
// import 'videojs-contrib-quality-levels'
// import {qualitySelector} from 'videojs-hls-quality-selector'

// Assets
// import watermarkLogo from '../../../assets/img/global/logo_icon_white.png'
// Src: https://github.com/chrisboustead/videojs-hls-quality-selector/issues/23#issuecomment-602013962
// Fix https://github.com/chrisboustead/videojs-hls-quality-selector/issues/10#issuecomment-575770360

export default function VideoJsPlayerCustom ({className, poster, src, ...props}) {

    const videoRef = useRef()
    const [player, setPlayer] = useState(undefined)

    const playerClassName = (className) ? className : ''
    
    useEffect(() => {

        const videoJsOptions = {
            autoplay: true,
            controls: true,
            fluid: false,
            muted: false,
            responsive: true,
            sources: [{
                src: src,
            }],
        }

        const p = videojs(videoRef.current, videoJsOptions, function onPlayerReady() {
            
        })

        // player.registerPlugin( 'hlsQualitySelector', qualitySelector )
        // p.hlsQualitySelector({ displayCurrentQuality: true })

        // p.logo({
        //     image: watermarkLogo,
        //     positon: "top-right",
        //     width: 50,
        //     height: 50,
        //     fadeDelay: null,
        //     opacity: 0.7,
        //     offsetH: 20,
        //     offsetV: 20,
        // })
        
        setPlayer(p)

        return () => {
            if (player) player.dispose()
        }

    }, [])

    // useEffect(() => {
    //     if (player) player.hlsQualitySelector( { displayCurrentQuality: true } )
    // }, [player])
    // function skipTo(){
    //     player.currentTime(props.skipTo)
    //     player.play();
    // }

    return (
        <>
            <div data-vjs-player className={playerClassName}>
                <video poster={poster} ref={videoRef} className={`video-js vjs-big-play-centered`}></video>
            </div>
            {/* <Button onClick={skipTo}></Button>  */}
        </>
    )

}