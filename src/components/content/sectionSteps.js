// Dependencies
import React from 'react'
import {Container} from 'react-bootstrap'

// Components
import './sectionSteps.scss'

export default function SectionSteps( { title, steps, text, children, link, linkText, className, id, ...props} ) {
    return (

        <section id={id} className={`sectionSteps ${className}`}>

            {/* <div className="g-circlewords " style="top: -70px; left: 30px;"></div> */}

            <Container>
                <div className="content mx-auto text-center">

                    <h2 className="h-color-six display-4" dangerouslySetInnerHTML={{__html: title}}></h2>
                    <p className="mt-5 paragraph--first">
                        {text}
                    </p>

                </div>
                <div className="mt-5">
                    <div className="steps">
                        {
                            steps.map((step, index) => (
                                <div key={index} className="step card position-relative user-select-none">
                                    <span className="number font-weight-bolder h1">{index + 1}</span>
                                    <img className="card-img-top" src={step.photo} alt="" />
                                    <div className="card-body text-center">
                                        <h3 className="card-title h-color-one mt-3">{step.title}</h3>
                                        <p className="card-text mt-4">
                                            {step.text}
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    {children}
                    {
                        (link && linkText) ?
                            <div className="text-center">
                                <a href={link} className="btn btn--animation btn--three-outline mt-5">{linkText}</a>
                            </div>
                        : <div></div>
                    }
                </div>
            </Container>
        </section>
    )
}