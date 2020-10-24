// Dependencies
import React from "react"
import { Container } from "react-bootstrap"

// Components
import "./heroBasic.scss"

export default function HeroBasic( {title, subtitle, backgroundPhoto, className, children} ){

    const styleBackground = {
        backgroundImage: "url(" + backgroundPhoto + ")"
    }

    return (

        <div className={`position-relative ${className}`}>
            <Container className={"z-index-2"}>
                
                <div className="align-items-center c-hero__content position-relative">
                    <div>
                        <h1 className="display-1 text-uppercase text-white" dangerouslySetInnerHTML={{__html: title}}></h1>
                        <h5 className="text-white mt-4 mb-3" dangerouslySetInnerHTML={{__html: subtitle}}></h5>
                        <div className="c-hero__buttons mt-3">
                            {children}
                        </div>
                    </div>
                </div>

            </Container>
            <div className="c-hero__bg z-index-1" style={styleBackground}></div>
        </div>

    )
}