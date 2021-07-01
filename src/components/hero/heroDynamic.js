// Dependencies
import React from "react"
import { Container } from "react-bootstrap"
import { GatsbyImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'

// Components
import BlurbHorizontalDarkFeatured from '../blurb/blurbHorizontalDarkFeatured'
import "./heroDynamic.scss"

export default function HeroDynamic ( { title, subtitle, backgroundPhoto, className, buttons, children, related, location } ) {

    return (

        <div className={`heroDynamic ${className}`}>

            <Container className={"z-index-2"}>
                <div className="content align-items-center">
                    <div>
                        <h1 className="display-1 text-uppercase text-white" dangerouslySetInnerHTML={{__html: title}}></h1>
                        <h5 className="text-white mt-4 mb-3" dangerouslySetInnerHTML={{__html: subtitle}}></h5>
                        
                        {
                            ( buttons ) ?
                                <div className="buttons mt-3">
                                    {
                                        buttons.map( (button, index) => (
                                            ( button.sectionHeroButtonType === 'internal' && button.sectionHeroButtonLink) ?
                                                    <Link 
                                                        index       = {index}
                                                        className   = "btn btn--animation btn--three" 
                                                        to          = {button.sectionHeroButtonLink} 
                                                        target      = {button.sectionHeroButtonTarget}
                                                    >
                                                        {button.sectionHeroButtonText}
                                                    </Link>
                                                :
                                                    <a 
                                                        index       = {index}
                                                        className   = "btn btn--animation btn--three" 
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
                                <div className="related">
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
                                <div className="children">
                                    {children}
                                </div>
                            :
                                undefined
                        }

                    </div>
                </div>
            </Container>

            <div className="background noselect z-index-1">
                <GatsbyImage 
                    image           = {backgroundPhoto}
                    height          = '100%'
                />
            </div>

        </div>

    )
}