import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import './sectionPhotoText.scss'

export default function SectionPhotoText ( { title, photo, text, className, id } ) {

    return (

        <section className={`sectionPhotoText ${className ? className : ''}`} id={id}>
            <Container fluid>
                <Row>
                    <Col className='p-0'>
                        <div className='photo'>
                            {
                                photo ?
                                    <GatsbyImage 
                                        image={photo} 
                                        alt=''
                                    />
                                : undefined
                            }
                        </div>
                    </Col>
                    <Col className='content'>
                        <div>
                            <h3 className='h-color-four' dangerouslySetInnerHTML={{__html: title }}></h3>
                            <p className='mt-4 h-color-six-shade-three'>
                                {text}
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>

    )
}