const config    = require('../../data/SiteConfig')

// CPT & PT Queries
const video = `
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
            date
            modified
            title
            slug
            excerpt
            videoDetails {
                videoDayDate
                videoCampus {
                    ... on WpCampus {
                        id
                        title
                        slug
                        status
                        campusDetails {
                            campusWatch {
                                campusWatchPage
                            }
                        }
                    }
                }
                videoSeries {
                    ... on WpSerie {
                        id
                        title
                        slug
                        status
                        excerpt
                        date
                        modified
                        seriesDetails {
                            seriesHide {
                                seriesHideSearchResults
                            }
                        }
                    }
                }
                videoHide {
                  videoHideSearchResults
                }
            }
        }
    }
`
const pages = `
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
            date
            modified
            title
            slug
            pageDetails {
                pageCampus {
                    ... on WpCampus {
                        id
                        title
                        slug
                        status
                    }
                }
                pageHide {
                  pageHideSearchResults
                }
            }
            wpParent {
                node {
                    id
                    slug
                    status
                }
            }
        }
    }
`
const posts = `
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
            date
            modified
            title
            slug
            excerpt
            postDetails {
                postCampus {
                    ... on WpCampus {
                        id
                        title
                        slug
                        status
                    }
                }
                postHide {
                  postHideSearchResults
                }
            }
        }
    }
`
const news = `
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
            date
            modified
            title
            slug
            excerpt
            newsDetails {
                newsCampus {
                    ... on WpCampus {
                        id
                        title
                        slug
                        status
                    }
                }
                newsHide {
                  newsHideSearchResults
                }
            }
        }
    }
`
const events = `
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
            date
            modified
            title
            slug
            excerpt
            eventDetails {
                eventCampus {
                    ... on WpCampus {
                        id
                        title
                        slug
                        status
                    }
                }
                eventHide {
                    eventHideSearchResults
                }
            }
        }
    }
`
// Main Queries
const videoOnDemandQuery = `
    {
        ${video}
    }
`
const pagesQuery = `
{
    ${pages}

    ${posts}

    ${news}

    ${events}
}

`

