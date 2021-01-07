/*
        Deprecated
*/

// Dependencies
import React, { useRef, useState, useEffect } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

// Components

export default function VideoJsPlayerTrailer (props) {

    const videoRef = useRef()
    const [player, setPlayer] = useState(undefined)

    useEffect(() => {

        const videoJsOptions = {
            autoplay: true,
            controls: true,
            fluid: true,
            muted: false,
            responsive: true,
            controlBar: false,
            sources: [{
                src: props.src,
            }],
        }

        const p = videojs(videoRef.current, videoJsOptions, function onPlayerReady() {
            // console.log('')
        })
        
        setPlayer(p)

        return () => {
            if (player) player.dispose()
        }

    }, [])

    return (
        <>
            <div data-vjs-player>
                <video poster={props.poster} controls="false" ref={videoRef} className="video-js vjs-big-play-centered"></video>
            </div>
            {/* <Button onClick={skipTo}></Button>  */}
        </>
    )

}