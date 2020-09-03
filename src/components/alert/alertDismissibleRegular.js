import React, { useState } from "react"
import {Alert, Container} from "react-bootstrap"

export default function AlertDismissibleRegular(props) {
    const [show, setShow] = useState(true);

    if (show) {
        return (
            <Container className={`${props.className}`}>
                <Alert className={""} variant="danger" onClose={() => setShow(false)} dismissible>
                        <Alert.Heading>{props.title}</Alert.Heading>
                        <p>{props.content}</p>
                </Alert>
            </Container>
        )
    }
    else {
        return (
            <></>
        )
    }

}