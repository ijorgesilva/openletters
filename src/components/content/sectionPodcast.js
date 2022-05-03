import { StaticImage, GatsbyImage } from "gatsby-plugin-image"
import React from 'react'
import { Container, Row, Col } from "react-bootstrap"
import { useTranslation } from "react-i18next"

import './sectionPodcast.scss'

export default function SectionPodcast ( 
    { 
        className, 
        id, 
        title, 
        subtitle, 
        content, 
        Spotify, 
        Soundcloud, 
        iTunes, 
        graphic, 
        mode, 
        width, 
        size,
    } 
) {
        
    const { t } = useTranslation()
    
    return(
        <section className={`sectionPodcast ${ size ? size : 'md' } ${ mode ? mode : 'light' } ${ className ? className : '' }`} id={id}>
            <Container fluid = { width === 'container' ? undefined : true }>
                <Row>

                    <Col xs={12} md={4} className="graphic">
                        {
                            graphic ? 
                                <GatsbyImage 
                                    image={graphic} 
                                    alt=""
                                />
                            :
                                undefined
                        }
                    </Col>

                    <Col xs={12} md={8}>
                        {
                            subtitle ?
                                <span>{subtitle}</span>
                            :
                                <span>{t('components.podcast.subtitle')}</span>
                        }

                        {
                            title ?
                                <h2>{title}</h2>
                            : 
                                <h2>{t('components.podcast.title')}</h2>
                        }

                        {
                            content ?
                                <p>{content}</p>
                            :
                                <p>{t('components.podcast.text')}</p>
                        }

                        <div className="links">
                            {
                                iTunes ?
                                    <a href={iTunes} target="_blank" rel="noreferrer">
                                        <StaticImage
                                                src="../../assets/img/global/icon-podcast-apple.svg"
                                                alt="iTunes"
                                            />
                                    </a>
                                : undefined
                            }
                            {
                                Spotify ?
                                    <a href={Spotify} target="_blank" rel="noreferrer">
                                        <StaticImage
                                                src="../../assets/img/global/icon-podcast-spotify.svg"
                                                alt="Spotify"
                                                className=""
                                            />
                                    </a>
                                : undefined
                            }
                            {
                                Soundcloud ?
                                    <a href={Soundcloud} target="_blank" rel="noreferrer">
                                        <StaticImage
                                            src="../../assets/img/global/icon-podcast-soundcloud.svg"
                                            alt="Soundcloud"
                                            className=""
                                        />
                                    </a>
                                : undefined
                            }
                        </div>
                    </Col>

                </Row>
            </Container>
        </section>
    )
    
}
