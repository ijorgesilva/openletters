import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'

import './blurbVerticalSeries.scss'

export default function BlurbVerticalSeries ( 
    { 
        title, className, link, iconImage, poster, background, logo, mode 
    } 
) {
    
    return (
        
            <div className={`blurbVerticalSeries card user-select-none ${ ( mode ) ? mode : 'light'} ${ ( className ) ? className : ''}`}>
                
                    <div className={`card-img-container`}>
                        <Link to={link}>
                            {
                                iconImage ?
                                    <div className='card-icon'>
                                        <GatsbyImage 
                                            image={iconImage} 
                                            className='card-img-top'
                                            alt=''
                                        />
                                    </div>
                                : 
                                    undefined
                            }
    
                            <div className={`card-img-caption ${ ( poster ) ? 'poster' : 'background'}`} >
                                {
                                    poster ?
                                        <GatsbyImage 
                                            image={poster} 
                                            className='card-img-top poster'
                                            alt=''
                                        />
                                    :
                                        background ?
                                            <>
                                                {
                                                    logo ?
                                                        <div className='logo'>
                                                            <GatsbyImage 
                                                                image={logo} 
                                                                alt=''
                                                            />
                                                        </div>
                                                    :
                                                        <div className='card-text'>
                                                            <h5>{title}</h5>
                                                        </div>

                                                }
                                                {
                                                    background ?
                                                        <GatsbyImage 
                                                            image={background} 
                                                            className='card-img-top background'
                                                            alt=''
                                                        />
                                                    : undefined
                                                }
                                            </>
                                        :
                                            <>
                                                <div className='card-text'>
                                                    <h5>{title}</h5>
                                                </div>
                                                <div className='card-img-top no-poster gatsby-image-wrapper'></div>
                                            </>
                                }

                            </div>

                        </Link>
                    </div>
                    
            </div>
    )
}