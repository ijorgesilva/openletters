import { faMobile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import QRCode from 'qrcode.react'
import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { useTheme } from '../../hooks/useTheme'
import Background from '../UI/background'

import './sectionQrCode.scss'

export default function SectionQrCode ( 
    { 
        title, 
        className, 
        id, 
        content, 
        containerWidth, 
        size,
        mode,
        location,
        backgroundLayers,
        destinationType, // Destination: Current or Personalized URL. When 'Current' the location.href will be used. If personalized the 'destinationUrl' will be used instead.
        destinationUrl,
        destinationText // Button Text when destination 'personalized' is selected
    } 
) {

    const theme = useTheme()
    const { t } = useTranslation()
    
    const destination = destinationType ? destinationType : 'current'

    return (
        <section  id = {id} className = {`sectionQrCode ${ size ? size : 'md' } ${ className ? className : ''} ${ mode ? mode : 'light' }`}>

            <Container 
                fluid = { containerWidth === 'container' ? false : true }
            >
                <Row>
                    <Col>
                        {
                            ( title || content ) ?
                                <div className='general'>
                                    {
                                        title ?
                                            <h2 className='title' dangerouslySetInnerHTML={{__html: title}}></h2>
                                        :
                                            undefined
                                    }
                                    { 
                                        content ?
                                            <div className='content' dangerouslySetInnerHTML={{__html: content}}></div>
                                        :
                                            undefined
                                    }
                                    {
                                        destination === 'personalized' && destinationUrl ?
                                            <div>
                                                <Button 
                                                    href  = { destinationUrl }
                                                    variant = {`outline-${ mode === 'light' ? 'dark' : 'light' }`}
                                                >
                                                    { destinationText ? destinationText : t('global:global.visit') }
                                                </Button>
                                            </div>
                                        : undefined
                                    }
                                </div>
                            :
                                undefined
                        }
                    </Col>

                    <Col className = 'qrcontainer'>
                        {
                            destination === 'current' && location ?
                                <div className='qrcode'>
                                    <div className='graphic'>
                                        <QRCode 
                                            value = { location.href }
                                            bgColor={ theme.colors.hex.light }
                                            fgColor={ theme.colors.hex.dark }
                                            size = {280}
                                            imageSettings={{
                                                src: theme.graphics.favicon,
                                                x: null,
                                                y: null,
                                                height: 48,
                                                width: 48,
                                                excavate: true,
                                            }}
                                        />
                                    </div>
                                    <div className='instructions'>
                                        <span className='icon'><FontAwesomeIcon icon={faMobile} size='sm' /></span>
                                        {t('global:global.qrcode.scan-me')}
                                    </div>
                                </div>
                            :
                                destination === 'personalized' && destinationUrl ?
                                    <div className='qrcode'>
                                        <div className='graphic'>
                                            <QRCode 
                                                value = { destinationUrl }
                                                bgColor={ theme.colors.hex.light }
                                                fgColor={ theme.colors.hex.dark }
                                                size = {280}
                                                imageSettings={{
                                                    src: theme.graphics.favicon,
                                                    x: null,
                                                    y: null,
                                                    height: 48,
                                                    width: 48,
                                                    excavate: true,
                                                }}
                                            />
                                        </div>
                                        <div className='instructions'>
                                            <span className='icon'><FontAwesomeIcon icon={faMobile} size='sm' /></span>
                                            {t('global:global.qrcode.scan-me')}
                                        </div>
                                    </div>
                                : undefined
                        }
                    </Col>
                </Row>
            </Container>

            <div className={`background noselect z-index-1`}>
                <Background
                    layers  = { backgroundLayers }
                />
            </div>

        </section>
    )
}