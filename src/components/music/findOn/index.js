import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import MediaProvider from './mediaProvider'
import './findOn.scss'

export default function FindOn ( 
    {
        mode,
        className,
        dropDirection,
        items,
    }
) {
    
    const { t } = useTranslation()

    const drop = ( dropDirection ) ? dropDirection : 'up'

    return (
            <>
            {
                items.availableonType.length > 0 ?
                    <Dropdown className={`findOn ${ mode ? mode : 'light' } ${ className ? className : ''}`} drop = { drop } >

                        <Dropdown.Toggle 
                            className = 'toggler primary'
                            id = 'share' 
                            variant = { `${ mode === 'light' ? 'outline-light' : 'outline-dark' }` }
                        >
                            <FontAwesomeIcon 
                                className='icon' 
                                icon={faCompactDisc} 
                                size='lg' 
                            />
                            <span>{t('global:components.music.find-on-title')}</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className = ''>
                            {
                                items?.availableonType.map ( ( _, index ) => (
                                    <Dropdown.Item key = { index } as = { 'div' } >
                                        <MediaProvider 
                                            key     = { index }
                                            type    = { _.split(':')[0] }
                                            items   = { items }
                                        />                                        
                                    </Dropdown.Item>
                                ))
                            }
                        </Dropdown.Menu>

                    </Dropdown>
                : undefined
            }
            </>
    )
}