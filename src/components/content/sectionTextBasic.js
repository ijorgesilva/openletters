import React from "react"

import "./sectionTextBasic.scss"

export default function SectionTextBasic(props) {
    return (
        <section id={props.id} className="c-intro container">
            <div className="c-member__intro text-center">
                <h2 className="h-color-six" dangerouslySetInnerHTML={{__html: props.title}}> 
                </h2>

                <p className="mt-5">
                    {props.children}
                </p>
                {
                    (props.link) ?
                        <a className="btn btn--animation btn--dark-outline mt-5" href={props.link} target={props.target} rel="noreferrer" >{props.linkText}</a>  
                    : <div></div>
                }
            </div>
        </section>
    )
}