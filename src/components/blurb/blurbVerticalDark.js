// Dependencies
import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import TextTruncate from 'react-text-truncate'

// Components
import './blurbVerticalDark.scss'

export default function BlurbVerticalDark (props) {

    return (
        
            <div className={`card card--video user-select-none ${props.className}`}>
                <Link to={props.link}>
                    <div className="card-img-container">
                        <div className="card-icon">
                            <img src={props.iconImage} alt=""/>
                        </div>
                        { 
                            (props.featuredImage) ? <Img className="card-img-top" fluid={props.featuredImage} alt="" />
                            : <Img className="card-img-top" fluid={props.noImage} alt="" />
                        }
                    </div>
                    <div className="card-body">
                        {
                            (props.title) ? <h5 className="card-title mb-1" dangerouslySetInnerHTML={{__html: props.title}}></h5>
                            : null
                        }
                        
                        {/* {
                            (props.subtitle) ? 
                                <h4 className="mb-1"> 
                                    {props.subtitle.map( ( sub, index ) => (
                                                <>
                                                    { (index) ? ', ': '' } <span key={index}> {sub.title} </span>
                                                </>
                                            )
                                        )
                                    }
                                </h4>
                            : undefined
                        } */}
                        
                        {
                            (props.excerpt) ? <TextTruncate line={2} element="p" truncateText="…" text={props.excerpt.replace(/<p>/, '').replace(/<\/p>/, '')} /> 
                            : <></>
                        }
                        
                    </div>
                </Link>
            </div>
    )
}