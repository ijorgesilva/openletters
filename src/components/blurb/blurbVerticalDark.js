// Dependencies
import React from 'react'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import TextTruncate from 'react-text-truncate'

// Components
import './blurbVerticalDark.scss'

export default function BlurbVerticalDark ( { title, excerpt, className, link, featuredImage, noImage, target, linkType, variant, iconImage, path } ) {

    return (
        
            <div className={`card card--video user-select-none  ${ (className) ? className : ''} ${(variant) ? variant : 'dark'}`}>
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
                                (featuredImage) ? 
                                    <GatsbyImage 
                                        image={featuredImage} 
                                        className="card-img-top"
                                        alt=""
                                    />
                                : 
                                    (noImage) ?
                                        <GatsbyImage 
                                            image={noImage} 
                                            className="card-img-top"
                                            alt=""
                                        />
                                    :
                                        <StaticImage
                                            src="../../assets/img/global/noImage.jpg"
                                            alt=""
                                            layout="fixed"
                                            className="photo"
                                        />
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
                    <Link to={`${ ('') ? path : ''}${link}`}>
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
                                    (noImage) ?
                                        <GatsbyImage 
                                            image={noImage} 
                                            className="card-img-top"
                                            alt=""
                                        />
                                    :
                                        <StaticImage
                                            src="../../assets/img/global/noImage.jpg"
                                            alt=""
                                            layout="fixed"
                                            className="photo"
                                        />
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