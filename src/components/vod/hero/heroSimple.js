// Dependencies
import React from 'react'
import { Link } from 'gatsby'
import { Jumbotron } from 'react-bootstrap'
import TextTruncate from 'react-text-truncate'
import Img from 'gatsby-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo, faPlay } from '@fortawesome/fontawesome-free-solid'

// Components
import './heroSimple.scss'

export default function HeroSimple( { backgroundImage, className, id, iconSerie, iconSerieLink, iconSerieTitle, playUrl, title, serieLinkText, description, playText, iconPlay } ) {

    const styleBackground = {
        backgroundImage: "url(" + backgroundImage + ")"
    }

    return (
        <section className={`heroSimple${ (className) ? ' ' + className : '' }`} id={id}>
            <Jumbotron className="">

                <div className="content-container fluid">

                    <div className="content">
                        {
                            (iconSerie && iconSerieLink) ?
                                <Link to={`${iconSerieLink}`}>
                                    <div className="position-relative z-index-2 iconSerie mb-4">
                                        <Img fluid={iconSerie} objectFit="contain" objectPosition="left center" alt={iconSerieTitle}/>
                                    </div>
                                </Link>
                            : 
                                (iconSerieTitle && iconSerieLink) ?
                                    <Link to={`${iconSerieLink}`}>
                                        <div className="position-relative z-index-2 mb-1">
                                            <h1 className="display-1">{iconSerieTitle}</h1>
                                        </div>
                                    </Link>
                                : undefined
                        }
                        
                        <h1 className="position-relative z-index-2">
                            <Link className="" to={playUrl}>
                                {title}
                            </Link>
                        </h1>
                        
                        {
                            (description) ? <TextTruncate className="position-relative z-index-2" line={2} element="p" truncateText="…" text={description.replace(/<p>/, '').replace(/<\/p>/, '')} /> 
                            : <></>
                        }

                        <div className="buttons">
                            <Link to={playUrl} className="btn btn--animation btn--light-outline z-index-2" >
                                <FontAwesomeIcon icon={faPlay} size="lg" /> {playText}
                            </Link>
                            {
                                (iconSerieLink) ?
                                    <Link to={iconSerieLink} className="btn btn--animation btn--light-outline z-index-2" >
                                        <FontAwesomeIcon icon={faInfo} className="mr-2"/>{serieLinkText}
                                    </Link>
                                : undefined
                            }
                        </div>
                    </div>

                        
                </div>
                
                <div className="z-index-1 heroBackground" style={styleBackground}>
                    {
                        (iconPlay) ?
                            <div className="z-index-2 heroBackgroundIcon">
                                <Link className="" to={playUrl}>
                                        <img src={iconPlay} alt=""/>
                                </Link>
                            </div>
                        : 
                            undefined
                    }
                </div>
                
            </Jumbotron>

        </section>
    )

}