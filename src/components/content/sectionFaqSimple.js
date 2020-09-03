import React from "react"
import { Container } from "react-bootstrap"

import "./sectionFaqSimple.scss"
import SectionEmpty from "./sectionEmpty"
import AccordionIndicator from "../advanced/accordionIndicator"

export default function SectionFaqSimple(props) {
    return (
        <SectionEmpty id={props.id} className={`c-faq section ${props.className}`}>
            <Container>
                <h2 class="h-color-one" dangerouslySetInnerHTML={{__html: props.title}}></h2>
                {props.children}
                <AccordionIndicator 
                    className="c-accordion mt-5 mw-600px" 
                    defaultActiveKey={props.defaultActiveKey} 
                    data={props.data}
                />
            </Container>
        </SectionEmpty>
    )
}