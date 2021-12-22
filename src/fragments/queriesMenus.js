const queriesCommon = require('./queriesCommon')

const queriesMenus = `
    ... on WpCustomMenu {
        id
        status
        menuDetails {
            menuCustomTitle
            menuLocation
            menuCss
            menuId
            menuColorScheme
            menuCampusMenu {
                menuCampusMenuItems {
                    menuCampusMenuItem {
                        menuCampusMenuItemTitle
                        menuCampusMenuItemType
                        menuCampusMenuItemWatch
                        menuCampusMenuItemBlog {
                            fieldGroupName
                        }
                        menuCampusMenuItemCustom {
                            menuCampusMenuItemCustomUrl
                            menuCampusMenuItemCustomTitle
                            menuCampusMenuItemCustomTarget
                            menuCampusMenuItemCustomLinkType
                        }
                        menuCampusMenuItemDropdown {
                            menuCampusMenuItemDropdownMegamenu
                            menuCampusMenuItemDropdownItems {
                                menuItemGroupDropdownItemTitle
                                menuItemGroupDropdownItemType
                                menuItemGroupDropdownItemGroupWatch
                                menuItemGroupDropdownItemGroupNews {
                                    fieldGroupName
                                }
                                menuItemGroupDropdownItemGroupEvents {
                                    fieldGroupName
                                }
                                menuItemGroupDropdownItemGroupCustom {
                                    menuItemGroupDropdownItemGroupCustomTitle
                                    menuItemGroupDropdownItemGroupCustomUrl
                                    menuItemGroupDropdownItemGroupCustomTarget
                                    menuItemGroupDropdownItemGroupCustomLinkType
                                }
                                menuItemGroupDropdownItemGroupBlog {
                                    fieldGroupName
                                }
                            }
                        }
                        menuCampusMenuItemEvents {
                            fieldGroupName
                        }
                        menuCampusMenuItemNews {
                            fieldGroupName
                        }
                        menuCampusMenuItemPage {
                            menuCampusMenuItemPageTitle
                            menuCampusMenuItemPagePage {
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
                        }
                    }
                }
            }
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
`

module.exports = queriesMenus;