import React from 'react'
import { Container } from 'react-bootstrap'

import "./testimonialWall.scss"

// Assets
import noPhoto from "../../assets/img/global/noimage.jpg"

export default function TestimonialWall(props) {
    
    const count = props.testimonials.length;

    return (
        <section className="c-testimonials c-testimonials--wall" id={props.id}>
            <Container fluid><div dangerouslySetInnerHTML={{__html:props.title}}></div></Container>
            <Container fluid className="c-testimonials__grid container-fluid h-background-gray-four mt-5">
                {
                    props.testimonials.map( (testimonial, index) => (
                        <div key={index} className="card testimonial-card user-select-none">
                            <div className="card-up h-background-six"></div>
                            <div className="avatar mx-auto white">
                                { 
                                    (testimonial.photo) ? <img src={testimonial.photo} className="rounded-circle" alt="" />
                                    : <img src={noPhoto} className="rounded-circle" alt="" />
                                }
                            </div>
                            <div className="card-body">
                                <h4 className="card-title mb-0">{testimonial.name}</h4>
                                <span>{testimonial.subtitle}</span>
                                <p className="mt-3">{testimonial.quote}</p>
                            </div>
                        </div>
                    ))
                }
            </Container>
        </section>
    )
}