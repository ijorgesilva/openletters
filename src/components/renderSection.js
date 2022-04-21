import React from 'react'
import { useTranslation } from "react-i18next"

import config from '../../data/SiteConfig'
import SectionCarousel from '../components/carousel/sectionCarousel'
import SectionPodcast from '../components/content/sectionPodcast'
import SectionTabs from '../components/content/sectionTabs'
import SectionText from "../components/content/sectionText"
import SectionTextPhoto from '../components/content/sectionTextPhoto'
import HeroDynamic from '../components/hero/heroDynamic'
import MenuPage from '../components/menu/menuPage'
import SectionAlbum from '../components/music/album'
import SectionFollow from '../components/social/sectionFollow'
import SectionShare from '../components/social/sectionShare'
import SectionFeedCarousel from '../components/vod/feed/sectionFeedCarousel'
import { useGetFeed } from '../hooks/useGetFeed'


import SectionAccordion from './accordion/sectionAccordion'
import SectionBlurbs from './content/sectionBlurbs'
import SectionVideo from './content/sectionVideo'
import SectionForm from './form/sectionForm'
import SectionIframe from './iframe/sectionIframe'
import SectionQrCode from './qrcode/sectionQrCode'
import SectionLatestSeries from './vod/feed/sectionLatestSeries'

