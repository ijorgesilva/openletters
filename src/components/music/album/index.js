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

        albumAvailableOn,
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
            className   = {`sectionAlbum ${ className ? className : ''} ${ mode ? mode : 'light' }`}
        >
                {
                    ( title || content ) ?
                        <Container fluid = { containerWidth === 'container' ? false : true } className = {`${ size ? size : ''}`}>
                            <div className='general pb-3'>
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
                        </Container>
                    :
                        undefined
                }

                <div className = 'album pt-3 pb-3'>
                    <Container fluid = { containerWidth === 'container' ? false : true }>
                        <div className = 'albumCover'>
                            {
                                ( albumCover ) ?
                                    <GatsbyImage 
                                        image       = {albumCover} 
                                        alt         = ''
                                        className   = 'cover'
                                    />
                                :
                                    undefined
                            }
                        </div>
                        <div className = 'albumInfo'>
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
                                        items = { albumAvailableOn }
                                    />

                                    <ShareSimpleIcon 
                                        location    = { location } 
                                        label
                                    />
                                </div>

                        </div>
                    </Container>
                </div>

                <Playlist 
                    className       = 'pt-3 pb-3'
                    containerWidth  = { containerWidth }
                    mode            = { mode }
                    songs           = { albumSongs } 
                />

                <div className = 'resources'>
                    <Container fluid = { containerWidth === 'container' ? false : true }>
                        {
                            albumSongs.length > 0 ?
                                albumSongs.map ( ( _, index ) => (
                                    <SectionCarousel 
                                        key             = { index }
                                        id              = { _.songTitle ? _.songTitle.split(' ').join('_') : `song-${index+1}` }
                                        title           = { _.songTitle ? _.songTitle : ''}
                                        className       = { `song-resource-${index+1} pt-4 pb-4 ${ _.songTitle ? _.songTitle.split(' ').join('_') : ''}` }
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
                </div>

        </section>
    )
}