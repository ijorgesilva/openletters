import React from "react"

export default function BlurbHorizontal(props) {

    const styleCardPhoto = {
        backgroundImage: "url("+ props.photo +")"
    }

    return (
        <div key={props.id} className="c-news__card card card--news">
            <div>
                <div className="card-img position-relative" style={styleCardPhoto}></div>
            </div>
            <div>
                <div className="card-body">
                    {
                        props.tags.map((tag, index) => (
                            <span key={index} className="badge badge-pill badge-image h-background-six text-white" dangerouslySetInnerHTML={{__html: tag}}></span> 
                        ))
                    }
                    <h5 className="card-title h-color-one mt-2">
                        {props.title}
                    </h5>
                    <p className="card-text" dangerouslySetInnerHTML={{__html: props.children}}></p>
                    {
                        (props.link && props.linkText) ?
                        <a className="arrow" href={props.link} target={props.target}>{props.linkText}</a>
                        : <div></div>
                    }
                </div>
            </div>
        </div>
    )
}