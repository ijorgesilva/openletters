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
                        style               = {{ background: "rgba(var(--color-six-dark-shade-three),1)", color: "var(--color-six-shade-three)" }}
                        buttonStyle         = {{ backgroundColor: "rgba(var(--color-six-dark-shade-three),1)", fontSize: "13px", color: "var(--color-white)", border: "3px solid var(--color-white)" }}
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
                        style               = {{ background: "rgba(var(--color-six-dark-shade-three),1)", color: "var(--color-six-shade-three)" }}
                        buttonStyle         = {{ backgroundColor: "rgba(var(--color-six-dark-shade-three),1)", fontSize: "13px", color: "var(--color-white)", border: "3px solid var(--color-white)" }}
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