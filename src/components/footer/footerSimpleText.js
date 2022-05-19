import { Link } from 'gatsby'
import React from 'react'
import { useTranslation } from 'react-i18next'

import config from '../../../data/SiteConfig'
import { useTheme } from '../../hooks/useTheme'
import { useWebsiteConfiguration } from '../../hooks/useWebsiteConfiguration'
import "./footerSimpleText.scss"

export default function FooterSimpleText( 
    { 
        campus, 
        mode, 
        hideLinks // Boolean: Hide the Footer Links when true
    } 
) {
    
    const { t } = useTranslation()
    const settings = useWebsiteConfiguration()
    const defaultCampusSlug = useWebsiteConfiguration().settingsDefaultCampus.slug
    const getPageCampuses = settings.settingsLegalPage.pageDetails.pageCampus
    const theme = useTheme()

    let findPageCampus = getPageCampuses.find( x => x.slug === campus )
    let findPageCampusSlug = (findPageCampus?.slug) ? findPageCampus.slug : undefined
    
    let bestCampusSlug =   ( findPageCampusSlug ) ?
                                ( findPageCampusSlug === campus ) ?
                                    campus
                                :
                                    ( findPageCampusSlug === defaultCampusSlug ) ?
                                        defaultCampusSlug
                                    :
                                        getPageCampuses[0].slug
                            :
                                getPageCampuses[0].slug
    const hideLink = hideLinks ? true : false

    return (
        <footer className={`footerSimpleText z-index-2 ${ mode ? mode : theme?.layout.header.mode ? theme.layout.header.mode : 'light' }`}>
            <div className="c-container  z-index-1 position-relative">
                <div className="copyright">
                    {  
                        ( settings.settingsFooter?.settingsFooterDisclaimer ) ?
                            settings.settingsFooter.settingsFooterDisclaimer
                        :
                            t('global.legal.disclaimer')
                    }
                    {
                        (settings.settingsLegalPage?.slug && !hideLink ) ?
                            <div className="links">
                                <Link 
                                    to={ '/' + bestCampusSlug + '/' + config.pagesSlug + '/' + settings.settingsLegalPage.slug }
                                    title={settings.settingsLegalPage.title}
                                    className="link"
                                >
                                        {settings.settingsLegalPage.title}
                                </Link>
                            </div>

                        :
                            undefined
                    }
                </div>
            </div>
            <div className="background z-index-0"></div>
        </footer>
    )
}