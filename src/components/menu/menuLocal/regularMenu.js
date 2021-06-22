// Dependencies
import React from "react"
import { Link } from "gatsby"
import { NavDropdown } from "react-bootstrap"

// Components

export default function RegularMenu( { className, index, title, content } ){
    return (
        <NavDropdown
            id          = {`dropdown-${index}`}
            className   = {`regularmenu navitems ${ ( className ) ? className : '' }`}
            key         = {index}
            title       = {title} 
        >
            {content.map( (submenu, index) => (
                <NavDropdown.Item 
                    as={ (submenu.as === "link") ? Link : undefined }
                    className={`submenu-item text-wrap ${ ( submenu.class ) ? submenu.class : ''}`}
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