const config    = require('../../data/SiteConfig')

// Post Types Queries
const videosAndSeries = `
{
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
}
`
const pages = `
{
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
}
`
const posts = `
{
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
}
`
const news = `
{
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
}
`
const events = `
{
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
}
`
const attachments = `
{
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
            modified
            attachment {
                attachmentCampus {
                    ... on WpCampus {
                        id
                        title
                        slug
                        status
                        databaseId
                    }
                }
                attachmentHide {
                    attachmentHideSearchResults
                }
            }
        }
    }
}
`

const queries = [

  /* Videos Index */
  {
    query: videosAndSeries,
    transformer: ({ data }) => {
        let videoList = []

        data.videos.nodes.forEach( _ => {
            if( _.videoDetails.videoCampus?.length > 0 ) {
                _.videoDetails.videoCampus.forEach ( campus => {
                    if ( campus.status === 'publish' && campus.campusDetails.campusWatch.campusWatchPage ){
                        
                        if( !_.videoDetails.videoHide.videoHideSearchResults ){
                            videoList.push({
                                objectID: _.id,
                                title: _.title,
                                type: 'video',
                                campus: campus.slug,
                                campusTitle: campus.title,
                                excerpt: _.excerpt,
                                slug: _.slug,
                                language: 'en',
                                link: `/${campus.slug}/${config.watchMessageDetailsSlug}/${_.slug}`,
                                linkProduction: `${config.siteUrl}/${campus.slug}/${config.watchMessageDetailsSlug}/${_.slug}`,
                                series: _.videoDetails.videoSeries?.title,
                                seriesLink: (_.videoDetails.videoSeries?.title) ?
                                                `/${campus.slug}/${config.watchSeriesDetailsSlug}/${_.videoDetails.videoSeries.slug}` 
                                            : 
                                                '',
                                seriesLinkProduction:   (_.videoDetails.videoSeries?.title) ?
                                                            `${config.siteUrl}/${campus.slug}/${config.watchSeriesDetailsSlug}/${_.videoDetails.videoSeries.slug}` 
                                                        : 
                                                            '',
                                streamingDate: _.videoDetails.videoDayDate,
                                ..._
                            })
                        }

                    }
                })
            }
        })

        return videoList
    },
    indexName: `videos`,
    settings: { attributesToSnippet: [`excerpt:20`,`campus`] },
  },

  /* Series Index */
  {
    query: videosAndSeries,
    transformer: ({ data }) => {
        let seriesList = []
        data.videos.nodes.forEach( _ => {
            if( _.videoDetails.videoCampus?.length > 0 ) {
                _.videoDetails.videoCampus.forEach ( campus => {
                    if ( campus.status === 'publish' && campus.campusDetails.campusWatch.campusWatchPage ){
                        
                        if ( _.videoDetails.videoSeries?.id && 
                             !_.videoDetails.videoSeries?.seriesDetails.seriesHide.seriesHideSearchResults 
                        ) {
                            seriesList.push({
                                objectID: _.videoDetails.videoSeries.id,
                                title: _.videoDetails.videoSeries.title,
                                type: 'series',
                                campus: campus.slug,
                                campusTitle: campus.title,
                                excerpt: _.videoDetails.videoSeries.excerpt,
                                slug: _.videoDetails.videoSeries.slug,
                                language: 'en',
                                link: `/${campus.slug}/${config.watchSeriesDetailsSlug}/${_.videoDetails.videoSeries.slug}`,
                                linkProduction: `${config.siteUrl}/${campus.slug}/${config.watchSeriesDetailsSlug}/${_.videoDetails.videoSeries.slug}`,
                            })
                        }

                    }
                })
            }
        })
        return seriesList
    },
    indexName: `series`,
    settings: { attributesToSnippet: [`excerpt:20`,`campus`] },
  },

  /* Pages Index */
  {
    query: pages,
    transformer: ({ data }) => {
        let pagesList = []

        data.pages.nodes.forEach( _ => {
            if ( _.pageDetails.pageCampus?.length > 0 ) {
                if ( !_.pageDetails.pageHide.pageHideSearchResults ){
                    _.pageDetails.pageCampus.forEach( campus => {
                        if ( campus.status === 'publish' ) {
                            pagesList.push({
                                objectID: _.id,
                                title: _.title,
                                type: 'page',
                                campus: campus.slug,
                                campusTitle: campus.title,
                                slug: _.slug,
                                language: 'en',
                                link: `/${campus.slug}/${config.pagesSlug}/${ (_.wpParent?.node?.slug) ? _.wpParent.node.slug + '/' : '' }${_.slug}`,
                                linkProduction: `${config.siteUrl}/${campus.slug}/${config.pagesSlug}/${ (_.wpParent?.node?.slug) ? _.wpParent.node.slug + '/' : '' }${_.slug}`,
                            })
                        }
                    })
                }
            }
        })
        
        return pagesList
    },
    indexName: `pages`,
    settings: { attributesToSnippet: [ `campus` ] }
  },

  /* Posts Index */
  {
    query: posts,
    transformer: ({ data }) => {
        let postsList = []

        data.posts.nodes.forEach( _ => {
            if ( _.postDetails.postCampus?.length > 0 ) {
                if ( !_.postDetails.postHide.postHideSearchResults ){
                    _.postDetails.postCampus.forEach( campus => {
                        if ( campus.status === 'publish' ) {
                            postsList.push({
                                objectID: _.id,
                                title: _.title,
                                type: 'post',
                                campus: campus.slug,
                                campusTitle: campus.title,
                                slug: _.slug,
                                language: 'en',
                                link: `/${campus.slug}/${config.blogPostDetailsSlug}/${ (_.wpParent?.node?.slug) ? _.wpParent.node.slug + '/' : '' }${_.slug}`,
                                linkProduction: `${config.siteUrl}/${campus.slug}/${config.blogPostDetailsSlug}/${_.slug}`,
                            })
                        }
                    })
                }
            }
        })
        
        return postsList
    },
    indexName: `posts`,
    settings: { attributesToSnippet: [ `campus` ] }
  },

  /* Events Index */
  {
    query: events,
    transformer: ({ data }) => {
        let eventsList = []
        
        data.events.nodes.forEach( _ => {
            if ( _.eventDetails.eventCampus?.length > 0 ) {
                if ( !_.eventDetails.eventHide.eventHideSearchResults ){
                    _.eventDetails.eventCampus.forEach( campus => {
                        if ( campus.status === 'publish' ) {
                            eventsList.push({
                                objectID: _.id,
                                title: _.title,
                                type: 'event',
                                campus: campus.slug,
                                campusTitle: campus.title,
                                slug: _.slug,
                                language: 'en',
                                link: `/${campus.slug}/${config.eventPostDetailsSlug}/${_.slug}`,
                                linkProduction: `${config.siteUrl}/${campus.slug}/${config.eventPostDetailsSlug}/${_.slug}`,
                            })
                        }
                    })
                }
            }
        })
        
        return eventsList
    },
    indexName: `events`,
    settings: { attributesToSnippet: [ `campus` ] }
  },

  /* News Index */
  {
    query: news,
    transformer: ({ data }) => {
        let newsList = []

        data.news.nodes.forEach( _ => {
            if ( _.newsDetails.postCampus?.length > 0 ) {
                if ( !_.postDetails.newsHide.newsHideSearchResults ){
                    _.newsDetails.newsCampus.forEach( campus => {
                        if ( campus.status === 'publish' ) {
                            newsList.push({
                                objectID: _.id,
                                title: _.title,
                                type: 'news',
                                campus: campus.slug,
                                campusTitle: campus.title,
                                slug: _.slug,
                                language: 'en',
                                link: `/${campus.slug}/${config.newsPostDetailsSlug}/${_.slug}`,
                                linkProduction: `${config.siteUrl}/${campus.slug}/${config.newsPostDetailsSlug}/${_.slug}`,
                            })
                        }
                    })
                }
            }
        })

        return newsList
    },
    indexName: `news`,
    settings: { attributesToSnippet: [ `campus` ] }
  },

  /* Attachment Index */
  {
    query: attachments,
    transformer: ({ data }) => {
        let attachmentList = []

        data.attachments.nodes.forEach( _ => {
            if ( _.attachment.attachmentCampus?.length > 0 ) {
                if ( !_.attachment.attachmentHide.attachmentHideSearchResults ) {
                    _.attachment.attachmentCampus.forEach( campus => {
                        if ( campus.status === 'publish' ) {
                            attachmentList.push({
                                objectID: _.id,
                                title: _.title,
                                type: 'attachment',
                                campus: campus.slug,
                                campusTitle: campus.title,
                                slug: _.slug,
                                language: 'en',
                                link: `/${campus.slug}/${config.attachmentSlug}/${_.slug}`,
                                linkProduction: `${config.siteUrl}/${campus.slug}/${config.attachmentSlug}/${_.slug}`,
                            })
                        }
                    })
                }
            }
        })
        
        return attachmentList
    },
    indexName: `attachments`,
    settings: { attributesToSnippet: [ `campus` ] }
  },

]
module.exports = queries