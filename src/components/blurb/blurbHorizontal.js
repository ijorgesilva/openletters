import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { DateTime } from 'luxon'
import React from 'react'
import { useTranslation } from 'react-i18next'
import TextTruncate from 'react-text-truncate'

import { getDate } from '../../components/utils/utils'

import './blurbHorizontal.scss'

export default function BlurbHorizontal( 
    { 
        type,
        title, 
        subtitle, 
        keyIndex, 
        featuredImage, 
        className, 
        link, 
        tag, 
        tags, 
        tagClassName, 
        excerpt,
        eventDate,
        mode,
    } 
    ) {

    const { t } = useTranslation()

    const image = featuredImage ? featuredImage : undefined
    const tagClass = tagClassName ? tagClassName : ''
    const tagsCounter = tags ? tags.nodes.length : 0

    switch(type){

        case 'event': {
            
            let eventExpired    = false
            const firstDate     =   eventDate[0].eventDate  ? 
                                            getDate(eventDate[0].eventDate,2,'us','LLLL d, yyyy' ) 
                                    : 
                                        undefined
            const firstTime     =   eventDate[0].eventTime
            let today           = new Date()
                                        
            if( DateTime.fromJSDate(today) > DateTime.fromISO(eventDate[0].eventDate) ) {
                eventExpired = true
            }

            return (
                <div 
                    key         = { keyIndex ? keyIndex : undefined } 
                    className   = {`card blurbHorizontal ${ mode ? mode : 'light' } ${ className ? className : '' } ${ eventExpired ? 'expired' : '' }`} 
                    title       = {title}
                >
                    <Link to = { link }>
        
                        {
                            image ? 
                                <div className='card-img position-relative'>
                                    <GatsbyImage 
                                        image           = {image}
                                        className       = 'card-img-top' 
                                        height          = '100%' 
                                        alt             = {title} 
                                    />
                                </div>
                            : undefined
                        }

                        <div className='card-body'>
                            <div>
                                {
                                    firstDate ? 
                                        <time 
                                            className   = 'card-subtitle date mb-1' 
                                            dateTime    = {firstDate}
                                        >
                                            <strong>{ eventExpired ? '' + t('global.events.expired') + ' | ' : '' }</strong>
                                            { firstDate } 
                                            { firstTime ? ' | ' + firstTime : '' }
                                        </time>
                                    : 
                                        undefined
                                }
                                <h5 className='card-title'>
                                    {title}
                                </h5>
                                <p className='card-text'>
                                    {
                                        excerpt ? 
                                            <TextTruncate line={1} truncateText='…' text={excerpt.replace(/<p>/, '').replace(/<\/p>/, '')} /> 
                                        : 
                                            undefined
                                    }
                                </p>
                            </div>
                            {
                                ( tagsCounter > 0 || tag ) ?
                                    <div className='tags'>
                                        {
                                            ( tag ) ?
                                                <div className={`badge badge-pill badge-image ${ tagClass ? tagClass : '' }`} dangerouslySetInnerHTML={{__html: tag}}></div>
                                            :
                                                undefined
                                        }
                                        {
                                            ( tagsCounter > 0 ) ?
                                                tags.nodes.map( ( obj, index ) => (
                                                    (index < 3) ?
                                                        <div key={index} className={`badge badge-pill badge-image ${ tagClass ? tagClass : '' }`}>
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
        default: {
            return (
                <div 
                    key         = { keyIndex ? keyIndex : undefined} 
                    className   = {`card blurbHorizontal ${ mode ? mode : 'light' } ${ className ? className : '' }`} 
                    title       = {title}
                >
                    
                    <Link to={link}>
        
                        {
                            image ?
                                <div className='card-img position-relative'>
                                    <GatsbyImage 
                                        image={image}
                                        className='card-img-top'
                                        height='100%'
                                        alt=''
                                    />
                                </div>
                            : undefined
                        }
                        
                        <div className='card-body'>
        
                            <div>
                                {
                                    subtitle ? 
                                        <h6 className='card-subtitle'>
                                            {subtitle}
                                        </h6> 
                                    : 
                                        undefined
                                }
                                <h5 className='card-title'>
                                    {title}
                                </h5>
                                <p className='card-text'>
                                    {
                                        excerpt ? 
                                            <TextTruncate line={1} truncateText='…' text={excerpt.replace(/<p>/, '').replace(/<\/p>/, '')} /> 
                                        : 
                                            undefined
                                    }
                                </p>
                            </div>
        
                            {
                                ( tagsCounter > 0 || tag ) ?
                                    <div className='tags'>
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
}