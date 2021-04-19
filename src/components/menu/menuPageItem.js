import React from 'react'
import { Link } from 'gatsby'
import { Nav } from 'react-bootstrap'

import { useWebsiteConfiguration } from '../../hooks/useWebsiteConfiguration'
import config from '../../../data/SiteConfig'

export default function MenuPageItem ( { item, campus } ) {

    // Get Menu Type
    let menuType =  (item?.menuPageMenuItem?.menuPageMenuItemType) ?
                        item.menuPageMenuItem.menuPageMenuItemType.split(':')[0]
                    :
                        undefined
    
    const defaultCampusSlug = useWebsiteConfiguration().settingsDefaultCampus.slug

    switch ( menuType ) {
        case 'page':
            // Resolve (Best) Page URL
            let getItemSlug = item.menuPageMenuItem.menuPageMenuItemPage.menuPageMenuItemPagePage.slug
            let getPageCampuses =   ( item.menuPageMenuItem?.menuPageMenuItemPage?.menuPageMenuItemPagePage?.pageDetails?.pageCampus.length > 0 ) ?
                                        item.menuPageMenuItem.menuPageMenuItemPage.menuPageMenuItemPagePage.pageDetails.pageCampus
                                    :
                                        undefined
            let parentPage  =   (item.menuPageMenuItem.menuPageMenuItemPage?.menuPageMenuItemPagePage?.wpParent?.node?.slug) ?
                                    item.menuPageMenuItem.menuPageMenuItemPage.menuPageMenuItemPagePage.wpParent.node.slug
                                :
                                    undefined

            let bestPageUrl =   (getPageCampuses.find( x => x.slug === campus ).slug === campus ) ?
                                    campus
                                : 
                                    ( getPageCampuses.find( x => x.slug === campus ).slug === defaultCampusSlug ) ?
                                        defaultCampusSlug
                                    :
                                        getPageCampuses[0].slug

            let fullPageUrl = '/' + bestPageUrl + '/' + config.pagesSlug + '/' + ((parentPage) ? parentPage + '/' : '') + getItemSlug

            return (
                <Link 
                    to                  = { fullPageUrl } 
                    className           = "nav-link" 
                    title               = { item.menuPageMenuItem.menuPageMenuItemPage.menuPageMenuItemPageTitle } 
                    activeClassName     = "active"
                >
                    {item.menuPageMenuItem.menuPageMenuItemPage.menuPageMenuItemPageTitle}
                </Link> 
            )
            break
        case 'custom':

            let customItem = item.menuPageMenuItem.menuPageMenuItemCustom

            if ( customItem.menuPageMenuItemCustomLinkType === 'internal' ) {
                return (
                    <Link 
                        to              = {customItem.menuPageMenuItemCustomUrl} 
                        className       = "nav-link" 
                        title           = {customItem.menuPageMenuItemCustomTitle} 
                        activeClassName = "active"
                    >
                        {customItem.menuPageMenuItemCustomTitle}
                    </Link>  
                )
            }
            else if ( customItem.menuPageMenuItemCustomLinkType === 'external' ) {
                return (
                    <Nav.Link 
                        href    = {customItem.menuPageMenuItemCustomUrl} 
                        title   = {customItem.menuPageMenuItemCustomTitle} 
                        target  = {customItem.menuPageMenuItemCustomTarget}
                    >
                        {customItem.menuPageMenuItemCustomTitle}
                    </Nav.Link>
                )       
            }
            break
    }

}