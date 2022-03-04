
import { Link } from 'gatsby'
import React from 'react'
import { NavDropdown } from 'react-bootstrap'

export default function SubMenu( 
    { 
        item, 
        as 
    } 
) {
    return (
        <>
            {
                // If 2nd level submenu
                item.submenu?.length > 0 ?
                    item.submenu?.map ( (submenu, index) => (
                        <NavDropdown.Item 
                            as={ as === 'link' ? Link : undefined }
                            className={`submenu-item text-wrap ${ submenu.class ? submenu.class : '' }`}
                            key={index}
                            to={submenu.link}
                            href={submenu.link}
                            target={submenu.target}
                            rel='noopener noreferrer'
                        >
                            { submenu.name }
                        </NavDropdown.Item>
                    ))
                :
                    <NavDropdown.Item 
                        as={ as === 'link' ? Link : undefined }
                        className={`submenu-item text-wrap ${ item.class ? item.class : '' }`}
                        to={ item.link }
                        href={ item.link }
                        target={ item.target }
                        rel='noopener noreferrer'
                    >
                        { item.name }
                    </NavDropdown.Item>
            }
        </>
    )
}