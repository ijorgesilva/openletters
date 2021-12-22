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
    `,
    referenceCampus: `
        ... on WpCampus {
            id
            title
            slug
            status
            databaseId
        }
    `,
    blurbConfiguration: `
        sectionBlurbsConfigurationOrientation
        sectionBlurbsConfigurationType
        sectionBlurbsConfigurationDirection
        sectionBlurbsConfigurationStretch
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
        allWpRedirect: `
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
        `
}

module.exports = queriesCommon;