import { 
    faFacebook,
    faTwitter,
    faTelegram,
    faGetPocket,
    faWhatsapp
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { 
    FacebookShareButton, 
    TwitterShareButton,
    TelegramShareButton,
    PocketShareButton,
    EmailShareButton,
    WhatsappShareButton
} from 'react-share'

export default function SocialNetwork ( 
    { 
        type,
        params,
        mode,
        location,
        itemClass,
    } 
    ) {

    const { t } = useTranslation()
    const canonicalUrl = process.env.SITE_CANONICAL_URL + location.pathname
    const typeCaps = type.charAt(0).toUpperCase() + type.slice(1)

    switch ( type ) {
        
        case 'facebook':{
            return (
                <FacebookShareButton 
                    className           = {`user-select-none ${ itemClass ? itemClass : ''} ${ mode ? 'btn btn-'+mode : 'btn btn-light' }`}
                    url                 = { params.sectionShareNetworksFacebookCustomUrl ? params.sectionShareNetworksFacebookCustomUrlUrl : canonicalUrl }
                    quote               = { params.sectionShareNetworksFacebookQuote } 
                    hashtag             = { params.sectionShareNetworksFacebookHashtags } 
                    resetButtonStyle    = { false }
                >
                    <FontAwesomeIcon icon={faFacebook} size='lg' title={t('components.social.share-on') + ' ' + typeCaps} /> 
                </FacebookShareButton>
            )
        }

        case 'twitter':{
            return (
                <TwitterShareButton
                    className           = {`user-select-none ${ itemClass ? itemClass : ''} ${ mode ? 'btn '+ 'btn-' + mode : 'btn btn-light' }`}
                    url                 = { params.sectionShareNetworksTwitterCustomUrl ? params.sectionShareNetworksTwitterCustomUrlUrl : canonicalUrl}
                    title               = { params.sectionShareNetworksTwitterTitle }
                    via                 = { params.sectionShareNetworksTwitterVia }
                    hashtags            = { params.sectionShareNetworksTwitterHashtags?.split(' ')  }
                    related             = { params.sectionShareNetworksTwitterRelated?.split(' ')  }
                    resetButtonStyle    = { false }
                >
                    <FontAwesomeIcon icon={faTwitter} size='lg' title={t('components.social.share-on') + ' ' + typeCaps} /> 
                </TwitterShareButton>
            )
        }
        
        case 'telegram':{
            return (
                <TelegramShareButton
                    className           = {`user-select-none ${ itemClass ? itemClass : ''} ${ mode ? 'btn '+ 'btn-' + mode : 'btn btn-light' }`}
                    url                 = { ( params.sectionShareNetworksTelegramCustomUrl ) ? params.sectionShareNetworksTelegramCustomUrlUrl : canonicalUrl}
                    title               = { params.sectionShareNetworksTelegramTitle }
                    resetButtonStyle    = { false }
                >
                    <FontAwesomeIcon icon={faTelegram} size='lg' title={t('components.social.share-on') + ' ' + typeCaps} /> 
                </TelegramShareButton>
            )
        }
        
        case 'pocket':{
            return (
                <PocketShareButton
                    className           = {`user-select-none ${ itemClass ? itemClass : ''} ${ mode ? 'btn '+ 'btn-' + mode : 'btn btn-light' }`}
                    url                 = { params.sectionShareNetworksPocketCustomUrl ? params.sectionShareNetworksPocketCustomUrlUrl : canonicalUrl}
                    title               = { params.sectionShareNetworksPocketTitle }
                    resetButtonStyle    = { false }
                >
                    <FontAwesomeIcon icon={faGetPocket} size='lg' title={t('components.social.share-on') + ' ' + typeCaps} /> 
                </PocketShareButton>
            )
        }
        
        case 'email':{
            return (
                <EmailShareButton
                    className           = {`user-select-none ${ itemClass ? itemClass : ''} ${ mode ? 'btn '+ 'btn-' + mode : 'btn btn-light' }`}
                    url                 = { params.sectionShareNetworksEmailCustomUrl ? params.sectionShareNetworksEmailCustomUrlUrl : canonicalUrl }
                    subject             = { params.sectionShareNetworksEmailSubject }
                    body                = { params.sectionShareNetworksEmailBody }
                    separator           = {' '}
                    resetButtonStyle    = { false }
                >
                    <FontAwesomeIcon icon={faEnvelope} size='lg' title={t('components.social.share-on') + ' ' + typeCaps} />
                </EmailShareButton>
            )
        }

        case 'whatsapp':{
            return (
                <WhatsappShareButton
                    className           = {`user-select-none ${ itemClass ? itemClass : ''} ${ mode ? 'btn '+ 'btn-' + mode : 'btn btn-light' }`}
                    url                 = { params.sectionShareNetworksWhatsappCustomUrl ? params.sectionShareNetworksWhatsappCustomUrlUrl : canonicalUrl}
                    title               = { params.sectionShareNetworksWhatsappTitle }
                    resetButtonStyle    = { false }
                >
                    <FontAwesomeIcon icon={faWhatsapp} size='lg' title={t('components.social.share-on') + ' ' + typeCaps} /> 
                </WhatsappShareButton>
            )
        }

        default:{
            return <></>
        }
    }

}