import React from "react"
import { Container } from "react-bootstrap"

import "./sectionFaqSimple.scss"
import AccordionIndicator from "../advanced/accordionIndicator"

import SectionEmpty from "./sectionEmpty"

export default function SectionFaqSimple( { id, className, title, children, data, defaultActiveKey } ) {
    return (
        <SectionEmpty id={id} className={`sectionFaqSimple ${ className ? className : ''}`}>
            <Container>
                <h2 className="h-color-one text-center" dangerouslySetInnerHTML={{__html: title}}></h2>
                {children}
                <AccordionIndicator 
                    className="mt-5 mw-600px" 
                    defaultActiveKey={defaultActiveKey} 
                    data={data}
                />
            </Container>
        </SectionEmpty>
    )
}