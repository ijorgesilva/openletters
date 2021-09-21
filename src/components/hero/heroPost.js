
import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Row, Col, Container } from 'react-bootstrap'


import './heroPost.scss'

export default function HeroPost ( 
    { 
        title, 
        className, 
        backgroundPhoto, 
        children,
        mode,
        size,
    } 
    ) {

    return (
        <div className={`heroPost hero ${ mode ? mode : 'light' } ${ size ? size : 'md' } ${ className ? className : '' }`}>
            <Container className={'z-index-2'}>
                <Row>
                    <Col></Col>
                    <Col className="" xs={12} md={8}>
                        {
                            (title) ?
                                <h1 className='display-1'>
                                    {title}
                                </h1>
                            : undefined
                        }
                        {
                            (children)?
                                <div className='mt-3'>
                                    {children}
                                </div>
                            : undefined
                        }
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
            <div className='background z-index-1'>
                <GatsbyImage 
                    image={backgroundPhoto} 
                    className='card-img-top'
                    alt=''
                />
            </div>
        </div>
    )

}