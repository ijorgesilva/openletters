// Dependencies
import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Container } from "react-bootstrap"

// Components
import "./heroPost.scss"

export default function HeroPost ( { title, className, backgroundPhoto, children } ) {

    return (
        <div className={`heroPost position-relative ${className}`}>
            <Container className={"z-index-2"}>
                <div>
                    {
                        (title) ?
                            <h1 className="display-1 text-uppercase text-white">
                                {title}
                            </h1>
                        : undefined
                    }
                    {
                        (children)?
                            <div className="mt-3">
                                {children}
                            </div>
                        : undefined
                    }
                </div>
            </Container>
            <div className="background z-index-1">
                <GatsbyImage 
                    image={backgroundPhoto} 
                    className="card-img-top"
                    alt=""
                />
            </div>
        </div>
    )

}