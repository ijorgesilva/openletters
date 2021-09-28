/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path      = require('path')

const config    = require('./data/SiteConfig')

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig(
        {
            resolve: {
                alias: {
                    path: require.resolve("path-browserify")
                },
                fallback: {
                    fs: false,
                }
            }
        }
    )
}

exports.createPages = async( { page, actions, graphql, reporter } ) => {

    const { createPage } = actions

    const result = await graphql(
        `${query}`
    )

    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }

    let numberPages   = 0
    let createWatch   = false
    let createBlog    = false
    let createNews    = false
    let createEvents  = false

    // Var for storing created series per campus to avoid duplicates
    let createdSeries = [] 

    /*******************
     * Campus Pages creation 
     *******************/
    if ( result.data.campuses?.nodes?.length > 0 ) {
        result.data.campuses.nodes.forEach( campus => {

            /* Watch Page per Campus */
            if( campus.campusDetails.campusWatch.campusWatchPage === true ) {
                createWatch = true
                actions.createPage({
                    path: `/${campus.slug}/${config.watchSlug}`,
                    component: path.resolve(`./src/components/templates/watch/watchCampus.js`),
                    context: {
                        ...campus,
                        title: campus.title,
                        slug: campus.slug,
                        id: campus.id,
                        campusId: '/' + campus.databaseId.toString() + '/',
                        breadcrumbs: {
                            'campus': campus.slug,
                            'rootApp': `/${campus.slug}/${config.watchSlug}`,
                            'back':   `/${campus.slug}/${config.watchSlug}`,
                            'current': `/${campus.slug}/${config.watchSlug}`
                        }
                    }
                })
            }

            /* Blog Page per Campus */
            if( campus.campusDetails.campusBlog.campusBlogPage === true ) {
                createBlog = true
                actions.createPage({
                    path: `/${campus.slug}/${config.blogPostDetailsSlug}`,
                    component: path.resolve(`./src/components/templates/post/blogCampus.js`),
                    context: {
                        ...campus,
                        title: campus.title,
                        slug: campus.slug,
                        id: campus.id,
                        campusId: '/' + campus.databaseId.toString() + '/',
                        breadcrumbs: {
                            'campus': campus.slug,
                            'rootApp': `/${campus.slug}/${config.blogPostDetailsSlug}`,
                            'back':   `/${campus.slug}/${config.blogPostDetailsSlug}`,
                            'current': `/${campus.slug}/${config.blogPostDetailsSlug}`
                        }
                    }
                })
            }

            /* News Page per Campus */
            if( campus.campusDetails.campusNews.campusNewsPage === true ) {
                createNews = true
                actions.createPage({
                    path: `/${campus.slug}/${config.newsPostDetailsSlug}`,
                    component: path.resolve(`./src/components/templates/news/newsCampus.js`),
                    context: {
                        ...campus,
                        title: campus.title,
                        slug: campus.slug,
                        id: campus.id,
                        campusId: '/' + campus.databaseId.toString() + '/',
                        breadcrumbs: {
                            'campus': campus.slug,
                            'rootApp': `/${campus.slug}/${config.newsPostDetailsSlug}`,
                            'back':   `/${campus.slug}/${config.newsPostDetailsSlug}`,
                            'current': `/${campus.slug}/${config.newsPostDetailsSlug}`
                        }
                    }
                })
            }

            /* Events Page per Campus */
            if( campus.campusDetails.campusEvents.campusEventsPage === true ) {
                createEvents = true
                actions.createPage({
                    path: `/${campus.slug}/${config.eventPostDetailsSlug}`,
                    component: path.resolve(`./src/components/templates/event/eventCampus.js`),
                    context: {
                        ...campus,
                        title: campus.title,
                        slug: campus.slug,
                        id: campus.id,
                        campusId: '/' + campus.databaseId.toString() + '/',
                        breadcrumbs: {
                            'campus': campus.slug,
                            'rootApp': `/${campus.slug}/${config.eventPostDetailsSlug}`,
                            'back':   `/${campus.slug}/${config.eventPostDetailsSlug}`,
                            'current': `/${campus.slug}/${config.eventPostDetailsSlug}`
                        }
                    }
                })
            }

        })
    }

    /*******************
     * Video Pages creation 
     *******************/
    /* Video Detail Pages */
    if ( createWatch && result.data.videos?.nodes?.length > 0 ) {
        result.data.videos.nodes.forEach( video => {
            if( video.videoDetails.videoCampus?.length > 0 ) {
                video.videoDetails.videoCampus.forEach ( campus => {
                    if( campus.campusDetails.campusWatch.campusWatchPage === true ) {
                        /* Videos Page Creation for Each Campus selected */
                        actions.createPage({
                            path: `/${campus.slug}/${config.watchMessageDetailsSlug}/${video.slug}`,
                            component: path.resolve(`./src/components/templates/watch/watchDetails.js`),
                            context: {
                                ...video,
                                title: video.title,
                                slug: video.slug,
                                id: video.id,
                                layout: "watchDetails",
                                serieId: (video.videoDetails.videoSeries) ? 
                                            video.videoDetails.videoSeries.databaseId.toString() 
                                        : 
                                            '',
                                campusId: `/${campus.databaseId}/`,
                                participationCampus: campus.participation,
                                breadcrumbs: {
                                                'campus': campus.slug,
                                                'rootApp': `/${campus.slug}/${config.watchSlug}`,
                                                'back':   (video.videoDetails.videoSeries) ? 
                                                                `/${campus.slug}/${config.watchSeriesDetailsSlug}/${video.videoDetails.videoSeries.slug}`
                                                            : 
                                                                `/${campus.slug}/${config.watchSlug}`,
                                                'current': (video.videoDetails.videoSeries) ? 
                                                                `/${campus.slug}/${config.watchMessageDetailsSlug}/${video.videoDetails.videoSeries.slug}`
                                                            :
                                                                `/${campus.slug}/${config.watchSlug}/${video.slug}`,

                                            }
                            }
                        })
                        /* Series Page Creation for Each Campus selected */
                        if( video.videoDetails.videoSeries ) {
                            if ( !createdSeries.includes[ campus.slug + '-' + video.videoDetails.videoSeries.slug ] ) {
                                actions.createPage({
                                    path: `/${campus.slug}/${config.watchSeriesDetailsSlug}/${video.videoDetails.videoSeries.slug}`,
                                    component: path.resolve(`./src/components/templates/watch/watchSeries.js`),
                                    context: {
                                        ...video.videoDetails.videoSeries,
                                        title: video.videoDetails.videoSeries.title,
                                        slug: video.videoDetails.videoSeries.slug,
                                        campus: campus.slug,
                                        layout: "serieDetails",
                                        id: video.videoDetails.videoSeries.id,
                                        serieId: video.videoDetails.videoSeries.databaseId.toString(),
                                        campusId: `/${campus.databaseId}/`,
                                        breadcrumbs: {
                                                        'campus': campus.slug,
                                                        'rootApp': `/${campus.slug}/${config.watchSlug}`,
                                                        'back': `/${campus.slug}/${config.watchSlug}`,
                                                        'current': `/${campus.slug}/${config.watchSeriesDetailsSlug}/${video.videoDetails.videoSeries.slug}`,
                                                    },
                                    }
                                })
                            }
                        }
                    }
                })
            }
        })
    }

    /*******************
     * Pages creation 
     *******************/
     if ( result.data.pages?.nodes?.length > 0 ) {
        result.data.pages.nodes.forEach( page => {
            if( page.pageDetails.pageCampus?.length > 0 ) {
                page.pageDetails.pageCampus.forEach ( campus => {
                    actions.createPage({
                        path: `/${campus.slug}/${config.pagesSlug}/${ (page.wpParent?.node?.slug) ? page.wpParent.node.slug + '/' : '' }${page.slug}`,
                        component: path.resolve(`./src/components/templates/page/pageDetails.js`),
                        context: {
                            ...page,
                            title: page.title,
                            slug: page.slug,
                            id: page.id,
                            layout: "pageDetails",
                            campus: campus.slug,
                            campusId: `/${campus.databaseId}/`,
                            breadcrumbs: {
                                            'campus': campus.slug,
                                            'rootApp': `/${campus.slug}/${config.pagesSlug}`,
                                            'back': `/${campus.slug}/${config.pagesSlug}`,
                                            'current': `/${campus.slug}/${config.pagesSlug}/${page.slug}`,
                                        },
                        }
                    })
                })
            }
        })
    }

    /*******************
     * Post Pages creation 
     *******************/
    if ( createBlog && result.data.posts?.nodes?.length > 0 ) {
        if ( result.data.posts?.nodes?.length > 0 ){
            result.data.posts.nodes.forEach( post => {
                if( post.postDetails.postCampus?.length > 0 ) {
                    post.postDetails.postCampus.forEach ( campus => {
                        actions.createPage({
                            path: `/${campus.slug}/${config.blogPostDetailsSlug}/${post.slug}`,
                            component: path.resolve(`./src/components/templates/post/postDetails.js`),
                            context: {
                                ...post,
                                title: post.title,
                                slug: post.slug,
                                id: post.id,
                                layout: "postDetails",
                                campusId: `/${campus.databaseId}/`,
                                breadcrumbs: {
                                                'campus': campus.slug,
                                                'rootApp': `/${campus.slug}/${config.blogPostDetailsSlug}`,
                                                'back': `/${campus.slug}/${config.blogPostDetailsSlug}`,
                                                'current': `/${campus.slug}/${config.blogPostDetailsSlug}/${post.slug}`,
                                            },
                            }
                        })
                    })
                }
            })
        } 
    }

    /*******************
     * News Pages creation 
     *******************/
    if ( createNews && result.data.news?.nodes?.length > 0 ) {
        if ( result.data.news?.nodes?.length > 0 ) {
            result.data.news.nodes.forEach( news => {
                if( news.newsDetails.newsCampus?.length > 0 ) {
                    news.newsDetails.newsCampus.forEach ( campus => {
                        actions.createPage({
                            path: `/${campus.slug}/${config.newsPostDetailsSlug}/${news.slug}`,
                            component: path.resolve(`./src/components/templates/news/newsDetails.js`),
                            context: {
                                ...news,
                                limit: config.postsPerPage,
                                title: news.title,
                                slug: news.slug,
                                id: news.id,
                                layout: "newsDetails",
                                campusId: `/${campus.databaseId}/`,
                                breadcrumbs: {
                                                'campus': campus.slug,
                                                'rootApp': `/${campus.slug}/${config.newsPostDetailsSlug}`,
                                                'back': `/${campus.slug}/${config.newsPostDetailsSlug}`,
                                                'current': `/${campus.slug}/${config.newsPostDetailsSlug}/${news.slug}`,
                                            },
                            }
                        })
                    })
                }
            })
        }
    }
    
    /*******************
     * Events Pages creation 
     *******************/
    if ( createEvents && result.data.events?.nodes?.length > 0 ) {
        if ( result.data.events?.nodes?.length > 0 ) {
            result.data.events.nodes.forEach( event => {
                if( event.eventDetails.eventCampus?.length > 0 ) {
                    event.eventDetails.eventCampus.forEach ( campus => {
                        actions.createPage({
                            path: `/${campus.slug}/${config.eventPostDetailsSlug}/${event.slug}`,
                            component: path.resolve(`./src/components/templates/event/eventDetails.js`),
                            context: {
                                ...event,
                                title: event.title,
                                slug: event.slug,
                                id: event.id,
                                layout: "eventDetails",
                                campusId: `/${campus.databaseId}/`,
                                breadcrumbs: {
                                                'campus': campus.slug,
                                                'rootApp': `/${campus.slug}/${config.eventPostDetailsSlug}`,
                                                'back': `/${campus.slug}/${config.eventPostDetailsSlug}`,
                                                'current': `/${campus.slug}/${config.eventPostDetailsSlug}/${event.slug}`,
                                            },
                            }
                        })
                    })
                }
            })
        }
    }


    /*******************
     * Attachment Pages creation 
    *******************/
    if( result.data.attachments?.nodes?.length > 0 ) {
        result.data.attachments.nodes.forEach( _ => {
            if( _.attachment.attachmentCampus?.length > 0 ) {
                _.attachment.attachmentCampus.forEach ( campus => {
                    actions.createPage({
                        path: `/${campus.slug}/${config.attachmentSlug}/${_.slug}`,
                        component: path.resolve(`./src/components/templates/document/attachmentDetails.js`),
                        context: {
                            ..._,
                            title: _.title,
                            slug: _.slug,
                            id: _.id,
                            campusId: `/${campus.databaseId}/`,
                            attachmentDetails: _.attachment,
                            breadcrumbs: {
                                            'campus': campus.slug,
                                            'rootApp': `/${campus.slug}/${config.attachmentSlug}`,
                                            'back': `/${campus.slug}/${config.attachmentSlug}`,
                                            'current': `/${campus.slug}/${config.attachmentSlug}/${_.slug}`,
                                        },
                        }
                    })
                })
            }
        })
    }

    /******************* 
     * Redirects creation 
     *******************/
    if ( result.data.redirects?.nodes?.length > 0 ) {
        result.data.redirects.nodes.forEach( _ => {
            actions.createRedirect({ 
                fromPath: _.redirect.redirectFrompath, 
                toPath: _.redirect.redirectTopath, 
                isPermanent: _.redirect.redirectIspermanent
            })
        })
    }

}


