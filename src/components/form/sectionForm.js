import React from 'react'
import { Container } from 'react-bootstrap'
import './sectionForm.scss'

import Background from '../UI/background'

import FormSelector from './formSelector'

export default function SectionForm ( 
    {
        id, 
        className, 
        title, 
        content, 
        containerWidth, 
        mode, 
        size,
        sectionBackground,
        type,
        formIframe,
        form,
        location,
        containerClass,
        jumbotron,
        jumbotronMode,
        jumbotronPadding,
        jumbotronFluid,
        iframeQueryStrings,
        secondaryColumnText,
        secondaryColumnAlignment,
        secondaryColumnBackground,
    } 
    ) {
        
        return (
            <section id = {id} className = {`sectionForm ${ size ? size : ''} ${ className ? className : ''} ${ mode ? mode : 'light' }`}>

                <Container fluid = { containerWidth === 'container' ? undefined : true }>
                    {
                        ( title || content ) ?
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
                            </div>
                        :
                            undefined
                    }
                    <FormSelector
                        type                = { type }
                        formIframe          = { `${formIframe}` }
                        form                = { form }
                        location            = { location }
                        containerClass      = { containerClass }
                        jumbotron           = { jumbotron }
                        jumbotronMode       = { jumbotronMode === 'inherit' ? mode : jumbotronMode }
                        jumbotronPadding    = { jumbotronPadding }
                        jumbotronFluid      = { jumbotronFluid }
                        iframeQueryStrings          = { iframeQueryStrings }
                        secondaryColumnText         = { secondaryColumnText }
                        secondaryColumnAlignment    = { secondaryColumnAlignment }
                        secondaryColumnBackground   = { secondaryColumnBackground }
                    />
                </Container>

                <Background
                    layers      = { sectionBackground?.reverse() }
                />

            </section>
        )
}