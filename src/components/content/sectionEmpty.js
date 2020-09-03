import React from "react"

import "./sectionEmpty.scss"

export default function SectionEmpty(props) {
    return (
        <section id={props.id} className={`sectionEmpty ${props.className}`}>
                {props.children}
        </section>
    )
}