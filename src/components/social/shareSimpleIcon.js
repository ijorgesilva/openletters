// Dependencies
import React from 'react'
import { useTranslation } from "react-i18next"
import { useStaticQuery, graphql } from 'gatsby'
import { Dropdown } from 'react-bootstrap'
import { FacebookShareButton, TwitterShareButton, EmailShareButton, WhatsappShareButton } from 'react-share'
import { faTwitter, faFacebook, faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from '@fortawesome/fontawesome-free-solid'
import '@fortawesome/fontawesome-svg-core/styles.css'

// Components
import './shareSimpleIcon.scss'
import config from '../../../data/SiteConfig'

export default function ShareSimpleIcon( { location, variant, className } ){

    /* Standard fields */
    const { t } = useTranslation()

    const canonicalUrl = config.siteUrl + location.pathname

    const data = useStaticQuery(graphql`
        query{
            shareIconDark: file(relativePath: {eq: "img/global/icon-share.svg"}) {
                publicURL
            }
            shareIconLight: file(relativePath: {eq: "img/global/icon-share-light.svg"}) {
                publicURL
            }
        }
    `)
    const variantColor = (variant) ? variant : 'light'

    return (
        <Dropdown className={`shareSimpleIcon ${(className) ? className : ''}`} drop='up'>

            <Dropdown.Toggle id="Share" variant={variantColor} >
                {
                    ( variant === "dark" ) ?
                        <img src={data.shareIconLight.publicURL} alt={t('components.social.sharesimpleicon-title')}></img>
                    :
                        <img src={data.shareIconDark.publicURL} alt={t('components.social.sharesimpleicon-title')}></img>
                }
            </Dropdown.Toggle>

            <Dropdown.Menu className="super-colors">
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
                        title="Check this out"
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
                        title="Check this out"
                    >
                         <FontAwesomeIcon icon={faEnvelope} size="lg" /> Email
                    </EmailShareButton>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}
