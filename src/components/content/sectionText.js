import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'

import Background from '../UI/background'
import Buttons from '../buttons/buttons'
import RenderSection from '../renderSection'

import './sectionText.scss'

export default function SectionText ( { 
    title, 
    className, 
    id, 
    content, 
    containerWidth, 
    size,
    mode,
    campus,
    location,
    buttons, 
    media, 
    backgroundLayers,
    sections,
} ) {
    
    return (
        <section  id = {id} className = {`sectionText ${ size ? size : 'md' } ${ className ? className : ''} ${ mode ? mode : 'light' }`}>

            <div className={`columns ${ ( media?.sectionTextbasicMediaType ) ? 'two-columns' : 'one-column' }`}>
                <div className={`${ ( containerWidth ) ? containerWidth : 'container' }`}>

                    {
                        ( title || content || buttons?.length > 0 ) ?
                            <div className='general'>
                                {
                                    ( title ) ?
                                        <h2 className='title' dangerouslySetInnerHTML={{__html: title}}></h2>
                                    :
                                        undefined
                                }
            
                                { 
                                    ( content ) ?
                                        <div className='content' dangerouslySetInnerHTML={{__html: content}}></div>
                                    :
                                        undefined
                                }

                                {
                                    ( buttons?.length > 0 ) ?
                                        <Buttons 
                                            buttons     = { buttons }
                                            mode        = { mode }
                                        />
                                    :
                                        undefined
                                }
                            </div>
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
                                    mode        = { mode }
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
                            <div className={`media ${ ( media.sectionTextbasicMediaAlignment?.split(':')[0] ) ? media.sectionTextbasicMediaAlignment.split(':')[0] : '' }`}>
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
                layers  = { backgroundLayers }
            />

        </section>
    )
}