// Dependencies
import React from 'react'
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from 'gatsby'
import { withTrans } from '../../i18n/withTrans'
import CookieConsent from 'react-cookie-consent'
import * as queryString from 'query-string'
import 'bootstrap/dist/css/bootstrap.min.css'

// Components
import {menuLocal, menuHelp, menuGive, footerLinks, menuCampus} from '../../../data/menues'
import NetSimple from '../../components/button/netSimple'
import Navigation from "../menu/navigation"
import WatchDetails from '../vod/menu/watchDetails'
import FooterSimpleText from "../footer/footerSimpleText"
import "../global.scss"
import "../layout.scss"

const Layout = ( { children, pageContext, t, i18n, location } ) => {

    const data = useStaticQuery(graphql`
        query{
            logo: file(relativePath: {eq: "img/global/logo_white.svg"}) {
                publicURL
            }
        }
    `)
    
    if (pageContext.layout === "watchDetails") {
        return (
            <>
                <CookieConsent
                    location="bottom"
                    buttonText={t('global.accept')} 
                    declineButtonText="Decline"
                    cookieName="gatsby-gdpr-google-analytics"
                    style={{ background: "rgba(var(--color-six-dark-shade-three),1)", color: "var(--color-six-shade-three)" }}
                    buttonStyle={{ backgroundColor: "rgba(var(--color-six-dark-shade-three),1)", fontSize: "13px", color: "var(--color-white)", border: "3px solid var(--color-white)" }}
                >
                    {t('global.cookie-consent')}
                </CookieConsent>
                
                <NetSimple 
                    variant="floating-left"
                    close
                />

                <WatchDetails />

                <main>
                    {children}
                </main>

                <FooterSimpleText text={t("global.footer-copyright")} links={footerLinks} />

            </>
        )
    }
    else {
        return (
            <>
                <CookieConsent
                    location="bottom"
                    buttonText={t('global.accept')} 
                    declineButtonText="Decline"
                    cookieName="gatsby-gdpr-google-analytics"
                    style={{ background: "rgba(var(--color-six-dark-shade-three),1)", color: "var(--color-six-shade-three)" }}
                    buttonStyle={{ backgroundColor: "rgba(var(--color-six-dark-shade-three),1)", fontSize: "13px", color: "var(--color-white)", border: "3px solid var(--color-white)" }}
                >
                    {t('global.cookie-consent')}
                </CookieConsent>
                
                <Navigation 
                    menuLocal={menuLocal} 
                    logo={data.logo.publicURL} 
                    as={"link"} 
                    menuGlobalGive={menuGive} 
                    menuGlobalHelp={menuHelp} 
                    menuCampusSelector={menuCampus}
                />

                <main>
                    {children}
                </main>

                <FooterSimpleText text={t("global.footer-copyright")} links={footerLinks} />

            </>
        )
    }

}
  
Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default withTrans(Layout)