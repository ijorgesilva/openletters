
import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import TextTruncate from 'react-text-truncate'

import './blurbVerticalDark.scss'

export default function BlurbVerticalDark ( 
    { title, excerpt, className, link, featuredImage, target, linkType, iconImage, mode } 
    ) {

    return (
        
            <div className={`blurbVerticalDark card ${ ( mode ) ? mode : 'light'} ${ ( className ) ? className : '' }`}>
            {
                (linkType === 'external') ?
                    <a href={link} target={ target ? target : '_self' }>
                        <div className="card-img-container">
                            {
                                (iconImage) ?
                                    <div className="card-icon">
                                        <img src={iconImage} alt=""/>
                                    </div>
                                :
                                    undefined
                            }
                            { 
                                (featuredImage) ? 
                                    <GatsbyImage 
                                        image={featuredImage} 
                                        className="card-img-top"
                                        alt=""
                                    />
                                : 
                                    <div className="card-img-top"></div>
                            }
                        </div>
                        <div className="card-body">
                            {
                                (title) ? 
                                    <h5 className="card-title mb-1" dangerouslySetInnerHTML={{__html: title}}></h5>
                                : 
                                    undefined
                            }
                            {
                                (excerpt) ? 
                                    <TextTruncate line={2} element="p" truncateText="…" text={excerpt.replace(/<p>/, '').replace(/<\/p>/, '')} /> 
                                : 
                                    undefined
                            }
                        </div>
                    </a>
                :
                    <Link to={link}>
                        <div className="card-img-container">
                            {
                                (iconImage) ?
                                    <div className="card-icon">
                                        <img src={iconImage} alt=""/>
                                    </div>
                                :
                                    undefined
                            }
                            { 
                                (featuredImage) ? 
                                    <GatsbyImage 
                                        image={featuredImage} 
                                        className="card-img-top"
                                        alt=""
                                    />
                                : 
                                    <div className="card-img-top"></div>
                            }
                        </div>
                        <div className="card-body">
                            {
                                (title) ? 
                                    <h5 className="card-title mb-1" dangerouslySetInnerHTML={{__html: title}}></h5>
                                : 
                                    undefined
                            }
                            {
                                (excerpt) ? 
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
                    </Link>
            }

            </div>
    )
}