// Dependencies
import React from 'react'
import ReactPlayer from 'react-player'

import './videoReactPlayer.scss'

export default function VideoReactPlayer ( {src, poster, className, config, pip, controls, muted, ...props} ) {

    return (
        <div className='player-wrapper'>
            <ReactPlayer
                url={src}
                playing
                className={`react-player ${(className)? className : ''}`}
                config={config}
                controls={(controls) ? controls : true}
                muted={muted}
                width='100%'
                height='100%'
                pip={ (pip) ? pip : true }
            />
        </div>
    )

}