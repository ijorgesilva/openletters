// Dependencies
import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import TextTruncate from 'react-text-truncate'

// Components
import './blurbVertical.scss'

export default function BlurbVertical ( {title, excerpt, className, featuredImage, noImage, iconImage, link, target, linkType, variant, ...props} ) {
    return (

        <div className={`BlurbVertical card user-select-none ${ (className) ? className : ''} ${(variant) ? variant : 'dark'}`}>
            {
                (linkType === 'external') ?
                    <a href={link} target={ (target) ? target : '_self' }>
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
                                (featuredImage) ? <Img className="card-img-top" fluid={featuredImage} alt="" />
                                : <Img className="card-img-top" fluid={noImage} alt="" />
                            }
                        </div>
                        <div className="card-body">
                            {
                                (title) ? <h5 className="card-title mb-1" dangerouslySetInnerHTML={{__html: title}}></h5>
                                : null
                            }
                            {
                                (excerpt) ? <TextTruncate line={2} element="p" truncateText="…" text={excerpt.replace(/<p>/, '').replace(/<\/p>/, '')} /> 
                                : <></>
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
                                (featuredImage) ? <Img className="card-img-top" fluid={featuredImage} alt="" />
                                : <Img className="card-img-top" fluid={noImage} alt="" />
                            }
                        </div>
                        <div className="card-body">
                            {
                                (title) ? <h5 className="card-title mb-1" dangerouslySetInnerHTML={{__html: title}}></h5>
                                : null
                            }
                            {
                                (excerpt) ? <TextTruncate line={2} element="p" truncateText="…" text={excerpt.replace(/<p>/, '').replace(/<\/p>/, '')} /> 
                                : <></>
                            }
                        </div>
                    </Link>
            }

        </div>

    )
}