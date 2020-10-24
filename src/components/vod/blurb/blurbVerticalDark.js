// Dependencies
import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import TextTruncate from 'react-text-truncate'

// Components
import './blurbVerticalDark.scss'

export default function BlurbVerticalDark ( { className, link, iconImage, featuredImage, noImage, title, serieTitle, serieLink, excerpt } ) {

    return (
        
            <div className={`card BlurbVerticalDarkVod user-select-none ${className}`}>
                
                    <div className="card-img-container">
                        <Link to={link}>
                            {
                                (iconImage) ?
                                    <div className="card-icon">
                                        <img src={iconImage} alt=""/>
                                    </div>
                                : undefined
                            }
                            { 
                                (featuredImage) ? <Img className="card-img-top" fluid={featuredImage} alt="" />
                                : <Img className="card-img-top" fluid={noImage} alt="" />
                            }
                        </Link>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title mb-1">
                            {
                                (title && link) ? 
                                    <Link to={link}>
                                        {title}
                                    </Link>
                                : undefined
                            }
                            {
                                (serieLink && serieTitle) ?
                                    <Link to={serieLink}>
                                        <span> | {serieTitle}</span>
                                    </Link>
                                : undefined
                            }
                        </h5>
                        {
                            (excerpt) ? <TextTruncate line={2} element="p" truncateText="…" text={excerpt.replace(/<p>/, '').replace(/<\/p>/, '')} /> 
                            : <></>
                        }
                    </div>
            </div>
    )
}