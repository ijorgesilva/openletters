import { 
    faFacebook,
    faTwitter,
    faTelegram,
    faGetPocket,
    faWhatsapp
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faQrcode } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import QRCode from 'qrcode.react'
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { 
    FacebookShareButton, 
    TwitterShareButton,
    TelegramShareButton,
    PocketShareButton,
    EmailShareButton,
    WhatsappShareButton
} from 'react-share'

import { useTheme } from '../../hooks/useTheme'

export default function SocialNetwork ( 
    { 
        type,
        params,
        mode,
        location,
        itemClass,
    } 
    ) {
    const [show, setShow] = useState(false)
    const theme = useTheme()
    
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const { t } = useTranslation()
    const typeCaps = type.charAt(0).toUpperCase() + type.slice(1)

    switch ( type ) {
        
        case 'qrcode':{

            return (
                <>
                <a 
                    className = {`user-select-none ${ itemClass ? itemClass : ''} ${ mode ? 'btn btn-'+mode : 'btn btn-light' }`}
                    url       = { '#' }
                    onClick   = { handleShow }
                >
                    <FontAwesomeIcon icon={faQrcode} size='lg' title={t('components.social.share-with') + ' ' + typeCaps} /> 
                </a>
                <Modal show={show} onHide={handleClose} centered 
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{t('components.social.share-with') + 'QR Code'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style = {{ display: 'flex', justifyContent: 'center' }}>
                        {
                            params.sectionShareNetworksQrcodeDestination === 'current' && location ?
                                <QRCode 
                                    value = { location.href }
                                    bgColor={ theme.colors.hex.light }
                                    fgColor={ theme.colors.hex.dark }
                                    size = {320}
                                    imageSettings={{
                                        src: theme.graphics.favicon,
                                        x: null,
                                        y: null,
                                        height: 48,
                                        width: 48,
                                        excavate: true,
                                    }}
                                />
                            :
                                params.sectionShareNetworksQrcodeDestination === 'personalized' && params.sectionShareNetworksQrcodeUrl ?
                                    <QRCode 
                                        value = {params.sectionShareNetworksQrcodeUrl}
                                        bgColor={ theme.colors.hex.light }
                                        fgColor={ theme.colors.hex.dark }
                                        size = {320}
                                    />
                                : undefined
                        }
                    </Modal.Body>
                </Modal>
                
                </>
            )
        }

        case 'facebook':{
            return (
                <FacebookShareButton 
                    className           = {`user-select-none ${ itemClass ? itemClass : ''} ${ mode ? 'btn btn-'+mode : 'btn btn-light' }`}
                    url                 = { params.sectionShareNetworksFacebookCustomUrl ? params.sectionShareNetworksFacebookCustomUrlUrl : location.href }
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
                    url                 = { params.sectionShareNetworksTwitterCustomUrl ? params.sectionShareNetworksTwitterCustomUrlUrl : location.href}
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
                    url                 = { ( params.sectionShareNetworksTelegramCustomUrl ) ? params.sectionShareNetworksTelegramCustomUrlUrl : location.href}
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
                    url                 = { params.sectionShareNetworksPocketCustomUrl ? params.sectionShareNetworksPocketCustomUrlUrl : location.href}
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
                    url                 = { params.sectionShareNetworksEmailCustomUrl ? params.sectionShareNetworksEmailCustomUrlUrl : location.href }
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
                    url                 = { params.sectionShareNetworksWhatsappCustomUrl ? params.sectionShareNetworksWhatsappCustomUrlUrl : location.href}
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