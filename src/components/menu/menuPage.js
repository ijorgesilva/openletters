// Dependencies
import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'gatsby'

// Components
import MenuPageItem from './menuPageItem'
import './menuPage.scss'

export default function MenuPage ( { menuBrand, menu, className, variant, bg, location, menues, campus } ){
    let base = {}
    let items =     ( menues?.menuDetails?.menuPagesMenu?.menuPageMenuItems?.length > 0 ) ? 
                        menues.menuDetails.menuPagesMenu.menuPageMenuItems 
                    : 
                        undefined

    if (menuBrand) {
        base = menuBrand
    }
    else if(menues?.menuDetails?.menuPagesMenu?.menuPagesMenuBase) {
        base = {
                'link': menues.menuDetails.menuPagesMenu?.menuPagesMenuBase.menuPagesMenuBaseUrl,
                'name': menues.menuDetails.menuPagesMenu?.menuPagesMenuBase.menuPagesMenuBaseTitle
            }
    }

    if( menues?.status === 'publish' ){
        return(
            <Navbar defaultActiveKey="/home" className={`menuPage ${ (className) ? className : '' }`} bg={bg} variant={variant}>

                {
                    ( base ) ?
                        <Navbar.Brand>
                            <Link to={base.link} title={base.name}>
                                {base.name}
                            </Link>
                        </Navbar.Brand>
                    :
                        undefined
                }

                <Nav className="disable-scrollbars">
                    {
                        ( menu ) ?
                            menu.map( (item, index) => (
                                <Nav.Item key={index} as="li">
                                    {
                                        (item.target) ? 
                                            <Nav.Link 
                                                href            = { item.link } 
                                                title           = { item.name } 
                                                target          = { item.target }
                                            >
                                                {item.name}
                                            </Nav.Link>
                                        :   
                                            <Link 
                                                to              = { item.link } 
                                                className       = "nav-link" 
                                                title           = { item.name } 
                                                activeClassName = "active"
                                            >
                                                {item.name}
                                            </Link>  
                                    }
                                </Nav.Item>
                            ))
                        :
                            undefined
                    }
                    {
                        ( items ) ?
                            items.map( (item, index) => (
                                <Nav.Item key={index} as="li">
                                    <MenuPageItem 
                                        campus  = { campus }
                                        item    = { item } 
                                    />
                                </Nav.Item>
                            ))
                        :
                            undefined
                    }
                </Nav>

            </Navbar>
        )
    }
    /* TODO: Remove this portion as soon menues.js is not longer needed */
    else if( menu && menuBrand ) { 
        return (
            <Navbar className={`menuPage ${ (className) ? className : '' }`} bg={bg} variant={variant}>
                <Navbar.Brand>
                    <Link to={menuBrand.link} title={menuBrand.name}>
                        {menuBrand.name}
                    </Link>
                </Navbar.Brand>

                <Nav className="disable-scrollbars">
                    <Navbar className={`menuPage ${className}`} bg={bg} variant={variant}>
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
                    </Navbar>
                </Nav>
            </Navbar>
        )
    }
}