/************************* 
 * Fragments 
 *************************/

const language = `
    language {
        code
        locale
        name
    }
`
const tag = `
    id
    slug
    name
`

const wpParent = `
    wpParent {
        node {
            id
            slug
            status
        }
    }
`

const customMenues = `
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
                                            ... on WpCampus {
                                                id
                                                slug
                                            }
                                        }
                                    }
                                    ${wpParent}
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
                                            ... on WpCampus {
                                                id
                                                slug
                                            }
                                        }
                                    }
                                    ${wpParent}
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
const buttons = `
    buttonLink
    buttonTarget
    buttonText
    buttonType
    buttonUrl
    buttonCss
    buttonCssRemoveDefault
`

const localFile = `
    localFile {
        childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
        }
    }
`

const featuredImageFields = `
    featuredImage {
        node {
            ${localFile}
        }
    }
`

const seoFields = `
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
`

const blurb = `
    itemImage {
        ${localFile}
    }
    itemTitle
    itemSubtitle
    itemContent
    itemCss
    itemCssRemoveDefault
    itemButtons {
        itemButtonsStretchedlink
        itemButtonsButton {
            ${buttons}
        }
    }
`

const referenceSeries = `
    ... on WpSerie {
        id
        title
        slug
        status
    }
`
const referenceCampus = `
    ... on WpCampus {
        id
        slug
        status
    }
