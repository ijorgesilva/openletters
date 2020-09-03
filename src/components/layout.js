import React from 'react'
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from 'gatsby'
import { withTrans } from '../i18n/withTrans'
import CookieConsent from 'react-cookie-consent'
import * as queryString from 'query-string'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

// Components
import Navigation from "./menu/navigation"
import FooterSimpleText from "./footer/footerSimpleText"

// Assets: Imgs
import logo from "../assets/img/global/logo_white.svg"

// Styles
import "./global.scss"
import "./layout.scss"

const Layout = ( { data, children, t, i18n, location } ) => {

    const menuLocal = [
        {name: "Campus", link: "#", 
            submenu: [
                {name: "Norcross", link: "/"},
                {name: "Hamilton Mill", link: "/hamiltonmill"},
                {name: "Midtown", link: "/midtown"},
                {name: "Online", link: "https://live.victoryatl.com"},
            ]
        },
        {name: "About", link: "#", megamenu: true,
            submenu: [
                {name: "About us", link:"#", header: true,
                    submenu: [
                        {name: "My.Victory", link: "https://my.victoryatl.com/"},
                        {name: "Small Groups", link: "/smallgroups/", as: "link"},
                        {name: "Serve", link: "/serve/"},
                        {name: "Events", link: "/event-directory/"},
                        {name: "Download App", link: "/app/"},
                        {name: "Subscribe", link: "/newsletter/"}
                    ]
                },
                {name: "Connect", link:"#", header: true,
                    submenu: [
                        {name: "New Here?", link:"/im-new/"},
                        {name: "Times + Location", link:"/times-directions/"},
                        {name: "Pastors + Staff", link:"/pastors-and-staff/"},
                        {name: "Campuses", link:"https://www.victoryatlanta.com/"},
                        {name: "Contact Us", link:"/contact-us/"},
                        {name: "Statement of Faith", link:"/statement-of-faith/"},
                    ]
                },
                {name: "", link:"",
                    submenu: [
                    ]
                }
            ]
        },

        // {name: "Watch", link: "/watch"},
        {name: "Watch", link: "", megamenu: true,
            submenu: [
                {name: "Watch", link:"#", header: true,
                    submenu: [
                        {name: "Messages (Series)", link: "/messages/"},
                        {name: "Live", link: "https://live.victoryatl.com/"},
                        {name: "Mobile App", link: "/app/"},
                        {name: "Podcasts", link: "/podcasts/"},
                    ]
                },
                {name: "Watch on", link:"#", header: true,
                    submenu: [
                        {name: "YouTube", link: "https://www.youtube.com/channel/UCNeMhrj2GTacigCwMLIPAyA", icon: "faYoutube"},
                        {name: "Facebook", link: "https://www.facebook.com/victoryatl/", icon: "faFacebook"},
                        {name: "Instagram", link: "https://www.instagram.com/victoryatl/", icon: "faInstagram"},
                        {name: "Twitter", link: "https://twitter.com/victoryatl/", icon: "faTwitter"},
                    ]
                },
                // {name: "Watch the latest message", link:"/messages/", 
                //     component: "LatestMessage",
                //     photo: "/wp-content/uploads/2020/07/Greater_WEB_600x338.jpg"
                // }
            ]
        },

        {name: "Grow", link:"", megamenu: true,
            submenu: [
                {name: "Classes", link:"#", header: true,
                    submenu: [
                        {name: "Forward – Now Online", link: "/forward/"},
                        {name: "Membership", link: "/membership/"},
                        {name: "Marriage", link: "/marriage/"},
                        {name: "Money + Work", link: "/moneyandwork/"},
                        {name: "Online Learning", link: "https://learn.victoryatl.com/", target: "_blank"},
                        {name: "Relate", link: "/relate/"},
                        {name: "Victory at Home", link: "/raisingdisciples/"},
                    ]
                },
                {name: "Ministries", link:"#", header: true,
                    submenu: [
                        {name: "Children", link: "/vickids/"},
                        {name: "Special Needs", link: "/specialneeds/"},
                        {name: "Middle School", link: "/thecity/"},
                        {name: "High School", link: "/thecapitol/"},
                        {name: "Young Adults", link: "/fusion/"},
                        {name: "Women", link: "/true/"},
                        {name: "Men", link: "/menunited/"},
                        {name: "Small Groups", link: "/smallgroups/", as: "Link"},
                        {name: "Adults (50+)", link: "/050-2/"},
                        {name: "Vida", link: "/victoryvida/"},
                        {name: "Missions", link: "/missions/"},
                        {name: "Community Transformation", link: "/localoutreaches/"},
                        {name: "Victory World Christian School", link: "https://vwcs.org/", target: "_blank"},
                    ]
                },
                {name: "Small Groups", link:"#", header: true,
                    submenu: [
                        {name: "About Groups", link: "/smallgroups/"},
                        {name: "Find a Group", link: "/default.aspx?page=4364"},
                        {name: "Host a Group", link: "/smallgroups#lead/"},
                        {name: "Leader Login", link: "https://my.victoryatl.com/default.aspx?page=4236", target: "_blank"},
                    ]
                },
                {name: "Resources", link:"#", header: true,
                    submenu: [
                        {name: "Discipleship Path", link: "/nextsteps/"},
                        {name: "New Believers", link: "/newfaith/"},
                        {name: "10 Qualities of a Disciple", link: "/10qualities/"},
                        {name: "Water Baptism", link: "/baptism/"},
                        {name: "Holy Spirit", link: "/holyspirit/"},
                        {name: "Corporate Prayer", link: "/corporateprayer/"},
                        {name: "Victory at Home", link: "/victoryathome/"},
                        {name: "Lead Well", link: "https://www.leadwellpeople.com/", target: "_blank"},
                    ]
                },
            ]
        },
        {name: "Need Prayer?", link: "#", class: "mobileonly",
            submenu: [
                {name: "Need Prayer?", link: "/prayer"},
                {name: "Healed Sessions", link: "/healed/"},
                {name: "Care / Financial", link: "/care"},
                {name: "Say Something", link: "/saysomething"},
            ]},
        {name: "Give", link: "/give", class: "mobileonly"},
        {name: "Connect", link: "#", type: "cta", iframe: "https://cms.victorychur.ch/form/global-contact-form/?origin=smallgroups", iframeTitle: "Connect"}
    ]
    const menuHelp = [
        {name: "Need Prayer?", link: "/prayer"},
        {name: "Healed Sessions", link: "/healed/"},
        {name: "Care / Financial", link: "/care"},
        {name: "Say Something", link: "/saysomething"},
        {divider: true},
        {name: "How to Help?", link: "/howtohelp"},
    ]
    const menuGive = [
        {name: "Norcross", link: "https://pushpay.com/g/victorynorcross?utm_source=pushpay&utm_medium=email&utm_content=link6&utm_campaign=AdminInviteAndGivingLink&src=hpp"},
        {name: "Hamilton Mill", link: "https://pushpay.com/g/victoryhamiltonmill?utm_source=pushpay&utm_medium=email&utm_content=link4&utm_campaign=AdminInviteAndGivingLink&src=hpp"},
        {name: "Midtown", link: "https://pushpay.com/g/victorymidtown?utm_source=pushpay&utm_medium=email&utm_content=link5&utm_campaign=AdminInviteAndGivingLink&src=hpp"},
        {name: "Online", link: "https://pushpay.com/g/victoryonline?utm_source=pushpay&utm_medium=email&utm_content=link7&utm_campaign=AdminInviteAndGivingLink&src=hpp"},
        {divider: true},
        {title: "Mail your gift?", content: "5905 Brook Hollow Parkway, Norcross GA 30071 | Specify campus / designation in the memo portion of the check."},
        {divider: true},
        {name: "View all options", link: "/give"}
    ]
    const footerLinks = [
        {link: "#", linkText:"Privacy Policy"}
    ]

    return (
        <>
            <CookieConsent
                location="bottom"
                buttonText={t('global.accept')} 
                declineButtonText="Decline"
                cookieName="gatsby-gdpr-google-analytics"
                style={{ background: "var(--color-six-dark-shade-three)", color: "var(--color-six-shade-three)" }}
                buttonStyle={{ backgroundColor: "var(--color-six-dark-shade-three)", fontSize: "13px", color: "var(--color-white)", border: "3px solid var(--color-white)" }}
            >
                {t('global.cookie-consent')}
            </CookieConsent>
            
            <Navigation 
                menuLocal={menuLocal} 
                logo={logo} 
                as={"link"} 
                menuGlobalGive={menuGive} 
                menuGlobalHelp={menuHelp} 
                // menuCampusSelector={data.allWpCampus}
            />

            <main>
                {children}
            </main>

            <FooterSimpleText text={t("global.footer-copyright")} links={footerLinks} />

        </>
    )
}
  
Layout.propTypes = {
    children: PropTypes.node.isRequired,
}
export default withTrans(Layout)