const queries = [
  {
    query: videoOnDemandQuery,
    transformer: ({ data }) => {
        let videoList = []
        data.videos.nodes.forEach( video => {
            if( video.videoDetails.videoCampus?.length > 0 ) {
                video.videoDetails.videoCampus.forEach ( campus => {
                    if ( campus.status === 'publish' && campus.campusDetails.campusWatch.campusWatchPage ){
                        // Create Videos
                        if( !video.videoDetails.videoHide.videoHideSearchResults ){
                            videoList.push({
                                objectID: video.id,
                                title: video.title,
                                type: 'vod',
                                campus: campus.slug,
                                campusTitle: campus.title,
                                excerpt: video.excerpt,
                                slug: video.slug,
                                language: 'en',
                                link: `/${campus.slug}/${config.watchMessageDetailsSlug}/${video.slug}`,
                                linkProduction: `${config.siteUrl}/${campus.slug}/${config.watchMessageDetailsSlug}/${video.slug}`,
                                series: video.videoDetails.videoSeries?.title,
                                seriesLink: (video.videoDetails.videoSeries?.title) ?
                                                `/${campus.slug}/${config.watchSeriesDetailsSlug}/${video.videoDetails.videoSeries.slug}` 
                                            : 
                                                '',
                                seriesLinkProduction:   (video.videoDetails.videoSeries?.title) ?
                                                            `${config.siteUrl}/${campus.slug}/${config.watchSeriesDetailsSlug}/${video.videoDetails.videoSeries.slug}` 
                                                        : 
                                                            '',
                                streamingDate: video.videoDetails.videoDayDate,
                                ...video
                            })
                        }
                        // Create Series
                        if ( video.videoDetails.videoSeries?.id && 
                             !video.videoDetails.videoSeries?.seriesDetails.seriesHide.seriesHideSearchResults 
                            ) {
                            videoList.push({
                                objectID: video.videoDetails.videoSeries.id,
                                title: video.videoDetails.videoSeries.title,
                                type: 'series',
                                campus: campus.slug,
                                campusTitle: campus.title,
                                excerpt: video.videoDetails.videoSeries.excerpt,
                                slug: video.videoDetails.videoSeries.slug,
                                language: 'en',
                                link: `/${campus.slug}/${config.watchSeriesDetailsSlug}/${video.videoDetails.videoSeries.slug}`,
                                linkProduction: `${config.siteUrl}/${campus.slug}/${config.watchSeriesDetailsSlug}/${video.videoDetails.videoSeries.slug}`,
                            })
                        }
                    }
                })
            }
        })
        return videoList
    },
    indexName: `vod`,
    settings: { attributesToSnippet: [`excerpt:20`,`campus`] },
  },
  {
    query: pagesQuery,
    transformer: ({ data }) => {
        let pagesList = []

        // Create Pages
        data.pages.nodes.forEach( page => {
            if ( page.pageDetails.pageCampus?.length > 0 ) {
                if ( !page.pageDetails.pageHide.pageHideSearchResults ){
                    page.pageDetails.pageCampus.forEach( campus => {
                        if ( campus.status === 'publish' ) {
                            pagesList.push({
                                objectID: page.id,
                                title: page.title,
                                type: 'page',
                                campus: campus.slug,
                                campusTitle: campus.title,
                                slug: page.slug,
                                language: 'en',
                                link: `/${campus.slug}/${config.pagesSlug}/${ (page.wpParent?.node?.slug) ? page.wpParent.node.slug + '/' : '' }${page.slug}`,
                                linkProduction: `${config.siteUrl}/${campus.slug}/${config.pagesSlug}/${ (page.wpParent?.node?.slug) ? page.wpParent.node.slug + '/' : '' }${page.slug}`,
                            })
                        }
                    })
                }
            }
        })

        // Create posts
        data.posts.nodes.forEach( post => {
            if ( post.postDetails.postCampus?.length > 0 ) {
                if ( !post.postDetails.postHide.postHideSearchResults ){
                    post.postDetails.postCampus.forEach( campus => {
                        if ( campus.status === 'publish' ) {
                            pagesList.push({
                                objectID: post.id,
                                title: post.title,
                                type: 'post',
                                campus: campus.slug,
                                campusTitle: campus.title,
                                slug: post.slug,
                                language: 'en',
                                link: `/${campus.slug}/${config.blogPostDetailsSlug}/${ (post.wpParent?.node?.slug) ? post.wpParent.node.slug + '/' : '' }${post.slug}`,
                                linkProduction: `${config.siteUrl}/${campus.slug}/${config.blogPostDetailsSlug}/${post.slug}`,
                            })
                        }
                    })
                }
            }
        })

        // Create News
        data.news.nodes.forEach( news => {
            if ( news.newsDetails.postCampus?.length > 0 ) {
                if ( !news.postDetails.newsHide.newsHideSearchResults ){
                    news.newsDetails.newsCampus.forEach( campus => {
                        if ( campus.status === 'publish' ) {
                            pagesList.push({
                                objectID: news.id,
                                title: news.title,
                                type: 'news',
                                campus: campus.slug,
                                campusTitle: campus.title,
                                slug: news.slug,
                                language: 'en',
                                link: `/${campus.slug}/${config.newsPostDetailsSlug}/${news.slug}`,
                                linkProduction: `${config.siteUrl}/${campus.slug}/${config.newsPostDetailsSlug}/${news.slug}`,
                            })
                        }
                    })
                }
            }
        })

        // Create Events
        data.events.nodes.forEach( event => {
            if ( event.eventDetails.eventCampus?.length > 0 ) {
                if ( !event.eventDetails.eventHide.eventHideSearchResults ){
                    event.eventDetails.eventCampus.forEach( campus => {
                        if ( campus.status === 'publish' ) {
                            pagesList.push({
                                objectID: event.id,
                                title: event.title,
                                type: 'event',
                                campus: campus.slug,
                                campusTitle: campus.title,
                                slug: event.slug,
                                language: 'en',
                                link: `/${campus.slug}/${config.eventPostDetailsSlug}/${event.slug}`,
                                linkProduction: `${config.siteUrl}/${campus.slug}/${config.eventPostDetailsSlug}/${event.slug}`,
                            })
                        }
                    })
                }
            }
        })

        // Compiled List
        return pagesList
    },
    indexName: `pages`,
    settings: { attributesToSnippet: [ `campus` ] }
  },

]
module.exports = queries