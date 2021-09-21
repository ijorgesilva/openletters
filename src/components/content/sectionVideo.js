
import React from 'react'
import ReactPlayer from 'react-player'


import './sectionVideo.scss'

export default function SectionVideo ( {
    title,
    id,
    content,
    className,
    variant,
    containerWidth,
    location,
    url,
    thumbnail,
    controls,
    height,
    width,
    light,
    loop,
    muted,
    pip,
    volume,
    autoplay,
} ) {

    return (
        <section
            id          = {id}
            className   = {`sectionVideo ${ (className) ? className : ''} ${ (variant) ? variant : 'light' }`}
        >
            <div className={`columns`}>
                <div className={`${ ( containerWidth ) ? containerWidth : 'container' }`}>

                    {
                        ( title ) ?
                            <h2 className='title'
                                dangerouslySetInnerHTML={{__html: title}}
                            ></h2>
                        :
                            undefined
                    }
                    
                    {
                        ( content ) ?
                            <div className='content'
                                dangerouslySetInnerHTML={{__html: content}}
                            ></div>
                        :
                            undefined
                    }
                    
                    <div className="player-container">
                        <ReactPlayer
                            className   = {`react-player`}
                            url         = { url }
                            controls    = { ( controls ) ? controls : true }
                            height      = { `${ ( height ) ? width : '100%' }` }
                            width       = { `${ ( width ) ? width : '100%' }` }
                            light       = { ( light ) ? light : false }
                            loop        = { ( loop ) ? loop : false }
                            muted       = { ( muted ) ? muted : false }
                            pip         = { ( pip ) ? pip : false }
                            volume      = { ( volume ) ? volume : 1 }
                            playing     = { ( autoplay ) ? autoplay : false }
                            config      = {{
                                                file: {
                                                    attributes: {
                                                        poster: thumbnail,
                                                    }
                                                }
                                            }}
                        />
                    </div>

                </div>
            </div>
        </section>
    )
}