import React from "react"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Container } from "react-bootstrap"

import "./testimonialCarousel.scss"

// Assets
import noPhoto from "../../assets/img/global/noimage.jpg"

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 6
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 375, min: 0 },
      items: 1
    }
  };

export default function TestimonialCarousel(props){
    return (
        <section className={`$props.class`} id={props.id}>
            <Container fluid><div dangerouslySetInnerHTML={{__html:props.title}}></div></Container>
            <div className={`carousel-background`}>
                <Carousel 
                    swipeable={false}
                    draggable={false}
                    showDots={false}
                    infinite={true}
                    responsive={responsive}
                    itemClass="carousel-item-padding-40-px"
                    containerClass="carousel-container"
                >
                    {
                        props.testimonials.map( (testimonial, index) => (
                            <div key={index} className="card testimonial-card user-select-none">
                                <div className={`card-background ${testimonial.class}`}></div>
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
                </Carousel>
            </div>
        </section>
    )
}