import PropTypes from 'prop-types'
import React from 'react'
import CookieConsent from 'react-cookie-consent'
import { Helmet } from 'react-helmet'

import { useTheme } from '../../hooks/useTheme'
import { useWebsiteConfiguration } from '../../hooks/useWebsiteConfiguration'
import { withTrans } from '../../i18n/withTrans'

import '../app.scss'

// eslint-disable-next-line no-unused-vars
const Layout = ( { children, pageContext, t, i18n, location } ) => {

    const customCode    = useWebsiteConfiguration().settingsCode
    const customCss     = `${useWebsiteConfiguration().settingsCss}`
    const theme         = useTheme()

    switch(pageContext.layout){
        case 'serieDetails':
        case 'watchDetails':{
            return (
                <>
                    <Helmet>
                        <style>
                            { `${theme?.cssVariables ? theme.cssVariables : ''}`} 
                        </style>
                    </Helmet>

                    <main>
                        {children}
                    </main>

                    <CookieConsent
                        location            = 'bottom'
                        buttonText          = { t('global.accept') } 
                        declineButtonText   = { t('global.cookie-consent.decline') }
                        cookieName          = 'gatsby-gdpr-google-analytics'
                        style               = {{ background: 'hsla(var(--dark-h), var(--dark-s), var(--dark-l), 1)', color: 'hsla(var(--light-h), var(--light-s), var(--light-l), 1)', borderTop: 'var(--border-width) solid hsla(var(--light-h), var(--light-s), var(--light-l), 0.3)' }}
                        buttonStyle         = {{ backgroundColor: 'hsla(var(--primary-h), var(--primary-s), var(--primary-l), 1)', fontSize: '13px', color: 'var(--light)', border: 'var(--border-width) solid var(--light)' }}
                    >
                        {t('global.cookie-consent.description')}
                    </CookieConsent>

                    {
                        customCode ? 
                            <div dangerouslySetInnerHTML={{__html: customCode}}></div>
                        : undefined
                    }
                    
                    {
                        customCss ?
                            <style>
                                {customCss}
                            </style>
                        : undefined
                    }

                </>
            )
        }
            
        default:{
            return (
                <>
                    <Helmet>
                        <style>
                            { ( theme?.cssVariables ) ? `${ theme.cssVariables }` : ''} 
                        </style>
                    </Helmet>

                    <main>
                        {children}
                    </main>
    
                    <CookieConsent
                        location='bottom'
                        buttonText          = { t('global.accept') } 
                        declineButtonText   = { t('global.cookie-consent.decline') }
                        cookieName          = 'gatsby-gdpr-google-analytics'
                        style               = {{ background: 'hsla(var(--dark-h), var(--dark-s), var(--dark-l), 1)', color: 'hsla(var(--light-h), var(--light-s), var(--light-l), 1)', borderTop: 'var(--border-width) solid hsla(var(--light-h), var(--light-s), var(--light-l), 0.3)' }}
                        buttonStyle         = {{ backgroundColor: 'hsla(var(--primary-h), var(--primary-s), var(--primary-l), 1)', fontSize: '13px', color: 'var(--light)', border: 'var(--border-width) solid var(--light)' }}
                    >
                        {t('global.cookie-consent.description')}
                    </CookieConsent>
                    {
                        customCode ? 
                            <div dangerouslySetInnerHTML={{__html: customCode}}></div>
                        : undefined
                    }
                    {
                        customCss ?
                            <style>
                                {customCss}
                            </style>
                        : undefined
                    }
                </>
            )
        }

    }
    
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default withTrans(Layout)