import { 
    faFacebook,
    faInstagram,
    faYoutube,
    faTwitter,
    faPinterest,
    faTiktok,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useTranslation } from 'react-i18next'
 
export default function SocialItem ( 
    { 
        type,
        link,
        itemClass,
        mode
    } 
) {
    const { t } = useTranslation()
    const typeCaps = type.charAt(0).toUpperCase() + type.slice(1)

    switch ( type ) {
        
        case 'facebook':{
            return (
                <a  href = { link } 
                    target='_blank' 
                    rel='noreferrer' 
                    className = {`user-select-none ${ mode ? 'btn '+ 'btn-' + mode : 'btn btn-light' } ${ itemClass ? itemClass : '' }`}
                    title={t('global:components.social.follow-us') + ' ' + typeCaps} 
                >
                    <FontAwesomeIcon icon={faFacebook} size='lg' /> 
                </a>
            )
        }
        
        case 'youtube':{
            return (
                <a  href = { link } 
                    target='_blank' 
                    rel='noreferrer' 
                    className = {`user-select-none ${ mode ? 'btn '+ 'btn-' + mode : 'btn btn-light' } ${ itemClass ? itemClass : '' }`} 
                    title={t('global:components.social.follow-us') + ' ' + typeCaps}
                >
                    <FontAwesomeIcon icon={faYoutube} size='lg'/> 
                </a>
            )
        }

        case 'instagram':{
            return (
                <a  href = { link } 
                    target='_blank' 
                    rel='noreferrer' 
                    className = {`user-select-none ${ mode ? 'btn '+ 'btn-' + mode : 'btn btn-light' } ${ itemClass ? itemClass : '' }`}
                    title={t('global:components.social.follow-us') + ' ' + typeCaps}
                >
                    <FontAwesomeIcon icon={faInstagram} size='lg' /> 
                </a>
            )
        }

        case 'pinterest':{
            return (
                <a  href = { link } 
                    target='_blank' 
                    rel='noreferrer' 
                    className = {`user-select-none ${ mode ? 'btn '+ 'btn-' + mode : 'btn btn-light' } ${ itemClass ? itemClass : '' }`}
                    title={t('global:components.social.follow-us') + ' ' + typeCaps}
                >
                    <FontAwesomeIcon icon={faPinterest} size='lg' /> 
                </a>
            )
        }

        case 'tiktok':{
            return (
                <a  href = { link } 
                    target='_blank' 
                    rel='noreferrer' 
                    className = {`user-select-none ${ mode ? 'btn '+ 'btn-' + mode : 'btn btn-light' } ${ itemClass ? itemClass : '' }`}
                    title={t('global:components.social.follow-us') + ' ' + typeCaps}
                >
                    <FontAwesomeIcon icon={faTiktok} size='lg' /> 
                </a>
            )
        }

        case 'twitter':{
            return (
                <a  href = { link } 
                    target='_blank' 
                    rel='noreferrer' 
                    className = {`user-select-none ${ mode ? 'btn '+ 'btn-' + mode : 'btn btn-light' } ${ itemClass ? itemClass : '' }`}
                    title={t('global:components.social.follow-us') + ' ' + typeCaps}
                >
                    <FontAwesomeIcon icon={faTwitter} size='lg' /> 
                </a>
            )
        }

        default:{
            return <></>
        }
    }

}