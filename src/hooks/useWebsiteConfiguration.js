import { useStaticQuery, graphql } from 'gatsby'

export const useWebsiteConfiguration = () => {
    const { wp } = useStaticQuery(
                            graphql`
                                {
                                    wp {
                                        websiteSettings {
                                            websiteSettings {
                                                settingsSiteTitle
                                                
                                                settingsCode
                                                settingsCss

                                                settingsLegalPage {
                                                    ... on WpPage {
                                                        id
                                                        slug
                                                        title
                                                        pageDetails {
                                                            pageCampus {
                                                                ... on WpCampus {
                                                                    id
                                                                    slug
                                                                }
                                                            }
                                                        }
                                                    }
                                                }

                                                settingsFooter {
                                                    settingsFooterDisclaimer
                                                }
                                                
                                                settingsMenus {
                                                    settingsMenuCampusSelector
                                                }
                                                
                                                settingsDefaultCampus {
                                                    ... on WpCampus {
                                                        id
                                                        title
                                                        slug
                                                    }
                                                }

                                                settingsAuthentication {
                                                    settingsAuthenticationActive
                                                    settingsAuthenticationType
                                                    settingsAuthenticationTypeExternal {
                                                        settingsAuthenticationTypeExternalTarget
                                                        settingsAuthenticationTypeExternalUrl
                                                    }
                                                }

                                            }
                                        }
                                    }
                                }

                            `
                        )   
    return wp.websiteSettings.websiteSettings
}