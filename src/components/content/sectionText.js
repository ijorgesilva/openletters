import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { Container } from 'react-bootstrap'

import AdvancedButton from '../buttons/advanced'
import RenderSection from '../renderSection'
import Background from '../UI/background'

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
            
            <div className={`columns ${ media?.sectionTextbasicMediaType ? 'two-columns' : 'one-column' }`}>
                <Container fluid = { containerWidth === 'container' ? undefined : true }>
                    {
                        ( title || content || buttons?.length > 0 || sections?.length > 0 ) ?
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
                                    buttons?.length >= 0 ?
                                        <div className='buttons'>
                                            { 
                                                buttons?.map( ( _ , index ) => (
                                                    <AdvancedButton 
                                                        button = { _ } 
                                                        key    = {index}
                                                    />
                                                ))
                                            }
                                        </div>
                                    : undefined
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
                        :
                            undefined
                    }
                </Container>

                {
                    ( media?.sectionTextbasicMediaType ) ? 
                        ( media?.sectionTextbasicMediaPhoto?.localFile ) ?
                            <div className={`media ${ ( media.sectionTextbasicMediaAlignment?.split(':')[0] ) ? media.sectionTextbasicMediaAlignment.split(':')[0] : '' }`}>
                                <GatsbyImage 
                                    image           = { media.sectionTextbasicMediaPhoto.localFile.childImageSharp.gatsbyImageData }
                                    height          = '100%'
                                    alt             = ''
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