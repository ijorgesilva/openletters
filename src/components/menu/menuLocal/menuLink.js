// Dependencies
import React, {useState} from "react"
import { Link } from "gatsby"
import IframeResizer from "iframe-resizer-react"
import {  Nav, Modal } from "react-bootstrap"

// Components

export default function MenuLink(props){
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            {(function(){
                switch (props.type){
                    case 'button':
                        return (
                            <>
                                <div className={`menubutton`}>
                                    <Nav.Link
                                        className={`btn btn--animation btn--light-outline ${ (props.class) ? props.class : '' }`}  
                                        as={ (props.as === "link") ? Link : undefined }
                                        to={props.link}
                                        href={props.link}
                                        target={props.target}
                                        key={props.index} 
                                        dangerouslySetInnerHTML={{__html: props.name}} 
                                        activeClassName="active"
                                    />
                                </div>
                            </>
                        )
                    case 'iframe':
                        return (
                                <>
                                    <div className={`menucta`}>
                                        <Nav.Link
                                            as={ (props.as === "link") ? Link : undefined }
                                            className={`btn btn--animation btn--light-outline ${ (props.class) ? props.class : '' }`}  
                                            key={props.index} 
                                            onClick={handleShow} 
                                            target={props.target} 
                                            dangerouslySetInnerHTML={{__html: props.name}} 
                                            activeClassName="active"
                                        />
                                    </div>
                                    {
                                        (props.iframe) ?
                                            <Modal show={show} onHide={handleClose} animation={false}>
                                                <Modal.Header closeButton>
                                                <Modal.Title>{props.iframeTitle}</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <IframeResizer src={props.iframe} style={{minHeight: "600px", minWidth: '100%', width: '1px'}} frameborder="0"></IframeResizer>
                                                </Modal.Body>
                                            </Modal>
                                        : <></>
                                    }
                                </>
                            )
                    default:
                        return (
                                <Nav.Link 
                                    as={ (props.as === "link") ? Link : undefined } 
                                    key={props.index} target={props.target} 
                                    className={`navitems navmain ${ (props.class) ? props.class : '' }`} 
                                    to={props.link} dangerouslySetInnerHTML={{__html: props.name}} 
                                    href={props.link} 
                                />
                            )
                }
            })()}
        </>
    )
}