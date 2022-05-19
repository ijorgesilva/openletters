import { useStaticQuery, graphql } from 'gatsby'

export const useWebsiteConfigurationMenus = () => {
    const { wp } = useStaticQuery(
        graphql`
        {
            wp {
                websiteGeneralSettings {
                    websiteSettings {
                        ## Setings Menu
                        settingsMenus {
                            menuPositions {
                                ## Main Menu
                                mainMenu {
                                    ### Menu
                                    menu {
                                        ... on WpMainMenu {
                                            id
                                            status
                                            slug
                                            mainMenuDetails {
                                                menuTitle
                                                menuId
                                                menuCss
                                                menuColorScheme
                                                menuCollapse
                                                mainMenu {
                                                    mainMenuItems {
                                                        mainMenuItem {
                                                            mainMenuItemTitle
                                                            mainMenuItemType
                                                            configuration {
                                                                responsiveness {
                                                                    visibility
                                                                }
                                                                style {
                                                                    cssClass
                                                                }
                                                            }
                                                            ## Root items 
                                                            mainMenuMenuItemCustom {
                                                                mainMenuItemCustomUrl
                                                                mainMenuItemCustomTarget
                                                                mainMenuItemCustomLinkType
                                                                buttonStyle
                                                            }
                                                            mainMenuItemWatch {
                                                                mainMenuItemCampusLocation
                                                                mainMenuItemLiveStreaming
                                                            }
                                                            mainMenuItemNews {
                                                                mainMenuItemCampusLocation
                                                            }
                                                            mainMenuItemEvents {
                                                                mainMenuItemCampusLocation
                                                            }
                                                            mainMenuItemBlog {
                                                                mainMenuItemCampusLocation
                                                            }
                                                            mainMenuItemPage {
                                                                mainMenuItemPageTitle
                                                                mainMenuItemPagePage {
                                                                    ... on WpPage {
                                                                        id
                                                                        slug
                                                                        wpParent {
                                                                            node {
                                                                                id
                                                                                slug
                                                                                status
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                                mainMenuItemCampusLocation
                                                            }
                                                            mainMenuItemDropdown {
                                                                mainMenuItemDropdownMegamenu
                                                                mainMenuItemDropdownMegamenuColumns
                                                                mainMenuItemDropdownItems {
                                                                    menuItemGroupDropdownItemTitle
                                                                    menuItemGroupDropdownItemType
                                                                    megaMenuColumn
                                                                    configuration {
                                                                        responsiveness {
                                                                            visibility
                                                                        }
                                                                        style {
                                                                            cssClass
                                                                        }
                                                                    }
                                                                    ## Sub-items 
                                                                    menuItemGroupDropdownItemGroupWatch {
                                                                        mainMenuItemCampusLocation
                                                                    }
                                                                    menuItemGroupDropdownItemGroupNews {
                                                                        mainMenuItemCampusLocation
                                                                    }
                                                                    menuItemGroupDropdownItemGroupEvents {
                                                                        mainMenuItemCampusLocation
                                                                    }
                                                                    menuItemGroupDropdownItemGroupBlog {
                                                                        mainMenuItemCampusLocation
                                                                    }
                                                                    menuItemGroupDropdownItemGroupCustom {
                                                                        menuItemGroupDropdownItemGroupCustomLinkType
                                                                        menuItemGroupDropdownItemGroupCustomUrl
                                                                        menuItemGroupDropdownItemGroupCustomTarget
                                                                        buttonStyle
                                                                    }
                                                                    menuItemGroupDropdownItemGroupHeader {
                                                                        fieldGroupName
                                                                    }
                                                                    menuItemGroupDropdownItemGroupDivider {
                                                                        fieldGroupName
                                                                    }
                                                                    menuItemGroupDropdownItemGroupHtml {
                                                                        itemGroupHtmlHtml
                                                                    }
                                                                    mainMenuItemSocial {
                                                                        settingsOrigin
                                                                        sectionFollowNetworks {
                                                                            sectionFollowNetworksType
                                                                            sectionFollowNetworksFacebook {
                                                                                sectionFollowNetworksFacebookUrl
                                                                            }
                                                                            sectionFollowNetworksPinterest {
                                                                                sectionFollowNetworksPinterestUrl
                                                                            }
                                                                            sectionFollowNetworksInstagram {
                                                                                sectionFollowNetworksInstagramUrl
                                                                            }
                                                                            sectionFollowNetworksTiktok {
                                                                                sectionFollowNetworksTiktokUrl
                                                                            }
                                                                            sectionFollowNetworksTwitter {
                                                                                sectionFollowNetworksTwitterUrl
                                                                            }
                                                                            sectionFollowNetworksYoutube {
                                                                                sectionFollowNetworksYoutubeUrl
                                                                            }
                                                                        }
                                                                    }
                                                                    mainMenuItemNewsletter {
                                                                        description
                                                                        settingsOrigin
                                                                        customSettings {
                                                                            newsletterProvider
                                                                            newsletterUrl
                                                                        }
                                                                    }
                                                                    mainMenuItemApp {
                                                                        settingsOrigin
                                                                        customSettings {
                                                                            appleStore
                                                                            googlePlay
                                                                        }
                                                                    }
                                                                    ## End Sub-items
                                                                }
                                                            }
                                                            ## End Root items 
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    } ### End Menu
                                } ## End Main Menu

                                ## Top Menu
                                topMenu {
                                    search
                                    languageSelector
                                    campusSelector
                                    ### Menu
                                    menu {
                                        ... on WpMainMenu {
                                            id
                                            status
                                            slug
                                            mainMenuDetails {
                                                menuTitle
                                                menuId
                                                menuCss
                                                menuColorScheme
                                                menuCollapse
                                                mainMenu {
                                                    mainMenuItems {
                                                        mainMenuItem {
                                                            mainMenuItemTitle
                                                            mainMenuItemType
                                                            configuration {
                                                                responsiveness {
                                                                    visibility
                                                                }
                                                                style {
                                                                    cssClass
                                                                }
                                                            }
                                                            ## Root items 
                                                            mainMenuMenuItemCustom {
                                                                mainMenuItemCustomUrl
                                                                mainMenuItemCustomTarget
                                                                mainMenuItemCustomLinkType
                                                                buttonStyle
                                                            }
                                                            mainMenuItemWatch {
                                                                mainMenuItemCampusLocation
                                                                mainMenuItemLiveStreaming
                                                            }
                                                            mainMenuItemNews {
                                                                mainMenuItemCampusLocation
                                                            }
                                                            mainMenuItemEvents {
                                                                mainMenuItemCampusLocation
                                                            }
                                                            mainMenuItemBlog {
                                                                mainMenuItemCampusLocation
                                                            }
                                                            mainMenuItemPage {
                                                                mainMenuItemPageTitle
                                                                mainMenuItemPagePage {
                                                                    ... on WpPage {
                                                                        id
                                                                        slug
                                                                        wpParent {
                                                                            node {
                                                                                id
                                                                                slug
                                                                                status
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                                mainMenuItemCampusLocation
                                                            }
                                                            mainMenuItemDropdown {
                                                                mainMenuItemDropdownMegamenu
                                                                mainMenuItemDropdownMegamenuColumns
                                                                mainMenuItemDropdownItems {
                                                                    menuItemGroupDropdownItemTitle
                                                                    menuItemGroupDropdownItemType
                                                                    megaMenuColumn
                                                                    configuration {
                                                                        responsiveness {
                                                                            visibility
                                                                        }
                                                                        style {
                                                                            cssClass
                                                                        }
                                                                    }
                                                                    ## Sub-items
                                                                    menuItemGroupDropdownItemGroupWatch {
                                                                        mainMenuItemCampusLocation
                                                                    }
                                                                    menuItemGroupDropdownItemGroupNews {
                                                                        mainMenuItemCampusLocation
                                                                    }
                                                                    menuItemGroupDropdownItemGroupEvents {
                                                                        mainMenuItemCampusLocation
                                                                    }
                                                                    menuItemGroupDropdownItemGroupBlog {
                                                                        mainMenuItemCampusLocation
                                                                    }
                                                                    menuItemGroupDropdownItemGroupCustom {
                                                                        menuItemGroupDropdownItemGroupCustomLinkType
                                                                        menuItemGroupDropdownItemGroupCustomUrl
                                                                        menuItemGroupDropdownItemGroupCustomTarget
                                                                        buttonStyle
                                                                    }
                                                                    menuItemGroupDropdownItemGroupHeader {
                                                                        fieldGroupName
                                                                    }
                                                                    menuItemGroupDropdownItemGroupDivider {
                                                                        fieldGroupName
                                                                    }
                                                                    menuItemGroupDropdownItemGroupHtml {
                                                                        itemGroupHtmlHtml
                                                                    }
                                                                    mainMenuItemSocial {
                                                                        settingsOrigin
                                                                        sectionFollowNetworks {
                                                                            sectionFollowNetworksType
                                                                            sectionFollowNetworksFacebook {
                                                                                sectionFollowNetworksFacebookUrl
                                                                            }
                                                                            sectionFollowNetworksPinterest {
                                                                                sectionFollowNetworksPinterestUrl
                                                                            }
                                                                            sectionFollowNetworksInstagram {
                                                                                sectionFollowNetworksInstagramUrl
                                                                            }
                                                                            sectionFollowNetworksTiktok {
                                                                                sectionFollowNetworksTiktokUrl
                                                                            }
                                                                            sectionFollowNetworksTwitter {
                                                                                sectionFollowNetworksTwitterUrl
                                                                            }
                                                                            sectionFollowNetworksYoutube {
                                                                                sectionFollowNetworksYoutubeUrl
                                                                            }
                                                                        }
                                                                    }
                                                                    mainMenuItemNewsletter {
                                                                        settingsOrigin
                                                                        customSettings {
                                                                            newsletterProvider
                                                                            newsletterUrl
                                                                        }
                                                                    }
                                                                    mainMenuItemApp {
                                                                        settingsOrigin
                                                                        customSettings {
                                                                            appleStore
                                                                            googlePlay
                                                                        }
                                                                    }
                                                                    ## End Sub-items
                                                                }
                                                            }
                                                            ## End Root items 
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    } ### End Menu
                                } ## End Top Menu
                            } ## End Menu Positions
                        } ## End Setings Menu
                    }
                }
            }
        }
        `
    )

    return wp.websiteGeneralSettings.websiteSettings.settingsMenus
}