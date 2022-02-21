import IframeResizer from 'iframe-resizer-react'
import React from 'react'
import './formSelector.scss'
import { Container, Row, Col } from 'react-bootstrap'

import Background from '../UI/background'

export default function FormSelector ( 
    {
        type,
        formIframe,
        form,
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

    const iframeServerRoot = process.env.WP_SERVER ? process.env.WP_SERVER : 'https://editor.victorychur.ch'

    const iframeFormUrl = iframeQueryStrings ? 
                            iframeServerRoot + form.uri + iframeQueryStrings
                        : 
                            `${iframeServerRoot}${form.uri}?timestap=${Date.now()}&classname=${jumbotronMode ? jumbotronMode : 'light'}-primary&origin=${form.title.split(' ').join('_')}`

    switch ( true ){
        /*
        * Single Column
        */
        case type === 'onecolumn': {
            return (
                <div className = {`formSelector ${ jumbotronPadding ? jumbotronPadding : ''} ${ jumbotron ? 'jumbotron' : ''} ${ jumbotronFluid ? 'jumbotron-fluid' : ''} ${containerClass ? containerClass : ''}`}>
                    <Container>
                        {
                            formIframe ?
                                <IframeResizer 
                                    src         = { iframeFormUrl }
                                    style       = {{minHeight: '600px', minWidth: '100%', width: '1px'}} 
                                    frameborder = '0'
                                    allowtransparency
                                />
                            : undefined
                        }
                    </Container>
                </div>
            )
        }

        /*
        * Two Columns
        */
        case type === 'twocolumns': {
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
                            <Col className = {`primary-column ${ jumbotronMode === 'dark' ? 'bg-dark' : 'bg-light'}`}>
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
                                    formIframe ?
                                        <IframeResizer 
                                            src         = { iframeFormUrl } 
                                            style       = {{minHeight: '600px', minWidth: '100%', width: '1px'}}
                                            frameborder = '0' 
                                            allowtransparency
                                        />
                                    : undefined
                                }
                            </Col>
                        </Row>
                    </Container>
                </div>
            )
        }

        /*
        * Default
        */
        default:{
            return (
                <></>
            )
        }
    }
}