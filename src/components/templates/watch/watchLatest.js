import React from 'react'
import { useTranslation } from 'react-i18next'

import config from '../../../../data/SiteConfig'
import { useGlobalIndeces } from '../../../hooks/useGlobalIndeces'
import FooterSimpleText from '../../footer/footerSimpleText'
import HeaderPage from '../../headerPage'
import MenuPage from '../../menu/menuPage'
import Navigation from '../../menu/navigation'
import PageSearch from '../../search/pageSearch'

export default function WatchLatest( { location, pageContext } ) {

    const { title, breadcrumbs } = pageContext

    const { t } = useTranslation()
    const mode          = 'dark'
    const contentMode   = 'light'
    
    let searchIndices   = [{ name: `videos`, title: `Messages` }]

    return (
        <>

            <HeaderPage 
                title       = { t('global.watch.title') + ' | ' + title  }
                location    = { location } 
                className   = 'watchLatest'
                mode        = { contentMode }
                cover       = {''}
                description = { t('global.watch.meta-description')}
            />
            
            <Navigation
                location        = { location }
                campus          = { breadcrumbs.campus }
                searchIndices   = { useGlobalIndeces() }
                mode            = { mode }
                menuGlobal
                menuLocal
            />
            
            <MenuPage
                mode        = { mode }
                menuBrand   =   { 
                                    {
                                        'name': t('global.watch.title'),
                                        'link': `/${breadcrumbs.campus}/${config.watchSlug}`, 
                                    }
                                } 
                menu        =   { 
                                    [
                                        {
                                            'name': t('global.watch.latest'), 
                                            'link': `/${breadcrumbs.campus}/${config.watchSlug}/${config.watchSlugLatest}`, 
                                        }
                                    ]
                                }
                close       = { breadcrumbs.back }
            />

            <PageSearch 
                indices     = { searchIndices[0].name }
                mode        = { contentMode }
                campus      = { breadcrumbs.campus }
                className   = { '' }
                hitsPerPage = { config.hitsPerPage }
                buttonText  = { t('global:global.watch.watch-now') }
            />

            <FooterSimpleText 
                campus = { breadcrumbs.campus } 
                mode   = { contentMode }
            />
        </>
    )
}