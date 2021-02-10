// Dependencies
import React from "react"
import { Link } from 'gatsby'
import { useStaticQuery, graphql } from 'gatsby'
import TextTruncate from 'react-text-truncate'

// Components
import './blurbHorizontalVod.scss'

export default function BlurbHorizontalVod( { className, title, subtitle, featuredImage, link, excerpt, ...props } ) {

    const data = useStaticQuery(graphql`
        query{
            noImage: file(relativePath: {eq: "img/global/noimage.jpg"}) {
                childImageSharp {
                    fluid {
                        src
                    }
                }
            }
        }
    `)
    
    const image = (featuredImage) ? featuredImage.src : (data.noImage.childImageSharp.fluid.src) ? data.noImage.childImageSharp.fluid.src : undefined

    const styleCardPhoto = {
        backgroundImage: "url("+ image +")"
    }

    return (
        <div className={`card blurbHorizontalVod ${(className) ? className : ''}`} title={(title) ? title : ''}>
            
            <Link to={link}>

                <div className="card-img position-relative" style={styleCardPhoto}></div>
                
                <div className="card-body">
                    {
                        (subtitle) ? <h6 className="card-subtitle">{subtitle}</h6> : undefined
                    }
                    <h5 className="card-title">
                        <TextTruncate line={2} truncateText="…" text={title} />
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