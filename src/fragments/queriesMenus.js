const queriesCommon = require('./queriesCommon')

const queriesMenus = {
    widgetMenu: `
        ... on WpCustomMenu {
            id
            status
            menuDetails {
                menuCustomTitle
                menuCss
                menuId
                menuColorScheme
                menuPagesMenu {
                    menuPageMenuItems {
                        menuPageMenuItem {
                            menuPageMenuItemType
                            menuPageMenuItemPage {
                                menuPageMenuItemPageTitle
                                menuPageMenuItemPagePage {
                                    ... on WpPage {
                                        id
                                        slug
                                        status
                                        pageDetails {
                                            pageCampus {
                                                ${queriesCommon.referenceCampus}
                                            }
                                        }
                                        ${queriesCommon.wpParent}
                                    }
                                }
                                menuPageMenuItemPageCss
                                menuPageMenuItemPageRemoveDefault
                            }
                            menuPageMenuItemCustom {
                                menuPageMenuItemCustomLinkType
                                menuPageMenuItemCustomTarget
                                menuPageMenuItemCustomTitle
                                menuPageMenuItemCustomUrl
                                menuPageMenuItemCustomCss
                                removeDefaultCssClasses
                            }
                        }
                    }
                    menuPagesMenuBase {
                        menuPagesMenuHideBase
                        menuPagesMenuBaseUrl
                        menuPagesMenuBaseTitle
                    }
                }
            }
        }
    `,
}

module.exports = queriesMenus;