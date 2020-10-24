// Dependencies
import React from "react"
import { Link } from 'gatsby'
import TextTruncate from 'react-text-truncate'

// Components
import './blurbHorizontal.scss'

export default function BlurbHorizontal( { title, subtitle, keyIndex, featuredImage, className, noImage, link, tag, tagClassName, excerpt, ...props } ) {

    const image = (featuredImage) ? featuredImage : (noImage) ? noImage : undefined
    
    const styleCardPhoto = {
        backgroundImage: "url("+ image +")"
    }

    const tagClass = (tagClassName) ? tagClassName : "h-background-one"

    return (
        <div key={(keyIndex) ? keyIndex : undefined} className={`card blurbHorizontal ${className}`} title={title}>
            
            <Link to={link}>

                <div className="card-img position-relative" style={styleCardPhoto}></div>
                
                <div className="card-body">
                    <div className="tags">
                        <span className={`badge badge-pill badge-image text-white ${tagClass}`} dangerouslySetInnerHTML={{__html: tag}}></span> 
                    </div>
                    {/* {
                        (tags) ?
                            tags.map((tag, index) => (
                                <span key={index} className="badge badge-pill badge-image h-background-six text-white" dangerouslySetInnerHTML={{__html: }}></span> 
                            ))
                        : undefined
                    } */}
                    {
                        (subtitle) ? <h6 className="card-subtitle">{subtitle}</h6> : undefined
                    }
                    <h5 className="card-title h-color-one mt-2">
                        {title}
                    </h5>
                    <p className="card-text">
                        {
                            (excerpt) ? <TextTruncate line={1} truncateText="…" text={excerpt.replace(/<p>/, '').replace(/<\/p>/, '')} /> 
                            : undefined
                        }
                    </p>
                </div>

            </Link>

        </div>
    )
}