`

const feed = `
    feedType
    
    ## Feed Videos
    feedVideos {
        feedVideosCategory {
            ${tag}
            videosOnDemand {
                nodes {
                    id
                    title
                    slug
                    excerpt
                    status
                    videoDetails {
                        videoDayDate
                        videoCampus {
                            ${referenceCampus}
                        }
                        videoSeries {
                            ${referenceSeries}
                        }
                    }
                }
            }
        }
    }

    ## Feed Series
    feedSeries {
        feedSeriesCategory {
            ${tag}
        }
    }

    ## Feed Posts
    feedPosts {
        feedPostsCategory {
            ${tag}
        }
    }

    ## Feed News
    feedNews {
        feedNewsCategory {
            ${tag}
        }
    }

    ## Feed Group Types
    feedGrouptypes {
        feedGrouptypesCategory {
            ${tag}
        }
    }

    ## Feed Groups
    feedGroups {
        feedGroupsCategory {
            ${tag}
        }
    }

    ## Feed Events
    feedEvents {
        feedEventsCategory {
            ${tag}
        }
    }

    ## Ministries
    feedMinistries {
        feedMinistriesCategory {
            ${tag}
        }
    }
    
    ## Volunteering
    feedVolunteering {
        feedVolunteeringCategory {
            ${tag}
        }
    }

    ## Courses
    feedCourses {
        feedCoursesCategory {
            ${tag}
        }
    }

    ## Lessons
    feedLessons {
        feedLessonsCategory {
            ${tag}
        }
    }
