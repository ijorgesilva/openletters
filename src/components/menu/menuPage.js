// Dependencies
import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'gatsby'

// Components
import MenuPageItem from './menuPageItem'
import './menuPage.scss'

export default function MenuPage ( { 
    menuBrand, 
    menu, 
    className, 
    id, 
    variant, 
    location, 
    menues, 
    campus, 
    sticky 
} ){
    let base = {}
    let items =     ( menues?.menuDetails?.menuPagesMenu?.menuPageMenuItems?.length > 0 ) ? 
                        menues.menuDetails.menuPagesMenu.menuPageMenuItems 
                    : 
                        undefined

    if (menuBrand) {
        base = menuBrand
    }
    else if( !menues?.menuDetails?.menuPagesMenu?.menuPagesMenuBase?.menuPagesMenuHideBase && 
              menues?.menuDetails?.menuPagesMenu?.menuPagesMenuBase ) {
        base = {
                'link': menues.menuDetails.menuPagesMenu?.menuPagesMenuBase.menuPagesMenuBaseUrl,
                'name': menues.menuDetails.menuPagesMenu?.menuPagesMenuBase.menuPagesMenuBaseTitle
            }
    }

    if( menues?.status === 'publish' ){
        return(
            <Navbar 
                id                  = {id}
                defaultActiveKey    = "0"
                className           = {`menuPage ${ (className) ? className : '' } ${ ( sticky )? 'sticky' : ''}`} 
                bg                  = {variant} 
                variant             = {variant}
            >

                {
                    ( !menues?.menuDetails?.menuPagesMenu?.menuPagesMenuBase?.menuPagesMenuHideBase && base ) ?
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
                        ( items ) ?
                            items.map( ( _, index ) => (
                                <Nav.Item key={index} as="li">
                                    <MenuPageItem 
                                        campus  = { campus }
                                        item    = { _ }
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
    /* TODO: Legacy code. This is for static json menues. Remove this portion is not longer needed (menues.js) */
    else if( menu && menuBrand ) { 
        return (
            <Navbar className={`menuPage ${ (className) ? className : '' }`} bg={variant} variant={variant}>
                <Navbar.Brand>
                    <Link to={menuBrand.link} title={menuBrand.name}>
                        {menuBrand.name}
                    </Link>
                </Navbar.Brand>

                <Nav className="disable-scrollbars">
                    <Navbar className={`menuPage ${className}`} bg={variant} variant={variant}>
                        {
                            menu.map( (item, index) => (
                                <Nav.Item key={index} as="li">
                                    {
                                        (item.target) ? 
                                            <Nav.Link href={item.link} title={item.name} target={item.target.split(':')[0]}
                                            >
                                                {item.name}
                                            </Nav.Link>
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
    else {
        return <></>
    }
}