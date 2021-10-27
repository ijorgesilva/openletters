import React from 'react'
import {Container} from 'react-bootstrap'
import ReactPlayer from 'react-player'

export default function SectionVideoPlayerSimple ( { src, title, poster, controls, className, muted, pip, id } ) {
    
    return (
        <section className="c-video--simple h-background-six position-relative" id={id}>
            <Container className="position-relative text-center z-index-2">

                <h2 className="" dangerouslySetInnerHTML={{__html:title}}></h2>

                <div className="player-container mt-5 h-background-black">
                        <ReactPlayer
                            url={src}
                            className={`react-player ${(className)? className : ''}`}
                            config={{
                                file: {
                                    attributes: {
                                        poster: poster,
                                        autoplay: false,
                                    }
                                }
                            }}
                            controls={ (controls) ? controls : true }
                            muted={muted}
                            width='100%'
                            height='100%'
                            pip={ (pip) ? pip : true }
                        />
                </div>
            </Container>
            <div className="c-video__background z-index-1"></div>
        </section>
    )
}