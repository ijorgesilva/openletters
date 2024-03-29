import React, { useState } from "react"
import { Modal, Button } from 'react-bootstrap'

export default function ModalBasic( {title, children, btnClassName, center, className, footer, text} ){
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const centered = (center) ? "contained-modal-title-vcenter" : undefined

    return (
        <>
            <a className={`${btnClassName}`} onClick={handleShow}>
                {text}
            </a>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                aria-labelledby={centered}
                className={className}
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">{footer}</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
