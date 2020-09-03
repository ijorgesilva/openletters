import React from 'react'
import {Container} from 'react-bootstrap'
import VideoJsPlayerCustom from '../player/videoJsPlayerCustom'

export default function SectionVideoPlayerSimple (props) {
    
    return (
        <section className="c-video--simple h-background-six position-relative" id={props.id}>
            <Container className="position-relative text-center z-index-2">

                <h2 className="" dangerouslySetInnerHTML={{__html:props.title}}></h2>

                <div className="player-container mt-5 h-background-black">
                    <VideoJsPlayerCustom 
                        src={props.playerPlaylist[0].src}
                        poster={props.playerPlaylist[0].poster}
                        skipTo={props.playerPlaylist[0].skipTo}
                    />
                </div>
            </Container>
            <div className="c-video__background z-index-1"></div>
        </section>
    )
}