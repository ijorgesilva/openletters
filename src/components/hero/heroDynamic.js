
import React from 'react'
import { Container } from 'react-bootstrap'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'


import BlurbHorizontalDarkFeatured from '../blurb/blurbHorizontalDarkFeatured'
import './heroDynamic.scss'

export default function HeroDynamic ( 
    { 
        title, 
        subtitle, 
        backgroundPhoto, 
        id, 
        className, 
        buttons, 
        children, 
        related, 
        location, 
        mode, 
        width,
        size,
        overlay,
    } 
    ) {

    return (

        <div id={id} className={`heroDynamic hero ${ mode ? mode : 'light' } ${ size ? size : 'md' } ${ className ? className : '' }`}>

            <Container className={'z-index-2'} fluid = { width === 'container' ? true : false }>
                <div className='content align-items-center'>
                    <div>
                        <h1 className='display-1 text-uppercase text-white' dangerouslySetInnerHTML={{__html: title}}></h1>
                        <h5 className='text-white mt-4 mb-3' dangerouslySetInnerHTML={{__html: subtitle}}></h5>
                        
                        {
                            ( buttons ) ?
                                <div className='buttons mt-3'>
                                    {
                                        buttons.map( (button, index) => (
                                            ( button.sectionHeroButtonType === 'internal' && button.sectionHeroButtonLink) ?
                                                    <Link 
                                                        index       = {index}
                                                        className   = 'btn btn-primary btn-lg' 
                                                        to          = {button.sectionHeroButtonLink} 
                                                        target      = {button.sectionHeroButtonTarget}
                                                    >
                                                        {button.sectionHeroButtonText}
                                                    </Link>
                                                :
                                                    <a 
                                                        index       = {index}
                                                        className   = 'btn btn-primary btn-lg' 
                                                        href        = {button.sectionHeroButtonUrl} 
                                                        target      = {button.sectionHeroButtonTarget}
                                                    >
                                                        {button.sectionHeroButtonText}
                                                    </a>
                                            )
                                        )
                                    }
                                </div>
                            :
                                undefined
                        }

                        {
                            ( related ) ? 
                                <div className='related'>
                                    <BlurbHorizontalDarkFeatured 
                                        type            = { related.type }
                                        title           = { related.title }
                                        excerpt         = { related.excerpt }
                                        subtitle        = { ( related.subtitle ) ? related.subtitle : undefined }
                                        link            = { related.url }
                                        featuredImage   = { related.featuredImage }
                                        className       = { 'mt-5' }
                                        tag             = { related.tag }
                                        tagClassName    = { related.tagClassName }
                                        eventDates       = { ( related.eventDates.length > 0 ) ? related.eventDates : undefined }
                                    />
                                </div>
                            :
                                undefined
                        }

                        {
                            ( children ) ?
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
                <GatsbyImage 
                    image     = {backgroundPhoto}
                    className = 'card-img-top'
                    height    = '100%'
                />
            </div>

        </div>

    )
}