// Dependencies
import React from "react"
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import TextTruncate from 'react-text-truncate'
import { useTranslation } from 'react-i18next'

// Utils
import { getDate } from '../../components/utils/utils'

// Style
import './blurbHorizontalDarkFeatured.scss'

export default function BlurbHorizontalDarkFeatured( 
    {   type,
        title, subtitle, keyIndex, featuredImage, className, link, tag, tags, tagClassName, excerpt,
        eventDates
    } ) {

    /* Standard fields */
    const { t } = useTranslation()

    const tagClass = (tagClassName) ? tagClassName : ""
    const tagsCounter = (tags) ? tags.nodes.length : 0

    switch(type){

        case 'event':
            
            let eventExpired    = false
            const firstDate     =   (eventDates[0].eventDate ) ? 
                                            getDate(eventDates[0].eventDate,2,'us','LLLL d, yyyy' ) 
                                    : 
                                        undefined
            const firstTime     =   eventDates[0].eventTime
            let today           = new Date();
                                        
            if( today > eventDates[0].eventDate ) {
                eventExpired = true
            }

            return (
                <div 
                    key={(keyIndex) ? keyIndex : undefined} 
                    className={`blurbHorizontalDarkFeatured card ${ (className) ? className : ''}`} 
                    title={title}
                >
                    
                    <Link to={link}>
        
                        <div className="card-img position-relative">
                            { 
                                ( featuredImage ) ? 
                                    <GatsbyImage 
                                        image           = {featuredImage}
                                        layout          = "fullWidth"
                                        className       = "card-img-left"
                                        alt             = {title} 
                                    />
                                : 
                                    undefined
                            }
                        </div>
                        
                        <div className="card-body">
                            <div>
                                {
                                    (firstDate) ? 
                                        <time className="card-subtitle date" datetime={firstDate}>
                                            <strong>{ (eventExpired) ? '' + t('global.events.expired') + ' | ' : '' }</strong>
                                            { firstDate } 
                                            { (firstTime) ? ' | ' + firstTime : '' }
                                        </time>
                                    : 
                                        undefined
                                }
                                {
                                    ( subtitle ) ? 
                                        <h6 className="card-subtitle">
                                            {subtitle}
                                        </h6> 
                                    : 
                                        undefined
                                }
                                {
                                    ( title ) ?
                                        <h5 className="card-title h-color-one mt-2">
                                            {title}
                                        </h5>
                                    :
                                        undefined
                                }
                                {
                                    ( excerpt ) ? 
                                        <p className="card-text">
                                            <TextTruncate line={1} truncateText="…" text={excerpt.replace(/<p>/, '').replace(/<\/p>/, '')} /> 
                                        </p>
                                    : 
                                        undefined
                                }
                            </div>
                            {
                                ( tagsCounter > 0 || tag ) ?
                                    <div className="tags">
                                        {
                                            ( tag ) ?
                                                <div className={`badge badge-pill badge-image ${(tagClass) ? tagClass : ''}`} dangerouslySetInnerHTML={{__html: tag}}></div>
                                            :
                                                undefined
                                        }
                                        {
                                            ( tagsCounter > 0 ) ?
                                                tags.nodes.map( ( obj, index ) => (
                                                    (index < 3) ?
                                                        <div key={index} className={`badge badge-pill badge-image ${(tagClass) ? tagClass : ''}`}>
                                                            {obj.name}
                                                        </div>
                                                    :
                                                        undefined
        
                                                ))
                                            :
                                                undefined
                                        }
                                    </div>
                                :
                                    undefined
                            }
                        </div>
        
                    </Link>
        
                </div>
            )
        break
        
        default: 
            return (
                <div 
                    key={(keyIndex) ? keyIndex : undefined} 
                    className={`blurbHorizontalDarkFeatured card ${ (className) ? className : ''}`} 
                    title={title}
                >
                    
                    <Link to={link}>
        
                        <div className="card-img position-relative">
                            { 
                                ( featuredImage ) ? 
                                    <GatsbyImage 
                                        image           = {featuredImage}
                                        layout          = "fullWidth"
                                        className       = "card-img-left"
                                        alt             = {title} 
                                    />
                                : 
                                    undefined
                            }
                        </div>
                        
                        <div className="card-body">
                            <div>
                                {
                                    ( subtitle ) ? 
                                        <h6 className="card-subtitle">
                                            {subtitle}
                                        </h6> 
                                    : 
                                        undefined
                                }
                                {
                                    ( title ) ?
                                        <h5 className="card-title h-color-one mt-2">
                                            {title}
                                        </h5>
                                    :
                                        undefined
                                }
                                {
                                    ( excerpt ) ? 
                                        <p className="card-text">
                                            <TextTruncate line={1} truncateText="…" text={excerpt.replace(/<p>/, '').replace(/<\/p>/, '')} /> 
                                        </p>
                                    : 
                                        undefined
                                }
                            </div>
                            {
                                ( tagsCounter > 0 || tag ) ?
                                    <div className="tags">
                                        {
                                            ( tag ) ?
                                                <div className={`badge badge-pill badge-image ${(tagClass) ? tagClass : ''}`} dangerouslySetInnerHTML={{__html: tag}}></div>
                                            :
                                                undefined
                                        }
                                        {
                                            ( tagsCounter > 0 ) ?
                                                tags.nodes.map( ( obj, index ) => (
                                                    (index < 3) ?
                                                        <div key={index} className={`badge badge-pill badge-image ${(tagClass) ? tagClass : ''}`}>
                                                            {obj.name}
                                                        </div>
                                                    :
                                                        undefined
        
                                                ))
                                            :
                                                undefined
                                        }
                                    </div>
                                :
                                    undefined
                            }
                        </div>
        
                    </Link>
        
                </div>
            )
        break
    }

}
