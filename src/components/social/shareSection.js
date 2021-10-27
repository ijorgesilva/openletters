import { StaticImage, GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { useTranslation } from "react-i18next"
import {FacebookShareButton, TwitterShareButton} from 'react-share'

import './shareSection.scss'

export default function ShareSection( { title, id, subtitle, className, variant, photo, location } ) {

    
    const { t } = useTranslation()

    const canonicalUrl = process.env.SITE_CANONICAL_URL + location.pathname

    const variantClass = (variant) ? variant : "dark"

    return (

        <section className={`shareSection ${className} ${variantClass}`} id={id}>
            <Container fluid className="pl-0 pr-0">
                <Row>
                    <Col xs={12} md={6} lg={6} className="content">
                        {
                            (title) ?
                                <h2 className="title display-4 font-italic text-break z-index-2">
                                    {title}
                                </h2>
                            : undefined
                        }
                        {
                            (subtitle) ?
                                <h4 className="subtitle user-select-none z-index-2">
                                    {subtitle}
                                </h4>
                            : undefined
                        }
                        <div className="buttons z-index-2">
                            
                            <FacebookShareButton 
                                className="button button--white user-select-none"
                                quote="" 
                                hashtag="" 
                                url={canonicalUrl} 
                            >
                                <StaticImage
                                    src="../../assets/img/global/icon_social_share_facebook_white.svg"
                                    layout='fixed'
                                    placeholder='none'
                                    title={t('components.social.share-on') + ' Facebook'}
                                    alt=''
                                />
                            </FacebookShareButton>

                            <TwitterShareButton 
                                className="button button--white user-select-none"
                                url={canonicalUrl} 
                            >
                                <StaticImage
                                    src="../../assets/img/global/icon_social_share_twitter_white.svg"
                                    layout='fixed'
                                    placeholder='none'
                                    title={t('components.social.share-on') + ' Twitter'}
                                    alt=''
                                />
                            </TwitterShareButton>

                        </div>
                    </Col>

                    <Col xs={12} md={6} lg={6}>
                        <GatsbyImage 
                            className="photo"
                            image={photo} 
                            alt=""
                        />
                    </Col>
                    
                </Row>
            </Container>
        </section>
    )
}