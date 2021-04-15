// Dependencies
import React from 'react'
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from 'gatsby'
import { withTrans } from '../../i18n/withTrans'
import CookieConsent from 'react-cookie-consent'
import 'bootstrap/dist/css/bootstrap.min.css'

// Components
import {menuLocal, menuHelp, menuGive, footerLinks } from '../../../data/menues'
import Navigation from "../menu/navigation"
import MenuGlobal from "../menu/menuGlobal"
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

    switch(pageContext.layout){
        case 'serieDetails':
        case 'watchDetails':
            return (
                <>

                    <MenuGlobal 
                        className   = { "h-background-six-shade-three" }
                        helpMenu    = { menuHelp } 
                        giveMenu    = { menuGive } 
                        location    = { location }
                    />

                    <main>
                        {children}
                    </main>

                    <FooterSimpleText 
                        text={t("global.footer-copyright")} 
                        links={footerLinks} 
                    />

                    <CookieConsent
                        location            = "bottom"
                        buttonText          = {t('global.accept')} 
                        declineButtonText   = "Decline"
                        cookieName          = "gatsby-gdpr-google-analytics"
                        style               = {{ background: "rgba(var(--color-six-dark-shade-three),1)", color: "var(--color-six-shade-three)" }}
                        buttonStyle         = {{ backgroundColor: "rgba(var(--color-six-dark-shade-three),1)", fontSize: "13px", color: "var(--color-white)", border: "3px solid var(--color-white)" }}
                    >
                        {t('global.cookie-consent')}
                    </CookieConsent>

                </>
            )
            break
        default:
            return (
                <>
                    
                    <Navigation 
                        menuLocal       = { menuLocal }
                        logo            = { data.logo.publicURL }
                        as              = { "link" }
                        menuGlobalGive  = { menuGive }
                        menuGlobalHelp  = { menuHelp }
                        location        = { location }
                    />
    
                    <main>
                        {children}
                    </main>
    
                    <FooterSimpleText 
                        text={t("global.footer-copyright")} 
                        links={footerLinks} 
                    />
    
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

                </>
            )

    }
    
}
  
Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default withTrans(Layout)