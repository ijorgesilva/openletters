import { Link } from 'gatsby'
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

import VideoReactPlayer from '../../vod/player/videoReactPlayer'
import Html from '../../widget/html'

export default function HeroButtons ( { button } ) {

    let buttonType = null;
    switch(button.sectionHeroButtonType) {
        case 'internal':
            buttonType = <InternalButton button = {button} />
            break
        case 'external':
            buttonType = <ExternalButton button = {button} />
            break
        case 'modal':
            buttonType = <ModalButton button = {button} />
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

function InternalButton( { button } ){

    return (
        <Link
            className   = { `${ button.sectionHeroButtonCssRemoveDefault ? '' : 'btn btn-primary btn-lg' } ${ button.sectionHeroButtonCss ? button.sectionHeroButtonCss : '' }` }
            to          = { button.sectionHeroButtonLink }  
            target      = { button.sectionHeroButtonTarget }
        >
            {button.sectionHeroButtonText}
        </Link>
    )
}

function ExternalButton( { button } ) {
    return (
        <a 
            className   = { `${ button.sectionHeroButtonCssRemoveDefault ? '' : 'btn btn-primary btn-lg' } ${ button.sectionHeroButtonCss ? button.sectionHeroButtonCss : '' }` }
            href        = { button.sectionHeroButtonUrl }  
            target      = { button.sectionHeroButtonTarget }
        >
            {button.sectionHeroButtonText}
        </a>
    )
}

function ModalButton( { button } ) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const modalInfo = button.sectionHeroButtonModal
    console.log(button.sectionHeroButtonModal)
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
                className = { `${ button.sectionHeroButtonCssRemoveDefault ? '' : 'btn btn-primary btn-lg' } ${ button.sectionHeroButtonCss ? button.sectionHeroButtonCss : '' }` }
            >
                { button.sectionHeroButtonText }
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