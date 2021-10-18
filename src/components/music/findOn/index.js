import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { faCompactDisc } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import './findOn.scss'

export default function FindOn ( 
    {
        mode,
        className,
        dropDirection,
    }
) {
    
    const { t } = useTranslation()

    const drop = ( dropDirection ) ? dropDirection : 'up'

    return (
            <Dropdown 
                className={`findOn ${ mode ? mode : 'light' } ${ className ? className : ''}`} 
                drop={drop}
            >
                <Dropdown.Toggle className = 'toggler primary' id = "Share" variant = { mode }>
                    <FontAwesomeIcon 
                        className="icon" 
                        icon={faCompactDisc} 
                        size="lg" 
                    />
                    <span>{t('global.music.findon.title')}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="">

                    <Dropdown.Item 
                                as          = {'a'}
                                to          = { '' }
                                href        = { '' }
                                target      = { '' }
                                eventKey    = { '' } 
                                key         = { '' }
                                className   = { '' }
                            >
                                <span>{'test'}</span>
                    </Dropdown.Item>

                </Dropdown.Menu>

            </Dropdown>
    )
}