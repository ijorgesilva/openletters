
import React from 'react'
import { useTranslation } from "react-i18next"
import { Dropdown } from 'react-bootstrap'
import { FacebookShareButton, TwitterShareButton, EmailShareButton, WhatsappShareButton } from 'react-share'
import { faTwitter, faFacebook, faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope, faShareSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import '@fortawesome/fontawesome-svg-core/styles.css'


import config from '../../../data/SiteConfig'
import './shareSimpleIcon.scss'

export default function ShareSimpleIcon( { location, className, label, mode } ){

    
    const { t } = useTranslation()

    const canonicalUrl = config.siteUrl + location.pathname

    return (
        <Dropdown className={`shareSimpleIcon ${ mode ? mode : ''} ${ className ? className : ''}`} drop='up'>

            <Dropdown.Toggle
                alt     = { t('components.social.sharesimpleicon-title') }
            >
                <FontAwesomeIcon className="icon" icon={faShareSquare} size="lg"/>
                {
                    ( label ) ?
                        <span>{t('components.social.share')}</span>
                    :
                        undefined
                }
            </Dropdown.Toggle>

            <Dropdown.Menu variant = { mode ? mode : 'light' } >
                <Dropdown.ItemText className="user-select-none">
                    <strong>{t('components.social.sharesimpleicon-title')}</strong>
                </Dropdown.ItemText>
                <Dropdown.Item eventKey="1">
                    <FacebookShareButton 
                        className="user-select-none"
                        quote="" 
                        hashtag="" 
                        url={canonicalUrl} 
                    >
                        <FontAwesomeIcon icon={faFacebook} size="lg" /> Facebook
                    </FacebookShareButton>
                </Dropdown.Item>
                <Dropdown.Item eventKey="2">
                    <WhatsappShareButton 
                        className="user-select-none"
                        title={t('components.social.check-this')}
                        url={canonicalUrl} 
                    >
                         <FontAwesomeIcon icon={faWhatsapp} size="lg" /> Whatsapp
                    </WhatsappShareButton>
                </Dropdown.Item>
                <Dropdown.Item eventKey="3">
                    <TwitterShareButton 
                        className="user-select-none"
                        url={canonicalUrl} 
                        title=""
                    >
                        <FontAwesomeIcon icon={faTwitter} size="lg" /> Twitter
                    </TwitterShareButton>
                </Dropdown.Item>
                <Dropdown.Item eventKey="4">
                    <EmailShareButton 
                        className="user-select-none"
                        title={t('components.social.check-this')}
                    >
                         <FontAwesomeIcon icon={faEnvelope} size="lg" /> Email
                    </EmailShareButton>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}
