import { 
    faFacebook,
    faYoutube,
    faInstagram,
    faPinterest,
    faTwitter,
    faTiktok,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useTranslation } from 'react-i18next'


export default function FollowNetworks ( 
    {
        type,
        params,
        mode,
    } 
    ) {

    const { t } = useTranslation()
    const typeCaps = type.charAt(0).toUpperCase() + type.slice(1)

    switch ( type ) {
        
        case 'facebook':{
            return (
                <a  href = { params.sectionFollowNetworksFacebookUrl } 
                    target='_blank' 
                    rel='noreferrer' 
                    className = {`user-select-none ${ mode ? 'btn '+ 'btn-' + mode : 'btn btn-light' }`}
                    title={t('components.social.share-on') + ' ' + typeCaps} 
                >
                    <FontAwesomeIcon icon={faFacebook} size='lg' /> 
                </a>
            )
        }
        
        case 'youtube':{
            return (
                <a  href = { params.sectionFollowNetworksYoutubeUrl } 
                    target='_blank' 
                    rel='noreferrer' 
                    className = {`user-select-none ${ mode ? 'btn '+ 'btn-' + mode : 'btn btn-light' }`} 
                    title={t('components.social.share-on') + ' ' + typeCaps}
                >
                    <FontAwesomeIcon icon={faYoutube} size='lg'/> 
                </a>
            )
        }

        case 'instagram':{
            return (
                <a  href = { params.sectionFollowNetworksInstagramUrl } 
                    target='_blank' 
                    rel='noreferrer' 
                    className = {`user-select-none ${ mode ? 'btn '+ 'btn-' + mode : 'btn btn-light' }`}
                    title={t('components.social.share-on') + ' ' + typeCaps}
                >
                    <FontAwesomeIcon icon={faInstagram} size='lg' /> 
                </a>
            )
        }

        case 'pinterest':{
            return (
                <a  href = { params.sectionFollowNetworksPinterestUrl } 
                    target='_blank' 
                    rel='noreferrer' 
                    className = {`user-select-none ${ mode ? 'btn '+ 'btn-' + mode : 'btn btn-light' }`}
                    title={t('components.social.share-on') + ' ' + typeCaps}
                >
                    <FontAwesomeIcon icon={faPinterest} size='lg' /> 
                </a>
            )
        }

        case 'tiktok':{
            return (
                <a  href = { params.sectionFollowNetworksTiktokUrl } 
                    target='_blank' 
                    rel='noreferrer' 
                    className = {`user-select-none ${ mode ? 'btn '+ 'btn-' + mode : 'btn btn-light' }`}
                    title={t('components.social.share-on') + ' ' + typeCaps}
                >
                    <FontAwesomeIcon icon={faTiktok} size='lg' /> 
                </a>
            )
        }

        case 'twitter':{
            return (
                <a  href = { params.sectionFollowNetworksTwitterUrl } 
                    target='_blank' 
                    rel='noreferrer' 
                    className = {`user-select-none ${ mode ? 'btn '+ 'btn-' + mode : 'btn btn-light' }`}
                    title={t('components.social.share-on') + ' ' + typeCaps}
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