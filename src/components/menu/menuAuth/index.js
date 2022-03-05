import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'gatsby'
import React from 'react'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { useWebsiteConfiguration } from '../../../hooks/useWebsiteConfiguration'
import './index.scss'

export default function MenuAuth ( { mode } ) {

    const { t } = useTranslation()

    const  settings = useWebsiteConfiguration().settingsAuthentication
    const settingsAuthType = settings.settingsAuthenticationType?.split(':')[0]

    if( settings.settingsAuthenticationActive ) {
        switch( settingsAuthType ) {
            case 'external':{
                return (
                    <div className = {`menuAuth ${ mode ? mode : 'light' }`}>
                        <Button 
                            href    = { settings.settingsAuthenticationTypeExternal.settingsAuthenticationTypeExternalUrl }
                            target  = { settings.settingsAuthenticationTypeExternal.settingsAuthenticationTypeExternalTarget?.split(':')[0] }
                            title   = { t('global.authentication.sign-in') }
                            variant = {`${ mode ? mode : 'light' }`}
                        >
                            <FontAwesomeIcon 
                                icon={faUserCircle}
                                size='lg' 
                                className='loginIcon'
                            />
                        </Button>
                    </div>
                )
            }
            case 'internal':{
                return (
                    <div className = {`menuAuth ${ mode ? mode : 'light' }`}>
                        <Link 
                            to      = ''
                            title   = { t('global.authentication.sign-in') }
                        >
                            <FontAwesomeIcon 
                                icon={faUserCircle}
                                size='lg' 
                                className='loginIcon'
                            />
                        </Link>
                    </div>
                )
            }
            default:{
                return <></>
            }
        }
    }
    else return <></>

}