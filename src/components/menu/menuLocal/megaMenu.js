// Dependencies
import React from "react"
import { Row, Col, NavDropdown } from "react-bootstrap"

// Components
import SubMenu from './subMenu'

export default function MegaMenu( { index, className, title, content } ){
    return (
        <NavDropdown 
            id          = {`dropdown-${index}`}
            key         = {index} 
            className   = {`megamenu navitems ${ className ? className : ''}`}
            title       = {title} 
        >
            <Row>
                {content.map( (menu, index) => (
                    <Col key={index} className="navcontent" xs={12} md lg> 
                        
                            { (menu.header) ? <h6 dangerouslySetInnerHTML={{__html: menu.name}}></h6> : <></> }
                            { (menu.submenu) ? <SubMenu content={menu.submenu}></SubMenu> : <></> }
                       
                    </Col>
                ))}
            </Row>
        </NavDropdown>
    )
}