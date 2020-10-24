// Dependencies
import React from 'react'
import { Container, Row, Col } from "react-bootstrap"
import { useStaticQuery, graphql } from 'gatsby'
import { useTranslation } from "react-i18next"
import Img from 'gatsby-image'

// Components
import './sectionPodcast.scss'

export default function SectionPodcast ( { title, subtitle, content, Spotify, Soundcloud, iTunes, graphic  } ){
        
    const { t } = useTranslation()
    
    const data = useStaticQuery(graphql`
        query {
            imageDefault: file(relativePath: {eq: "img/global/img-podcast.png"}) {
                childImageSharp {
                    fluid {
                        src
                    }
                }
            }
            appleIcon: file(relativePath: {eq: "img/global/icon-podcast-apple.svg"}) {
                publicURL
            }
            spotifyIcon: file(relativePath: {eq: "img/global/icon-podcast-spotify.svg"}) {
                publicURL
            }
            soundcloudIcon: file(relativePath: {eq: "img/global/icon-podcast-soundcloud.svg"}) {
                publicURL
            }
        }
    `)

    return(
        <section className="SectionPodcast h-background-six-shade-three">
            <Container>
                <Row>

                    <Col xs={12} md={4}>
                        {
                            (graphic) ? 
                                <Img className="graphic" fluid={graphic} alt='' />
                            :
                               <Img className="graphic" fluid={data.imageDefault.childImageSharp.fluid} alt='' />
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
                                    <a href={iTunes} target="_blank">
                                        <img src={data.appleIcon.publicURL} alt="iTunes"/>
                                    </a>
                                : undefined
                            }
                            {
                                (Spotify) ?
                                    <a href={iTunes} target="_blank">
                                        <img src={data.spotifyIcon.publicURL} alt="Spotify"/>
                                    </a>
                                : undefined
                            }
                            {
                                (Soundcloud) ?
                                    <a href={iTunes} target="_blank">
                                        <img src={data.soundcloudIcon.publicURL} alt="Spotify"/>
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
