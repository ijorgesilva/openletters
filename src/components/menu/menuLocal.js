// Dependencies
import React from "react"
import { Link } from "gatsby"
import { Navbar, Nav } from "react-bootstrap"

// Components
import MegaMenu from './menuLocal/megaMenu'
import RegularMenu from './menuLocal/regularMenu'
import MenuLink from './menuLocal/menuLink'
import './menuLocal.scss'

export default function MenuLocal(props){

    const brandLogo = {
        backgroundImage: "url("+props.logo+")",
    }
    
    return (
        <Navbar className={`navlocal container-fluid navbar z-index-3`} bg="transparent" expand="lg" >

            <Navbar.Brand 
                as={ (props.as === "link") ? Link : undefined} 
                rel="home" 
                to="/" 
                href="/"
                title="Frontpage" 
                className={`text-hide navbar-brand font-weight-bold d-block m-2 navbrand`} 
                style={brandLogo}
            >
                {props.children}
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Navbar.Collapse className={`mainnav`} id="responsive-navbar-nav">
                <Nav className={`navbarmenu`}>
                    {props.data.map( (menu, index) => (
                        (menu.submenu) ?
                            ((menu.megamenu === true) ?
                                <MegaMenu class={`${menu.class}`} key={index} content={menu.submenu} title={menu.name} index={menu.index}/>
                                : <RegularMenu class={`${menu.class}`} key={index} content={menu.submenu} title={menu.name} index={menu.index}/>
                            )
                        : <MenuLink 
                            key={index} 
                            class={`${menu.class}`} 
                            content={menu.submenu} 
                            name={menu.name} 
                            type={menu.type} 
                            link={menu.link} 
                            target={menu.target}
                            iframe={menu.iframe} 
                            iframeTitle={menu.iframeTitle} />
                    ))}
                </Nav>
            </Navbar.Collapse>

        </Navbar>
    )
}

