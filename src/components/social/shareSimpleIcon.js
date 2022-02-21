import { faTwitter, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faShareSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { FacebookShareButton, TwitterShareButton, EmailShareButton, WhatsappShareButton } from 'react-share'
import '@fortawesome/fontawesome-svg-core/styles.css'

import './shareSimpleIcon.scss'

export default function ShareSimpleIcon( 
    { 
        location, 
        className, 
        label, 
        mode,
        drop,
    } 
){

    const { t } = useTranslation()

    const canonicalUrl = process.env.SITE_CANONICAL_URL + location.pathname

    return (
        <Dropdown className={`shareSimpleIcon ${ mode ? mode : 'light'} ${ className ? className : ''}`} drop = { drop || 'up'} >

            <Dropdown.Toggle
                alt     = { t('components.social.share-on') }
                variant = { `${ mode === 'light' ? 'outline-light' : 'outline-dark' }` }
            >
                <FontAwesomeIcon className='icon' icon={faShareSquare} size='lg'/>
                {
                    label ?
                        <span>{t('components.social.share')}</span>
                    :
                        undefined
                }
            </Dropdown.Toggle>

            <Dropdown.Menu variant = { mode ? mode : 'light' } >
                <Dropdown.ItemText className='user-select-none'>
                    <strong>{t('components.social.share-on')}</strong>
                </Dropdown.ItemText>
                <Dropdown.Item eventKey='1'>
                    <FacebookShareButton 
                        className='user-select-none'
                        quote='' 
                        hashtag='' 
                        url={canonicalUrl} 
                    >
                        <FontAwesomeIcon icon={faFacebook} size='lg' /> Facebook
                    </FacebookShareButton>
                </Dropdown.Item>
                <Dropdown.Item eventKey='2'>
                    <WhatsappShareButton 
                        className='user-select-none'
                        title={t('components.social.check-this')}
                        url={canonicalUrl} 
                    >
                         <FontAwesomeIcon icon={faWhatsapp} size='lg' /> Whatsapp
                    </WhatsappShareButton>
                </Dropdown.Item>
                <Dropdown.Item eventKey='3'>
                    <TwitterShareButton 
                        className='user-select-none'
                        url={canonicalUrl} 
                        title=''
                    >
                        <FontAwesomeIcon icon={faTwitter} size='lg' /> Twitter
                    </TwitterShareButton>
                </Dropdown.Item>
                <Dropdown.Item eventKey='4'>
                    <EmailShareButton 
                        className='user-select-none'
                        title={t('components.social.check-this')}
                    >
                         <FontAwesomeIcon icon={faEnvelope} size='lg' /> Email
                    </EmailShareButton>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}
