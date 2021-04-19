// Dependencies
import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import TextTruncate from 'react-text-truncate'
import { useTranslation } from "react-i18next"

// Components

// Utils
import { getDate } from '../../components/utils/utils'

// Styles
import './blurbHorizontal.scss'

export default function BlurbHorizontal( { 
        type,
        title, subtitle, keyIndex, featuredImage, className, noImage, link, tag, tags, tagClassName, excerpt,
        eventDate } 
    ) {

    /* Standard fields */
    const { t } = useTranslation()

    const image = (featuredImage) ? featuredImage : (noImage) ? noImage : undefined
    const tagClass = (tagClassName) ? tagClassName : ""
    const tagsCounter = (tags) ? tags.nodes.length : 0

    switch(type){

        case 'event':
            console.log(eventDate)
            let eventExpired  = false
            const firstDate     =   (eventDate[0].eventDate ) ? 
                                            getDate(eventDate[0].eventDate,2,'us','LLLL d, yyyy' ) 
                                    : 
                                        undefined
            const firstTime     =   eventDate[0].eventTime
            let today         = new Date();
                                        
            if( today > eventDate[0].eventDate ) {
                eventExpired = true
            }
            console.log('Event Expired? ' + eventExpired)

            return (
                <div 
                    key={(keyIndex) ? keyIndex : undefined} 
                    className={`card blurbHorizontal ${(className) ? className : ''} ${ (eventExpired) ? 'expired' : '' }`} 
                    title={title}
                >
                    <Link to={link}>
        
                        <div className="card-img position-relative">
                            <GatsbyImage 
                                image           = {image}
                                className       = 'card-img-top' 
                                height          = '100%' 
                                alt             = {title} 
                            />
                        </div>

                        <div className="card-body">
                            <div>
                                {
                                    (firstDate) ? 
                                        <time className="card-subtitle date" datetime={firstDate}>
                                            { (eventExpired) ? '(' + t('global.events.expired') + ') ' : '' } 
                                            { firstDate } 
                                            { (firstTime) ? ' | ' + firstTime : '' }
                                        </time>
                                    : 
                                        undefined
                                }
                                <h5 className="card-title h-color-one mt-2">
                                    {title}
                                </h5>
                                <p className="card-text">
                                    {
                                        (excerpt) ? 
                                            <TextTruncate line={1} truncateText="…" text={excerpt.replace(/<p>/, '').replace(/<\/p>/, '')} /> 
                                        : 
                                            undefined
                                    }
                                </p>
                            </div>
                            {
                                ( tagsCounter > 0 || tag ) ?
                                    <div className="tags">
                                        {
                                            ( tag ) ?
                                                <div className={`badge badge-pill badge-image ${tagClass}`} dangerouslySetInnerHTML={{__html: tag}}></div>
                                            :
                                                undefined
                                        }
                                        {
                                            ( tagsCounter > 0 ) ?
                                                tags.nodes.map( ( obj, index ) => (
                                                    (index < 3) ?
                                                        <div key={index} className={`badge badge-pill badge-image ${tagClass}`}>
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
        default:
            return (
                <div 
                    key={(keyIndex) ? keyIndex : undefined} 
                    className={`card blurbHorizontal ${(className) ? className : ''}`} 
                    title={title}
                >
                    
                    <Link to={link}>
        
                        <div className="card-img position-relative">
                            <GatsbyImage 
                                image={image}
                                className='card-img-top'
                                height='100%'
                                alt=""
                            />
                        </div>
                        
                        <div className="card-body">
        
                            <div>
                                {
                                    (subtitle) ? 
                                        <h6 className="card-subtitle">
                                            {subtitle}
                                        </h6> 
                                    : 
                                        undefined
                                }
                                <h5 className="card-title h-color-one mt-2">
                                    {title}
                                </h5>
                                <p className="card-text">
                                    {
                                        (excerpt) ? 
                                            <TextTruncate line={1} truncateText="…" text={excerpt.replace(/<p>/, '').replace(/<\/p>/, '')} /> 
                                        : 
                                            undefined
                                    }
                                </p>
                            </div>
        
                            {
                                ( tagsCounter > 0 || tag ) ?
                                    <div className="tags">
                                        {
                                            ( tag ) ?
                                                <div className={`badge badge-pill badge-image ${tagClass}`} dangerouslySetInnerHTML={{__html: tag}}></div>
                                            :
                                                undefined
                                        }
                                        {
                                            ( tagsCounter > 0 ) ?
                                                tags.nodes.map( ( obj, index ) => (
                                                    (index < 3) ?
                                                        <div key={index} className={`badge badge-pill badge-image ${tagClass}`}>
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

    }
}