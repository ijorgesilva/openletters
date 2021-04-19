// Dependencies
import React from 'react'
import PropTypes from 'prop-types'
import { withTrans } from '../../i18n/withTrans'
import CookieConsent from 'react-cookie-consent'
import { ContextProviderComponent } from '../../provider/context'
import 'bootstrap/dist/css/bootstrap.min.css'

// Components
import { footerLinks } from '../../../data/menues'
import FooterSimpleText from '../footer/footerSimpleText'
import '../global.scss'
import '../layout.scss'

const Layout = ( { children, pageContext, t, i18n, location } ) => {

    switch(pageContext.layout){
        case 'serieDetails':
        case 'watchDetails':
            return (
                <ContextProviderComponent>

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

                </ContextProviderComponent>
            )
            break
        default:
            return (
                <ContextProviderComponent>
                    
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

                </ContextProviderComponent>
            )

    }
    
}
  
Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default withTrans(Layout)