import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { GatsbyImage } from 'gatsby-plugin-image'
import { useTranslation } from 'react-i18next'

import SectionCarousel from '../../carousel/sectionCarousel'
import ShareSimpleIcon from '../../social/shareSimpleIcon'
import FindOn from '../findOn'
import Playlist from './playlist'
import { useGetFeed } from '../../../hooks/useGetFeed'

import './album.scss'

export default function SectionAlbum ( 
    {
        id,
        title,
        content,
        className,
        mode,
        containerWidth,
        size,
        location,

        albumCover,
        albumTitle,
        albumSubtitle,
        albumSongs,

        swipeable,
        draggable,
        infinite,
        partialVisible,
        autoplay,
        stretchedlink,
        itemType,
        dots,
        dotsClass,
        interval,
        itemClass,
        gap,
        truncate,
        truncateLines,
        imagePosition,
        imageFit,
        aspectRatio,
        border,
        borderColor,
        itemGrow,
        responsive,
    } 
) {

    const { t } = useTranslation()

    return (
        <section 
            id          = {id}
            className   = {`sectionAlbum ${ size ? size : ''}  ${ className ? className : ''} ${ mode ? mode : 'light' }`}
        >
            <Container fluid = { containerWidth === 'container' ? false : true }>

                {
                    ( title || content ) ?
                        <div className='general'>
                            {
                                ( title ) ?
                                    <h2 className='title' dangerouslySetInnerHTML={{__html: title}}></h2>
                                :
                                    undefined
                            }
                            { 
                                ( content ) ?
                                    <div className='content' dangerouslySetInnerHTML={{__html: content}}></div>
                                :
                                    undefined
                            }
                        </div>
                    :
                        undefined
                }


            </Container>

            <Container fluid = { containerWidth === 'container' ? false : true } className = 'album'>

                <Row>
                    <Col xs={2} md={2} sm={6} 
                        className = 'albumCover'>
                        {
                            ( albumCover ) ?
                                <GatsbyImage 
                                    image={albumCover} 
                                    alt=''
                                />
                            :
                                undefined
                        }
                    </Col>
                    <Col xs={10} md={10} sm={6} 
                        className = 'albumInfo'>
                            {
                                ( albumTitle ) ?
                                    <h2 className='albumTitle' dangerouslySetInnerHTML={{__html: albumTitle}}></h2>
                                :
                                    undefined
                            }
                            {
                                ( albumSubtitle ) ?
                                    <h3 className='albumSubtitle' dangerouslySetInnerHTML={{__html: albumSubtitle}}></h3>
                                :
                                    undefined
                            }

                            <div className = 'buttons' >
                                <FindOn 
                                />

                                <ShareSimpleIcon 
                                    location    = { location } 
                                    mode        = { mode ? mode : 'light' }
                                    label
                                />
                            </div>

                    </Col>
                </Row>

            </Container>

            <Container fluid = { containerWidth === 'container' ? false : true } className='playlist'>
                <Playlist 
                    mode    = { mode }
                    songs   = { albumSongs } 
                />
            </Container>

            <Container fluid = { containerWidth === 'container' ? false : true } className='resources'>
                {
                    albumSongs.length > 0 ?
                        albumSongs.map ( ( _, index ) => (
                            
                                <SectionCarousel 
                                    key             = { index }
                                    id              = { _.songTitle ? _.songTitle.split(' ').join('_') : `song-${index+1}` }
                                    title           = { _.songTitle ? _.songTitle : ''}
                                    className       = { `song-${index+1} ${ _.songTitle ? _.songTitle.split(' ').join('_') : ''}` }
                                    mode            = { mode }
                                    containerWidth  = { containerWidth }
                                    location        = { location }
                                    items           = { useGetFeed( _.songResources ) }

                                    swipeable       = { swipeable }
                                    draggable       = { draggable }
                                    infinite        = { infinite }
                                    partialVisible  = { partialVisible }
                                    autoplay        = { autoplay }
                                    stretchedlink   = { stretchedlink }
                                    itemType        = { itemType }
                                    dots            = { dots }
                                    dotsClass       = { dotsClass }
                                    interval        = { interval }
                                    itemClass       = { itemClass }
                                    gap             = { gap }
                                    truncate        = { truncate }
                                    truncateLines   = { truncateLines }
                                    imagePosition   = { imagePosition }
                                    imageFit        = { imageFit }
                                    aspectRatio     = { aspectRatio }
                                    border          = { border }
                                    borderColor     = { borderColor }
                                    itemGrow        = { itemGrow }
                                    responsive      = { responsive }
                                />
                            
                        ))
                        
                    :
                        undefined
                }

            </Container>


        </section>
    )
}