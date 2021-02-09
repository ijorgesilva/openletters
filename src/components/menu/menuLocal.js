import React, {useState} from "react"
import { Link } from "gatsby"
import { Row, Col, Navbar, Nav, NavDropdown, Modal } from "react-bootstrap"
import IframeResizer from "iframe-resizer-react"
// import { faYoutube, faTwitter, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// Components
import LatestMessage from "../widget/latestMessage"
import "./menuLocal.scss"

export default function MenuLocal(props){

    const brandLogo = {
        backgroundImage: "url("+props.logo+")",
    }
    
    return (
        <Navbar className={`navlocal container-fluid navbar z-index-3`} bg="bg-transparent" expand="lg" >
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
                        : <MenuLink key={index} class={`${menu.class}`} content={menu.submenu} name={menu.name} type={menu.type} link={menu.link} iframe={menu.iframe} iframeTitle={menu.iframeTitle} />
                    ))}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

function SubMenu(props) {
    return (
        props.content.map ((submenu, index) => (
            <NavDropdown.Item 
                as={ (props.as === "link") ? Link : undefined }
                className={`submenu-item text-wrap ${submenu.class}`}
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

function RegularMenu(props){
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

function MegaMenu(props){
    return (
        <NavDropdown 
            key={props.index} 
            className={`megamenu navitems ${props.class}`}
            title={props.title} id={`dropdown-${props.index}`}
        >
            <Row>
                {props.content.map( (menu, index) => (
                    <Col key={index} className="navcontent" xs={12} md lg> 
                        
                            { (menu.header) ? <h6 dangerouslySetInnerHTML={{__html: menu.name}}></h6> : <></> }
                            { (menu.submenu) ? <SubMenu content={menu.submenu}></SubMenu> : <></> }
                        
                        { (menu.component === "LatestMessage") ? <LatestMessage href={menu.link} photo={menu.photo} name={menu.name}></LatestMessage> : <></> }
                    </Col>
                ))}
            </Row>
        </NavDropdown>
    )
}

function MenuLink(props){
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            {(function(){
                switch (props.type){
                    case 'cta':
                        return (
                                <>
                                    <div className={`menucta`}>
                                        <Nav.Link
                                            as={ (props.as === "link") ? Link : undefined }
                                            className={`btn btn--animation btn--light-outline ${props.class}`}  
                                            key={props.index} 
                                            onClick={handleShow} 
                                            target={props.target} 
                                            dangerouslySetInnerHTML={{__html: props.name}} 
                                            activeClassName="active"
                                        />
                                    </div>
                                    {
                                        (props.iframe) ?
                                            <Modal show={show} onHide={handleClose} animation={false}>
                                                <Modal.Header closeButton>
                                                <Modal.Title>{props.iframeTitle}</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <IframeResizer src={props.iframe} style={{minHeight: "600px", minWidth: '100%', width: '1px'}} frameborder="0"></IframeResizer>
                                                </Modal.Body>
                                            </Modal>
                                        : <></>
                                    }
                                </>
                            )
                    default:
                        return (
                                <Nav.Link 
                                    as={ (props.as === "link") ? Link : undefined } 
                                    key={props.index} target={props.target} 
                                    className={`navitems navmain ${props.class}`} 
                                    to={props.link} dangerouslySetInnerHTML={{__html: props.name}} 
                                    href={props.link} 
                                />
                            )
                }
            })()}
        </>
    )
}