// Dependencies
import React from 'react'
import { Link } from 'gatsby'
import TextTruncate from 'react-text-truncate'
import { GatsbyImage } from "gatsby-plugin-image"

// Components
import './blurbVerticalSeries.scss'

export default function BlurbVerticalSeries ( { title, className, link, iconImage, poster, background, logo } ) {

    return (
        
            <div className={`blurbVerticalSeries card user-select-none ${ ( className ) ? className : ''}`}>
                
                    <div className={`card-img-container`}>
                        <Link to={link}>
                            {
                                ( iconImage ) ?
                                    <div className="card-icon">
                                        <GatsbyImage 
                                            image={iconImage} 
                                            className="card-img-top"
                                            alt=""
                                        />
                                    </div>
                                : 
                                    undefined
                            }

                            <div class="card-img-caption">
                                
                                {
                                    ( poster ) ? 
                                        undefined
                                    : 
                                        ( logo ) ?
                                            <div className="logo">
                                                <GatsbyImage 
                                                    image={logo} 
                                                    alt=""
                                                />
                                            </div>
                                        : 
                                            <div class="card-text">
                                                <h5>{title}</h5>
                                            </div>
                                }
                                { 
                                    ( poster ) ? 
                                        <GatsbyImage 
                                            image={poster} 
                                            className="card-img-top poster"
                                            alt=""
                                        />
                                    : 
                                        ( background ) ? 
                                            <GatsbyImage 
                                                image={background} 
                                                className="card-img-top background"
                                                alt=""
                                            />
                                        :
                                            <div className="card-img-top no-poster gatsby-image-wrapper"></div>
                                }
                            </div>

                        </Link>
                    </div>
                    
            </div>
    )
}