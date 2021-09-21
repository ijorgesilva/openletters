import React, { useState } from "react"
import { Alert, Container } from "react-bootstrap"

export default function AlertDismissibleBar(props) {
    const [show, setShow] = useState(true);

    if (show) {
        return (
            <div className={`alertdismissiblebar ${props.className}`}>
                <Container>
                    <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                            <strong>{props.title}</strong> {props.content} <a href={props.linkUrl} onClick={props.handler} target={props.linkTarget} >{props.link}</a>
                    </Alert>
                </Container>
            </div>
        )
    }
    else {
        return (
            <></>
        )
    }

}