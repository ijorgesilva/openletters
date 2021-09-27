import React, {useState} from 'react'
import { Link } from 'gatsby'
import IframeResizer from 'iframe-resizer-react'
import {  Nav, Modal } from 'react-bootstrap'

export default function MenuLink( { type, className, link, target, index, name, iframe, iframeTitle, as, mode } ){
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            {(function(){
                switch ( type ) {
                    case 'button':
                        return (
                            <>
                                <div className={`menubutton`}>
                                    <Nav.Link
                                        className               = {`btn btn-outline-${ mode === 'light' ? 'dark' : mode === 'dark' ? 'light' : mode } ${ className ? className : '' }`}
                                        as                      = { (as === 'link') ? Link : undefined }
                                        to                      = {link}
                                        href                    = {link}
                                        target                  = {target}
                                        key                     = {index} 
                                        dangerouslySetInnerHTML = {{__html: name}} 
                                        activeClassName         = 'active'
                                    />
                                </div>
                            </>
                        )
                    case 'iframe':
                        return (
                                <>
                                    <div className={`menucta`}>
                                        <Nav.Link
                                            as                      = { as === 'link' ? Link : undefined }
                                            className               = {`btn btn-outline-${ mode === 'light' ? 'dark' : mode === 'dark' ? 'light' : mode } ${ className ? className : '' }`}  
                                            key                     = { index} 
                                            onClick                 = { handleShow } 
                                            target                  = { target } 
                                            dangerouslySetInnerHTML = {{__html: name}} 
                                            activeClassName         = 'active'
                                        />
                                    </div>
                                    {
                                        (iframe) ?
                                            <Modal show={show} onHide={handleClose} animation={false}>
                                                <Modal.Header closeButton>
                                                <Modal.Title>{iframeTitle}</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <IframeResizer 
                                                        src={iframe} 
                                                        style={{minHeight: '600px', minWidth: '100%', width: '1px'}} 
                                                        frameborder='0'
                                                    >
                                                    </IframeResizer>
                                                </Modal.Body>
                                            </Modal>
                                        : <></>
                                    }
                                </>
                            )
                    default:
                        return (
                                <Nav.Link 
                                    as                      = { as === 'link' ? Link : undefined } 
                                    key                     = {index} target={target} 
                                    className               = {`navitems navmain ${ className ? className : '' }`} 
                                    to                      = {link} 
                                    dangerouslySetInnerHTML = {{__html: name}} 
                                    href                    = {link} 
                                />
                            )
                }
            })()}
        </>
    )
}