export default function RenderSection ( 
    { 
        section, 
        filter, 
        campus, 
        location, 
        className,
        mode,
        size,
    }
    ) {
    
    const { t } = useTranslation()

    // General
    const sectionStatus     = ( section.status === 'publish' ) ? true : false
    const sectionType       = ( section.sectionDetails.sectionType?.split(":")[0] ) ? section.sectionDetails.sectionType.split(":")[0] : ''
    const sectionTitle      = ( section.sectionDetails.sectionTitle ) ? section.sectionDetails.sectionTitle : undefined
    const sectionContent    = ( section.sectionDetails.sectionContent ) ? section.sectionDetails.sectionContent : undefined

    const sectionConfiguration = section.sectionDetails.sectionConfiguration
    
    const sectionId             =   ( sectionConfiguration?.sectionConfigurationId ) ? 
                                        sectionConfiguration.sectionConfigurationId 
                                    : section.slug
    const sectionClassname      =   ( sectionConfiguration?.sectionConfigurationClassname ) ? 
                                        `${sectionConfiguration.sectionConfigurationClassname} ${ className ? className : ''}`
                                    : `${ className ? className : ''}`
    const sectionColorScheme    =   ( sectionConfiguration?.sectionConfigurationColorScheme.split(':')[0]  ) ? 
                                        sectionConfiguration.sectionConfigurationColorScheme.split(':')[0] === 'inherit' ?
                                            mode
                                        : sectionConfiguration?.sectionConfigurationColorScheme.split(':')[0]
                                    : 'light'
    const sectionContainerWidth =   ( sectionConfiguration?.sectionConfigurationContainerWidth ) ? 
                                        sectionConfiguration.sectionConfigurationContainerWidth.split(':')[0] 
                                    : 'container'
    const sectionBackground     =   sectionConfiguration?.sectionConfigurationBackground.backgroundLayer
    const sectionSize           =   sectionConfiguration?.sectionConfigurationSize ?
                                        sectionConfiguration.sectionConfigurationSize.split(':')[0]
                                    : size ? size : 'md'


    function sortByDate(a, b) {
        const dateA = parseInt(a.videoDetails.videoDayDate, 10)
        const dateB = parseInt(b.videoDetails.videoDayDate, 10)
        let comparison = 0
        if (dateA < dateB) {
            comparison = 1
        } else if (dateA > dateB) {
            comparison = -1
        }
        return comparison
    }
    
    switch( true ) {

        /*
        * QR Code
        */
        case ( sectionType === 'qrcode' && sectionStatus ): {
            return(
                <SectionQrCode
                    title               = { sectionTitle }
                    id                  = { sectionId }
                    content             = { sectionContent }
                    className           = { sectionClassname }
                    containerWidth      = { sectionContainerWidth }
                    mode                = { sectionColorScheme }
                    size                = { sectionSize }
                    location            = { location }
                    backgroundLayers    = { sectionBackground }
                    destinationType     = { section.sectionDetails.sectionQrcode.sectionQrcodeDestination }
                    destinationUrl      = { section.sectionDetails.sectionQrcode.sectionQrcodeUrl }
                    destinationText     = { section.sectionDetails.sectionQrcode.sectionQrcodeButtonText }
                />
            )
        }

        /*
         * Call To Action
         */
        // TODO: Move buttons to Buttons component on frontend and backend
        case ( sectionType === 'cta' && sectionStatus ): {
            const ctaItem = section.sectionDetails.sectionCta
            return (
                <SectionTextPhoto 
                    id          = { sectionId }
                    title       = { sectionTitle }
                    content     = { sectionContent }
                    className   = { `${ sectionClassname ? sectionClassname : '' }` }
                    mode        = { sectionColorScheme }
                    size        = { sectionSize }
                    width       = { sectionContainerWidth }
                    subtitle    = { (ctaItem.sectionCtaSubtitle) ? ctaItem.sectionCtaSubtitle : undefined }
                    buttonText  = { (ctaItem.sectionCtaButton.sectionButtonText) ? ctaItem.sectionCtaButton.sectionButtonText : undefined }
                    buttonType  = { (ctaItem.sectionCtaButton.sectionButtonType) ? ctaItem.sectionCtaButton.sectionButtonType : undefined }
                    buttonLink  = { (ctaItem.sectionCtaButton.sectionButtonUrl) ?  ctaItem.sectionCtaButton.sectionButtonUrl : undefined }
                    linkText    = { (ctaItem.sectionCtaLink.sectionLinkText) ? ctaItem.sectionCtaLink.sectionLinkText : undefined }
                    linkType    = { (ctaItem.sectionCtaLink.sectionLinkType) ? ctaItem.sectionCtaLink.sectionLinkType : undefined }
                    link        = { (ctaItem.sectionCtaLink.sectionLinkUrl) ?  ctaItem.sectionCtaLink.sectionLinkUrl : undefined }
                    photo       = { (ctaItem.sectionCtaPhoto) ? 
                                        ctaItem.sectionCtaPhoto.localFile.childImageSharp.gatsbyImageData 
                                    : 
                                        undefined 
                                    }
                />
            )
            
        }

        /*
         * Podcast
         */
        case ( sectionType === 'podcast' && sectionStatus ): {
            const podcastItem = section.sectionDetails.sectionPodcast
            return (
                <SectionPodcast 
                    id          = { sectionId }
                    title       = { sectionTitle }
                    content     = { sectionContent }
                    mode        = { sectionColorScheme }
                    className   = { sectionClassname }
                    width       = { sectionContainerWidth }
                    size        = { sectionSize }
                    subtitle    = { (podcastItem.sectionPodcastSubtitle) ? podcastItem.sectionPodcastSubtitle : undefined }
                    Spotify     = { (podcastItem.sectionPodcastSpotifyUrl) ? podcastItem.sectionPodcastSpotifyUrl : undefined }
                    Soundcloud  = { (podcastItem.sectionPodcastSoundcloudUrl) ? podcastItem.sectionPodcastSoundcloudUrl : undefined }
                    iTunes      = { (podcastItem.sectionPodcastItunesUrl) ? podcastItem.sectionPodcastItunesUrl : undefined }
                    graphic     = { (podcastItem.sectionPodcastGraphic) ? 
                                            podcastItem.sectionPodcastGraphic.localFile.childImageSharp.gatsbyImageData 
                                    : 
                                        undefined 
                                    }
                />
            )
            
        }

        /*
         * Videos by Tags
         */
        // TODO: Get order and Count variables from CMS. Both params should be active by default.
        case ( sectionType === 'vodtags' && sectionStatus ): {
            const videoItems = section.sectionDetails.sectionVodTags.sectionVodTag ? section.sectionDetails.sectionVodTags.sectionVodTag : {}

            const filteredVideos = videoItems ? 
                                        videoItems.videosOnDemand?.nodes?.filter( item => (
                                            item.status === 'publish'
                                        )).filter( item => (
                                            item.videoDetails.videoCampus.some( item => item.slug === filter.campus )
                                        ))
                                    :
                                        {}

            return (
                <>
                    {
                        filteredVideos?.length > 0 ?
                            <SectionFeedCarousel 
                                id           = { sectionId }
                                className    = { sectionClassname }
                                title        = { videoItems.name }
                                items        = { filteredVideos.sort(sortByDate)  }
                                mode         = { sectionColorScheme }
                                size         = { sectionSize }
                                width        = { sectionContainerWidth }
                                campus       = { campus }
                                order        = 'asc'
                                count
                                configLayout =  {{
                                                    excerpt: false,
                                                    itemsVisible: 5,
                                                }}
                            />
                        :
                            undefined
                    }
                </>
            )
            
        }

        /*
         * Videos on Series
         */
        case ( sectionType === 'vodseries' && sectionStatus ):{
            return (
                <></>
            )
            
        }

        /*
         * Latest Series
         */
        case ( sectionType === 'latestseries' ): {
            return (
                <SectionLatestSeries 
                    id              = { sectionId }
                    className       = { sectionClassname }
                    title           = { sectionTitle }
                    campus          = { campus }
                    size            = { sectionSize }
                    mode            = { sectionColorScheme }
                    width           = { sectionContainerWidth }
                    configLayout    =  {{
                                            excerpt: false,
                                            itemsVisible: 5,
                                        }}
                />
            )
            
        }

        /*
         * Hero
         */      
        case ( sectionType === 'hero' && sectionStatus ): {
            let relatedPost = null
            let postFilterByCampus
            const postValidContext =    (section.sectionDetails.sectionHero.sectionHeroRelated?.length > 0 ) ?
                                            section.sectionDetails.sectionHero.sectionHeroRelated.filter( 
                                                item => (item.status === 'publish'))
                                        :
                                            ''
            const postType = postValidContext[0]?.nodeType 

            switch( postType ) {

                case 'Post':{

                    postFilterByCampus = postValidContext.filter( item => (
                            item.postDetails.postCampus.some (item => ( item.slug === campus))
                    ))[0]
                    
                    relatedPost = {
                        type: postFilterByCampus.nodeType.toLowerCase(),
                        title: postFilterByCampus.title,
                        subtitle: '',
                        excerpt: postFilterByCampus.excerpt,
                        url: `/${campus}/${config.blogPostDetailsSlug}/${postFilterByCampus.slug}`,
                        tag: t('global.blog.title'),
                        tagClassName: 'badge-secondary',
                        featuredImage:  postFilterByCampus.featuredImage?.node ? 
                                            postFilterByCampus.featuredImage.node.localFile.childImageSharp.gatsbyImageData
                                        :
                                            undefined,
                    }
                    break
                }

                case 'Newspost': {

                    postFilterByCampus = postValidContext.filter( item => (
                        item.newsDetails.newsCampus.some (item => ( item.slug === campus))
                    ))[0]

                    relatedPost = {
                        type: postFilterByCampus.nodeType.toLowerCase(),
                        title: postFilterByCampus.title,
                        subtitle: '',
                        excerpt: postFilterByCampus.excerpt,
                        url: `/${campus}/${config.newsPostDetailsSlug}/${postFilterByCampus.slug}`,
                        tag: t('global.news.title'),
                        tagClassName: 'badge-secondary',
                        featuredImage:  postFilterByCampus.featuredImage?.node ? 
                                            postFilterByCampus.featuredImage.node.localFile.childImageSharp.gatsbyImageData 
                                        : 
                                            undefined,
                    }
                    break
                }
                    

                case 'Event': {

                    postFilterByCampus = postValidContext.filter( item => (
                        item.eventDetails.eventCampus.some (item => ( item.slug === campus))
                    ))[0]
                    
                    relatedPost = {
                        type: postFilterByCampus.nodeType.toLowerCase(),
                        eventDates: postFilterByCampus.eventDetails.eventDates?.length > 0 ? 
                                        postFilterByCampus.eventDetails.eventDates
                                    : 
                                        undefined,
                        title: postFilterByCampus.title,
                        subtitle: '',
                        excerpt: postFilterByCampus.excerpt,
                        url: `/${campus}/${config.eventPostDetailsSlug}/${postFilterByCampus.slug}`,
                        tag: t('global.events.title'),
                        tagClassName: 'badge-secondary',
                        featuredImage:  postFilterByCampus.featuredImage?.node ? 
                                            postFilterByCampus.featuredImage.node.localFile.childImageSharp.gatsbyImageData 
                                        : 
                                            undefined,
                    }
                    break
                }
                    
                default: {
                    break
                }
                    
            }
            
            return (
                <HeroDynamic
                    id              = { sectionId }
                    className       = { sectionClassname }
                    mode            = { sectionColorScheme }
                    width           = { sectionContainerWidth }
                    title           = { sectionTitle }
                    subtitle        = { sectionContent }
                    size            = { sectionSize }
                    backgroundLayers= { sectionBackground }
                    backgroundPhoto = { section.sectionDetails.sectionHero.sectionHeroBackground?.localFile.childImageSharp.gatsbyImageData }
                    buttons         = { section.sectionDetails.sectionHero.sectionHeroButtons?.sectionHeroButton }
                    overlay         = { section.sectionDetails.sectionHero.sectionHeroConfiguration.sectionHeroConfigurationOverlay }
                    related         = { ( relatedPost ) ? relatedPost : undefined }
                    location        = { location }
                />
            )
            
        }

        /*
        * Text Basic
        */
        case ( sectionType === 'text' && sectionStatus ): {
            return(
                <SectionText 
                    id               = { sectionId }
                    title            = { sectionTitle }
                    content          = { sectionContent }
                    className        = { sectionClassname }
                    containerWidth   = { sectionContainerWidth }
                    size             = { sectionSize }
                    mode             = { sectionColorScheme }
                    backgroundLayers = { sectionBackground }
                    buttons          = { section.sectionDetails.sectionText?.sectionTextButtons?.sectionTextButton }
                    media            = { section.sectionDetails.sectionText?.sectionTextMedia }
                    sections         = { section.sectionDetails.sectionText?.sectionTextSections }
                    campus           = { campus }
                    location         = { location }
                />
            )
        }

        /*
        * Page Menu
        */
        case ( sectionType === 'pagemenu' && sectionStatus ): {

            const pageMenu  = section.sectionDetails.sectionPagemenu.sectionPagemenuMenu
            const menuId    = pageMenu.menuDetails.menuId
            const menuCss   = pageMenu.menuDetails.menuCss

            return(
                <>
                    <MenuPage
                        menus       = { pageMenu }
                        mode        = { sectionColorScheme }
                        id          = { section.sectionDetails.sectionId ? section.sectionDetails.sectionId : menuId }
                        campus      = { campus }
                        location    = { location }
                        className   = { `${ sectionClassname ? sectionClassname : ''} ${ menuCss ? menuCss : '' }`}
                        sticky      = { section.sectionDetails.sectionPagemenu.sectionSticky }
                    />
                </>
            )
                
        }

        /*
        * Divider
        */
        case ( sectionType === 'divider' && sectionStatus ):{

            return(
                <hr 
                    id          = { sectionId }
                    className   = {`${ sectionSize ? sectionSize : 'md' } ${ sectionClassname ? sectionClassname : ''}`}
                    style       = {{ width: '100%' }}
                />
            )
            
        }

        /*
        * Tabs
        */
        case ( sectionType === 'tabs' && sectionStatus ): {

            const tabs = section.sectionDetails.sectionTabs?.sectionTabsTab

            return(
                <SectionTabs
                    id              = { sectionId }
                    title           = { sectionTitle }
                    content         = { sectionContent }
                    className       = { sectionClassname }
                    containerWidth  = { sectionContainerWidth }
                    mode            = { sectionColorScheme }
                    size            = { sectionSize }
                    campus          = { campus }
                    location        = { location }
                    tabs            = { tabs }
                />
            )
            
        }

        /*
        * Carousel
        */
        case ( sectionType === 'carousel' && sectionStatus ): {
            const carouselConfiguration     = section.sectionDetails.sectionCarousel.sectionCarouselConfiguration
            const carouselItemsCustom       = section.sectionDetails.sectionCarousel.sectionCarouselItems
            const feedButtonConfiguration   = section.sectionDetails.sectionCarousel.sectionCarouselFeed.buttonBehavior
            
            const carouselFeedType      = section.sectionDetails.sectionCarousel.sectionCarouselType
            const carouselItemsFeed     =   ( carouselFeedType === 'custom' && carouselItemsCustom.length > 0 ) ? 
                                                useGetFeed( carouselItemsCustom, campus )
                                            : 
                                                ( carouselFeedType === 'feed' ) ? 
                                                    useGetFeed( section.sectionDetails.sectionCarousel.sectionCarouselFeed, campus, feedButtonConfiguration ) 
                                                : undefined
            
            return(
                <SectionCarousel 
                    // Section General
                    id              = { sectionId }
                    title           = { sectionTitle }
                    content         = { sectionContent }
                    className       = { sectionClassname }
                    mode            = { sectionColorScheme }
                    containerWidth  = { sectionContainerWidth }
                    size            = { sectionSize }
                    campus          = { campus }
                    location        = { location }
                    backgroundLayers    = { sectionBackground }
                    // Items
                    items           = { carouselItemsFeed }
                    // Configuration
                        // Behavior
                        swipeable       = { carouselConfiguration.sectionCarouselConfigurationSwipe }
                        draggable       = { carouselConfiguration.sectionCarouselConfigurationDraggable }
                        infinite        = { carouselConfiguration.sectionCarouselConfigurationInfinite }
                        partialVisible  = { carouselConfiguration.sectionCarouselConfigurationPartiallyVisible }
                        autoplay        = { carouselConfiguration.sectionCarouselConfigurationAutoplay }
                        stretchedlink   = { carouselConfiguration.sectionCarouselConfigurationStretched }
                        // Aspect
                        itemType        = { carouselConfiguration.sectionCarouselConfigurationItemType }
                        dots            = { carouselConfiguration.sectionCarouselConfigurationDots }
                        dotsClass       = { carouselConfiguration.sectionCarouselConfigurationDotsClass }
                        interval        = { carouselConfiguration.sectionCarouselConfigurationAutoplayInterval }
                        itemClass       = { carouselConfiguration.sectionCarouselConfigurationClass }
                        gap             = { carouselConfiguration.sectionCarouselConfigurationGap }
                        truncate        = { carouselConfiguration.sectionCarouselConfigurationTruncate }
                        truncateLines   = { carouselConfiguration.sectionCarouselConfigurationTruncateLines }
                        imagePosition   = { carouselConfiguration.sectionCarouselConfigurationImagePosition }
                        imageFit        = { carouselConfiguration.sectionCarouselConfigurationImageFit }
                        aspectRatio     = { carouselConfiguration.sectionCarouselConfigurationImageAspect }
                        border          = { carouselConfiguration.sectionCarouselConfigurationBorder }
                        borderColor     = { carouselConfiguration.sectionCarouselConfigurationBorderColor }
                        itemGrow        = { carouselConfiguration.sectionCarouselConfigurationGrow }
                        // Visibility
                        hideImage       = { carouselConfiguration.hideImage }
                        hideTitle       = { carouselConfiguration.hideTitle }
                        hideSubtitle    = { carouselConfiguration.hideSubtitle }
                        hideExcerpt     = { carouselConfiguration.hideExcerpt }
                        hideButton      = { carouselConfiguration.hideButton }
                        // Responsive
                        responsive      = { carouselConfiguration.sectionCarouselConfigurationResponsive }
                />
            )
            
        }

        /*
        * Blurbs
        */
        case ( sectionType === 'blurbs' && sectionStatus ): {
            
            const blurbsConfiguration           = section.sectionDetails.sectionBlurbs.sectionBlurbsConfiguration
            const blurbsItemsCustom             = section.sectionDetails.sectionBlurbs.sectionBlurbsItems
            const blurbsButtonConfiguration     = section.sectionDetails.sectionBlurbs.sectionBlurbsFeed.buttonBehavior
            const blurbsNFSConf                 = section.sectionDetails.sectionBlurbs.sectionNfs

            const blurbsDataType      = section.sectionDetails.sectionBlurbs.sectionBlurbsType
            const blurbsItemsFeed     =   ( blurbsDataType === 'custom' && blurbsItemsCustom.length > 0 ) ? 
                                                useGetFeed(blurbsItemsCustom, campus)
                                            : 
                                                ( blurbsDataType === 'feed' ) ? 
                                                    useGetFeed(section.sectionDetails.sectionBlurbs.sectionBlurbsFeed, campus, blurbsButtonConfiguration) 
                                                : undefined

            return(
                <SectionBlurbs
                    title           = { sectionTitle }
                    id              = { sectionId }
                    content         = { sectionContent }
                    className       = { sectionClassname }
                    mode            = { sectionColorScheme }
                    containerWidth  = { sectionContainerWidth }
                    size            = { sectionSize }
                    items           = { blurbsItemsFeed }
                    backgroundLayers    = { sectionBackground }
                    // Configuration
                    itemType        = { blurbsConfiguration.sectionBlurbsConfigurationType?.split(':')[0] }
                    orientation     = { blurbsConfiguration.sectionBlurbsConfigurationOrientation?.split(':')[0] }
                    direction       = { blurbsConfiguration.sectionBlurbsConfigurationDirection }
                    stretchedLink   = { blurbsConfiguration.sectionBlurbsConfigurationStretchedLink }
                    stretchedBlurb  = { blurbsConfiguration.sectionBlurbsConfigurationStretchedBlurb }
                    justification   = { blurbsConfiguration.sectionBlurbsConfigurationJustification?.split(':')[0] }
                    itemClass       = { blurbsConfiguration.sectionBlurbsConfigurationClass }
                    gap             = { blurbsConfiguration.sectionBlurbsConfigurationGap?.split(':')[0] }
                    truncate        = { blurbsConfiguration.sectionBlurbsConfigurationTruncate }
                    truncateLines   = { blurbsConfiguration.sectionBlurbsConfigurationTruncateLines }
                    imagePosition   = { blurbsConfiguration.sectionBlurbsConfigurationImagePosition }
                    imageFit        = { blurbsConfiguration.sectionBlurbsConfigurationImageFit }
                    aspectRatio     = { blurbsConfiguration.sectionBlurbsConfigurationImageAspect }
                    border          = { blurbsConfiguration.sectionBlurbsConfigurationBorder }
                    borderColor     = { blurbsConfiguration.sectionBlurbsConfigurationBorderColor }
                    itemGrow        = { blurbsConfiguration.sectionBlurbsConfigurationGrow }
                    // Visibility
                    hideImage       = { blurbsConfiguration.hideImage }
                    hideTitle       = { blurbsConfiguration.hideTitle }
                    hideSubtitle    = { blurbsConfiguration.hideSubtitle }
                    hideExcerpt     = { blurbsConfiguration.hideExcerpt }
                    hideButton      = { blurbsConfiguration.hideButton }
                    // Navigation, Filtering and Sorting
                    navigation      = { blurbsNFSConf?.navigation }
                    filtering       = { blurbsNFSConf?.filtering.search }
                />
            )
            
        }
        
        /*
        * Share
        */
        case ( sectionType === 'share' && sectionStatus ): {
            
            const shareImage = section.sectionDetails.sectionShare.sectionShareImage

            return(
                <SectionShare
                    title               = { sectionTitle }
                    id                  = { sectionId }
                    content             = { sectionContent }
                    className           = { sectionClassname }
                    containerWidth      = { sectionContainerWidth }
                    mode                = { sectionColorScheme }
                    size                = { sectionSize }
                    location            = { location }
                    image               = { shareImage.sectionShareImageImage?.localFile.childImageSharp.gatsbyImageData }
                    imageAlignment      = { shareImage.sectionShareImageAlignment.split(':')[0] }
                    networks            = { section.sectionDetails.sectionShare.sectionShareNetworks }
                    itemClass           = { section.sectionDetails.sectionShare.sectionShareItemClass }
                />
            )
        }

        /*
        * Video
        */
        case ( sectionType === 'video' && sectionStatus ): {
            const videoParams = section.sectionDetails.sectionVideo.sectionVideoConfiguration
            const videoConf = {
                'url': section.sectionDetails.sectionVideo.sectionVideoUrl,
                'thumbnail': section.sectionDetails.sectionVideo.sectionVideoThumbnail?.localFile.publicURL,
                'controls': videoParams.sectionVideoConfigurationControls,
                'height': videoParams.sectionVideoConfigurationHeight,
                'width': videoParams.sectionVideoConfigurationWidth,
                'maxWidth': videoParams.sectionVideoConfigurationMaxWidth,
                'light': videoParams.sectionVideoConfigurationLight,
                'loop': videoParams.sectionVideoConfigurationLoop,
                'muted': videoParams.sectionVideoConfigurationMuted,
                'pip': videoParams.sectionVideoConfigurationPip,
                'volume': videoParams.sectionVideoConfigurationVolume,
                'autoplay': videoParams.sectionVideoConfigurationAutoplay,
            }
            
            return(
                <SectionVideo
                    title           = { sectionTitle }
                    id              = { sectionId }
                    content         = { sectionContent }
                    className       = { sectionClassname }
                    size            = { sectionSize }
                    mode            = { sectionColorScheme }
                    containerWidth  = { sectionContainerWidth }
                    backgroundLayers= { sectionBackground }
                    location        = { location }
                    url             = { videoConf.url }
                    thumbnail       = { videoConf.thumbnail }
                    controls        = { videoConf.controls }
                    height          = { videoConf.height }
                    width           = { videoConf.width }
                    maxWidth        = { videoConf.maxWidth }
                    light           = { videoConf.light }
                    loop            = { videoConf.loop }
                    muted           = { videoConf.muted }
                    pip             = { videoConf.pip }
                    volume          = { videoConf.volume }
                    autoplay        = { videoConf.autoplay }
                />
            )
            
        }

        /*
        * iframe
        */
        case ( sectionType === 'iframe' && sectionStatus ): {
            // const iframeConfiguration   = section.sectionDetails.sectionIframe
            const iframeUrl             = section.sectionDetails.sectionIframe.sectionIframeOembed
            
            return(
                <SectionIframe 
                    title               = { sectionTitle }
                    id                  = { sectionId }
                    content             = { sectionContent }
                    className           = { sectionClassname }
                    containerWidth      = { sectionContainerWidth }
                    mode                = { sectionColorScheme }
                    size                = { sectionSize }
                    location            = { location }
                    iframeUrl           = { iframeUrl }
                    backgroundLayers    = { sectionBackground }
                />
            )
            
        }
        
        /*
        * Accordion
        */
        case ( sectionType === 'accordion' && sectionStatus ): {
            const accordionItems = ( section.sectionDetails.sectionAccordion.sectionAccordionItem?.length > 0 ) ? section.sectionDetails.sectionAccordion.sectionAccordionItem : []
            const accordionItemClass = section.sectionDetails.sectionAccordion.sectionAccordionConfiguration.sectionAccordionConfigurationClass
            const accordionContainerClass = section.sectionDetails.sectionAccordion.sectionAccordionConfiguration.sectionAccordionConfigurationAccordionClass

            return(
                <SectionAccordion 
                    id               = { sectionId }
                    className        = { sectionClassname }
                    title            = { sectionTitle }
                    content          = { sectionContent }
                    containerWidth   = { sectionContainerWidth }
                    mode             = { sectionColorScheme } 
                    size             = { sectionSize }
                    items            = { accordionItems }
                    itemClass        = { accordionItemClass }
                    containerClass   = { accordionContainerClass }
                />
            )
            
        }

        /*
        * Form
        */
        case ( sectionType === 'form' && sectionStatus ): {
            const formConfiguration = section.sectionDetails.sectionForm.sectionFormConfiguration
            const formType      = section.sectionDetails.sectionForm.sectionFormType.split(':')[0]
            const formIframe    = section.sectionDetails.sectionForm.sectionFormIframe
            const form          = section.sectionDetails.sectionForm.sectionFormForm
            const secondaryColumn = section.sectionDetails.sectionForm.sectionFormColumns

            return(
                <SectionForm 
                    id                  = { sectionId }
                    className           = { sectionClassname }
                    title               = { sectionTitle }
                    content             = { sectionContent }
                    containerWidth      = { sectionContainerWidth }
                    mode                = { sectionColorScheme } 
                    size                = { sectionSize }
                    sectionBackground   = { sectionBackground }
                    type                = { formType }
                    formIframe          = { formIframe }
                    form                = { form }
                    containerClass      = { formConfiguration.sectionFormConfigurationClass }
                    jumbotron           = { formConfiguration.sectionFormConfigurationJumbotron }
                    jumbotronMode       = { formConfiguration.sectionFormConfigurationJumbotronMode.split(':')[0] }
                    jumbotronPadding    = { formConfiguration.sectionFormConfigurationJumbotronPadding.split(':')[0]}
                    jumbotronFluid      = { formConfiguration.sectionFormConfigurationJumbotronFluid }
                    iframeQueryStrings  = { formConfiguration.sectionFormConfigurationQuerystring }
                    secondaryColumnText       = { secondaryColumn.sectionFormColumnsText }
                    secondaryColumnAlignment  = { secondaryColumn.sectionFormColumnsAlignment.split(':')[0] }
                    secondaryColumnBackground = { secondaryColumn.sectionFormColumnsBackground?.backgroundLayer?.reverse() }
                    location            = { location }
                />
            )
            
        }

        /*
        * Follow
        */
        case ( sectionType === 'follow' && sectionStatus ): {
            const followConfiguration = section.sectionDetails.sectionFollow.sectionFollowConfiguration
            
            return (
                <SectionFollow
                    title               = { sectionTitle }
                    id                  = { sectionId }
                    content             = { sectionContent }
                    className           = { sectionClassname }
                    containerWidth      = { sectionContainerWidth }
                    mode                = { sectionColorScheme }
                    size                = { sectionSize }
                    networks            = { section.sectionDetails.sectionFollow.sectionFollowNetworks }

                    alignment           = { followConfiguration.sectionFollowConfigurationAlignment }
                />
            )
            
        }

        /*
        * Album
        */
        case ( sectionType === 'album' && sectionStatus ): {
            
            const albumCover        = section.sectionDetails.sectionAlbum.sectionAlbumItems.album.albumCover?.localFile.childImageSharp.gatsbyImageData
            const albumTitle        = section.sectionDetails.sectionAlbum.sectionAlbumItems.album.albumTitle
            const albumSubtitle     = section.sectionDetails.sectionAlbum.sectionAlbumItems.album.albumSubtitle
            const albumSongs        = section.sectionDetails.sectionAlbum.sectionAlbumItems.song
            const albumCarouselConf = section.sectionDetails.sectionAlbum.sectionAlbumConfiguration
            const albumAvailableOn  = section.sectionDetails.sectionAlbum.sectionAlbumItems.availableon

            return (
                <SectionAlbum 
                    title               = { sectionTitle }
                    id                  = { sectionId }
                    content             = { sectionContent }
                    className           = { sectionClassname }
                    containerWidth      = { sectionContainerWidth }
                    mode                = { sectionColorScheme }
                    size                = { sectionSize }
                    location            = { location }

                    albumAvailableOn    = { albumAvailableOn }
                    albumCover          = { albumCover }
                    albumTitle          = { albumTitle }
                    albumSubtitle       = { albumSubtitle }
                    albumSongs          = { albumSongs }

                    // Carousels Configuration
                        // Behavior
                        swipeable       = { albumCarouselConf.sectionCarouselConfigurationSwipe }
                        draggable       = { albumCarouselConf.sectionCarouselConfigurationDraggable }
                        infinite        = { albumCarouselConf.sectionCarouselConfigurationInfinite }
                        partialVisible  = { albumCarouselConf.sectionCarouselConfigurationPartiallyVisible }
                        autoplay        = { albumCarouselConf.sectionCarouselConfigurationAutoplay }
                        stretchedlink   = { albumCarouselConf.sectionCarouselConfigurationStretched }
                        // Aspect
                        itemType        = { albumCarouselConf.sectionCarouselConfigurationItemType }
                        dots            = { albumCarouselConf.sectionCarouselConfigurationDots }
                        dotsClass       = { albumCarouselConf.sectionCarouselConfigurationDotsClass }
                        interval        = { albumCarouselConf.sectionCarouselConfigurationAutoplayInterval }
                        itemClass       = { albumCarouselConf.sectionCarouselConfigurationClass }
                        gap             = { albumCarouselConf.sectionCarouselConfigurationGap }
                        truncate        = { albumCarouselConf.sectionCarouselConfigurationTruncate }
                        truncateLines   = { albumCarouselConf.sectionCarouselConfigurationTruncateLines }
                        imagePosition   = { albumCarouselConf.sectionCarouselConfigurationImagePosition }
                        imageFit        = { albumCarouselConf.sectionCarouselConfigurationImageFit }
                        aspectRatio     = { albumCarouselConf.sectionCarouselConfigurationImageAspect }
                        border          = { albumCarouselConf.sectionCarouselConfigurationBorder }
                        borderColor     = { albumCarouselConf.sectionCarouselConfigurationBorderColor }
                        itemGrow        = { albumCarouselConf.sectionCarouselConfigurationGrow }
                        // Responsiveness
                        responsive      = { albumCarouselConf.sectionCarouselConfigurationResponsive }
                />
            )
            
        }

        /*
         * Default
         */
        default: {
            return (
                <></>
            )
            
        }
    }
}

