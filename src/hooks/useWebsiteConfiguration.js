import { useStaticQuery, graphql } from 'gatsby'

export const useWebsiteConfiguration = () => {
    const { wp } = useStaticQuery(
                            graphql`
                                {
                                    wp {
                                        websiteGeneralSettings {
                                            websiteSettings {
                                                settingsSiteTitle
                                                settingsNewsletter {
                                                    settingsNewsletterProvider
                                                    settingsNewsletterUrl
                                                }
                                                settingsSocial {
                                                    settingsSocialYoutubeUrl
                                                    settingsSocialTwitterUrl
                                                    settingsSocialInstagramUrl
                                                    settingsSocialFacebookUrl
                                                }
                                                settingsApp {
                                                    settingsAppNativePrompt
                                                    settingsAppGoogle
                                                    settingsAppApple
                                                }
                                                
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
                                                # Pages Configuration
                                                settingsPages {
                                                    settingsPagesWatch {                                                    
                                                        active
                                                        feedLayout
                                                        itemConfiguration {
                                                            itemBorder
                                                            itemBorderColor
                                                            itemClass
                                                            itemGap
                                                            itemImageAspect
                                                            itemImageFit
                                                            itemImagePosition
                                                            itemOrientation
                                                            itemTruncate
                                                            itemTruncateLines
                                                            itemType
                                                            maxItems
                                                            orderBy
                                                            skip
                                                            sorting
                                                            hideButton
                                                            hideExcerpt
                                                            hideImage
                                                            hideSubtitle
                                                            hideTitle
                                                            buttonBehavior {
                                                                buttonCss
                                                                buttonCssRemoveDefault
                                                                buttonStretch
                                                                buttonTarget
                                                                buttonText
                                                            }
                                                        }
                                                    }
                                                    settingsPagesBlog {                                                    
                                                        active
                                                        feedLayout
                                                        itemConfiguration {
                                                            itemBorder
                                                            itemBorderColor
                                                            itemClass
                                                            itemGap
                                                            itemImageAspect
                                                            itemImageFit
                                                            itemImagePosition
                                                            itemOrientation
                                                            itemTruncate
                                                            itemTruncateLines
                                                            itemType
                                                            maxItems
                                                            orderBy
                                                            skip
                                                            sorting
                                                            hideButton
                                                            hideExcerpt
                                                            hideImage
                                                            hideSubtitle
                                                            hideTitle
                                                            buttonBehavior {
                                                                buttonCss
                                                                buttonCssRemoveDefault
                                                                buttonStretch
                                                                buttonTarget
                                                                buttonText
                                                            }
                                                        }
                                                    }
                                                    settingsPagesCourses {                                                    
                                                        active
                                                        feedLayout
                                                        itemConfiguration {
                                                            itemBorder
                                                            itemBorderColor
                                                            itemClass
                                                            itemGap
                                                            itemImageAspect
                                                            itemImageFit
                                                            itemImagePosition
                                                            itemOrientation
                                                            itemTruncate
                                                            itemTruncateLines
                                                            itemType
                                                            maxItems
                                                            orderBy
                                                            skip
                                                            sorting
                                                            hideButton
                                                            hideExcerpt
                                                            hideImage
                                                            hideSubtitle
                                                            hideTitle
                                                            buttonBehavior {
                                                                buttonCss
                                                                buttonCssRemoveDefault
                                                                buttonStretch
                                                                buttonTarget
                                                                buttonText
                                                            }
                                                        }
                                                    }
                                                    settingsPagesEvents {                                                    
                                                        active
                                                        feedLayout
                                                        itemConfiguration {
                                                            itemBorder
                                                            itemBorderColor
                                                            itemClass
                                                            itemGap
                                                            itemImageAspect
                                                            itemImageFit
                                                            itemImagePosition
                                                            itemOrientation
                                                            itemTruncate
                                                            itemTruncateLines
                                                            itemType
                                                            maxItems
                                                            orderBy
                                                            skip
                                                            sorting
                                                            hideButton
                                                            hideExcerpt
                                                            hideImage
                                                            hideSubtitle
                                                            hideTitle
                                                            buttonBehavior {
                                                                buttonCss
                                                                buttonCssRemoveDefault
                                                                buttonStretch
                                                                buttonTarget
                                                                buttonText
                                                            }
                                                        }
                                                    }
                                                    settingsPagesGroups {                                                    
                                                        active
                                                        feedLayout
                                                        itemConfiguration {
                                                            itemBorder
                                                            itemBorderColor
                                                            itemClass
                                                            itemGap
                                                            itemImageAspect
                                                            itemImageFit
                                                            itemImagePosition
                                                            itemOrientation
                                                            itemTruncate
                                                            itemTruncateLines
                                                            itemType
                                                            maxItems
                                                            orderBy
                                                            skip
                                                            sorting
                                                            hideButton
                                                            hideExcerpt
                                                            hideImage
                                                            hideSubtitle
                                                            hideTitle
                                                            buttonBehavior {
                                                                buttonCss
                                                                buttonCssRemoveDefault
                                                                buttonStretch
                                                                buttonTarget
                                                                buttonText
                                                            }
                                                        }
                                                    }
                                                    settingsPagesMinistries {                                                    
                                                        active
                                                        feedLayout
                                                        itemConfiguration {
                                                            itemBorder
                                                            itemBorderColor
                                                            itemClass
                                                            itemGap
                                                            itemImageAspect
                                                            itemImageFit
                                                            itemImagePosition
                                                            itemOrientation
                                                            itemTruncate
                                                            itemTruncateLines
                                                            itemType
                                                            maxItems
                                                            orderBy
                                                            skip
                                                            sorting
                                                            hideButton
                                                            hideExcerpt
                                                            hideImage
                                                            hideSubtitle
                                                            hideTitle
                                                            buttonBehavior {
                                                                buttonCss
                                                                buttonCssRemoveDefault
                                                                buttonStretch
                                                                buttonTarget
                                                                buttonText
                                                            }
                                                        }
                                                    }
                                                    settingsPagesVolunteer {                                                    
                                                        active
                                                        feedLayout
                                                        itemConfiguration {
                                                            itemBorder
                                                            itemBorderColor
                                                            itemClass
                                                            itemGap
                                                            itemImageAspect
                                                            itemImageFit
                                                            itemImagePosition
                                                            itemOrientation
                                                            itemTruncate
                                                            itemTruncateLines
                                                            itemType
                                                            maxItems
                                                            orderBy
                                                            skip
                                                            sorting
                                                            hideButton
                                                            hideExcerpt
                                                            hideImage
                                                            hideSubtitle
                                                            hideTitle
                                                            buttonBehavior {
                                                                buttonCss
                                                                buttonCssRemoveDefault
                                                                buttonStretch
                                                                buttonTarget
                                                                buttonText
                                                            }
                                                        }
                                                    }
                                                }
                                                # Pages End

                                            }
                                        }
                                    }
                                }
                            `
                        )   
    return wp.websiteGeneralSettings.websiteSettings
}