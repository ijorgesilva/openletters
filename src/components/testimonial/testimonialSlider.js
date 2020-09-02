import React, { useState } from "react"
import { Container } from "react-bootstrap"
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import "./testimonialCarousel.scss"

// Assets
import noPhoto from "../../assets/img/global/noimage.jpg"

export default function(props) {

    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40;

    return (
        <section className={`$props.class`} id={props.id}>
            <Container fluid><div dangerouslySetInnerHTML={{__html:props.title}}></div></Container>
            <Carousel
                infiniteLoop
                centerMode
                showThumbs={false}
                showIndicators={false}
            >
                {
                    props.testimonials.map( (testimonial, index) => (
                        <div>
                            <div key={index} className="card testimonial-card user-select-none">
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
                        </div>
                    ))
                }
            </Carousel>
        </section>
    )
}