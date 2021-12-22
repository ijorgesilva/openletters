const queriesBlurb  = require('./queriesBlurb')
const queriesCommon = require('./queriesCommon')
const queriesFeed   = require('./queriesFeed')
const queriesMenus  = require('./queriesMenus')

const queriesSections = `

    sectionType
        
    # General
    sectionTitle
    sectionContent

    # Configuration: Style, Background, etc.
    sectionConfiguration {
        sectionConfigurationClassname
        sectionConfigurationId
        sectionConfigurationColorScheme
        sectionConfigurationContainerWidth
        sectionConfigurationSize

        sectionConfigurationBackground {
            ${queriesCommon.backgroundLayer}
        }
    }

    # Sections
        ## Call To Actions
        sectionCta {
            sectionCtaSubtitle
            sectionCtaLink {
                sectionLinkText
                sectionLinkType
                sectionLinkUrl
            }
            sectionCtaButton {
                sectionButtonUrl
                sectionButtonType
                sectionButtonText
            }
            sectionCtaPhoto {
                ${queriesCommon.localFile}
            }
        }

        ## Podcast
        sectionPodcast {
            sectionPodcastSubtitle
            sectionPodcastItunesUrl
            sectionPodcastSpotifyUrl
            sectionPodcastSoundcloudUrl
            sectionPodcastGraphic {
                ${queriesCommon.localFile}
            }
        }

        ## VOD by Tag
        sectionVodTags {
            sectionVodTag {
                slug
                databaseId
                description
                name
                videosOnDemand {
                    nodes {
                        title
                        slug
                        excerpt
                        status
                        ${queriesCommon.featuredImageFields}
                        videoDetails {
                            videoOneLiner
                            videoDayDate
                            videoUrl
                            videoSeries {
                                ... on WpSerie {
                                    id
                                    title
                                    slug
                                }
                            }
                            videoCampus {
                                ${queriesCommon.referenceCampus}
                            }
                        }
                    }
                }
            }
        }

        ## Hero
        sectionHero {
            sectionHeroButtons {
                sectionHeroButton {
                    sectionHeroButtonType
                    sectionHeroButtonTarget
                    sectionHeroButtonText
                    sectionHeroButtonUrl
                    sectionHeroButtonLink
                }
            }
            sectionHeroBackground {
                ${queriesCommon.localFile}
            }
            sectionHeroRelated {
                ... on WpPost {
                    id
                    title
                    slug
                    excerpt
                    modified(formatString: "YYYYMMDD")
                    status
                    nodeType
                    ${queriesCommon.featuredImageFields}
                    ${queriesCommon.language}
                    postDetails {
                        postCampus {
                            ${queriesCommon.referenceCampus}
                        }
                    }
                }
                ... on WpNewspost {
                    id
                    title
                    slug
                    excerpt
                    date(formatString: "YYYYMMDD")
                    modified(formatString: "YYYYMMDD")
                    status
                    nodeType
                    ${queriesCommon.featuredImageFields}
                    ${queriesCommon.language}
                    newsDetails {
                        newsCampus {
                            ${queriesCommon.referenceCampus}
                        }
                    }
                }
                ... on WpEvent {
                    id
                    title
                    slug
                    excerpt
                    modified(formatString: "YYYYMMDD")
                    status
                    nodeType
                    ${queriesCommon.featuredImageFields}
                    ${queriesCommon.language}
                    eventDetails {
                    eventDates {
                        eventDate
                        eventTime
                    }
                    eventCampus {
                            ${queriesCommon.referenceCampus}
                        }
                    }
                }
            }
            sectionHeroConfiguration {
            sectionHeroConfigurationOverlay
            }
        }

        ## Page Menu
        sectionPagemenu {
            sectionSticky
            sectionPagemenuMenu{
                ${queriesMenus}
            }
        }

        ## Text
        ### Because Text section contain nested elements is also under allWpPage.
        ### Object Fields / Relashionship elements has been removed below.
        sectionText {
            sectionTextButtons {
                sectionTextButton {
                    ${queriesCommon.buttons}
                }
            }
            sectionTextMedia {
                sectionTextbasicMediaType
                sectionTextbasicMediaAlignment
                sectionTextbasicMediaPhoto {
                    ${queriesCommon.localFile}
                }
            }
            ## Don't loads nested elements
        }

        ## Tabs
        ### Because Tab section contain nested elements is also under allWpPage. 
        ### Object Fields / Relationship elements has been removed below.
        sectionTabs {
            sectionTabsTab {
                sectionTabsTabType
                sectionTabsTabName
                sectionTabsTabContent
            }
        }

        ## Carousel
        sectionCarousel {
            sectionCarouselType
            sectionCarouselFeed {
                ${queriesFeed}
            }
            sectionCarouselItems {
                ${queriesBlurb}
            }
            sectionCarouselConfiguration {
                ${queriesCommon.carouselConfiguration}
            }
        }

        ## Blurb
        sectionBlurbs {
            sectionBlurbsType
            sectionBlurbsFeed {
                ${queriesFeed}
            }
            sectionBlurbsItems {
                ${queriesBlurb}
            }
            sectionBlurbsConfiguration {
                ${queriesCommon.blurbConfiguration}
            }
        }

        ## Share
        sectionShare {
            sectionShareNetworks {
                sectionShareNetworksType
                sectionShareNetworksEmail {
                    sectionShareNetworksEmailBody
                    sectionShareNetworksEmailCustomUrl
                    sectionShareNetworksEmailCustomUrlUrl
                    sectionShareNetworksEmailSubject
                }
                sectionShareNetworksFacebook {
                    sectionShareNetworksFacebookCustomUrl
                    sectionShareNetworksFacebookCustomUrlUrl
                    sectionShareNetworksFacebookHashtags
                    sectionShareNetworksFacebookQuote
                }
                sectionShareNetworksPocket {
                    sectionShareNetworksPocketCustomUrl
                    sectionShareNetworksPocketCustomUrlUrl
                    sectionShareNetworksPocketTitle
                }
                sectionShareNetworksTelegram {
                    sectionShareNetworksTelegramCustomUrl
                    sectionShareNetworksTelegramCustomUrlUrl
                    sectionShareNetworksTelegramTitle
                }
                sectionShareNetworksTwitter {
                    sectionShareNetworksTwitterCustomUrl
                    sectionShareNetworksTwitterCustomUrlUrl
                    sectionShareNetworksTwitterHashtags
                    sectionShareNetworksTwitterRelated
                    sectionShareNetworksTwitterTitle
                    sectionShareNetworksTwitterVia
                }
                sectionShareNetworksWhatsapp {
                    sectionShareNetworksWhatsappCustomUrl
                    sectionShareNetworksWhatsappCustomUrlUrl
                    sectionShareNetworksWhatsappTitle
                }
            }
            sectionShareImage {
            sectionShareImageAlignment
            sectionShareImageImage {
                ${queriesCommon.localFile}
            }
            }
            sectionShareItemClass
        }

        ## Video
        sectionVideo {
            sectionVideoUrl
            sectionVideoThumbnail {
                localFile {
                    publicURL
                }
            }
            sectionVideoConfiguration {
                sectionVideoConfigurationControls
                sectionVideoConfigurationLight
                sectionVideoConfigurationLoop
                sectionVideoConfigurationMuted
                sectionVideoConfigurationPip
                sectionVideoConfigurationVolume
                sectionVideoConfigurationWidth
                sectionVideoConfigurationHeight
                sectionVideoConfigurationMaxWidth
                sectionVideoConfigurationAutoplay
            }
        }

        ## IFrame
        sectionIframe {
            sectionIframeType
            sectionIframeCustom
            sectionIframeOembed
        }
        
        ## Accordion
        sectionAccordion {
            sectionAccordionItem {
                itemTitle
                itemContent
                itemCss
                itemCssRemoveDefault
            }
            sectionAccordionConfiguration {
                sectionAccordionConfigurationClass
                sectionAccordionConfigurationAccordionClass
            }
        }

        ## Form
        sectionForm {
            sectionFormType
            sectionFormIframe
            sectionFormForm {
                ... on WpForm {
                    id
                    title
                    uri
                    status
                    formDetails {
                        formGeneral {
                            formGeneralTitle
                            formGeneralContent
                        }
                    }
                }
            }
            sectionFormColumns {
                sectionFormColumnsText
                sectionFormColumnsAlignment
                sectionFormColumnsBackground {
                    ${queriesCommon.backgroundLayer}
                }
            }
            sectionFormConfiguration {
                sectionFormConfigurationClass
                sectionFormConfigurationJumbotron
                sectionFormConfigurationJumbotronMode
                sectionFormConfigurationJumbotronPadding
                sectionFormConfigurationJumbotronFluid
                sectionFormConfigurationQuerystring
            }
        }

        ## Follow Us
        sectionFollow {
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
            sectionFollowConfiguration {
                sectionFollowConfigurationAlignment
            }
        }

        ## Album
        sectionAlbum {
            sectionAlbumItems {
                album {
                    albumTitle
                    albumSubtitle
                    albumCover {
                        ${queriesCommon.localFile}
                    }
                }
                availableon {
                    availableonType
                    availableonSpotify
                    availableonTidal
                    availableonPandora
                    availableonDeezer
                    availableonApple
                    availableonAmazon
                }
                song {
                    songTitle
                    songAuthor
                    songDuration
                    songResources {
                        ${queriesBlurb}
                    }
                }
            }
            sectionAlbumConfiguration {
                ${queriesCommon.carouselConfiguration}
            }
        }

    # End Sections

`

module.exports = queriesSections