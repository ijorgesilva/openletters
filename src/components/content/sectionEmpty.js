

import React from "react"
import { Container } from 'react-bootstrap'


import "./sectionEmpty.scss"

export default function SectionEmpty( { title, id, className, children, ...props } ) {
    return (
        <section id={id} className={`sectionEmpty ${className}`}>
            <Container fluid>
                {
                    (title) ?
                        <h4 className="h-color-one mb-5" dangerouslySetInnerHTML={{__html: title}}></h4>
                    : undefined
                }
                {children}
            </Container>
        </section>
    )
}