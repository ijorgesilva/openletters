import React from 'react'
import {Container} from 'react-bootstrap'

export default function SectionSteps(props) {
    return (

        <section id="steps" className="c-steps section">
            {/* <div className="g-circlewords " style="top: -70px; left: 30px;"></div> */}
            <Container>
                <div className="c-steps__content mx-auto text-center">

                    <h2 className="h-color-six display-4" dangerouslySetInnerHTML={{__html: props.title}}></h2>
                    <p className="mt-5 paragraph--first">
                        {props.text}
                    </p>

                </div>
                <div className="c-steps__container mt-5">
                    <div className="c-steps__grid">
                        {
                            props.steps.map((step, index) => (
                                <div key={step.id} className="c-steps__step card position-relative user-select-none">
                                    <span className="c-steps__number font-weight-bolder h1">{step.id}</span>
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
                    {props.children}
                    {
                        (props.link && props.linkText) ?
                            <div className="text-center">
                                <a href={props.link} className="btn btn--animation btn--three-outline mt-5">{props.linkText}</a>
                            </div>
                        : <div></div>
                    }
                </div>
            </Container>
        </section>
    )
}