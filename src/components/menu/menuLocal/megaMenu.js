// Dependencies
import React from "react"
import { Row, Col, NavDropdown } from "react-bootstrap"

// Components
import SubMenu from './subMenu'

export default function MegaMenu(props){
    return (
        <NavDropdown 
            key={props.index} 
            className={`megamenu navitems ${props.class}`}
            title={props.title} id={`dropdown-${props.index}`}
        >
            <Row>
                {props.content.map( (menu, index) => (
                    <Col key={index} className="navcontent" xs={12} md lg> 
                        
                            { (menu.header) ? <h6 dangerouslySetInnerHTML={{__html: menu.name}}></h6> : <></> }
                            { (menu.submenu) ? <SubMenu content={menu.submenu}></SubMenu> : <></> }
                       
                    </Col>
                ))}
            </Row>
        </NavDropdown>
    )
}