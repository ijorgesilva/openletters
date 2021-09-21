import React from 'react'
import IframeResizer from 'iframe-resizer-react'
import './formSelector.scss'

import Background from '../UI/background'

import config from '../../../data/SiteConfig'
import { Container, Row, Col } from 'react-bootstrap'

export default function FormSelector ( 
    {
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

    const queryString = iframeQueryStrings ? `${config.wordpressRootUri}${form.uri}${iframeQueryStrings}` : `${config.wordpressRootUri}${form.uri}?classname=${jumbotronMode ? jumbotronMode : 'light'}-primary&origin=${encodeURI(location.href)}`
    
    console.log(form)
    switch ( true ){
        /*
        * Single Column
        */
        case type === 'onecolumn':
            return (
                <div className = {`formSelector ${ jumbotronPadding ? jumbotronPadding : ''} ${ jumbotron ? 'jumbotron' : ''} ${ jumbotronFluid ? 'jumbotron-fluid' : ''} ${containerClass ? containerClass : ''}`}>
                    <Container>
                        {
                            (formIframe) ?
                                <IframeResizer 
                                    src         = { queryString }
                                    style       = {{minHeight: '600px', minWidth: '100%', width: '1px'}} 
                                    frameborder = '0'
                                    allowTransparency
                                />
                            : undefined
                        }
                    </Container>
                </div>
            )
            break

        /*
        * Two Columns
        */
        case type === 'twocolumns':
            return (
                <div 
                    className={`formSelector ${ jumbotronPadding ? jumbotronPadding : ''} ${ jumbotron ? 'jumbotron' : ''} ${ jumbotronFluid ? 'jumbotron-fluid' : ''} ${ jumbotronMode ? jumbotronMode : 'light' } ${ containerClass ? containerClass : ''}`}
                    fluid = { jumbotronFluid ? true : false }
                >
                    <Container>
                        <Row>
                            <Col className = {`secondary-column ${ secondaryColumnAlignment ? secondaryColumnAlignment : ''}`}>
                                <div className = 'support-text' 
                                    dangerouslySetInnerHTML={{__html: secondaryColumnText}}>
                                </div>

                                <Background
                                    layers      = { secondaryColumnBackground }
                                />
                            </Col>
                            <Col className = 'primary-column'>
                                {
                                    ( form.formDetails.formGeneral.formGeneralTitle || form.formDetails.formGeneral.formGeneralContent ) ?
                                        <div className = 'general-content'>
                                            {
                                                ( form.formDetails.formGeneral.formGeneralTitle ) ?
                                                    <h3 className='title' dangerouslySetInnerHTML={{__html: form.formDetails.formGeneral.formGeneralTitle}}></h3>
                                                :
                                                    undefined
                                            }
                                            { 
                                                ( form.formDetails.formGeneral.formGeneralContent ) ?
                                                    <div className='content' dangerouslySetInnerHTML={{__html: form.formDetails.formGeneral.formGeneralContent}}></div>
                                                :
                                                    undefined
                                            }
                                        </div>
                                    :
                                        undefined
                                }
                                {
                                    (formIframe) ?
                                        <IframeResizer 
                                            src         = { queryString } 
                                            style       = {{minHeight: '600px', minWidth: '100%', width: '1px'}}
                                            frameborder = '0' 
                                            allowTransparency
                                        />
                                    : undefined
                                }
                            </Col>
                        </Row>
                    </Container>
                </div>
            )
            break

        /*
        * Default
        */
        default:
            return (
                <></>
            )
            break
    }
}