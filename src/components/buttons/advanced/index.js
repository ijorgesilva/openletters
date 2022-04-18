import { Link } from 'gatsby'
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

import VideoReactPlayer from '../../vod/player/videoReactPlayer'
import Html from '../../widget/html'

import './index.scss'

export default function AdvancedButton ( { button, stretchedLink } ) {

    let buttonType = null;
    const buttonTypeParsed = button.buttonType.includes(':') ? button.buttonType.split(':')[0] : button.buttonType

    switch(buttonTypeParsed) {
        case 'internal':
            buttonType = <InternalButton button = {button} stretchedLink = {stretchedLink} />
            break
        case 'external':
            buttonType = <ExternalButton button = {button} stretchedLink = {stretchedLink} />
            break
        case 'modal':
            buttonType = <ModalButton button = {button} stretchedLink = {stretchedLink} />
            break
        default:
        buttonType = <></>
    }

    return (
        <>
            {buttonType}
        </>
    )

}

function InternalButton( { button, stretchedLink } ){
    return (
        <Link
            className   = { `${ button.buttonCssRemoveDefault ? '' : 'btn btn-primary' } ${ button.buttonCss ? button.buttonCss : '' } ${ stretchedLink ? 'stretched-link' : '' }` }
            to          = { button.buttonLink }  
            target      = { button.buttonTarget }
        >
            {button.buttonText}
        </Link>
    )
}

function ExternalButton( { button, stretchedLink } ) {
    return (
        <a 
            className   = { `${ button.buttonCssRemoveDefault ? '' : 'btn btn-primary' } ${ button.buttonCss ? button.buttonCss : '' } ${ stretchedLink ? 'stretched-link' : '' }` }
            href        = { button.buttonUrl }  
            target      = { button.buttonTarget }
        >
            {button.buttonText}
        </a>
    )
}

function ModalButton( { button, stretchedLink } ) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const modalInfo = button.buttonModal
    
    const heroModalCss = `
        .modal.heroModal > .modal-dialog{
            height: ${modalInfo.modalHeight}vh;
            width: ${modalInfo.modalWidth}vw;
            max-width: ${modalInfo.modalWidth}vw;
        }
    `

    return (
        <>
            <a  
                onClick={handleShow} 
                href    = { '#'}
                className = { `${ button.buttonCssRemoveDefault ? '' : 'btn btn-primary' } ${ button.buttonCss ? button.buttonCss : '' } ${ stretchedLink ? 'stretched-link' : '' }` }
            >
                { button.buttonText }
            </a>
            <Modal  
                show        = { show }
                onHide      = { handleClose }
                className   = {`heroModal ${ modalInfo.modalTransparent ? 'transparent' : '' } ${ modalInfo.modalTransparent ? 'frameless' : '' }`}
                centered
            >
                <Modal.Header closeButton>
                    {
                        modalInfo.modalTitle ? 
                            <Modal.Title>{modalInfo.modalTitle}</Modal.Title> 
                        : undefined
                    }
                </Modal.Header>
                <Modal.Body>
                    {
                        modalInfo.modalVideoUrl ? 
                            <VideoReactPlayer 
                                src = { modalInfo.modalVideoUrl } 
                                autoplay
                            />
                        : undefined
                    }
                    <Html code = {modalInfo.modalHtml} />
                </Modal.Body>
            </Modal>
            {
                heroModalCss ? 
                    <style>
                        {heroModalCss}
                    </style>
                : undefined
            }
        </>
    )
}