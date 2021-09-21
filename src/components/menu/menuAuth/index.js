// Dependecies
import React from 'react'
import { Link } from 'gatsby'
import { useTranslation } from 'react-i18next'
import { faUserCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


import { useWebsiteConfiguration } from '../../../hooks/useWebsiteConfiguration'


import './index.scss'

export default function MenuAuth ( { mode } ) {

    const { t } = useTranslation()

    const  settings = useWebsiteConfiguration().settingsAuthentication
    const settingsAuthType = settings.settingsAuthenticationType?.split(":")[0]

    if( settings.settingsAuthenticationActive ) {
        switch( settingsAuthType ) {
            case 'external':
                return (
                    <div className = {`menuAuth ${ ( mode ) ? mode : 'light' }`}>
                        <a 
                            href    = { settings.settingsAuthenticationTypeExternal.settingsAuthenticationTypeExternalUrl }
                            target  = { settings.settingsAuthenticationTypeExternal.settingsAuthenticationTypeExternalTarget?.split(":")[0] }
                            title   = { t('global.authentication.sign-in') }
                        >
                            <FontAwesomeIcon 
                                icon={faUserCircle}
                                size="lg" 
                                className="loginIcon"
                            />
                        </a>
                    </div>
                )
                break
            case 'internal':
                return (
                    <div className = {`menuAuth ${ ( mode ) ? mode : 'light' }`}>
                        <Link 
                            to      = ""
                            title   = { t('global.authentication.sign-in') }
                        >
                            <FontAwesomeIcon 
                                icon={faUserCircle}
                                size="lg" 
                                className="loginIcon"
                            />
                        </Link>
                    </div>
                )
            default:
                return <></>
                break
        }
    }
    else return <></>

}