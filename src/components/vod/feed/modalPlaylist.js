import { faList } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from 'react'
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next"

import './modalPlaylist.scss'

export default function ModalPlaylist ( 
    { 
        children, 
        className,
        mode,
    }
    ) {
    
    const { t } = useTranslation()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <div className={`modalPlaylist ${ mode ? mode : 'light'} ${ className ? className : ''}`}>

            <a className={`btn ${ mode ? 'btn-'+mode : 'btn-light' }`} onClick={handleShow}>
                <FontAwesomeIcon icon={faList} size="md" /> {t('global.watch.playlist')} 
            </a>

            <Modal 
                className   = { `modalPlaylist ${ mode ? mode : 'light'} ${ className ? className : ''}` }
                show        = { show }
                onHide      = { handleClose }
                backdrop    = { false }
                animation   = { false }
            >
                <Modal.Header 
                    closeLabel  = {t('global.close')} 
                    closeButton
                />

                <Modal.Body>
                    {children}
                </Modal.Body>

            </Modal>
        </div>
    )
}