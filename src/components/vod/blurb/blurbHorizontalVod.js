
import React from "react"
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import TextTruncate from 'react-text-truncate'


import './blurbHorizontalVod.scss'

export default function BlurbHorizontalVod( 
    { 
        className, 
        title, 
        subtitle, 
        featuredImage, 
        link, 
        excerpt, 
        mode 
    } 
    ) {
    const regex = /(<([^>]+)>)/ig;
    const noHTMLTitle = title?.replace(regex, '');

    return (
        <div className={`card blurbHorizontalVod ${ mode ? mode : 'light'} ${ className ? className : ''}`} title={ title ? noHTMLTitle : ''}>
            
            <Link to={link}>

                <div className="card-img position-relative">
                    <GatsbyImage
                        image={featuredImage}
                        layout="fullWidth"
                        alt=''
                    />
                </div>
                
                <div className="card-body">
                    {
                        (subtitle) ? 
                            <h6 className="card-subtitle">{subtitle}</h6> 
                        : 
                            undefined
                    }
                    <h5 className="card-title" dangerouslySetInnerHTML={{__html:title}}>
                        
                    </h5>
                    <p className="card-text">
                        {
                            (excerpt) ? 
                                <TextTruncate line={1} truncateText="…" text={excerpt.replace(/<p>/, '').replace(/<\/p>/, '')} /> 
                            : 
                                undefined
                        }
                    </p>
                </div>

            </Link>

        </div>
    )
}