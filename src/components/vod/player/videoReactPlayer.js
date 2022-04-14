import React from 'react'
import ReactPlayer from 'react-player'

import './videoReactPlayer.scss'

export default function VideoReactPlayer ( 
    {
        src, className, config, pip, controls, muted, height, width,volume, loop, autoplay, light, thumbnail
    } 
) {

    return (
        <>
        { 
            src ?
                <div className='player-wrapper'>
                    <ReactPlayer
                        url         = { src }
                        className   = {`react-player  ${ className ? className : ''}`}
                        config      = { config ? config : undefined }
                        controls    = { controls ? controls : true}
                        muted       = { muted ? muted : false }
                        width       = { width ? width : '100%' }
                        height      = { height ? height : '100%' }
                        pip         = { pip ? pip : true }
                        volume      = { volume ? volume : 1 }
                        loop        = { loop ? loop : false }
                        playing     = { autoplay ? autoplay : false }
                        light       = { light ? thumbnail : false }
                    />
                </div>
            : undefined
        }
        </>
    )

}