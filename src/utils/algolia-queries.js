const config    = require('../../data/SiteConfig')

// Post Types Queries
const videosAndSeries = `
{
    ########
    # Videos on Demand
    ########
    videos: allWpVideoOnDemand (
            sort: {
                fields: videoDetails___videoDayDate, 
                order: DESC,
            },
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
                            campusConfiguration{
                                campusConfigurationVisibility
                            }
                            campusPages {
                                campusWatch {
                                    pageActive
                                }
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
                videoSpeaker {
                    ... on WpSpeaker {
                        id
                        status
                        title
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
        sort: {
            fields: date,
            order: DESC
        },
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
        sort: {
            fields: date, 
            order: DESC
        },
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
                        campusDetails {
                            campusPages {
                                campusBlog {
                                    pageActive
                                }
                            }
                        }
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
        sort: {
            fields: date, 
            order: DESC
        },
        filter: {
            status: {
                eq: "publish"
            }
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
                        campusDetails {
                            campusPages {
                                campusNews {
                                    pageActive
                                }
                            }
                        }
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
        sort: {
            fields: eventDetails___eventDates___eventDate, 
            order: DESC
        },
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
                        campusDetails {
                            campusPages {
                                campusEvents {
                                    pageActive
                                }
                            }
                        }
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
        sort: {
            fields: date, 
            order: DESC
        },
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
                        campusDetails {
                            campusPages {
                                campusAttachments {
                                    pageActive
                                }
                            }
                        }
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
const ministries = `
{
    ########
    # Ministries
    ########
    ministries: allWpMinistry (
        sort: {
            fields: date, 
            order: DESC
        },
        filter: {
            status: {eq: "publish"}
        }
    ) {
        nodes {
            id
            title
            slug
            general {
                campus {
                    ... on WpCampus {
                        id
                        title
                        slug
                        databaseId
                        status
                        campusDetails {
                            campusPages {
                                campusMinistry {
                                    pageActive
                                }
                            }
                        }
                    }
                }
            }
            visibility {
                hide
                searchResults
            }
        }
    }
}
`
const volunteering = `
{
    ########
    # Volunteering
    ########
    volunteering: allWpVolunteeropportunity (
        sort: {
            fields: date, 
            order: DESC
        },
        filter: {
            status: {
                eq: "publish"
            }
        }
    ) {
        nodes {
            id
            title
            slug
            general {
                campus {
                    ... on WpCampus {
                        id
                        title
                        slug
                        databaseId
                        status
                        campusDetails {
                            campusPages {
                                campusVolunteering {
                                    pageActive
                                }
                            }
                        }
                    }
                }
            }
            visibility {
                hide
                searchResults
            }
        }
    }
}
`
const courses = `
{
    ########
    # Courses
    ########
    courses: allWpCourse (
        sort: {
            fields: date, 
            order: DESC
        },
        filter: {
            status: {eq: "publish"}
        }
    ) {
        nodes {
            id
            title
            slug
            general {
                campus {
                    ... on WpCampus {
                        id
                        title
                        slug
                        databaseId
                        status
                        campusDetails {
                            campusPages {
                                campusCourses {
                                    pageActive
                                }
                            }
                        }
                    }
                }
            }
            visibility {
                hide
                searchResults
            }
        }
    }
}
`
const groupTypes = `
{
    ########
    # Group Types
    ########
    groupTypes: allWpGroupType (
        sort: {
            fields: date, 
            order: DESC
        },
        filter: {status: {eq: "publish"}}
    ) {
        nodes {
            id
            title
            slug
            general {
                campus {
                    ... on WpCampus {
                        id
                        title
                        slug
                        databaseId
                        status
                        campusDetails {
                            campusPages {
                                campusGroups {
                                    pageActive
                                }
                            }
                        }
                    }
                }
            }
            visibility {
                hide
                searchResults
            }
        }
    }
}
`
const groups = `
{
    ########
    # Groups
    ########
    groups: allWpGroup (
        sort: {
            fields: date, 
            order: DESC
        },
        filter: {status: {eq: "publish"}}
    ) {
        nodes {
            id
            title
            slug
            general {
                campus {
                    ... on WpCampus {
                        id
                        title
                        slug
                        databaseId
                        status
                        campusDetails {
                            campusPages {
                                campusGroups {
                                    pageActive
                                }
                            }
                        }
                    }
                }
            }
            visibility {
                hide
                searchResults
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
                    if ( campus.status === 'publish' 
                        && campus.campusDetails.campusPages?.campusWatch.pageActive // If page it's active create the entry
                        && campus.campusDetails.campusConfiguration.campusConfigurationVisibility // If campus it's visible create the entry 
                    ){ 
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
                                linkProduction: `${process.env.SITE_URL}/${campus.slug}/${config.watchMessageDetailsSlug}/${_.slug}`,
                                series: _.videoDetails.videoSeries?.title,
                                speakers: _.videoDetails.videoSpeaker?.map( _ => _.title ) || '',
                                seriesLink: (_.videoDetails.videoSeries?.title) ?
                                                `/${campus.slug}/${config.watchSeriesDetailsSlug}/${_.videoDetails.videoSeries.slug}` 
                                            : 
                                                '',
                                seriesLinkProduction:   (_.videoDetails.videoSeries?.title) ?
                                                            `${process.env.SITE_URL}/${campus.slug}/${config.watchSeriesDetailsSlug}/${_.videoDetails.videoSeries.slug}` 
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
    settings: { attributesToSnippet: [`excerpt:20`,`campus`], attributesForFaceting: [ `campus`, `series`, 'speakers' ] },
  },

  /* Series Index */
  {
    query: videosAndSeries,
    transformer: ({ data }) => {
        let seriesList = []
        data.videos.nodes.forEach( _ => {
            if( _.videoDetails.videoCampus?.length > 0 ) {
                _.videoDetails.videoCampus.forEach ( campus => {
                    if ( campus.status === 'publish' 
                        && campus.campusDetails.campusPages?.campusWatch.pageActive // If page it's active create the entry
                        && campus.campusDetails.campusConfiguration.campusConfigurationVisibility // If campus it's visible create the entry 
                    ){
                        
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
                                linkProduction: `${process.env.SITE_URL}/${campus.slug}/${config.watchSeriesDetailsSlug}/${_.videoDetails.videoSeries.slug}`,
                            })
                        }

                    }
                })
            }
        })
        return seriesList
    },
    indexName: `series`,
    settings: { attributesToSnippet: [`excerpt:20`,`campus`], attributesForFaceting: [ `campus` ] },
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
                                linkProduction: `${process.env.SITE_URL}/${campus.slug}/${config.pagesSlug}/${ (_.wpParent?.node?.slug) ? _.wpParent.node.slug + '/' : '' }${_.slug}`,
                            })
                        }
                    })
                }
            }
        })
        
        return pagesList
    },
    indexName: `pages`,
    settings: { attributesToSnippet: [ `campus` ], attributesForFaceting: [ `campus` ] }
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
                        if ( campus.status === 'publish' && campus.campusDetails.campusPages?.campusBlog.pageActive ) {
                            postsList.push({
                                objectID: _.id,
                                title: _.title,
                                type: 'post',
                                campus: campus.slug,
                                campusTitle: campus.title,
                                slug: _.slug,
                                language: 'en',
                                link: `/${campus.slug}/${config.blogPostDetailsSlug}/${ (_.wpParent?.node?.slug) ? _.wpParent.node.slug + '/' : '' }${_.slug}`,
                                linkProduction: `${process.env.SITE_URL}/${campus.slug}/${config.blogPostDetailsSlug}/${_.slug}`,
                            })
                        }
                    })
                }
            }
        })
        
        return postsList
    },
    indexName: `posts`,
    settings: { attributesToSnippet: [ `campus` ], attributesForFaceting: [ `campus` ] }
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
                        if ( campus.status === 'publish' && campus.campusDetails.campusPages?.campusEvents.pageActive ) {
                            eventsList.push({
                                objectID: _.id,
                                title: _.title,
                                type: 'event',
                                campus: campus.slug,
                                campusTitle: campus.title,
                                slug: _.slug,
                                language: 'en',
                                link: `/${campus.slug}/${config.eventPostDetailsSlug}/${_.slug}`,
                                linkProduction: `${process.env.SITE_URL}/${campus.slug}/${config.eventPostDetailsSlug}/${_.slug}`,
                            })
                        }
                    })
                }
            }
        })
        
        return eventsList
    },
    indexName: `events`,
    settings: { attributesToSnippet: [ `campus` ], attributesForFaceting: [ `campus` ] }
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
                        if ( campus.status === 'publish' && campus.campusDetails.campusPages?.campusNews.pageActive ) {
                            newsList.push({
                                objectID: _.id,
                                title: _.title,
                                type: 'news',
                                campus: campus.slug,
                                campusTitle: campus.title,
                                slug: _.slug,
                                language: 'en',
                                link: `/${campus.slug}/${config.newsPostDetailsSlug}/${_.slug}`,
                                linkProduction: `${process.env.SITE_URL}/${campus.slug}/${config.newsPostDetailsSlug}/${_.slug}`,
                            })
                        }
                    })
                }
            }
        })

        return newsList
    },
    indexName: `news`,
    settings: { attributesToSnippet: [ `campus` ], attributesForFaceting: [ `campus` ] }
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
                        if ( campus.status === 'publish'  && campus.campusDetails.campusPages?.campusAttachments.pageActive ) {
                            attachmentList.push({
                                objectID: _.id,
                                title: _.title,
                                type: 'attachment',
                                campus: campus.slug,
                                campusTitle: campus.title,
                                slug: _.slug,
                                language: 'en',
                                link: `/${campus.slug}/${config.attachmentSlug}/${_.slug}`,
                                linkProduction: `${process.env.SITE_URL}/${campus.slug}/${config.attachmentSlug}/${_.slug}`,
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

  /* Ministries Index */
  {
    query: ministries,
    transformer: ({ data }) => {
        let ministryList = []
        data.ministries.nodes.forEach( _ => {
            if ( _.general.campus?.length > 0 ) {
                if ( _.visibility.searchResults ) {
                    _.general.campus.forEach( campus => {
                        if ( campus.status === 'publish' && campus.campusDetails.campusPages?.campusMinistry.pageActive ) {
                            ministryList.push({
                                objectID: _.id,
                                title: _.title,
                                type: 'ministry',
                                campus: campus.slug,
                                campusTitle: campus.title,
                                slug: _.slug,
                                language: 'en',
                                link: `/${campus.slug}/${config.ministrySlug}/${_.slug}`,
                                linkProduction: `${process.env.SITE_URL}/${campus.slug}/${config.ministrySlug}/${_.slug}`,
                            })
                        }
                    })
                }
            }
        })
        
        return ministryList
    },
    indexName: `ministries`,
    settings: { attributesToSnippet: [ `campus` ], attributesForFaceting: [ `campus` ] }
  },

  /* Volunteering Index */
  {
    query: volunteering,
    transformer: ({ data }) => {
        let volunteeringList = []

        data.volunteering.nodes.forEach( _ => {
            if ( _.general.campus?.length > 0 ) {
                if ( _.visibility.searchResults ) {
                    _.general.campus.forEach( campus => {
                        if ( campus.status === 'publish' && campus.campusDetails.campusPages?.campusVolunteering.pageActive ) {
                            volunteeringList.push({
                                objectID: _.id,
                                title: _.title,
                                type: 'volunteering',
                                campus: campus.slug,
                                campusTitle: campus.title,
                                slug: _.slug,
                                language: 'en',
                                link: `/${campus.slug}/${config.volunteeringSlug}/${_.slug}`,
                                linkProduction: `${process.env.SITE_URL}/${campus.slug}/${config.volunteeringSlug}/${_.slug}`,
                            })
                        }
                    })
                }
            }
        })
        
        return volunteeringList
    },
    indexName: `volunteering`,
    settings: { attributesToSnippet: [ `campus` ], attributesForFaceting: [ `campus` ] }
  },

  /* Courses Index */
  {
    query: courses,
    transformer: ({ data }) => {
        let coursesList = []

        data.courses.nodes.forEach( _ => {
            if ( _.general.campus?.length > 0 ) {
                if ( _.visibility.searchResults ) {
                    _.general.campus.forEach( campus => {
                        if ( campus.status === 'publish' && campus.campusDetails.campusPages?.campusCourses.pageActive ) {
                            coursesList.push({
                                objectID: _.id,
                                title: _.title,
                                type: 'courses',
                                campus: campus.slug,
                                campusTitle: campus.title,
                                slug: _.slug,
                                language: 'en',
                                link: `/${campus.slug}/${config.coursesSlug}/${_.slug}`,
                                linkProduction: `${process.env.SITE_URL}/${campus.slug}/${config.coursesSlug}/${_.slug}`,
                            })
                        }
                    })
                }
            }
        })
        
        return coursesList
    },
    indexName: `courses`,
    settings: { attributesToSnippet: [ `campus` ], attributesForFaceting: [ `campus` ] }
  },

  /* Group Types Index */
  {
    query: groupTypes,
    transformer: ({ data }) => {
        let groupTypesList = []

        data.groupTypes.nodes.forEach( _ => {
            if ( _.general.campus?.length > 0 ) {
                if ( _.visibility.searchResults ) {
                    _.general.campus.forEach( campus => {
                        if ( campus.status === 'publish' && campus.campusDetails.campusPages?.campusGroups.pageActive ) {
                            groupTypesList.push({
                                objectID: _.id,
                                title: _.title,
                                type: 'groupTypes',
                                campus: campus.slug,
                                campusTitle: campus.title,
                                slug: _.slug,
                                language: 'en',
                                link: `/${campus.slug}/${config.groupTypesSlug}/${_.slug}`,
                                linkProduction: `${process.env.SITE_URL}/${campus.slug}/${config.groupTypesSlug}/${_.slug}`,
                            })
                        }
                    })
                }
            }
        })
        
        return groupTypesList
    },
    indexName: `groupTypes`,
    settings: { attributesToSnippet: [ `campus` ], attributesForFaceting: [ `campus` ] }
  },

  /* Groups */
  {
    query: groups,
    transformer: ({ data }) => {
        let groupsList = []

        data.groups.nodes.forEach( _ => {
            if ( _.general.campus?.length > 0 ) {
                if ( _.visibility.searchResults ) {
                    _.general.campus.forEach( campus => {
                        if ( campus.status === 'publish' && campus.campusDetails.campusPages?.campusGroups.pageActive ) {
                            groupsList.push({
                                objectID: _.id,
                                title: _.title,
                                type: 'groups',
                                campus: campus.slug,
                                campusTitle: campus.title,
                                slug: _.slug,
                                language: 'en',
                                link: `/${campus.slug}/${config.groupsSlug}/${_.slug}`,
                                linkProduction: `${process.env.SITE_URL}/${campus.slug}/${config.groupsSlug}/${_.slug}`,
                            })
                        }
                    })
                }
            }
        })
        
        return groupsList
    },
    indexName: `groups`,
    settings: { attributesToSnippet: [ `campus` ], attributesForFaceting: [ `campus` ] }
  },
]
module.exports = queries