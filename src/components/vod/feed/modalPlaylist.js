// Dependencies
import React, { useState } from 'react'
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next"
import { faList } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// Styles
import './modalPlaylist.scss'

export default function ModalPlaylist ( { children, className } ) {

    /* Standard fields */
    const { t } = useTranslation()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <div className={`${ (className) ? className : ''}`}>

            <a 
                className='btn btn--light-no-outline'
                onClick={handleShow}
            >
                <FontAwesomeIcon icon={faList} size="md" /> {t('global.watch.playlist')} 
            </a>

            <Modal 
                className={'modalPlaylist'}
                show={show} 
                onHide={handleClose}
                backdrop={false}
                animation={false}
            >

                <Modal.Header 
                    closeButton
                    closeLabel={t('global.close')} 
                >
                </Modal.Header>

                <Modal.Body>
                    {children}
                </Modal.Body>

            </Modal>
        </div>
    )
}