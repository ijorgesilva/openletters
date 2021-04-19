// Components
import React from 'react'
import { Link } from 'gatsby'
import { useTranslation } from 'react-i18next'

// Assets
import { useWebsiteConfiguration } from '../../hooks/useWebsiteConfiguration'
import "./footerSimpleText.scss"
import config from '../../../data/SiteConfig'

export default function FooterSimpleText( { campus } ) {
    
    /* Standard fields */
    const { t } = useTranslation()
    const settings = useWebsiteConfiguration()
    const defaultCampusSlug = useWebsiteConfiguration().settingsDefaultCampus.slug
    const getPageCampuses = settings.settingsLegalPage.pageDetails.pageCampus

    let findPageCampus = getPageCampuses.find( x => x.slug === campus )
    let findPageCampusSlug = (findPageCampus?.slug) ? findPageCampus.slug : undefined
    
    /* Todo: Convert this into a Hook */
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

    return (
        <footer className="footerSimpleText z-index-2">
            <div className="c-container  z-index-1 position-relative">
                <div className="copyright">
                    {  
                        ( settings.settingsFooter?.settingsFooterDisclaimer ) ?
                            settings.settingsFooter.settingsFooterDisclaimer
                        :
                            t('global.legal.disclaimer')
                    }
                    {
                        (settings.settingsLegalPage?.slug) ?
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