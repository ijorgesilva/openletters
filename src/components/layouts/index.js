import React from 'react'
import PropTypes from 'prop-types'
import { withTrans } from '../../i18n/withTrans'
import CookieConsent from 'react-cookie-consent'
import { ContextProviderComponent } from '../../provider/context'
import { Helmet } from 'react-helmet'

import { useWebsiteConfiguration } from '../../hooks/useWebsiteConfiguration'
import { useTheme } from '../../hooks/useTheme'

import '../app.scss'
import '../layout.scss'

const Layout = ( { children, pageContext, t, i18n, location } ) => {

    const customCode    = useWebsiteConfiguration().settingsCode
    const customCss     = `${useWebsiteConfiguration().settingsCss}`
    const theme         = useTheme()

    switch(pageContext.layout){
        case 'serieDetails':
        case 'watchDetails':
            return (
                <ContextProviderComponent>

                    <Helmet>
                        <style>
                            { ( theme?.cssVariables ) ? `${ theme.cssVariables }` : ''} 
                        </style>
                    </Helmet>

                    <main>
                        {children}
                    </main>

                    <CookieConsent
                        location            = "bottom"
                        buttonText          = { t('global.accept') } 
                        declineButtonText   = { t('global.cookie-consent.decline') }
                        cookieName          = "gatsby-gdpr-google-analytics"
                        style               = {{ background: "hsla(var(--dark-h), var(--dark-s), var(--dark-l), 1)", color: "hsla(var(--light-h), var(--light-s), var(--light-l), 1)", borderTop: "var(--border-width) solid hsla(var(--light-h), var(--light-s), var(--light-l), 0.3)" }}
                        buttonStyle         = {{ backgroundColor: "hsla(var(--primary-h), var(--primary-s), var(--primary-l), 1)", fontSize: "13px", color: "var(--light)", border: "var(--border-width) solid var(--light)" }}
                    >
                        {t('global.cookie-consent.description')}
                    </CookieConsent>

                    <div dangerouslySetInnerHTML={{__html: customCode}}></div>

                    <style>
                        { ( customCss ) ? customCss : ''}
                    </style>

                </ContextProviderComponent>
            )
            break
            
        default:
            return (
                <ContextProviderComponent>

                    <Helmet>
                        <style>
                            { ( theme?.cssVariables ) ? `${ theme.cssVariables }` : ''} 
                        </style>
                    </Helmet>

                    <main>
                        {children}
                    </main>
    
                    <CookieConsent
                        location="bottom"
                        buttonText          = { t('global.accept') } 
                        declineButtonText   = { t('global.cookie-consent.decline') }
                        cookieName          = "gatsby-gdpr-google-analytics"
                        style               = {{ background: "hsla(var(--dark-h), var(--dark-s), var(--dark-l), 1)", color: "hsla(var(--light-h), var(--light-s), var(--light-l), 1)", borderTop: "var(--border-width) solid hsla(var(--light-h), var(--light-s), var(--light-l), 0.3)" }}
                        buttonStyle         = {{ backgroundColor: "hsla(var(--primary-h), var(--primary-s), var(--primary-l), 1)", fontSize: "13px", color: "var(--light)", border: "var(--border-width) solid var(--light)" }}
                    >
                        {t('global.cookie-consent.description')}
                    </CookieConsent>

                    <div dangerouslySetInnerHTML={{__html: customCode}}></div>

                    <style>
                        { ( customCss ) ? customCss : ''}
                    </style>

                </ContextProviderComponent>
            )
            break

    }
    
}
  
Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default withTrans(Layout)