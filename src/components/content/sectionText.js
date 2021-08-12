// Dependencies
import React from "react"
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

// Components
import Background from '../UI/background'
import Buttons from "../buttons/buttons"
import RenderSection from '../renderSection'

// Styles
import "./sectionText.scss"

export default function SectionText ( { 
    title, 
    className, 
    id, 
    content, 
    containerWidth, 
    variant,
    campus,
    location,
    buttons, 
    media, 
    backgroundLayers,
    sections,
} ) {
    
    return (
        <section 
            id          = {id}
            className   = {`sectionText ${ (className) ? className : ''} ${ (variant) ? variant : 'light' }`}
        >
            <div className={`columns ${ ( media?.sectionTextbasicMediaType ) ? 'two-columns' : 'one-column' }`}>
                <div className={`${ ( containerWidth ) ? containerWidth : 'container' }`}>

                    {
                        ( title ) ?
                            <h2 className='title'
                                dangerouslySetInnerHTML={{__html: title}}
                            ></h2>
                        :
                            undefined
                    }
                    
                    {
                        ( content ) ?
                            <div className='content'
                                dangerouslySetInnerHTML={{__html: content}}
                            ></div>
                        :
                            undefined
                    }

                    {
                        ( buttons?.length > 0 ) ?
                            <Buttons 
                                buttons   = { buttons }
                            />
                        :
                            undefined
                    }

                    {
                        ( sections?.length > 0 ) ?
                            sections.map( ( section, index ) => (
                                <RenderSection 
                                    key         = { index }
                                    section     = { section }
                                    campus      = { campus }
                                    filter      = { { campus: campus } }
                                    location    = { location }
                                    className   = { 'nested' }
                                />
                            ))
                        :
                            undefined
                    }

                </div>

                {
                    ( media?.sectionTextbasicMediaType ) ? 
                        ( media?.sectionTextbasicMediaPhoto?.localFile ) ?
                            <div className={`media ${ ( media.sectionTextbasicMediaAlignment?.split(":")[0] ) ? media.sectionTextbasicMediaAlignment.split(":")[0] : '' }`}>
                                <GatsbyImage 
                                    image           = { media.sectionTextbasicMediaPhoto.localFile.childImageSharp.gatsbyImageData }
                                    height          = '100%'
                                />
                            </div>
                        :
                            undefined
                    :
                        undefined
                }
                
            </div>

            <Background
                layers  = { backgroundLayers?.reverse() }
            />

        </section>
    )
}