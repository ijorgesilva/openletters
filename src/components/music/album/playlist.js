import React from 'react'
import { useTranslation } from 'react-i18next'
import { ListGroup, Button } from 'react-bootstrap'

import './playlist.scss'

export default function Playlist ( 
    {
        mode,
        songs,
    }
) {
    
        const { t } = useTranslation()
        // console.log(songs)
        return (
            <>
                {
                    songs.length > 0 ?
                        <section>
                            <ListGroup variant='flush'>
                                {
                                    songs.map ( ( _, index ) => (
                                        <ListGroup.Item className = 'song' key = { index }>
                                              <div className='row justify-content-between'>
                                                    <div className='col-10 title'>
                                                        <span> { index + 1 } </span>
                                                        <h5 className = 'font-weight-bold'>{ _.songTitle }</h5>
                                                        <p className = 'text-black-50'>{_.songDuration}</p>
                                                    </div>
                                                    <div className='col-2'>
                                                        <Button 
                                                            href  = { '#'+ _.songTitle.split(' ').join('_') }
                                                            variant = {`outline-${ mode === 'light' ? 'dark' : 'light' }`}
                                                        >
                                                            {t('global.music.resources')}
                                                        </Button>
                                                    </div>
                                                </div>
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                        </section>
                    :
                        undefined
                }
            </>
        )
}