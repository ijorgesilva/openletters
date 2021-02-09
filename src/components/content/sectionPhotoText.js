// Dependencies
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'

// Components
import './sectionPhotoText.scss'

export default function SectionPhotoText( { title, photo, text, className, id, ...props}) {

    const data = useStaticQuery(graphql`
        query{
            noImage: file(relativePath: {eq: "img/global/noimage.jpg"}) {
                childImageSharp {
                    fluid {
                        src
                    }
                }
            }
        }
    `)

    const image = photo ? photo : data.noImage.childImageSharp.fluid.src

    const style = {
        backgroundImage: "url("+ image +")"
    }

    return (

        <section className={`sectionPhotoText ${className}`} id={id}>
            <Container fluid>
                <Row>
                    <Col className="p-0">
                        <div className="photo" style={style}></div>
                    </Col>
                    <Col className="content">
                        <div>
                            <h3 className="h-color-four" dangerouslySetInnerHTML={{__html: title }}></h3>
                            <p className="mt-4 h-color-six-shade-three">
                                {text}
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>

    )
}