
import React from "react"
import { Link } from "gatsby"
import { NavDropdown } from "react-bootstrap"



export default function SubMenu(props) {
    return (
        props.content.map ((submenu, index) => (
            <NavDropdown.Item 
                as={ (props.as === "link") ? Link : undefined }
                className={`submenu-item text-wrap ${ ( submenu.class ) ? submenu.class : '' }`}
                key={index}
                to={submenu.link}
                href={submenu.link}
                target={submenu.target}
                rel="noopener noreferrer"
            >
                {submenu.name}
            </NavDropdown.Item>
        ))
    )
}