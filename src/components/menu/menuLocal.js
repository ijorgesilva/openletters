// Dependencies
import React from 'react'
import { useContext } from 'react'
import { Navbar, Nav } from "react-bootstrap"
import { useStaticQuery, graphql } from 'gatsby'

// Components
import MegaMenu from './menuLocal/megaMenu'
import RegularMenu from './menuLocal/regularMenu'
import MenuLink from './menuLocal/menuLink'
import ContextConsumer from '../../provider/context'

// Data
import config from '../../../data/SiteConfig'

// Style
import './menuLocal.scss'

export default function MenuLocal ( { location, campus } ) {

    let contextData = useContext(ContextConsumer)
    const data = useStaticQuery(graphql`
        query{
            logo: file(relativePath: {eq: "img/global/logo_white.svg"}) {
                publicURL
            }
        }
    `)

    const brandLogo = {
        backgroundImage: "url("+ data.logo.publicURL +")",
    }

    let menuLocalData = [
        
        {name: "About", link: "#", megamenu: true,
            submenu: [
                {name: "About us", link:"#", header: true,
                    submenu: [
                        {name: "New Here?", link:"https://victoryatl.com/im-new/"},
                        {name: "Times + Location", link:"https://victoryatl.com/times-directions/"},
                        {name: "Pastors + Staff", link:"https://victoryatl.com/staff/"},
                        {name: "Campuses", link:"https://www.victoryatlanta.com/"},
                        {name: "Contact Us", link:"https://victoryatl.com/contact-us/"},
                        {name: "Statement of Faith", link:"https://victoryatl.com/statement-of-faith/"},
                        {name: "Store", link:"https://vwcstore.com/"},
                        {name: "Privacy Policy", link:"https://victoryatl.com/privacypolicy/"},
                        {name: "SMS Terms and conditions", link:"https://victoryatl.com/smspolicy/"},
                    ]
                },
                {name: "Connect", link:"#", header: true,
                    submenu: [
                        {name: "My.Victory", link: "https://my.victoryatl.com/"},
                        {name: "Small Groups", link: "/smallgroups/", as: "link"},
                        {name: "Serve", link: "https://victoryatl.com/serve/"},
                        {name: "Events", link: "https://victoryatl.com/events/", as: 'link'},
                        {name: "Download App", link: "https://victoryatl.com/app/"},
                        {name: "Subscribe", link: "https://victoryatl.com/newsletter/"}
                    ]
                }
            ]
        },
    
        {name: "Watch", link: '/'+ campus +'/watch'},
    
        {name: "Grow", link:"", megamenu: true,
            submenu: [
                {name: "Classes", link:"#", header: true,
                    submenu: [
                        {name: "About Classes", link: "https://victoryatl.com/classes/"},
                        {name: "Forward – Now Online", link: "https://victoryatl.com/forward/"},
                        {name: "Membership", link: "https://victoryatl.com/membership/"},
                        {name: "Marriage", link: "https://victoryatl.com/marriage/"},
                        {name: "Money + Work", link: "https://victoryatl.com/moneyandwork/"},
                        {name: "Online Learning", link: "https://learn.victoryatl.com/", target: "_blank"},
                        {name: "Victory at Home", link: "https://victoryatl.com/raisingdisciples/"},
                    ]
                },
                {name: "Ministries", link:"#", header: true,
                    submenu: [
                        {name: "Children", link: "https://victoryatl.com/vickids/"},
                        {name: "Special Needs", link: "https://victoryatl.com/specialneeds/"},
                        {name: "Middle School", link: "https://victoryatl.com/thecity/"},
                        {name: "High School", link: "https://victoryatl.com/thecapitol/"},
                        {name: "Young Adults", link: "https://victoryatl.com/fusion/"},
                        {name: "Women", link: "https://victoryatl.com/true/"},
                        {name: "Men", link: "https://victoryatl.com/menunited/"},
                        {name: "Small Groups", link: "https://victoryatl.com/smallgroups/", as: "Link"},
                        {name: "Adults (50+)", link: "https://victoryatl.com/050-2/"},
                        {name: "Vida", link: "https://victoryatl.com/victoryvida/"},
                        {name: "Missions", link: "https://victoryatl.com/missions/"},
                        {name: "Community Transformation", link: "https://victoryatl.com/localoutreaches/"},
                    ]
                },
                {name: "Small Groups", link:"#", header: true,
                    submenu: [
                        {name: "About Groups", link: "/smallgroups/"},
                        {name: "Find a Group", link: "https://victoryatl.com/default.aspx?page=4364"},
                        {name: "Host a Group", link: "/smallgroups/host"},
                        {name: "Leader Login", link: "https://my.victoryatl.com/default.aspx?page=4236", target: "_blank"},
                    ]
                },
                {name: "Resources", link:"#", header: true,
                    submenu: [
                        {name: "Discipleship Path", link: "https://victoryatl.com/nextsteps/"},
                        {name: "New Believers", link: "https://victoryatl.com/newfaith/"},
                        {name: "10 Qualities of a Disciple", link: "https://victoryatl.com/10qualities/"},
                        {name: "Water Baptism", link: "https://victoryatl.com/baptism/"},
                        {name: "Holy Spirit", link: "https://victoryatl.com/holyspirit/"},
                        {name: "Corporate Prayer", link: "https://victoryatl.com/corporateprayer/"},
                        {name: "Victory at Home", link: "https://victoryatl.com/victoryathome/"},
                        {name: "Lead Well", link: "https://www.leadwellpeople.com/", target: "_blank"},
                    ]
                },
            ]
        },
    
        {name: "Need Prayer?", link: "#", class: "mobileonly",
            submenu: [
                {name: "Need Prayer?", link: "https://victoryatl.com/prayer"},
                {name: "Healed Sessions", link: "https://victoryatl.com/healed/"},
                {name: "Care / Financial", link: "https://victoryatl.com/care"},
                {name: "Say Something", link: "https://victoryatl.com/saysomething"},
            ]
        },
    
        {name: "Give", link: "https://victoryatl.com/give", class: "mobileonly"},
    
        {name: "Connect", link: "https://www.connecttovictory.com/", type:"button", target:"_blank"}
    ]

    return (
        <Navbar className={`navlocal container-fluid navbar z-index-3`} bg="transparent" expand="lg" >

            <Navbar.Brand
                rel="home" 
                to="/" 
                href="/"
                title='Frontpage' 
                className={`text-hide navbar-brand font-weight-bold d-block m-2 navbrand`} 
                style={brandLogo}
            >
                { config.siteTitle }
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Navbar.Collapse className={`mainnav`} id="responsive-navbar-nav">
                <Nav className={`navbarmenu`}>
                    { 
                        menuLocalData.map( (menu, index) => 
                            (
                                (menu.submenu) ?
                                    (menu.megamenu === true) ?
                                        <MegaMenu 
                                            class={`${menu.class}`} 
                                            key={index} 
                                            content={menu.submenu} 
                                            title={menu.name} 
                                            index={menu.index}
                                        />
                                    : 
                                        <RegularMenu 
                                            class={`${menu.class}`} 
                                            key={index} 
                                            content={menu.submenu} 
                                            title={menu.name} 
                                            index={menu.index}
                                        />
                                : 
                                    <MenuLink 
                                        key={index} 
                                        class={`${menu.class}`} 
                                        content={menu.submenu} 
                                        name={menu.name} 
                                        type={menu.type} 
                                        link={menu.link} 
                                        target={menu.target}
                                        iframe={menu.iframe} 
                                        iframeTitle={menu.iframeTitle} 
                                    />
                            )
                        )
                    }
                </Nav>
            </Navbar.Collapse>

        </Navbar>
    )
}

