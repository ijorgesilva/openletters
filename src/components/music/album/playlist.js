import React from 'react'
import { Container, ListGroup, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import './playlist.scss'

export default function Playlist ( 
    {
        className,
        mode,
        songs,
        containerWidth,
    }
) {
    
    const { t } = useTranslation()
    
    return (
        <>
            {
                songs.length > 0 ?
                    <section className = {`playlist ${ className ? className : '' }`}>
                        <Container fluid = { containerWidth === 'container' ? false : true }>
                            <h6 className = {'title'} >{t('global:components.music.playlist-title')}</h6>
                            <ListGroup variant='flush' >
                                {
                                    songs.map ( ( _, index ) => (
                                        <ListGroup.Item className = 'songs' key = { index }>
                                                <div className={`track track-${index} row justify-content-between`}>
                                                    <a className='info' href={`#${_.songTitle.split(' ').join('_')}`}>
                                                        <span className = 'number'> { index + 1 } </span>
                                                        <h5 className = 'title'>{ _.songTitle }</h5>
                                                        <p className = 'duration'>{_.songDuration}</p>
                                                    </a>
                                                    <div className='buttons'>
                                                        <Button 
                                                            href  = { '#'+ _.songTitle.split(' ').join('_') }
                                                            variant = {`outline-${ mode === 'light' ? 'light' : 'dark' }`}
                                                        >
                                                            {t('global:components.music.resources')}
                                                        </Button>
                                                    </div>
                                                </div>
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                        </Container>
                    </section>
                :
                    undefined
            }
        </>
    )
}