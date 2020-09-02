import React from 'react'
import VideoPlayer from 'react-video-js-player'

export default function VideoJsPlayerSimple (props) {
    
    let player = { }
    let state = {
        video: props.playerPlaylist[0]
    }

    function onPlayerReady(player) {
        console.log("Player is ready: ", player);
    }

    return (
        <VideoPlayer
            controls={true}
            src={state.video.src}
            poster={state.video.poster}
            className="vjs-16-9"
            onReady={onPlayerReady}
        />
    )
}