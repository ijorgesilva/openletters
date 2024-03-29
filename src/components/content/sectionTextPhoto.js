import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import './sectionTextPhoto.scss'

export default function SectionTextPhoto( 
    { 
        title, 
        subtitle, 
        className, 
        photo, 
        content, 
        link, 
        linkType, 
        linkText, 
        buttonLink, 
        buttonType, 
        buttonText, 
        id, 
        mode, 
        width,
        size,
    }
    ) {

    return (

        <section className={`sectionTextPhoto ${ size ? size : 'md'} ${ mode ? mode : 'light'} ${ className ? className : ''}`} id={id}>
            <Container fluid = { width === 'container' ? undefined : true } className='pl-0 pr-0'>
                <Row>
                    <Col xs={12} md={6} lg={6} className='content'>
                        <h4 className='subtitle user-select-none z-index-2 text-break'>
                            {subtitle}
                        </h4>
                        <h2 className='title text-uppercase display-4 text-break z-index-2'>
                            {title}
                        </h2>
                        <p>
                            {content}
                        </p>
                            
                        <div className='buttons z-index-2'>
                            {
                                (linkType === 'internal' && link && linkText) ? 
                                    <Link to={link} className={`btn btn-outline-${ mode === 'light' ? 'light' : 'dark'}`} title={linkText}>
                                        {linkText}
                                    </Link>
                                : 
                                    (linkType === 'external' && link && linkText) ?
                                        <a href={link} className={`btn btn-outline-${ mode === 'light' ? 'light' : 'dark'}`} title={linkText}>
                                            {linkText}
                                        </a>
                                    : 
                                        undefined
                            }
                            {
                                (buttonType === 'internal' && buttonLink && buttonText) ? 
                                    <Link to={buttonLink} className='arrow z-index-2 d-block' >
                                        {buttonText}
                                    </Link>
                                :          
                                    (buttonType === 'external' && buttonLink && buttonText) ?                           
                                        <a href={buttonLink} className='arrow z-index-2 d-block' >
                                            {buttonText}
                                        </a>
                                    : 
                                        undefined
                            }
                        </div>
                    </Col>
                    <Col xs={12} md={6} lg={6}>
                        {
                            photo ?
                                <GatsbyImage image={photo} className='photo' alt=''/>
                            :
                                <div className='photo'></div>
                        }
                    </Col>
                </Row>
            </Container>
        </section>

    )
}