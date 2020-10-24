// Dependencies
import React from 'react'
import { Nav } from 'react-bootstrap'

// Components
import './watchDetails.scss'

export default function WatchDetails ( {items, variant, className, activeKey, id, close, ...props} ) {

    const variantName = (variant) ? variant : "dark"

    return (
        <Nav className={`watchDetails ${className}`} variant={variantName} activeKey={activeKey} id={id}>

<Nav.Item className="close">
                        <Nav.Link as="Link" href="/" title="Close">Close</Nav.Link>
                    </Nav.Item>
            {
                (items) ?
                    items.map( (item, index) => (
                        <Nav.Item key={index}>
                            <Nav.Link as={item.as} href={item.link} target={item.target}>{item.name}</Nav.Link>
                        </Nav.Item>
                    ))
                : undefined
            }
            {
                (close === true) ?
                    <Nav.Item className="close">
                        <Nav.Link as="Link" href="/" title="Close">Close</Nav.Link>
                    </Nav.Item>
                : undefined
            }
        </Nav>
    )
}
