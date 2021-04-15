// Dependencies
import React from 'react'
import { Container, Row, Col } from "react-bootstrap"
import { StaticImage, GatsbyImage } from "gatsby-plugin-image"
import { useTranslation } from "react-i18next"

// Components
import './sectionPodcast.scss'

export default function SectionPodcast ( { id, title, subtitle, content, Spotify, Soundcloud, iTunes, graphic  } ){
        
    const { t } = useTranslation()
    
    return(
        <section className="SectionPodcast h-background-six-shade-three" id={id}>
            <Container>
                <Row>

                    <Col xs={12} md={4}>
                        {
                            (graphic) ? 
                                <GatsbyImage 
                                    image={graphic} 
                                    alt=""
                                />
                            :
                                <StaticImage
                                    src="../../assets/img/global/img-podcast.png"
                                    alt=""
                                />
                        }
                    </Col>

                    <Col xs={12} md={8}>
                        {
                            (subtitle) ?
                                <span>{subtitle}</span>
                            :
                                <span>{t('components.podcast.subtitle')}</span>
                        }

                        {
                            (title) ?
                                <h2>{title}</h2>
                            : 
                                <h2>{t('components.podcast.title')}</h2>
                        }

                        {
                            (content) ?
                                <p>{content}</p>
                            :
                                <p>{t('components.podcast.text')}</p>
                        }

                        <div className="links">
                            {
                                (iTunes) ?
                                    <a href={iTunes} target="_blank" rel="noreferrer">
                                        <StaticImage
                                                src="../../assets/img/global/icon-podcast-apple.svg"
                                                alt="iTunes"
                                            />
                                    </a>
                                : undefined
                            }
                            {
                                (Spotify) ?
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
                                (Soundcloud) ?
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
