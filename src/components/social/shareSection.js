// Dependencies
import React from 'react'
import { useTranslation } from "react-i18next"
import { useStaticQuery, graphql } from 'gatsby'
import { Container, Col, Row } from 'react-bootstrap'
import Img from 'gatsby-image'
import {FacebookShareButton, TwitterShareButton} from 'react-share'

// Components
import './shareSection.scss'
import config from '../../../data/SiteConfig'

export default function ShareSection( { title, id, subtitle, className, variant, photo, location, ...props } ) {

    /* Standard fields */
    const { t } = useTranslation()

    const canonicalUrl = config.siteUrl + location.pathname

    const data = useStaticQuery(graphql`
        query{
            noImage: file(relativePath: {eq: "img/global/noimage.jpg"}) {
                publicURL
            }
            facebook: file(relativePath: {eq: "img/global/icon_social_share_facebook_white.svg"}) {
                publicURL
            }
            twitter: file(relativePath: {eq: "img/global/icon_social_share_twitter_white.svg"}) {
                publicURL
            }
        }
    `)

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
                            <FacebookShareButton className="button button--white user-select-none"
                            quote="" hashtag="" url={canonicalUrl} >
                                <img src={data.facebook.publicURL} alt="Share on Twitter"/>
                            </FacebookShareButton>

                            <TwitterShareButton className="button button--white user-select-none"
                                url={canonicalUrl} title="">
                                <img src={data.twitter.publicURL} alt="Share on Facebook"/>
                            </TwitterShareButton>
                        </div>
                    </Col>

                    <Col xs={12} md={6} lg={6}>
                        <Img className="photo" fluid={ (photo) ? photo : data.noImage.publicURL } alt="" />
                    </Col>
                    
                </Row>
            </Container>
        </section>
    )
}