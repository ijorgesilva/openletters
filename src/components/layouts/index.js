// Dependencies
import React from 'react'
import PropTypes from 'prop-types'
import { withTrans } from '../../i18n/withTrans'
import CookieConsent from 'react-cookie-consent'
import { ContextProviderComponent } from '../../provider/context'
import 'bootstrap/dist/css/bootstrap.min.css'

// Components
import { useWebsiteConfiguration } from '../../hooks/useWebsiteConfiguration'

import '../global.scss'
import '../layout.scss'

const Layout = ( { children, pageContext, t, i18n, location } ) => {

    const customCode = useWebsiteConfiguration().settingsCode

    switch(pageContext.layout){
        case 'serieDetails':
        case 'watchDetails':
            return (
                <ContextProviderComponent>
                    <div dangerouslySetInnerHTML={{__html: customCode}}></div>
                    <main>
                        {children}
                    </main>

                    <CookieConsent
                        location            = "bottom"
                        buttonText          = { t('global.accept') } 
                        declineButtonText   = { t('global.cookie-consent.decline') }
                        cookieName          = "gatsby-gdpr-google-analytics"
                        style               = {{ background: "rgba(var(--color-six-dark-shade-three),1)", color: "var(--color-six-shade-three)" }}
                        buttonStyle         = {{ backgroundColor: "rgba(var(--color-six-dark-shade-three),1)", fontSize: "13px", color: "var(--color-white)", border: "3px solid var(--color-white)" }}
                    >
                        {t('global.cookie-consent.description')}
                    </CookieConsent>

                </ContextProviderComponent>
            )
            break
        default:
            return (
                <ContextProviderComponent>
                    <div dangerouslySetInnerHTML={{__html: customCode}}></div>
                    <main>
                        {children}
                    </main>
    
                    <CookieConsent
                        location="bottom"
                        buttonText          = { t('global.accept') } 
                        declineButtonText   = { t('global.cookie-consent.decline') }
                        cookieName          = "gatsby-gdpr-google-analytics"
                        style               = {{ background: "rgba(var(--color-six-dark-shade-three),1)", color: "var(--color-six-shade-three)" }}
                        buttonStyle         = {{ backgroundColor: "rgba(var(--color-six-dark-shade-three),1)", fontSize: "13px", color: "var(--color-white)", border: "3px solid var(--color-white)" }}
                    >
                        {t('global.cookie-consent.description')}
                    </CookieConsent>

                </ContextProviderComponent>
            )
            break

    }
    
}
  
Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default withTrans(Layout)