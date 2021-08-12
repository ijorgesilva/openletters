// Dependencies
import React from 'react'
import { useTranslation } from "react-i18next"

// Components
import SectionTextPhoto from '../components/content/sectionTextPhoto'
import SectionFeedCarousel from '../components/vod/feed/sectionFeedCarousel'
import SectionPodcast from '../components/content/sectionPodcast'
import HeroDynamic from '../components/hero/heroDynamic'
import SectionLatestSeries from './vod/feed/sectionLatestSeries'
import SectionText from "../components/content/sectionText"
import MenuPage from '../components/menu/menuPage'
import SectionTabs from '../components/content/sectionTabs'
import SectionCarousel from '../components/carousel/sectionCarousel'
import SectionShare from '../components/social/sectionShare'
import SectionVideo from './content/sectionVideo'
import SectionSteps from './content/sectionSteps'

// Utils
import config from '../../data/SiteConfig'

export default function RenderSection ( { section, filter, campus, location, className } ) {
    
    /* Standard fields */
    const { t } = useTranslation()

    // General
    const sectionStatus     = ( section.status === 'publish' ) ? true : false
    const sectionType       = ( section.sectionDetails.sectionType?.split(":")[0] ) ? section.sectionDetails.sectionType.split(":")[0] : ''
    const sectionTitle      = ( section.sectionDetails.sectionTitle ) ? section.sectionDetails.sectionTitle : undefined
    const sectionContent    = ( section.sectionDetails.sectionContent ) ? section.sectionDetails.sectionContent : undefined

    // Style
    const sectionId             =   ( section.sectionDetails.sectionConfiguration.sectionConfigurationId ) ? 
                                        section.sectionDetails.sectionConfiguration.sectionConfigurationId 
                                    : section.slug
    const sectionClassname      =   ( section.sectionDetails.sectionConfiguration.sectionConfigurationClassname ) ? 
                                        `${section.sectionDetails.sectionConfiguration.sectionConfigurationClassname} ${ ( className ) ? className : ''}`
                                    : `${ ( className ) ? className : ''}`
    const sectionColorScheme    =   ( section.sectionDetails.sectionConfiguration.sectionConfigurationColorScheme ) ? 
                                        section.sectionDetails.sectionConfiguration.sectionConfigurationColorScheme.split(':')[0] 
                                    : 'light'
    const sectionContainerWidth =   ( section.sectionDetails.sectionConfiguration.sectionConfigurationContainerWidth ) ? 
                                        section.sectionDetails.sectionConfiguration.sectionConfigurationContainerWidth.split(':')[0] 
                                    : 'container'
    const sectionBackground     =   section.sectionDetails.sectionConfiguration.sectionConfigurationBackground.sectionConfigurationBackgroundLayer

    switch( true ){

        /*
         * Call To Action
         */
        case ( sectionType === 'cta' && sectionStatus ):
            const ctaItem = section.sectionDetails.sectionCta
            return (
                <SectionTextPhoto 
                    id          = { sectionId }
                    title       = { sectionTitle }
                    content     = { sectionContent }
                    className   = { `${ (sectionClassname) ? sectionClassname : '' }` }
                    variant     = { sectionColorScheme }
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
            break

        /*
         * Podcast
         */
        case ( sectionType === 'podcast' && sectionStatus ):
            const podcastItem = section.sectionDetails.sectionPodcast
            // TODO: Light/Dark mode
            return (
                <>
                    <SectionPodcast 
                        id         = { sectionId }
                        title      = { sectionTitle }
                        content    = { sectionContent }
                        subtitle   = { (podcastItem.sectionPodcastSubtitle) ? podcastItem.sectionPodcastSubtitle : undefined }
                        Spotify    = { (podcastItem.sectionPodcastSpotifyUrl) ? podcastItem.sectionPodcastSpotifyUrl : undefined }
                        Soundcloud = { (podcastItem.sectionPodcastSoundcloudUrl) ? podcastItem.sectionPodcastSoundcloudUrl : undefined }
                        iTunes     = { (podcastItem.sectionPodcastItunesUrl) ? podcastItem.sectionPodcastItunesUrl : undefined }
                        graphic    = { (podcastItem.sectionPodcastGraphic) ? 
                                                podcastItem.sectionPodcastGraphic.localFile.childImageSharp.gatsbyImageData 
                                        : 
                                            undefined 
                                      }
                    />
                </>
            )
            break

        /*
         * Videos by Tags
         */
        case ( sectionType === 'vodtags' && sectionStatus ):
            const videoItems = (section.sectionDetails.sectionVodTags.sectionVodTag) ? section.sectionDetails.sectionVodTags.sectionVodTag : {}

            const filteredVideos = (videoItems) ? 
                                        videoItems.videosOnDemand.nodes.filter( item => (
                                            item.status === 'publish'
                                        )).filter( item => (
                                            item.videoDetails.videoCampus.some( item => item.slug === filter.campus )
                                        ))
                                    :
                                        {}

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
            // TODO: Dark/Light mode
            return (
                <>
                    {
                        (filteredVideos.length > 0) ?
                            <SectionFeedCarousel 
                                id           = { sectionId }
                                className    = {`${ (sectionClassname) ? sectionClassname : 'h-background-six-shade-three'}`}
                                title        = { videoItems.name }
                                campus       = { campus }
                                items        = { filteredVideos.sort(sortByDate)  }
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
            break

        /*
         * Videos on Series
         */
        case ( sectionType === 'vodseries' && sectionStatus ):
            
            return (
                <></>
            )
            break

        /*
         * Latest Series
         */
        case ( sectionType === 'latestseries' ):
           // TODO: Dark/light mode 
            return (
                <SectionLatestSeries 
                    id              = { sectionId }
                    className       = {`${ (sectionClassname) ? sectionClassname : 'h-background-six-shade-three'}`}
                    title           = { sectionTitle }
                    campus          = { campus }
                    configLayout    =  {{
                                            excerpt: false,
                                            itemsVisible: 5,
                                       }}
                />
            )
            break

        /*
         * Hero
         */      
        case ( sectionType === 'hero' && sectionStatus ):
            // TODO: Dark/light mode
            let relatedPost = null
            let postFilterByCampus
            const postValidContext =    (section.sectionDetails.sectionHero.sectionHeroRelated?.length > 0 ) ?
                                            section.sectionDetails.sectionHero.sectionHeroRelated.filter( 
                                                item => (item.status === 'publish'))
                                        :
                                            ''
            const postType = postValidContext[0]?.nodeType 

            switch( postType ) {

                case 'Post':

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
                        featuredImage:  ( postFilterByCampus.featuredImage.node ) ? 
                                            postFilterByCampus.featuredImage.node.localFile.childImageSharp.gatsbyImageData
                                        :
                                            undefined,
                    }
                    break

                case 'Newspost':

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
                        featuredImage:  ( postFilterByCampus.featuredImage?.node ) ? 
                                            postFilterByCampus.featuredImage.node.localFile.childImageSharp.gatsbyImageData 
                                        : 
                                            undefined,
                    }
                    
                    break

                case 'Event':

                    postFilterByCampus = postValidContext.filter( item => (
                        item.eventDetails.eventCampus.some (item => ( item.slug === campus))
                    ))[0]
                    
                    relatedPost = {
                        type: postFilterByCampus.nodeType.toLowerCase(),
                        eventDates: ( postFilterByCampus.eventDetails.eventDates.length > 0 ) ? 
                                        postFilterByCampus.eventDetails.eventDates
                                    : 
                                        undefined,
                        title: postFilterByCampus.title,
                        subtitle: '',
                        excerpt: postFilterByCampus.excerpt,
                        url: `/${campus}/${config.eventPostDetailsSlug}/${postFilterByCampus.slug}`,
                        tag: t('global.events.title'),
                        tagClassName: 'badge-secondary',
                        featuredImage:  ( postFilterByCampus.featuredImage?.node ) ? 
                                            postFilterByCampus.featuredImage.node.localFile.childImageSharp.gatsbyImageData 
                                        : 
                                            undefined,
                    }
                    
                    break
                default:
                    break
            }
            
            return (
                <HeroDynamic
                    id              = { sectionId }
                    className       = {`${ (sectionClassname) ? sectionClassname : ''}`}
                    title           = { sectionTitle }
                    subtitle        = { sectionContent }
                    backgroundPhoto = { section.sectionDetails.sectionHero.sectionHeroBackground?.localFile.childImageSharp.gatsbyImageData }
                    buttons         = { section.sectionDetails.sectionHero.sectionHeroButtons?.sectionHeroButton }
                    related         = { ( relatedPost ) ? relatedPost : undefined }
                    location        = { location }
                />
      
            )
            break

        /*
        * Text Basic
        */
       case ( sectionType === 'text' && sectionStatus ):

            return(
                <SectionText 
                    id               = { sectionId }
                    title            = { sectionTitle }
                    content          = { sectionContent }
                    className        = { sectionClassname }
                    containerWidth   = { sectionContainerWidth }
                    buttons          = { section.sectionDetails.sectionText?.sectionTextButtons?.sectionTextButton }
                    media            = { section.sectionDetails.sectionText?.sectionTextMedia }
                    variant          = { sectionColorScheme }
                    backgroundLayers = { sectionBackground }
                    sections         = { section.sectionDetails.sectionText?.sectionTextSections }
                    campus           = { campus }
                    location         = { location }
                />
            )
           break

        /*
        * Page Menu
        */
        case ( sectionType === 'pagemenu' && sectionStatus ):

            const pageMenu  = section.sectionDetails.sectionPagemenu.sectionPagemenuMenu
            const menuId    = pageMenu.menuDetails.menuId
            const menuCss   = pageMenu.menuDetails.menuCss

            return(
                <>
                    <MenuPage
                        menues      = { pageMenu }
                        id          = { ( section.sectionDetails.sectionId ) ? section.sectionDetails.sectionId : menuId }
                        campus      = { campus }
                        location    = { location }
                        className   = { `${ ( sectionClassname ) ? sectionClassname : ''} ${ (menuCss) ? menuCss : '' }`}
                        sticky      = { section.sectionDetails.sectionPagemenu.sectionSticky }
                        variant     = { sectionColorScheme }
                    />
                </>
            )
                break

        /*
        * Divider
        */
        case ( sectionType === 'divider' && sectionStatus ):

            return(
                <hr 
                    id          = { sectionId }
                    className   = {`${ (sectionClassname) ? sectionClassname : ''}`}
                    style       = {{ width: '100%' }}
                />
            )
                break

        /*
        * Tabs
        */
        case ( sectionType === 'tabs' && sectionStatus ):

            const tabs = section.sectionDetails.sectionTabs?.sectionTabsTab

            return(
                <SectionTabs
                    id              = { sectionId }
                    title           = { sectionTitle }
                    content         = { sectionContent }
                    className       = { sectionClassname }
                    campus          = { campus }
                    location        = { location }
                    tabs            = { tabs }
                    containerWidth  = { sectionContainerWidth }
                    variant         = { sectionColorScheme }
                    bg              = { sectionColorScheme }
                />
            )
                break

        /*
        * Carousel
        */
        case ( sectionType === 'carousel' && sectionStatus ):
            const carouselConfiguration     = section.sectionDetails.sectionCarousel.sectionCarouselConfiguration
            const carouselItems             = ( section.sectionDetails.sectionCarousel.sectionCarouselItem?.length > 0 ) ? section.sectionDetails.sectionCarousel.sectionCarouselItem : []

            return(
                <>
                    {
                        ( carouselItems ) ?
                            <SectionCarousel 
                                itemType        = { carouselConfiguration.sectionCarouselConfigurationItemType }
                                id              = { sectionId }
                                title           = { sectionTitle }
                                content         = { sectionContent }
                                className       = { sectionClassname }
                                swipeable       = { carouselConfiguration.sectionCarouselConfigurationSwipe }
                                draggable       = { carouselConfiguration.sectionCarouselConfigurationDraggable }
                                infinite        = { carouselConfiguration.sectionCarouselConfigurationInfinite }
                                partialVisible  = { carouselConfiguration.sectionCarouselConfigurationPartiallyVisible }
                                autoplay        = { carouselConfiguration.sectionCarouselConfigurationAutoplay }
                                interval        = { carouselConfiguration.sectionCarouselConfigurationAutoplayInterval }
                                campus          = { campus }
                                location        = { location }
                                dots            = { carouselConfiguration.sectionCarouselConfigurationDots }
                                dotsClass       = { carouselConfiguration.sectionCarouselConfigurationDotsClass }
                                gap             = { carouselConfiguration.sectionCarouselConfigurationGap }
                                itemClass       = { carouselConfiguration.sectionCarouselConfigurationClass }
                                truncate        = { carouselConfiguration.sectionCarouselConfigurationTruncate }
                                trucanteLines   = { carouselConfiguration.sectionCarouselConfigurationTruncateLines }
                                aspectRatio     = { carouselConfiguration.sectionCarouselConfigurationImageAspect }
                                containerWidth  = { sectionContainerWidth }
                                variant         = { sectionColorScheme }
                                bg              = { sectionColorScheme }
                                items           = { carouselItems }
                                responsive      = { carouselConfiguration.sectionCarouselConfigurationResponsive }
                            />
                        :
                            undefined
                    }
                </>
            )
                break

        /*
        * Social
        */
        case ( sectionType === 'share' && sectionStatus ):
            
            const shareImage = section.sectionDetails.sectionShare.sectionShareImage

            return(
                <SectionShare
                    title               = { sectionTitle }
                    id                  = { sectionId }
                    content             = { sectionContent }
                    className           = { sectionClassname }
                    variant             = { sectionColorScheme }
                    containerWidth      = { sectionContainerWidth }
                    location            = { location }
                    image               = { shareImage.sectionShareImageImage.localFile.childImageSharp.gatsbyImageData }
                    imageAlignment      = { shareImage.sectionShareImageAlignment.split(':')[0] }
                    networks            = { section.sectionDetails.sectionShare.sectionShareNetworks }
                    itemClass           = { section.sectionDetails.sectionShare.sectionShareItemClass }
                />
            )
                break

        /*
        * Video
        */
        case ( sectionType === 'video' && sectionStatus ):
            const videoParams = section.sectionDetails.sectionVideo.sectionVideoConfiguration
            const videoConf = {
                'url': section.sectionDetails.sectionVideo.sectionVideoUrl,
                'thumbnail': section.sectionDetails.sectionVideo.sectionVideoThumbnail?.localFile.publicURL,
                'controls': videoParams.sectionVideoConfigurationControls,
                'height': videoParams.sectionVideoConfigurationHeight,
                'width': videoParams.sectionVideoConfigurationWidth,
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
                    variant         = { sectionColorScheme }
                    containerWidth  = { sectionContainerWidth }
                    location        = { location }
                    url             = { videoParams.url }
                    thumbnail       = { videoParams.thumbnail }
                    controls        = { videoParams.controls }
                    height          = { videoParams.height }
                    width           = { videoParams.width }
                    light           = { videoParams.light }
                    loop            = { videoParams.loop }
                    muted           = { videoParams.muted }
                    pip             = { videoParams.pip }
                    volume          = { videoParams.volume }
                    autoplay        = { videoParams.autoplay }
                />
            )
                break

        /*
        * Blurbs
        */
        case ( sectionType === 'blurb' && sectionStatus ):
            
            const blurbsConfiguration     = section.sectionDetails.sectionBlurbs.sectionBlurbsConfiguration
            const blurbsItems             = ( section.sectionDetails.sectionBlurbs.sectionBlurbsItem?.length > 0 ) ? section.sectionDetails.sectionBlurbs.sectionBlurbsItem : []
            console.log(blurbsConfiguration)
            
            return(
                <SectionSteps
                    itemType        = { blurbsConfiguration.sectionBlurbsConfigurationItemType }
                    title           = { sectionTitle }
                    id              = { sectionId }
                    content         = { sectionContent }
                    className       = { sectionClassname }
                    variant         = { sectionColorScheme }
                    containerWidth  = { sectionContainerWidth }
                    items           = { blurbsItems }
                    // gap
                    // itemClass
                    // truncate
                    // trucanteLines
                    // aspectRatio
                />
            )
                break

        /*
        * iframe
        */
        case ( sectionType === 'iframe' && sectionStatus ):

            return(
                <></>
            )
                break
        
        /*
         * Default
         */
        default:
            return (
                <></>
            )
    }
}

