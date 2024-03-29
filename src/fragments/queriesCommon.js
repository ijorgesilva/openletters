const queriesCommon = {

    /************************* 
     * Fragments 
     *************************/
    language: `
        language {
            code
            locale
            name
        }
    `,
    tag: `
        id
        slug
        name
    `,
    wpParent: `
        wpParent {
            node {
                id
                slug
                status
            }
        }
    `,
    seoFields: `
        seo {
            title
            focuskw 
            metaDesc 
            metaKeywords 
            opengraphDescription 
            opengraphImage {
                altText
                uri
                sourceUrl
                title
            }
            opengraphTitle 
            twitterDescription 
            twitterImage {
                altText
                uri
                sourceUrl
                title
            }
            twitterTitle
        }
    `,
    localFile: `
        localFile {
            childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
            }
        }
    `,
    featuredImageFields: `
        featuredImage {
            node {
                localFile {
                    childImageSharp {
                        gatsbyImageData(layout: FULL_WIDTH)
                    }
                }
            }
        }
    `,
    feedButtonOptions: `
        buttonBehavior {
            buttonText
            buttonTarget
            buttonCss
            buttonCssRemoveDefault
        }
    `,
    buttons: `
        buttonLink
        buttonTarget
        buttonText
        buttonType
        buttonUrl
        buttonCss
        buttonCssRemoveDefault
        buttonModal {
            modalTitle
            modalVideoUrl
            modalWidth
            modalHtml
            modalHeight
            modalFrameless
            modalTransparent
        }
    `,
    itemConfiguration: `
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
    `,
    blurbConfiguration: `
        sectionBlurbsConfigurationOrientation
        sectionBlurbsConfigurationType
        sectionBlurbsConfigurationDirection
        sectionBlurbsConfigurationStretchedBlurb
        sectionBlurbsConfigurationStretchedLink
        sectionBlurbsConfigurationClass
        sectionBlurbsConfigurationGap
        sectionBlurbsConfigurationImagePosition
        sectionBlurbsConfigurationImageFit
        sectionBlurbsConfigurationImageAspect
        sectionBlurbsConfigurationJustification
        sectionBlurbsConfigurationTruncate
        sectionBlurbsConfigurationTruncateLines
        sectionBlurbsConfigurationBorder
        sectionBlurbsConfigurationBorderColor
        sectionBlurbsConfigurationGrow
        hideImage
        hideTitle
        hideSubtitle
        hideExcerpt
        hideButton
    `,
    carouselConfiguration: `
        sectionCarouselConfigurationItemType
        sectionCarouselConfigurationSwipe
        sectionCarouselConfigurationDraggable
        sectionCarouselConfigurationInfinite
        sectionCarouselConfigurationPartiallyVisible
        sectionCarouselConfigurationDots
        sectionCarouselConfigurationDotsClass
        sectionCarouselConfigurationAutoplay
        sectionCarouselConfigurationStretched
        sectionCarouselConfigurationAutoplayInterval
        sectionCarouselConfigurationGap
        sectionCarouselConfigurationClass
        sectionCarouselConfigurationTruncate
        sectionCarouselConfigurationTruncateLines
        sectionCarouselConfigurationImageFit
        sectionCarouselConfigurationImagePosition
        sectionCarouselConfigurationImageAspect
        sectionCarouselConfigurationBorder
        sectionCarouselConfigurationBorderColor
        sectionCarouselConfigurationGrow
        hideImage
        hideTitle
        hideSubtitle
        hideExcerpt
        hideButton
        sectionCarouselConfigurationResponsive {
            responsiveXl {
                responsiveXlCustom
                responsiveXlItems
                responsiveXlMax
                responsiveXlMin
            }
            responsiveL {
                responsiveLCustom
                responsiveLItems
                responsiveLMax
                responsiveLMin
            }
            responsiveS {
                responsiveSCustom
                responsiveSItems
                responsiveSMax
                responsiveSMin
            }
            responsiveXs {
                responsiveXsCustom
                responsiveXsItems
                responsiveXsMax
                responsiveXsMin
            }
        }
    `,
    backgroundLayer: `
        backgroundLayer {
            backgroundLayerType
            backgroundLayerColor {
                backgroundLayerColorColor
                backgroundLayerColorOpacity
            }
            backgroundLayerImage {
                backgroundLayerImageImage {
                    localFile {
                        publicURL
                    }
                }
                backgroundLayerImageOpacity
                backgroundLayerImagePosition
                backgroundLayerImageRepeat
                backgroundLayerImageSize
                backgroundLayerImageSizeCustom
                backgroundLayerImageFixed
            }
            backgroundLayerGradient {
                backgroundLayerGradientType
                backgroundLayerGradientAngle
                backgroundLayerGradientOpacity
                backgroundLayerGradientSteps {
                    step {
                        color
                        stop
                    }
                }
            }
            backgroundLayerText {
                backgroundLayerTextOpacity
                backgroundLayerTextText
            }
        }
    `,
    pageSettings: `
        pageSettings {
            settingsStyles {
                settingsStylesFooter {
                    settingsStylesFooterColor
                }
                settingsStylesHeader {
                    settingsStylesHeaderColor
                }
                settingsStylesGraphics {
                    settingsStylesGraphicsLogo {
                        localFile {
                            childImageSharp {
                                gatsbyImageData(layout: FULL_WIDTH)
                            }
                        }
                    }
                }
            }
        }
    `,
    redirects: `
        ########
        # Redirects 
        ########
        redirects: allWpRedirect {
            nodes {
                redirect {
                    redirectFrompath
                    redirectIspermanent
                    redirectTopath
                }
            }
        }
    `,

    /************************* 
     * Fragments 
     *************************/
    referenceCampus: `
        ... on WpCampus {
            id
            title
            slug
            status
            databaseId
        }
    `,
    wpMinistry: `
        ... on WpMinistry {
            id
            status
            title
            slug
        }
    `
}

module.exports = queriesCommon;