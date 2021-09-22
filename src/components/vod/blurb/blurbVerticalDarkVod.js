import React from 'react'
import { Link } from 'gatsby'
import TextTruncate from 'react-text-truncate'
import { GatsbyImage } from "gatsby-plugin-image"

import './blurbVerticalDarkVod.scss'

export default function BlurbVerticalDarkVod ( 
    { 
        className, 
        link, 
        iconImage, 
        featuredImage, 
        title, 
        serieTitle, 
        serieLink, 
        excerpt, 
        mode 
    } 
    ) {

    return (
        
            <div className={`blurbVerticalVod card user-select-none ${ ( mode ) ? mode : 'light' } ${ ( className ) ? className : '' }`}>
                
                    <div className="card-img-container">
                        <Link to={link}>
                            {
                                ( iconImage ) ?
                                    <div className="card-icon">
                                        <img src={iconImage} alt=""/>
                                    </div>
                                : 
                                    undefined
                            }
                            { 
                                ( featuredImage ) ? 
                                    <GatsbyImage 
                                        image={featuredImage} 
                                        className="card-img-top aspect-ratio-16_9"
                                        alt=""
                                    />
                                : 
                                    <div className="card-img-top" alt=""></div>
                            }
                        </Link>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title mb-1">
                            {
                                ( title && link ) ? 
                                    <Link to={link} dangerouslySetInnerHTML={{ __html: title }}></Link>
                                : 
                                    undefined
                            }
                            {
                                ( serieLink && serieTitle ) ?
                                    <Link to={serieLink}>
                                        <span> | {serieTitle}</span>
                                    </Link>
                                : 
                                    undefined
                            }
                        </h5>
                        {
                            ( excerpt ) ? 
                                <TextTruncate 
                                    line={2} 
                                    element="p" 
                                    truncateText="…" 
                                    text={excerpt.replace(/<p>/, '').replace(/<\/p>/, '')} 
                                /> 
                            : 
                                undefined
                        }
                    </div>
            </div>
    )
}