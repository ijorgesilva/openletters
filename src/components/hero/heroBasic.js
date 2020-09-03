import React from "react"

import { Container } from "react-bootstrap"

import "./heroBasic.scss"

export default function HeroBasic(props){

    const styleBackground = {
        backgroundImage: "url(" + props.backgroundPhoto + ")"
    }

    return (

        <div className={`position-relative ${props.className}`}>
            <Container className={"z-index-2"}>
                
                <div className="align-items-center c-hero__content position-relative">
                    <div>
                        <h1 className="display-1 text-uppercase text-white" dangerouslySetInnerHTML={{__html: props.title}}></h1>
                        <h5 className="text-white mt-4 mb-3" dangerouslySetInnerHTML={{__html: props.subtitle}}></h5>
                        <div className="c-hero__buttons mt-3">
                            {props.children}
                        </div>
                    </div>
                </div>
            </Container>
            <div className="c-hero__bg z-index-1" style={styleBackground}></div>
        </div>

    )
}