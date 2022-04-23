import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { Container } from 'react-bootstrap'

import BlurbHorizontalDarkFeatured from '../../blurb/blurbHorizontalDarkFeatured'
import Background from '../../UI/background'

import HeroButtons from './heroButtons.js'
import './heroDynamic.scss'

export default function HeroDynamic ( 
    { 
        title,
        titleClassName,
        subtitle,
        textAlignment,
        backgroundPhoto,
        id,
        className,
        buttons,
        children, 
        related,
        mode,
        width,
        size,
        overlay,
        backgroundLayers,
    } 
    ) {

    return (

        <div id = {id} className = {`heroDynamic hero ${ mode ? mode : 'light' } ${ size ? size : 'md' } ${ className ? className : '' }`}>

            <Container className={'z-index-2'} fluid = { width === 'container' ? true : undefined }>
                <div className={`content ${ textAlignment ? 'align-items-'+textAlignment : 'align-items-center'}`}>
                    <div>
                        <h1 className={`${ mode === 'dark' ? 'text-white' : 'text-black'} ${ titleClassName ? titleClassName : ''}`} dangerouslySetInnerHTML={{__html: title}}></h1>
                        <h5 className={`mt-2 ${ mode === 'dark' ? 'text-white' : 'text-black'}`} dangerouslySetInnerHTML={{__html: subtitle}}></h5>
                        
                        {
                            buttons?.length >= 0 ?
                                <div className='buttons'>
                                    { 
                                        buttons?.map( ( _ , index ) => (
                                            <HeroButtons button = { _ } key = {index} />
                                        ))
                                    }
                                </div>
                            : undefined
                        }

                        {
                            related ? 
                                <div className='related'>
                                    <BlurbHorizontalDarkFeatured 
                                        type            = { related.type }
                                        title           = { related.title }
                                        excerpt         = { related.excerpt }
                                        subtitle        = { related.subtitle ? related.subtitle : undefined }
                                        link            = { related.url }
                                        featuredImage   = { related.featuredImage }
                                        className       = { 'mt-5' }
                                        tag             = { related.tag }
                                        tagClassName    = { related.tagClassName }
                                        eventDates       = { ( related.eventDates?.length > 0 ) ? related.eventDates : undefined }
                                    />
                                </div>
                            :
                                undefined
                        }

                        {
                            children ?
                                <div className='children'>
                                    {children}
                                </div>
                            :
                                undefined
                        }

                    </div>
                </div>
            </Container>

            <div className={`background noselect z-index-1 ${ overlay ? 'overlay' : ''}`}>
                {
                    backgroundPhoto ?
                        <GatsbyImage 
                            image     = {backgroundPhoto}
                            className = 'card-img-top'
                            height    = '100%'
                            alt = ''
                        />
                    : undefined
                }
                <Background
                    layers  = { backgroundLayers }
                />

            </div>

        </div>

    )
}