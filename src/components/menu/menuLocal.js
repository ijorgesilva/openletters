// Dependencies
import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { GatsbyImage } from 'gatsby-plugin-image'
import { useTranslation } from 'react-i18next'

// Components
import MegaMenu from './menuLocal/megaMenu'
import RegularMenu from './menuLocal/regularMenu'
import MenuLink from './menuLocal/menuLink'
import { useWebsiteConfiguration } from '../../hooks/useWebsiteConfiguration'
import { useCampuses } from '../../hooks/useCampuses' 
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// Style
import './menuLocal.scss'

export default function MenuLocal ( { location, campus } ) {

    const { t } = useTranslation()

    const  currentCampus    = useCampuses( campus )
    const siteSettings      = useWebsiteConfiguration()
    
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
                        {name: "Small Groups", link: "/smallgroups/" },
                        {name: "Serve", link: "https://victoryatl.com/serve/"},
                        {name: "Events", link: "https://victoryatl.com/events/", as: 'link'},
                        {name: "Download App", link: "https://victoryatl.com/app/"},
                        {name: "Subscribe", link: "https://victoryatl.com/newsletter/"}
                    ]
                }
            ]
        },
        {name: "Watch", link: '/' + campus + '/watch' },
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
                        {name: "Children", link: "https://victoryatl.com/VictoryKids/"},
                        {name: "Special Needs", link: "https://victoryatl.com/specialneeds/"},
                        {name: "Middle School", link: "https://victoryatl.com/middleschool/"},
                        {name: "High School", link: "https://victoryatl.com/highschool/"},
                        {name: "Young Adults", link: "https://victoryatl.com/fusion/"},
                        {name: "Women", link: "https://victoryatl.com/true/"},
                        {name: "Men", link: "https://victoryatl.com/menunited/"},
                        {name: "Small Groups", link: "/smallgroups/" },
                        {name: "Adults (50+)", link: "https://victoryatl.com/050-2/"},
                        {name: "Vida", link: "https://victoryatl.com/victoryvida/"},
                        {name: "Missions", link: "https://victoryatl.com/missions/"},
                        {name: "Community Transformation", link: "https://victoryatl.com/localoutreaches/"},
                    ]
                },
                {name: "Small Groups", link:"#", header: true,
                    submenu: [
                        {name: "About Groups", link: "/smallgroups/"},
                        {name: "Find a Group", link: "https://my.victoryatl.com/default.aspx?page=4364", target: "_blank"},
                        {name: "Host a Group", link: "/smallgroups/host", target: "_blank"},
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
        {name: "Follow us", link: "#", class: "mobileonly",
            submenu: [
                {name: "Instagram", link: "https://www.instagram.com/victoryatl/"},
                {name: "Facebook", link: "https://www.facebook.com/victoryatl/"},
                {name: "Twitter", link: "https://www.twitter.com/victoryatl/"},
                {name: "Youtube", link: "https://www.youtube.com/channel/UCNeMhrj2GTacigCwMLIPAyA"},
                {name: "App Store", link: "https://itunes.apple.com/us/app/victory-world-church/id921775740?mt=8"},
                {name: "Play Store", link: "https://play.google.com/store/apps/details?id=com.subsplash.thechurchapp.s_86PZ97"},
            ]
        },
        {name: "Need Help?", link: "#", class: "mobileonly",
            submenu: [
                {name: "Need Prayer?", link: "https://victoryatl.com/prayer"},
                {name: "Healed Sessions", link: "https://victoryatl.com/healed/"},
                {name: "Care / Financial", link: "https://victoryatl.com/care"},
                {name: "Say Something", link: "https://victoryatl.com/saysomething"},
                {name: "How to Help?", link: "https://victoryatl.com/howtohelp"},
                {name: "Technical Support", link: "https://supportatvictory.atlassian.net/servicedesk/customer/portal/1", target: "_blank"}
            ]
        },
        {name: "Give", link: "https://victoryatl.com/give", class: "mobileonly",
            submenu: [
                {name: "Norcross", link: "https://pushpay.com/g/victorynorcross?utm_source=pushpay&utm_medium=email&utm_content=link6&utm_campaign=AdminInviteAndGivingLink&src=hpp"},
                {name: "Hamilton Mill", link: "https://pushpay.com/g/victoryhamiltonmill?utm_source=pushpay&utm_medium=email&utm_content=link4&utm_campaign=AdminInviteAndGivingLink&src=hpp"},
                {name: "Midtown", link: "https://pushpay.com/g/victorymidtown?utm_source=pushpay&utm_medium=email&utm_content=link5&utm_campaign=AdminInviteAndGivingLink&src=hpp"},
                {name: "Online", link: "https://pushpay.com/g/victoryonline?utm_source=pushpay&utm_medium=email&utm_content=link7&utm_campaign=AdminInviteAndGivingLink&src=hpp"},
                {title: "Mail your gift?", content: "5905 Brook Hollow Parkway, Norcross GA 30071 | Specify campus / designation in the memo portion of the check."},
                {name: "View all options", link: "https://victoryatl.com/give"}
            ]
        },
        {name: "Connect", link: "https://www.connecttovictory.com/", type:"button", target:"_blank"}
    
    ]

    const campusLogoUrl =   ( currentCampus.campusDetails?.campusBrand?.campusBrandUrl ) ?
                                currentCampus.campusDetails.campusBrand.campusBrandUrl    
                            :
                                '/' + campus

    const campusLogo    =   ( siteSettings.settingsGraphics.settingsLogo?.localFile?.childImageSharp?.gatsbyImageData ) ?
                                siteSettings.settingsGraphics.settingsLogo.localFile.childImageSharp.gatsbyImageData
                            :
                                ( siteSettings.settingsGraphics.settingsLogo?.localFile?.publicURL ) ?
                                    siteSettings.settingsGraphics.settingsLogo.localFile.publicURL
                                :
                                    ( currentCampus.campusDetails.campusBrand.campusBrandLogo?.localFile?.childImageSharp?.gatsbyImageData ) ?
                                        currentCampus.campusDetails.campusBrand.campusBrandLogo.localFile.childImageSharp.gatsbyImageData
                                    :
                                        ( currentCampus.campusDetails.campusBrand.campusBrandLogo.localFile?.publicURL ) ?
                                            currentCampus.campusDetails.campusBrand.campusBrandLogo.localFile.publicURL
                                        :
                                            undefined

    const campusLogoStyle = {
        backgroundImage: "url("+ campusLogo +")",
    }

    return (
        <Navbar className={`navlocal container-fluid navbar z-index-3`} bg="transparent" expand="lg" >

            <Navbar.Brand
                rel         = 'home'
                to          = {campusLogoUrl}
                href        = {campusLogoUrl}
                title       = { currentCampus.title + ' ' + t('global.home-page')}
                className   = {`${( campusLogo === undefined ) ? '' : 'text-hide' } navbar-brand font-weight-bold d-block m-2 navbrand`} 
                style       = {campusLogoStyle}
            >
                { currentCampus.title }
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" className="navbar-dark">
                <FontAwesomeIcon icon={faBars} size="md" />
            </Navbar.Toggle>

            <Navbar.Collapse className={`mainnav`} id="responsive-navbar-nav">
                <Nav className={`navbarmenu`}>
                    { 
                        menuLocalData.map( (menu, index) => 
                            (
                                (menu.submenu) ?
                                    (menu.megamenu === true) ?
                                        <MegaMenu 
                                            className   = {`${menu.class}`} 
                                            key         = {index} 
                                            content     = {menu.submenu} 
                                            title       = {menu.name} 
                                            index       = {menu.index}
                                        />
                                    : 
                                        <RegularMenu 
                                            className   = {`${menu.class}`} 
                                            key         = {index} 
                                            content     = {menu.submenu} 
                                            title       = {menu.name} 
                                            index       = {menu.index}
                                        />
                                : 
                                    <MenuLink 
                                        key         = {index} 
                                        className   = {`${menu.class}`} 
                                        content     = {menu.submenu} 
                                        name        = {menu.name} 
                                        type        = {menu.type} 
                                        link        = {menu.link} 
                                        target      = {menu.target}
                                        iframe      = {menu.iframe} 
                                        iframeTitle = {menu.iframeTitle} 
                                    />
                            )
                        )
                    }
                </Nav>
            </Navbar.Collapse>

        </Navbar>
    )
}

