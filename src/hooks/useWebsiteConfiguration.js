import { useStaticQuery, graphql } from 'gatsby'

export const useWebsiteConfiguration = () => {
    const { wp } = useStaticQuery(
                            graphql`
                                {
                                    wp {
                                        websiteSettings {
                                            websiteSettings {
                                                settingsSiteTitle
                                                settingsMenus {
                                                    settingsMenuCampusSelector
                                                }
                                                settingsGraphics {
                                                    settingsLogo {
                                                        localFile {
                                                            childImageSharp {
                                                                gatsbyImageData
                                                            }
                                                        }
                                                    }
                                                }
                                                settingsDefaultCampus {
                                                    ... on WpCampus {
                                                        id
                                                        title
                                                        slug
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