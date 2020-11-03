// Dependencies
import React from 'react'
import { Link } from 'gatsby'
import { useStaticQuery, graphql } from 'gatsby'
import { Container, Row, Col } from 'react-bootstrap'
import Img from 'gatsby-image'

// Components
import './sectionTextPhoto.scss'

export default function SectionTextPhoto( { title, subtitle, className, photo, content, variant, link, linkType, linkText, buttonLink, buttonType, buttonText, id, ...props } ) {

    const data = useStaticQuery(graphql`
        query{
            noImage: file(relativePath: {eq: "img/global/noimage.jpg"}) {
                publicURL
            }
        }
    `)

    const variantClass = (variant) ? variant : "dark"

    const buttonClasses = "btn btn--animation z-index-2 btn--"+variantClass+"-outline"

    return (

        <section className={`sectionTextPhoto ${className} ${variantClass}`} id={id}>
            <Container fluid className="pl-0 pr-0">
                <Row>
                    <Col xs={12} md={6} lg={6} className="content">
                        <h4 className="subtitle user-select-none z-index-2 text-break">
                            {subtitle}
                        </h4>
                        <h2 className="title text-uppercase display-4 text-break z-index-2">
                            {title}
                        </h2>
                        <p>
                            {content}
                        </p>
                            
                        <div className="buttons z-index-2">
                            {
                                (linkType === 'internal' && link && linkText) ? 
                                    <Link to={link} className={buttonClasses} title={linkText}>
                                        {linkText}
                                    </Link>
                                : 
                                    (linkType === 'external' && link && linkText) ?
                                        <a href={link} className={buttonClasses} title={linkText}>
                                            {linkText}
                                        </a>
                                    : 
                                        undefined
                            }
                            {
                                (buttonType === 'internal' && buttonLink && buttonText) ? 
                                    <Link to={buttonLink} className="arrow z-index-2 d-block" >
                                        {buttonText}
                                    </Link>
                                :          
                                    (buttonType === 'external' && buttonLink && buttonText) ?                           
                                        <a href={buttonLink} className="arrow z-index-2 d-block" >
                                            {buttonText}
                                        </a>
                                    : 
                                        undefined
                            }
                        </div>
                    </Col>
                    <Col xs={12} md={6} lg={6}>
                        <Img className="photo" fluid={(photo) ? photo : data.noImage.publicURL } alt="" />
                    </Col>
                </Row>
            </Container>
        </section>

    )
}