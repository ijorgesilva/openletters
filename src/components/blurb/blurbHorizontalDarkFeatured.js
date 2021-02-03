// Dependencies
import React from "react"
import { Link } from 'gatsby'
import TextTruncate from 'react-text-truncate'

// Components
import './blurbHorizontalDarkFeatured.scss'

export default function BlurbHorizontalDarkFeatured( { title, subtitle, keyIndex, featuredImage, className, noImage, link, tag, tagClassName, excerpt, ...props } ) {

    const image = (featuredImage) ? featuredImage : (noImage) ? noImage : undefined
    
    const styleCardPhoto = {
        backgroundImage: "url("+ image +")"
    }

    return (
        <div key={(keyIndex) ? keyIndex : undefined} className={`card blurbHorizontalDarkFeatured ${className}`} title={title}>
            
            <Link to={link}>

                <div className="card-img position-relative" style={styleCardPhoto}></div>
                
                <div className="card-body">
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