import React from "react"
import { Container } from "react-bootstrap"

import "./sectionFaqSimple.scss"
import SectionEmpty from "./sectionEmpty"
import AccordionIndicator from "../advanced/accordionIndicator"

export default function SectionFaqSimple( { id, className, title, children, data, defaultActiveKey, ...props} ) {
    return (
        <SectionEmpty id={id} className={`sectionFaqSimple ${className}`}>
            <Container>
                <h2 class="h-color-one text-center" dangerouslySetInnerHTML={{__html: title}}></h2>
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