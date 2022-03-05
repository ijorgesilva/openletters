import config from '../../data/SiteConfig'

import { useGetBestCampus } from './useGetBestCampus'
import { useWebsiteConfiguration } from './useWebsiteConfiguration'


export const useCreateMainMenu = ( 
        campus, 
        rawMenu // Accepts useWebsiteConfigurationMenus() data structure
    ) => {
    let rawMenuItems = []

    let parsedMenuArr = []
    let parsedMenu = {}
    
    let menuConf = {}
    let parsedItem
    let item
    let itemTitle
    let rootItem
    let subItem
    
    const webConf = useWebsiteConfiguration()

    if( rawMenu?.status === 'publish' && campus ) {
        rawMenuItems = rawMenu.menuDetails.mainMenu.mainMenuItems
        menuConf  = {
            'slug'      : rawMenu.slug,
            'mode'      : rawMenu.menuDetails.menuColorScheme?.split(':')[0] ? rawMenu.menuDetails.menuColorScheme.split(':')[0] : 'light',
            'css'       : rawMenu.menuDetails.menuCss ? rawMenu.menuDetails.menuCss : '',
            'id'        : rawMenu.menuDetails.menuId ? rawMenu.menuDetails.menuId : '',
            'collapse'  : rawMenu.menuDetails.menuCollapse ? rawMenu.menuDetails.menuCollapse : true,
        }
        parsedMenu['conf'] = menuConf
        
        /* Parsing Raw Menu */
        rawMenuItems.forEach( _ => {
            item = _.mainMenuItem
            itemTitle = item.mainMenuItemTitle
            
            switch ( item.mainMenuItemType ){

                /* CUSTOM */
                case 'custom' : {
                    rootItem = item.mainMenuMenuItemCustom
                    parsedItem = {
                                    name: itemTitle, 
                                    link: rootItem.mainMenuItemCustomUrl, 
                                    class: `${ item.configuration?.style?.cssClass ? item.configuration.style.cssClass : '' } ${ item.configuration?.responsiveness?.visibility ? item.configuration.responsiveness.visibility.replace('_', ' ') : ''} ${ rootItem.buttonStyle != undefined ? 'btn btn-'+rootItem.buttonStyle : ''}`,
                                    type: item.mainMenuItemType,
                                    target: rootItem.mainMenuItemCustomTarget,
                                }
                    parsedMenuArr.push(parsedItem)
                    break
                }

                /* WATCH */
                case 'watch' : {
                    rootItem = item.mainMenuItemWatch
                    parsedItem = {
                                    name: itemTitle, 
                                    link: `/${useGetBestCampus( campus )}/${config.watchSlug}`, 
                                    class: `${ item.configuration?.style?.cssClass ? item.configuration.style.cssClass : '' } ${ item.configuration?.responsiveness?.visibility ? item.configuration.responsiveness.visibility.replace('_', ' ') : ''} ${ rootItem.buttonStyle != undefined ? 'btn btn-'+rootItem.buttonStyle : ''}`,
                                    type: item.mainMenuItemType,
                                }
                    parsedMenuArr.push(parsedItem)
                    break
                }

                /* BLOG */
                case 'blog' : {
                    rootItem = item.mainMenuItemBlog
                    parsedItem = {
                                    name: itemTitle, 
                                    link: `/${useGetBestCampus( campus )}/${config.blogPostDetailsSlug}`, 
                                    class: `${ item.configuration?.style?.cssClass ? item.configuration.style.cssClass : '' } ${ item.configuration?.responsiveness?.visibility ? item.configuration.responsiveness.visibility.replace('_', ' ') : ''} ${ rootItem.buttonStyle != undefined ? 'btn btn-'+rootItem.buttonStyle : ''}`,
                                    type: item.mainMenuItemType,
                                }
                    parsedMenuArr.push(parsedItem)
                    break
                }

                /* NEWS */
                case 'news' : {
                    rootItem = item.mainMenuItemNews
                    parsedItem = {
                                    name: itemTitle, 
                                    link: `/${useGetBestCampus( campus )}/${config.newsPostDetailsSlug}`, 
                                    class: `${ item.configuration?.style?.cssClass ? item.configuration.style.cssClass : '' } ${ item.configuration?.responsiveness?.visibility ? item.configuration.responsiveness.visibility.replace('_', ' ') : ''} ${ rootItem.buttonStyle != undefined ? 'btn btn-'+rootItem.buttonStyle : ''}`,
                                    type: item.mainMenuItemType,
                                }
                    parsedMenuArr.push(parsedItem)
                    break
                }

                /* EVENTS */
                case 'events' : {
                    rootItem = item.mainMenuItemEvents
                    parsedItem = {
                                    name: itemTitle, 
                                    link: `/${useGetBestCampus( campus )}/${config.eventPostDetailsSlug}`, 
                                    class: `${ item.configuration?.style?.cssClass ? item.configuration.style.cssClass : '' } ${ item.configuration?.responsiveness?.visibility ? item.configuration.responsiveness.visibility.replace('_', ' ') : ''} ${ rootItem.buttonStyle != undefined ? 'btn btn-'+rootItem.buttonStyle : ''}`,
                                    type: item.mainMenuItemType,
                                }
                    parsedMenuArr.push(parsedItem)
                    break
                }

                /* DROPDOWN */
                case 'dropdown' : {
                    rootItem = item.mainMenuItemDropdown
                    parsedItem = {
                        name: itemTitle, 
                        link: '', 
                        class: `${ item.configuration?.style?.cssClass ? item.configuration.style.cssClass : '' } ${ item.configuration?.responsiveness?.visibility ? item.configuration.responsiveness.visibility.replace('_', ' ') : ''}`,
                        megamenu: item.mainMenuItemDropdown.mainMenuItemDropdownMegamenu ? true : false,
                        columns: item.mainMenuItemDropdown.mainMenuItemDropdownMegamenuColumns,
                        type: item.mainMenuItemType,
                        submenu: []
                    }
                    if ( item.mainMenuItemDropdown.mainMenuItemDropdownItems.length > 0 ){
                        item.mainMenuItemDropdown.mainMenuItemDropdownItems.forEach( sub => {
                            itemTitle = sub.menuItemGroupDropdownItemTitle
                            /* Dropdown Subitems */
                            switch( sub.menuItemGroupDropdownItemType ){
                                case 'header': {
                                    subItem = sub.menuItemGroupDropdownItemGroupHeader
                                    parsedItem.submenu.push({
                                        name: itemTitle, 
                                        link: '', 
                                        class: `${ sub.configuration?.style?.cssClass ? sub.configuration.style.cssClass : ''} ${ sub.configuration?.responsiveness?.visibility ? sub.configuration.responsiveness.visibility.replace('_', ' ') : ''}`,
                                        header: true,
                                        columns: sub.megaMenuColumn,
                                        type: sub.menuItemGroupDropdownItemType,
                                    })
                                    break
                                }
                                case 'customSub': {
                                    subItem = sub.menuItemGroupDropdownItemGroupCustom
                                    parsedItem.submenu.push({
                                        name: itemTitle, 
                                        link:  subItem.menuItemGroupDropdownItemGroupCustomUrl, 
                                        class: `${ sub.configuration?.style?.cssClass ? sub.configuration.style.cssClass : ''} ${ sub.configuration?.responsiveness?.visibility ? sub.configuration.responsiveness.visibility.replace('_', ' ') : ''}`,
                                        target: subItem.menuItemGroupDropdownItemGroupCustomTarget,
                                        columns: sub.megaMenuColumn,
                                        type: sub.menuItemGroupDropdownItemType,
                                    })
                                    break
                                }
                                case 'watchSub': {
                                    subItem = sub.menuItemGroupDropdownItemGroupWatch
                                    parsedItem.submenu.push({
                                        name: itemTitle, 
                                        link: `/${useGetBestCampus( campus )}/${config.watchSlug}`, 
                                        class: `${ sub.configuration?.style?.cssClass ? sub.configuration.style.cssClass : ''} ${ sub.configuration?.responsiveness?.visibility ? sub.configuration.responsiveness.visibility.replace('_', ' ') : ''} ${ subItem.buttonStyle != undefined ? 'btn btn-'+subItem.buttonStyle : ''}`,
                                        columns: sub.megaMenuColumn,
                                        type: sub.menuItemGroupDropdownItemType,
                                    })
                                    break
                                }
                                case 'blogSub': {
                                    subItem = sub.menuItemGroupDropdownItemGroupBlog
                                    parsedItem.submenu.push({
                                        name: itemTitle, 
                                        link: `/${useGetBestCampus( campus )}/${config.blogPostDetailsSlug}`, 
                                        class: `${ sub.configuration?.style?.cssClass ? sub.configuration.style.cssClass : ''} ${ sub.configuration?.responsiveness?.visibility ? sub.configuration.responsiveness.visibility.replace('_', ' ') : ''} ${ subItem.buttonStyle != undefined ? 'btn btn-'+subItem.buttonStyle : '' }`,
                                        columns: sub.megaMenuColumn,
                                        type: sub.menuItemGroupDropdownItemType,
                                    })
                                    break
                                }
                                case 'newsSub': {
                                    subItem = sub.menuItemGroupDropdownItemGroupNews
                                    parsedItem.submenu.push({
                                        name: itemTitle, 
                                        link: `/${useGetBestCampus( campus )}/${config.newsPostDetailsSlug}`, 
                                        class: `${ sub.configuration?.style?.cssClass ? sub.configuration.style.cssClass : ''} ${ sub.configuration?.responsiveness?.visibility ? sub.configuration.responsiveness.visibility.replace('_', ' ') : ''} ${ subItem.buttonStyle != undefined ? 'btn btn-'+subItem.buttonStyle : '' }`,
                                        columns: sub.megaMenuColumn,
                                        type: sub.menuItemGroupDropdownItemType,
                                    })
                                    break
                                }
                                case 'eventsSub': {
                                    subItem = sub.menuItemGroupDropdownItemGroupEvents
                                    parsedItem.submenu.push({
                                        name: itemTitle, 
                                        link: `/${useGetBestCampus( campus )}/${config.eventPostDetailsSlug}`, 
                                        class: `${ sub.configuration?.style?.cssClass ? sub.configuration.style.cssClass : ''} ${ sub.configuration?.responsiveness?.visibility ? sub.configuration.responsiveness.visibility.replace('_', ' ') : ''} ${ subItem.buttonStyle != undefined ? 'btn btn-'+subItem.buttonStyle : '' }`,
                                        columns: sub.megaMenuColumn,
                                        type: sub.menuItemGroupDropdownItemType,
                                    })
                                    break
                                }
                                case 'divider': {
                                    subItem = sub.menuItemGroupDropdownItemGroupDivider
                                    parsedItem.submenu.push({
                                        name: itemTitle, 
                                        link: undefined,
                                        class: `${ sub.configuration?.style?.cssClass ? sub.configuration.style.cssClass : ''} ${ sub.configuration?.responsiveness?.visibility ? sub.configuration.responsiveness.visibility.replace('_', ' ') : ''}`,
                                        columns: sub.megaMenuColumn,
                                        type: sub.menuItemGroupDropdownItemType,
                                    })
                                    break
                                }
                                case 'html': {
                                    subItem = sub.menuItemGroupDropdownItemGroupHtml
                                    parsedItem.submenu.push({
                                        name: itemTitle, 
                                        link: undefined, 
                                        code: subItem.itemGroupHtmlHtml,
                                        class: `${ sub.configuration?.style?.cssClass ? sub.configuration.style.cssClass : ''} ${ sub.configuration?.responsiveness?.visibility ? sub.configuration.responsiveness.visibility.replace('_', ' ') : ''}`,
                                        columns: sub.megaMenuColumn,
                                        type: sub.menuItemGroupDropdownItemType,
                                    })
                                    break
                                }
                                case 'social-links': {
                                    subItem = sub.mainMenuItemSocial
                                    if (subItem.settingsOrigin === 'automatic'){
                                        parsedItem.submenu.push(
                                            {
                                                name: itemTitle, 
                                                link: undefined, 
                                                class: `${ sub.configuration?.style?.cssClass ? sub.configuration.style.cssClass : ''} ${ sub.configuration?.responsiveness?.visibility ? sub.configuration.responsiveness.visibility.replace('_', ' ') : ''}`,
                                                columns: sub.megaMenuColumn,
                                                type: sub.menuItemGroupDropdownItemType,
                                                items: [
                                                    {name: 'Instagram', link: webConf.settingsSocial.settingsSocialInstagramUrl },
                                                    {name: 'Facebook', link: webConf.settingsSocial.settingsSocialFacebookUrl },
                                                    {name: 'Twitter', link: webConf.settingsSocial.settingsSocialTwitterUrl },
                                                    {name: 'Youtube', link: webConf.settingsSocial.settingsSocialYoutubeUrl },
                                                    // TODO: Add same social links as custom
                                                    // {name: 'TikTok', link: subItem.sectionFollowNetworks.sectionFollowNetworksTiktok.sectionFollowNetworksTiktokUrl },
                                                    // {name: 'Pinterest', link: subItem.sectionFollowNetworks.sectionFollowNetworksPinterest.sectionFollowNetworksPinterestUrl },
                                                ]
                                            }
                                        )
                                    }
                                    if (subItem.settingsOrigin === 'custom'){
                                        parsedItem.submenu.push(
                                            {
                                                name: itemTitle, 
                                                link: undefined, 
                                                class: `${ sub.configuration?.style?.cssClass ? sub.configuration.style.cssClass : ''} ${ sub.configuration?.responsiveness?.visibility ? sub.configuration.responsiveness.visibility.replace('_', ' ') : ''}`,
                                                columns: sub.megaMenuColumn,
                                                type: sub.menuItemGroupDropdownItemType,
                                                items: [
                                                    {name: 'Instagram', link: subItem.sectionFollowNetworks.sectionFollowNetworksInstagram.sectionFollowNetworksInstagramUrl },
                                                    {name: 'Facebook', link: subItem.sectionFollowNetworks.sectionFollowNetworksFacebook.sectionFollowNetworksFacebookUrl },
                                                    {name: 'Twitter', link: subItem.sectionFollowNetworks.sectionFollowNetworksTwitter.sectionFollowNetworksTwitterUrl },
                                                    {name: 'Youtube', link: subItem.sectionFollowNetworks.sectionFollowNetworksYoutube.sectionFollowNetworksYoutubeUrl },
                                                    {name: 'TikTok', link: subItem.sectionFollowNetworks.sectionFollowNetworksTiktok.sectionFollowNetworksTiktokUrl },
                                                    {name: 'Pinterest', link: subItem.sectionFollowNetworks.sectionFollowNetworksPinterest.sectionFollowNetworksPinterestUrl },
                                                ]
                                            }
                                        )
                                    }
                                    break
                                }
                                case 'app-links': {
                                    subItem = sub.mainMenuItemApp
                                    if (subItem.settingsOrigin === 'automatic'){
                                        parsedItem.submenu.push(
                                            {
                                                name: itemTitle, 
                                                link: undefined, 
                                                class: `${ sub.configuration?.style?.cssClass ? sub.configuration.style.cssClass : ''} ${ sub.configuration?.responsiveness?.visibility ? sub.configuration.responsiveness.visibility.replace('_', ' ') : ''}`,
                                                columns: sub.megaMenuColumn,
                                                type: sub.menuItemGroupDropdownItemType,
                                                items: [
                                                    {name: 'apple', link: webConf.settingsApp.settingsAppApple },
                                                    {name: 'android', link: webConf.settingsApp.settingsAppGoogle },
                                                ]
                                            }
                                        )
                                    }
                                    if (subItem.settingsOrigin === 'custom'){
                                        parsedItem.submenu.push(
                                            {
                                                name: itemTitle, 
                                                link: undefined, 
                                                class: `${ sub.configuration?.style?.cssClass ? sub.configuration.style.cssClass : ''} ${ sub.configuration?.responsiveness?.visibility ? sub.configuration.responsiveness.visibility.replace('_', ' ') : ''}`,
                                                columns: sub.megaMenuColumn,
                                                type: sub.menuItemGroupDropdownItemType,
                                                items: [
                                                    {name: 'apple', link: subItem.customSettings.appleStore },
                                                    {name: 'android', link: subItem.customSettings.googlePlay },
                                                ]
                                            }
                                        )
                                    }
                                    break
                                }
                                case 'newsletter': {
                                    subItem = sub.mainMenuItemNewsletter
                                    if (subItem.settingsOrigin === 'automatic'){
                                        parsedItem.submenu.push(
                                            {
                                                name: undefined,
                                                description: subItem.description,
                                                link: undefined, 
                                                class: `${ sub.configuration?.style?.cssClass ? sub.configuration.style.cssClass : ''} ${ sub.configuration?.responsiveness?.visibility ? sub.configuration.responsiveness.visibility.replace('_', ' ') : ''}`,
                                                columns: sub.megaMenuColumn,
                                                type: sub.menuItemGroupDropdownItemType,
                                                items: [
                                                    { name: webConf.settingsNewsletter.settingsNewsletterProvider, link: webConf.settingsNewsletter.settingsNewsletterUrl },
                                                ]
                                            }
                                        )
                                    }
                                    if (subItem.settingsOrigin === 'custom'){
                                        parsedItem.submenu.push(
                                            {
                                                name: itemTitle,
                                                description: '',
                                                link: undefined, 
                                                class: `${ sub.configuration?.style?.cssClass ? sub.configuration.style.cssClass : ''} ${ sub.configuration?.responsiveness?.visibility ? sub.configuration.responsiveness.visibility.replace('_', ' ') : ''}`,
                                                columns: sub.megaMenuColumn,
                                                type: sub.menuItemGroupDropdownItemType,
                                                items: [
                                                    { name: subItem.customSettings.newsletterProvider, link: subItem.customSettings.newsletterUrl },
                                                ]
                                            }
                                        )
                                    }
                                    break
                                }
                            }
                            /* END Dropdown Subitems */
                        })
                    }
                    parsedMenuArr.push(parsedItem)
                    break
                }

            }
        })
        parsedMenu['items'] = parsedMenuArr
        /* End Parsing Raw Menu */

    }

    return parsedMenu
}