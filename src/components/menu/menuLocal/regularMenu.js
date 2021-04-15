// Dependencies
import React from "react"
import { Link } from "gatsby"
import { NavDropdown } from "react-bootstrap"

// Components

export default function RegularMenu(props){
    return (
        <NavDropdown
            className={`regularmenu navitems ${props.class}`}
            key={props.index}
            title={props.title} id={`dropdown-${props.index}`}
        >
            {props.content.map( (submenu, index) => (
                <NavDropdown.Item 
                    as={ (submenu.as === "link") ? Link : undefined }
                    className={`submenu-item text-wrap ${submenu.class}`}
                    key={index} 
                    to={submenu.link} 
                    href={submenu.link} 
                    target={submenu.target}
                    rel="noopener noreferrer"
                >
                    {submenu.name}
                </NavDropdown.Item>
            ))}
        </NavDropdown>
    )
}