`

const backgroundLayer = `
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
`

const sections = `
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
            ${backgroundLayer}
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
                ${localFile}
            }
        }

        ## Podcast
        sectionPodcast {
            sectionPodcastSubtitle
            sectionPodcastItunesUrl
            sectionPodcastSpotifyUrl
            sectionPodcastSoundcloudUrl
            sectionPodcastGraphic {
                ${localFile}
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
                        ${featuredImageFields}
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
                                ... on WpCampus {
                                    id
                                    slug
                                }
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
                ${localFile}
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
                    ${featuredImageFields}
                    ${language}
                    postDetails {
                        postCampus {
                            ... on WpCampus {
                                id
                                status
                                slug
                            }
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
                    ${featuredImageFields}
                    ${language}
                    newsDetails {
                        newsCampusId
                        newsCampus {
                            ... on WpCampus {
                                id
                                slug
                            }
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
                    ${featuredImageFields}
                    ${language}
                    eventDetails {
                    eventDates {
                        eventDate
                        eventTime
                    }
                    eventCampus {
                        ... on WpCampus {
                                id
                                slug
                            }
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
                ${customMenues}
            }
        }

        ## Text
        ### Because Text section contain nested elements is also under allWpPage.
        ### Object Fields / Relashionship elements has been removed below.
        sectionText {
            sectionTextButtons {
                sectionTextButton {
                    ${buttons}
                }
            }
            sectionTextMedia {
                sectionTextbasicMediaType
                sectionTextbasicMediaAlignment
                sectionTextbasicMediaPhoto {
                    ${localFile}
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
                ${feed}
            }
            sectionCarouselItems {
                ${blurb}
            }
            sectionCarouselConfiguration {
                sectionCarouselConfigurationItemType
                sectionCarouselConfigurationSwipe
                sectionCarouselConfigurationDraggable
                sectionCarouselConfigurationInfinite
                sectionCarouselConfigurationPartiallyVisible
                sectionCarouselConfigurationDots
                sectionCarouselConfigurationDotsClass
                sectionCarouselConfigurationAutoplay
                sectionCarouselConfigurationAutoplayInterval
                sectionCarouselConfigurationGap
                sectionCarouselConfigurationClass
                sectionCarouselConfigurationTruncate
                sectionCarouselConfigurationTruncateLines
                sectionCarouselConfigurationImageAspect
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
                ${localFile}
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
                sectionVideoConfigurationHeight
                sectionVideoConfigurationLight
                sectionVideoConfigurationLoop
                sectionVideoConfigurationMuted
                sectionVideoConfigurationPip
                sectionVideoConfigurationVolume
                sectionVideoConfigurationWidth
                sectionVideoConfigurationAutoplay
            }
        }

        ## Blurb
        sectionBlurbs {
            sectionBlurbsType
            sectionBlurbsFeed {
                ${feed}
            }
            sectionBlurbsItems {
                ${blurb}
            }
            sectionBlurbsConfiguration {
                sectionBlurbsConfigurationOrientation
                sectionBlurbsConfigurationType
                sectionBlurbsConfigurationDirection
                sectionBlurbsConfigurationClass
                sectionBlurbsConfigurationGap
                sectionBlurbsConfigurationImageAspect
                sectionBlurbsConfigurationJustification
                sectionBlurbsConfigurationStretch
                sectionBlurbsConfigurationTruncate
                sectionBlurbsConfigurationTruncateLines
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
                    ${backgroundLayer}
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

    # End Sections

`

/*************************
 * Pages & Posts
 *************************/
/* Custom Post Types */
const allWpCampus = `
    ########
    # Campuses
    ########
    campuses: allWpCampus(
        filter: {
            status: {eq: "publish"}
        }
    ) {
        nodes {
            id
            title
            slug
            status
            databaseId
            ${featuredImageFields}
            ${seoFields}
            campusDetails {
                campusWatch {
                    campusWatchPage
                    campusWatchSections {
                        ... on WpContentSection {
                            id
                            slug
                            databaseId
                            status
                            sectionDetails {
                                ${sections}
                            }
                        }
                    }
                }
                campusBlog {
                    campusBlogPage
                }
                campusNews {
                    campusNewsPage
                }
                campusEvents {
                    campusEventsPage
                }
                campusBrand {
                    campusBrandOverwrite
                    campusBrandUrl
                    campusBrandLogo {
                        ${localFile}
                    }
                }
                campusSelector {
                    campusSelectorOverwrite
                    campusSelectorHome {
                        campusHomeUrl
                        campusHomeType
                    }
                }
            }
        }
    }
`

const allWpVideo = `
    ########
    # Videos on Demand
    ########
    videos: allWpVideoOnDemand (
            filter: {
                status: {eq: "publish"}
            }  
        ) {
        nodes {
            id
            title
            slug
            content
            excerpt
            modified
            ${seoFields}
            ${featuredImageFields}
            videoDetails {
                videoOneLiner
                videoTranscript
                videoDayDate
                videoUrl
                videoAttachments {
                    ... on WpDocument {
                        id
                        title
                        status
                        attachment {
                            attachmentFile {
                                id
                                title
                                localFile {
                                    publicURL
                                }
                            }
                        }
                    }
                }
                videoCampusId
                videoCampus {
                    ... on WpCampus {
                        id
                        title
                        slug
                        databaseId
                        ${featuredImageFields}
                        campusDetails {
                            campusWatch {
                                campusWatchPage
                            }
                        }
                        participation {
                            participationRaisehand {
                                participationRaisehandBehavior
                                participationRaisehandCustom {
                                    participationRaisehandCustomType
                                    participationRaisehandCustomTitle
                                    participationRaisehandCustomUrl
                                    participationRaisehandCustomTarget
                                    participationRaisehandCustomClass
                                    participationRaisehandCustomIcon {
                                        localFile {
                                            childImageSharp {
                                                gatsbyImageData(
                                                    layout: FIXED
                                                    width: 32
                                                    height: 32
                                                )
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                videoSerieId
                videoSeries {
                    ... on WpSerie {
                        id
                        databaseId
                        title
                        slug
                        excerpt
                        seriesDetails {
                            seriesTrailer
                            seriesTrailerPoster {
                                ${localFile}
                            }
                            seriesSeasonsActive
                        }
                        seriesGraphics {
                            poster {
                                ${localFile}
                            }
                            logo {
                                ${localFile}
                            }
                            background {
                                ${localFile}
                            }
                        }
                        videoOnDemandTags {
                            nodes {
                                ${tag}
                            }
                        }
                    }
                }
                videoSpeaker {
                    ... on WpSpeaker {
                        id
                        title
                        uri
                        ${featuredImageFields}
                    }
                }
                videoHide {
                  videoHideSearchEngines
                }
            }
            videoOnDemandTags {
                nodes {
                    ${tag}
                }
            }
        }
    }
`

const allWpSeries = `
    ########
    # Series 
    ########
    series: allWpSerie (
        filter: {
            status: {eq: "publish"}
        }
    ) {
        nodes{
            id
            title
            slug
            databaseId
            excerpt
            ${seoFields}
            seriesDetails {
                seriesTrailer
                seriesSeasonsActive
                seriesTrailerPoster {
                    ${localFile}
                }
                seriesHide {
                    seriesHideSearchEngines
                }
            }
            seriesGraphics {
                poster {
                    ${localFile}
                }
                logo {
                    ${localFile}
                }
                background {
                    ${localFile}
                }
            }
            videoOnDemandTags {
                nodes {
                    ${tag}
                }
            }
        }
    }
`

const allWpNews = `
    ########
    # News 
    ########
    news: allWpNewspost (
        filter: {
            status: {eq: "publish"}
        }
    ) {
        nodes{
            id
            title
            excerpt
            slug
            content
            date(formatString: "YYYYMMDD")
            modified(formatString: "YYYYMMDD")
            ${featuredImageFields}
            ${seoFields}
            newsDetails {
                newsCampus {
                    ... on WpCampus {
                        id
                        title
                        slug
                        databaseId
                    }
                }
                newsHide {
                  newsHideSearchEngines
                }
            }
            tags {
                nodes {
                    ${tag}
                }
            }
        }
    }
`

const allWpEvents = `
    ########
    # Events 
    ########
    events: allWpEvent(
        filter: {
            status: {eq: "publish"}
        }
    ) {
        nodes{
            id
            title
            excerpt
            slug
            content
            date(formatString: "YYYYMMDD")
            modified(formatString: "YYYYMMDD")
            ${featuredImageFields}
            ${seoFields}
            eventDetails {
                eventAddress
                eventCampus {
                    ... on WpCampus {
                        id
                        title
                        slug
                    }
                }
                eventDates {
                    eventDate
                    eventTime
                }
                eventLink {
                    eventLinkText
                    eventLinkUrl
                }
                eventHide {
                    eventHideSearchEngines
                }
            }
            tags {
                nodes {
                    ${tag}
                }
            }
        }
    }
`

const allWpRedirect = `
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

/* Standard Post Types */
const allWpPage = `
    ########
    # Pages
    ########
    pages: allWpPage(
        filter: {
            status: {eq: "publish"}
        }
    ) {
        nodes {
            id
            title
            slug
            status
            content
            date(formatString: "YYYYMMDD")
            modified(formatString: "YYYYMMDD")
            isFrontPage
            ${seoFields}
            ${featuredImageFields}
            pageDetails {
                pageCampus {
                    ... on WpCampus {
                        id
                        slug
                    }
                }
                pageMenues {
                    ${customMenues}
                }
                pageHideContent
                pageHideShare
                pageSections {
                    ... on WpContentSection {
                        status
                        sectionDetails {

                            ${sections}
                            
                            ## Tabs
                            sectionTabs {
                                sectionTabsTab {
                                    sectionTabsTabType
                                    sectionTabsTabName
                                    sectionTabsTabContent
                                    sectionTabsTabSection {
                                        ... on WpContentSection {
                                            status
                                            sectionDetails {
                                                ${sections}
                                            }
                                        }
                                    }
                                }
                            }

                            ## Text, Media and Buttons
                            sectionText {
                                sectionTextButtons {
                                    sectionTextButton {
                                        ${buttons}
                                    }
                                }
                                sectionTextMedia {
                                    sectionTextbasicMediaType
                                    sectionTextbasicMediaAlignment
                                    sectionTextbasicMediaPhoto {
                                        ${localFile}
                                    }
                                }
                                sectionTextSections {
                                    ... on WpContentSection {
                                        id
                                        slug
                                        databaseId
                                        status
                                        sectionDetails {
                                            ${sections}
                                        }
                                    }
                                }
                            }

                        }
                    }
                }
                pageHide {
                  pageHideSearchEngines
                }
            }
            ${wpParent}
        }
    }
`

const allWpPosts = `
    ########
    # Posts 
    ########
    posts: allWpPost(
        filter: {
            status: {eq: "publish"}
        }
    ) {
        nodes{
            id
            title
            excerpt
            slug
            content
            date(formatString: "YYYYMMDD")
            modified(formatString: "YYYYMMDD")
            ${featuredImageFields}
            ${seoFields}
            postDetails {
                postCampus {
                    ... on WpCampus {
                        id
                        title
                        slug
                        databaseId
                        ${featuredImageFields}
                    }
                }
                postAuthor {
                    ... on WpSpeaker {
                        id
                        title
                        slug
                        ${featuredImageFields}
                    }
                }
                postFooterSection {
                    ... on WpContentSection {
                            id
                            slug
                            databaseId
                            status
                            sectionDetails {
                                ${sections}
                            }
                    }
                }
                postHide {
                    postHideSearchEngines
                }
            }
            tags {
                nodes {
                    ${tag}
                }
            }
        }
    }
`

const allWpResources = `
    ########
    # Attachments
    ########
    attachments: allWpDocument (
        filter: {
            status: {eq: "publish"}
        }
    ) {
        nodes {
            id
            title
            slug
            excerpt
            attachment {
                attachmentCampus {
                    ... on WpCampus {
                        id
                        title
                        slug
                        databaseId
                    }
                }
                attachmentFile {
                    id
                    title
                    localFile {
                        publicURL
                    }
                }
                attachmentHide {
                    attachmentHideSearchEngines
                }
            }
        }
    }
`

/* 
 * Main Query 
 */
const query = `
    query {

        ${allWpCampus}

        ${allWpRedirect}

        ${allWpPage}
        
        ${allWpPosts}

        ${allWpNews}

        ${allWpEvents}

        ${allWpSeries}

        ${allWpVideo}

        ${allWpResources}
        
    }
`