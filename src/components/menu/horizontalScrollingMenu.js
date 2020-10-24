// Dependencies
import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'gatsby'

// Components
import './horizontalScrollingMenu.scss'

export default function HorizonalScrollingMenu ( { menuBrand, menu, className, variant, bg } ){
    return(
        <Navbar defaultActiveKey="/home" className={`horizontalScrollingMenu ${className}`} bg={bg} variant={variant}>

            <Navbar.Brand>
                <Link to={menuBrand.link} title={menuBrand.name}>
                    {menuBrand.name}
                </Link>
            </Navbar.Brand>

            <Nav className="disable-scrollbars">
                {
                    menu.map( (item, index) => (
                        <Nav.Item key={index} as="li">
                            {
                                (item.target) ? 
                                    <Nav.Link href={item.link} title={item.name} target={item.target}>{item.name}</Nav.Link>
                                :   <Link to={item.link} className="nav-link" title={item.name} activeClassName="active">{item.name}</Link>  
                            }
                        </Nav.Item>
                    ))
                }
            </Nav>

        </Navbar>
    )
}