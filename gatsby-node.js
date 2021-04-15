/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path')
const config = require('./data/SiteConfig')

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
     * Post Pages creation 
     *******************/
    if ( createBlog && result.data.posts?.nodes?.length > 0 ) {
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

    /*******************
     * News Pages creation 
     *******************/
    if ( createNews && result.data.news?.nodes?.length > 0 ) {
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
    
    /*******************
     * Events Pages creation 
     *******************/
    if ( createEvents && result.data.events?.nodes?.length > 0 ) {
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

    /******************* 
     * Redirects creation 
     *******************/
     result.data.allWpRedirect.nodes.forEach( _ => {
        actions.createRedirect({ 
            fromPath: _.redirect.redirectFrompath, 
            toPath: _.redirect.redirectTopath, 
            isPermanent: _.redirect.redirectIspermanent
        })
    })

}

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

const sections = `
    sectionContent
    sectionTitle
    sectionType

    ## Call To Actions
    sectionCta {
        sectionCtaSubtitle
        sectionCtaVariant
        sectionCtaClassname
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
`

const query = `
    query {

        ########
        # Campuses
        ########
        campuses: allWpCampus(filter: {status: {eq: "publish"}}) {
            nodes {
                id
                title
                slug
                status
                databaseId
                ${featuredImageFields}
                campusDetails {
                    campusWatch {
                        campusWatchPage
                        campusWatchSections {
                            ... on WpContentSection {
                                id
                                slug
                                databaseId
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
                    campusHome {
                        campusHomeUrl
                        campusHomeType
                    }
                }
            }
        }

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
                    videoRelatedPosts {
                        ... on WpPost {
                            id
                            slug
                            title
                            excerpt
                            status
                            ${featuredImageFields}
                        }
                    }
                    videoRelatedLinks {
                        ... on WpLinkitem {
                            id
                            title
                            excerpt
                            status
                            ${featuredImageFields}
                            linkDetails {
                                linkLink {
                                    linkLinkTarget
                                    linkLinkType
                                    linkLinkUrl
                                }
                            }
                        }
                    }
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
                                campusHome {
                                    campusHomeUrl
                                    campusHomeType
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
                                seriesRelatedPosts{
                                    ... on WpPost {
                                        id
                                        slug
                                        title
                                        excerpt
                                        status
                                        postDetails {
                                            postCampus {
                                                ... on WpCampus {
                                                    id
                                                    slug
                                                }
                                            }
                                        }
                                        ${featuredImageFields}
                                    }
                                }
                                seriesSections {
                                    ... on WpContentSection {
                                        id
                                        slug
                                        databaseId
                                        sectionDetails {
                                            ${sections}
                                        }
                                    }
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
                                    slug
                                    name
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
                }
                videoOnDemandTags {
                    nodes {
                        slug
                        name
                    }
                }
            }
        }

        ########
        # Series 
        ########
        series: allWpSerie (filter: {status: {eq: "publish"}}) {
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
                    seriesRelatedPosts{
                        ... on WpPost {
                            id
                            slug
                            title
                            excerpt
                            status
                            ${featuredImageFields}
                        }
                    }
                    seriesRelatedLinks{
                        ... on WpLinkitem {
                            id
                            title
                            excerpt
                            status
                            ${featuredImageFields}
                            linkDetails {
                                linkLink {
                                    linkLinkTarget
                                    linkLinkType
                                    linkLinkUrl
                                }
                            }
                        }
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
                        slug
                        name
                    }
                }
            }
        }

        ########
        # Posts 
        ########
        posts: allWpPost(filter: {status: {eq: "publish"}})  {
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
                            sectionDetails {
                                ${sections}
                            }
                      }
                    }
                }
                tags {
                    nodes {
                        slug
                        name
                    }
                }
            }
        }

        ########
        # News 
        ########
        news: allWpNewspost (filter: {status: {eq: "publish"}})  {
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
                }
                newsTags {
                    nodes {
                        slug
                        name
                    }
                }
            }
        }

        ########
        # Events 
        ########
        events: allWpEvent(filter: {status: {eq: "publish"}}) {
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
                }
                eventTags {
                    nodes {
                        slug
                        name
                    }
                }
            }
        }


        ########
        # Redirects 
        ########
        allWpRedirect {
            nodes {
                redirect {
                    redirectFrompath
                    redirectIspermanent
                    redirectTopath
                }
            }
        }

    }
`