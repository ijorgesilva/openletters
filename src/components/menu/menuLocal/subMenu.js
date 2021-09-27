
import React from 'react'
import { Link } from 'gatsby'
import { NavDropdown } from 'react-bootstrap'



export default function SubMenu( { content, as } ) {
    return (
        content.map ( (submenu, index) => (
            <NavDropdown.Item 
                as={ as === 'link' ? Link : undefined }
                className={`submenu-item text-wrap ${ submenu.class ? submenu.class : '' }`}
                key={index}
                to={submenu.link}
                href={submenu.link}
                target={submenu.target}
                rel='noopener noreferrer'
            >
                {submenu.name}
            </NavDropdown.Item>
        ))
    )
}