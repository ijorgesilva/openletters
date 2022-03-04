import React from 'react'
import { useTranslation } from 'react-i18next'

import appStoreIcon from '../../../../assets/img/global/Download_on_the_App_Store_Badge.svg'
import playStoreIcon from '../../../../assets/img/global/Google_Play_Store_badge_EN.svg'

export default function AppItem ( { type, link, className } ){
    const { t } = useTranslation()

    switch( type ) {
        case 'apple': {
            return (
                <a href={ link } 
                    title={ t('global:components.apps.get-it-apple-store') }
                    target='_blank' 
                    rel='noreferrer'
                    alt={ t('global:components.apps.get-it-apple-store') }
                    className = {`pl-1 pr-1 ${ className ? className : '' }`}
                > 
                    <img src={appStoreIcon} width='150' alt={ t('global:components.apps.apple-app') } /> 
                </a>
                )
        }
        case 'android': {
            return (
                <a href={ link } 
                    title={ t('global:components.apps.get-it-play-store') }
                    target='_blank' 
                    rel='noreferrer' 
                    alt={ t('global:components.apps.get-it-play-store') }
                    className = {`pl-1 pr-1 ${ className ? className : '' }`}
                > 
                    <img src={playStoreIcon} width='150' alt={ t('global:components.apps.adroid-app') } /> 
                </a>
            )
        }
        case 'default': {
            return <></>
        }
    }
}