import { Link } from 'gatsby'
import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { useTranslation } from "react-i18next"

import './menuWatchDetails.scss'

export default function MenuWatchDetails ( 
    { menu, menuBrand, className, activeKey, id, close, styles, mode } 
    ) {

    
    const { t } = useTranslation()

    return (
        <Navbar 
            className   = {`menuWatchDetails ${ mode ? mode : 'light' } ${(className) ? className : ''}`} 
            bg          = { mode } 
            variant     = { mode }
            activeKey   = { activeKey } 
            style       = { ( styles ) ? styles : {}}
            id          = { id }
        >

            <Nav className="mr-auto">

                {
                    (menuBrand) ?
                        <Navbar.Brand>
                            <Link to={menuBrand.link} title={menuBrand.name}>
                                {menuBrand.name}
                            </Link>
                        </Navbar.Brand>
                    :
                        undefined
                }

                <Nav className="disable-scrollbars">
                    {
                        menu.map( (item, index) => (
                            <Nav.Item key={index} as="li">
                                {
                                    (item.target) ? 
                                        <Nav.Link href={item.link} title={item.name} target={item.target}>{item.name}</Nav.Link>
                                    :   
                                        <Link to={item.link} className="nav-link" title={item.name} activeClassName="active">{item.name}</Link>  
                                }
                            </Nav.Item>
                        ))
                    }
                </Nav>

            </Nav>

            { 
                ( close ) ?
                    <Nav className="mr-0">
                        <Link title="Close" to={close} className="close nav-link">    
                            <span aria-hidden="true">×</span>
                            <span className="sr-only">{t('global.close')}</span>
                        </Link>
                    </Nav>
                : 
                    undefined
            }

        </Navbar>
    )
}
