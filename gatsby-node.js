/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path      = require('path')

const config            = require('./data/SiteConfig')
const queriesCommon     = require('./src/fragments/queriesCommon')
const queriesPostTypes  = require('./src/fragments/queriesPostTypes')
const queriesWp         = require('./src/fragments/queriesWp')

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

exports.createPages = async( { actions, graphql, reporter } ) => {

    const result = await graphql(
        `${query}`
    )

    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }

    // Flags to create pages when the CPT have content and a campus is selected.
    let createWatch         = false
    let createBlog          = false
    let createNews          = false
    let createEvents        = false
    let createMinistries    = false
    let createCourses       = false
    let createVolunteering  = false
    let createGroups        = false
    
    // Var for storing created series per campus to avoid duplicates
    let createdSeries = [] 

    /*******************
     * I. ARCHIVES & CAMPUS PAGE ARCHIVES BY CAMPUS
     *******************/
    if ( result.data.campuses?.nodes?.length > 0 ) { // All the Archives and Main pages are circumscribed to a campus
        result.data.campuses.nodes.forEach( campus => {
            /*  Watch Main Page*/
            if( config.cpt.createWatch ) {
                if ( result.data.wp.websiteSettings.websiteSettings.settingsPages.settingsPagesWatch.active === true ) { // Global flag: Turned on/off on website settings
                    if( campus.campusDetails.campusPages.campusWatch.pageActive === true ) {
                        createWatch = true
                        // It creates Main Watch Page per Campus at /campus/watch
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
                        // It creates Latest Page Archive per Campus at /campus/watch/latest
                        actions.createPage({
                            path: `/${campus.slug}/${config.watchSlug}/${config.watchSlugLatest}`,
                            component: path.resolve(`./src/components/templates/watch/watchLatest.js`),
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
                }
            }

            /* Blog Main Page*/
            if( config.cpt.createBlog ) {
                if ( result.data.wp.websiteSettings.websiteSettings.settingsPages.settingsPagesBlog.active === true ) {
                    if( campus.campusDetails.campusPages.campusBlog.pageActive === true ) {
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
                }
            }

            /* News Main Page*/
            if( config.cpt.createPages ) {
                if ( result.data.wp.websiteSettings.websiteSettings.settingsPages.settingsPagesBlog.active === true ) {
                    if( campus.campusDetails.campusPages.campusNews.pageActive === true ) {
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
                }
            }
            
            /* Events Main Page */
            if( config.cpt.createEvents ) {
                if ( result.data.wp.websiteSettings.websiteSettings.settingsPages.settingsPagesEvents.active === true ) {
                    if( campus.campusDetails.campusPages.campusEvents.pageActive === true ) {
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
                }
            }

            /* Ministry Main Page and Sub-pages */
            if( config.cpt.createMinistries ) {
                if ( result.data.wp.websiteSettings.websiteSettings.settingsPages.settingsPagesMinistries.active === true ) {
                    if( campus.campusDetails.campusPages.campusMinistry.pageActive === true ) {
                        createMinistries = true
                        actions.createPage({
                            path: `/${campus.slug}/${config.ministrySlug}`,
                            component: path.resolve(`./src/components/templates/ministry/ministryCampus.js`),
                            context: {
                                ...campus,
                                title: campus.title,
                                slug: campus.slug,
                                id: campus.id,
                                campusId: '/' + campus.databaseId.toString() + '/',
                                breadcrumbs: {
                                    'campus': campus.slug,
                                    'rootApp': `/${campus.slug}/${config.ministrySlug}`,
                                    'back':   `/${campus.slug}/${config.ministrySlug}`,
                                    'current': `/${campus.slug}/${config.ministrySlug}`
                                }
                            }
                        })
                    }
                }
            }

            /* Courses */
            if( config.cpt.createCourses ) {
                if ( result.data.wp.websiteSettings.websiteSettings.settingsPages.settingsPagesCourses.active === true ) {
                    if( campus.campusDetails.campusPages.campusCourses.pageActive === true ) {
                        createCourses = true
                        actions.createPage({
                            path: `/${campus.slug}/${config.coursesSlug}`,
                            component: path.resolve(`./src/components/templates/course/courseCampus.js`),
                            context: {
                                ...campus,
                                title: campus.title,
                                slug: campus.slug,
                                id: campus.id,
                                campusId: '/' + campus.databaseId.toString() + '/',
                                breadcrumbs: {
                                    'campus': campus.slug,
                                    'rootApp': `/${campus.slug}/${config.coursesSlug}`,
                                    'back':   `/${campus.slug}/${config.coursesSlug}`,
                                    'current': `/${campus.slug}/${config.coursesSlug}`
                                }
                            }
                        })
                    }
                }
            }

            /* Volunteering */
            if( config.cpt.createVolunteering ) {
                if ( result.data.wp.websiteSettings.websiteSettings.settingsPages.settingsPagesVolunteer.active === true ) {
                    if( campus.campusDetails.campusPages.campusVolunteering.pageActive === true ) {
                        createVolunteering = true
                        actions.createPage({
                            path: `/${campus.slug}/${config.volunteeringSlug}`,
                            component: path.resolve(`./src/components/templates/volunteering/volunteeringCampus.js`),
                            context: {
                                ...campus,
                                title: campus.title,
                                slug: campus.slug,
                                id: campus.id,
                                campusId: '/' + campus.databaseId.toString() + '/',
                                breadcrumbs: {
                                    'campus': campus.slug,
                                    'rootApp': `/${campus.slug}/${config.volunteeringSlug}`,
                                    'back':   `/${campus.slug}/${config.volunteeringSlug}`,
                                    'current': `/${campus.slug}/${config.volunteeringSlug}`
                                }
                            }
                        })
                    }
                }
            }

            /* Groups */
            if( config.cpt.createGroups ) {
                if ( result.data.wp.websiteSettings.websiteSettings.settingsPages.settingsPagesGroups.active === true ) {
                    if( campus.campusDetails.campusPages.campusGroups.pageActive === true ) {
                        createGroups = true
                        actions.createPage({
                            path: `/${campus.slug}/${config.groupsSlug}`,
                            component: path.resolve(`./src/components/templates/group/groupCampus.js`),
                            context: {
                                ...campus,
                                title: campus.title,
                                slug: campus.slug,
                                id: campus.id,
                                campusId: '/' + campus.databaseId.toString() + '/',
                                breadcrumbs: {
                                    'campus': campus.slug,
                                    'rootApp': `/${campus.slug}/${config.groupsSlug}`,
                                    'back':   `/${campus.slug}/${config.groupsSlug}`,
                                    'current': `/${campus.slug}/${config.groupsSlug}`
                                }
                            }
                        })
                    }
                }
            }

            /* Group Types */
            if( config.cpt.createGroups ) {
                if ( result.data.wp.websiteSettings.websiteSettings.settingsPages.settingsPagesGroups.active === true ) {
                    if( campus.campusDetails.campusPages.campusGroups.pageActive === true ) {
                        createGroups = true
                        actions.createPage({
                            path: `/${campus.slug}/${config.groupTypesSlug}`,
                            component: path.resolve(`./src/components/templates/group/groupTypeCampus.js`),
                            context: {
                                ...campus,
                                title: campus.title,
                                slug: campus.slug,
                                id: campus.id,
                                campusId: '/' + campus.databaseId.toString() + '/',
                                breadcrumbs: {
                                    'campus': campus.slug,
                                    'rootApp': `/${campus.slug}/${config.groupTypesSlug}`,
                                    'back':   `/${campus.slug}/${config.groupTypesSlug}`,
                                    'current': `/${campus.slug}/${config.groupTypesSlug}`
                                }
                            }
                        })
                    }
                }
            }

        })
    }

    /*******************
     * II. PAGE DETAILS CREATION
     *******************/
    
    /*******************
     * 1. Video Detail Pages creation 
     *******************/
    if( config.cpt.createWatch ) {
        if ( result.data.wp.websiteSettings.websiteSettings.settingsPages.settingsPagesWatch.active === true ) {
            if ( createWatch && result.data.videos?.nodes?.length > 0 ) {
                result.data.videos.nodes.forEach( video => {
                    if( video.videoDetails.videoCampus?.length > 0 ) {
                        video.videoDetails.videoCampus.forEach ( campus => {
                            if( campus.campusDetails.campusPages.campusWatch.pageActive === true ) {
                                /* Videos Page Creation for Each Campus selected */
                                actions.createPage({
                                    path: `/${campus.slug}/${config.watchMessageDetailsSlug}/${video.slug}`,
                                    component: path.resolve(`./src/components/templates/watch/watchDetails.js`),
                                    context: {
                                        ...video,
                                        title: video.title,
                                        slug: video.slug,
                                        tags: video.tags,
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
        }
    }

    /*******************
     * 2. Pages creation 
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
     * 3. Blog Post Pages creation 
     *******************/
    if ( result.data.wp.websiteSettings.websiteSettings.settingsPages.settingsPagesBlog.active === true ) {
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
    }
    

    /*******************
     * 4. News Pages creation 
     *******************/
    if( config.cpt.createNews ) {
        if ( result.data.wp.websiteSettings.websiteSettings.settingsPages.settingsPagesBlog.active === true ) {
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
        }
    }
    
    /*******************
     * 5. Events Pages creation 
     *******************/
    if( config.cpt.createEvents ) {
        if ( result.data.wp.websiteSettings.websiteSettings.settingsPages.settingsPagesEvents.active === true ) {
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
        }
    }

    /*******************
     * 6. Ministry Pages creation 
     *******************/
    if( config.cpt.createMinistries ) {
        let customPageSlug
        if ( result.data.wp.websiteSettings.websiteSettings.settingsPages.settingsPagesMinistries.active === true ) {
            if ( createMinistries && result.data.ministries?.nodes?.length > 0 ) {
                if ( result.data.ministries?.nodes?.length > 0 ) {
                    result.data.ministries.nodes.forEach( _ => {
                        if( _.general.campus?.length > 0 ) {
                            _.general.campus.forEach ( campus => {
                                actions.createPage({
                                    path: `/${campus.slug}/${config.ministrySlug}/${_.slug}`,
                                    component: path.resolve(`./src/components/templates/ministry/ministryDetails.js`),
                                    context: {
                                        ..._,
                                        title: _.title,
                                        slug: _.slug,
                                        id: _.id,
                                        featuredImage: _.general.featuredPhoto,
                                        excerpt: _.general.summary,
                                        layout: 'ministryDetails',
                                        view: 'frontpage',
                                        campusId: `/${campus.databaseId}/`,
                                        breadcrumbs: {
                                                        'campus': campus.slug,
                                                        'rootApp': `/${campus.slug}/${config.ministrySlug}`,
                                                        'back': `/${campus.slug}/${config.ministrySlug}`,
                                                        'current': `/${campus.slug}/${config.ministrySlug}/${_.slug}`,
                                                        'slug': _.slug,
                                                    },
                                    }
                                })
                                /* Video Page Creation */
                                if( _.ministryDetails.ministryPages.ministryPageVideos.active ) {
                                    actions.createPage({
                                        path: `/${campus.slug}/${config.ministrySlug}/${_.slug}/${config.watchSlug}`,
                                        component: path.resolve(`./src/components/templates/ministry/ministryDetails.js`),
                                        context: {
                                            ..._,
                                            title: _.title,
                                            slug: _.slug,
                                            id: _.id,
                                            featuredImage: _.general.featuredPhoto,
                                            excerpt: _.general.summary,
                                            layout: 'ministryDetailsVideos',
                                            view: 'videos',
                                            campusId: `/${campus.databaseId}/`,
                                            breadcrumbs: {
                                                            'campus': campus.slug,
                                                            'rootApp': `/${campus.slug}/${config.ministrySlug}`,
                                                            'back': `/${campus.slug}/${config.ministrySlug}`,
                                                            'current': `/${campus.slug}/${config.ministrySlug}/${_.slug}/${config.watchSlug}`,
                                                            'slug': _.slug,
                                                        },
                                        }
                                    })
                                }
                                /* Event Page Creation */
                                if( _.ministryDetails.ministryPages.ministryPageEvents.active ) {
                                    actions.createPage({
                                        path: `/${campus.slug}/${config.ministrySlug}/${_.slug}/${config.eventPostDetailsSlug}`,
                                        component: path.resolve(`./src/components/templates/ministry/ministryDetails.js`),
                                        context: {
                                            ..._,
                                            title: _.title,
                                            slug: _.slug,
                                            id: _.id,
                                            featuredImage: _.general.featuredPhoto,
                                            excerpt: _.general.summary,
                                            layout: 'ministryDetailsEvents',
                                            view: 'events',
                                            campusId: `/${campus.databaseId}/`,
                                            breadcrumbs: {
                                                            'campus': campus.slug,
                                                            'rootApp': `/${campus.slug}/${config.ministrySlug}`,
                                                            'back': `/${campus.slug}/${config.ministrySlug}`,
                                                            'current': `/${campus.slug}/${config.ministrySlug}/${_.slug}/${config.eventPostDetailsSlug}`,
                                                            'slug': _.slug,
                                                        },
                                        }
                                    })
                                }
                                /* Blog & News Page Creation */
                                if( _.ministryDetails.ministryPages.ministryPageBlogNews.active ) {
                                    actions.createPage({
                                        path: `/${campus.slug}/${config.ministrySlug}/${_.slug}/${config.blogPostDetailsSlug}`,
                                        component: path.resolve(`./src/components/templates/ministry/ministryDetails.js`),
                                        context: {
                                            ..._,
                                            title: _.title,
                                            slug: _.slug,
                                            id: _.id,
                                            featuredImage: _.general.featuredPhoto,
                                            excerpt: _.general.summary,
                                            layout: 'ministryDetailsBlogNews',
                                            view: 'blog',
                                            campusId: `/${campus.databaseId}/`,
                                            breadcrumbs: {
                                                            'campus': campus.slug,
                                                            'rootApp': `/${campus.slug}/${config.ministrySlug}`,
                                                            'back': `/${campus.slug}/${config.ministrySlug}`,
                                                            'current': `/${campus.slug}/${config.ministrySlug}/${_.slug}/${config.blogPostDetailsSlug}`,
                                                            'slug': _.slug,
                                                        },
                                        }
                                    })
                                }
                                /* Courses Page Creation */
                                if( _.ministryDetails.ministryPages.ministryPageCourses.active ) {
                                    actions.createPage({
                                        path: `/${campus.slug}/${config.ministrySlug}/${_.slug}/${config.coursesSlug}`,
                                        component: path.resolve(`./src/components/templates/ministry/ministryDetails.js`),
                                        context: {
                                            ..._,
                                            title: _.title,
                                            slug: _.slug,
                                            id: _.id,
                                            featuredImage: _.general.featuredPhoto,
                                            excerpt: _.general.summary,
                                            layout: 'ministryDetailsCourses',
                                            view: 'courses',
                                            campusId: `/${campus.databaseId}/`,
                                            breadcrumbs: {
                                                            'campus': campus.slug,
                                                            'rootApp': `/${campus.slug}/${config.ministrySlug}`,
                                                            'back': `/${campus.slug}/${config.ministrySlug}`,
                                                            'current': `/${campus.slug}/${config.ministrySlug}/${_.slug}/${config.coursesSlug}`,
                                                            'slug': _.slug,
                                                        },
                                        }
                                    })
                                }
                                /* Volunteering Page Creation */
                                if( _.ministryDetails.ministryPages.ministryPageVolunteering.active ) {
                                    actions.createPage({
                                        path: `/${campus.slug}/${config.ministrySlug}/${_.slug}/${config.volunteeringSlug}`,
                                        component: path.resolve(`./src/components/templates/ministry/ministryDetails.js`),
                                        context: {
                                            ..._,
                                            title: _.title,
                                            slug: _.slug,
                                            id: _.id,
                                            featuredImage: _.general.featuredPhoto,
                                            excerpt: _.general.summary,
                                            layout: 'ministryDetailsVolunteering',
                                            view: 'volunteering',
                                            campusId: `/${campus.databaseId}/`,
                                            breadcrumbs: {
                                                            'campus': campus.slug,
                                                            'rootApp': `/${campus.slug}/${config.ministrySlug}`,
                                                            'back': `/${campus.slug}/${config.ministrySlug}`,
                                                            'current': `/${campus.slug}/${config.ministrySlug}/${_.slug}/${config.volunteeringSlug}`,
                                                            'slug': _.slug,
                                                        },
                                        }
                                    })
                                }
                                /* Groups Page Creation */
                                if( _.ministryDetails.ministryPages.ministryPageGroups.active ) {
                                    actions.createPage({
                                        path: `/${campus.slug}/${config.ministrySlug}/${_.slug}/${config.groupsSlug}`,
                                        component: path.resolve(`./src/components/templates/ministry/ministryDetails.js`),
                                        context: {
                                            ..._,
                                            title: _.title,
                                            slug: _.slug,
                                            id: _.id,
                                            featuredImage: _.general.featuredPhoto,
                                            excerpt: _.general.summary,
                                            layout: 'ministryDetailsGroups',
                                            view: 'groups',
                                            campusId: `/${campus.databaseId}/`,
                                            breadcrumbs: {
                                                            'campus': campus.slug,
                                                            'rootApp': `/${campus.slug}/${config.ministrySlug}`,
                                                            'back': `/${campus.slug}/${config.ministrySlug}`,
                                                            'current': `/${campus.slug}/${config.ministrySlug}/${_.slug}/${config.groupsSlug}`,
                                                            'slug': _.slug,
                                                        },
                                        }
                                    })
                                }
                                /* Custom Pages Creation */
                                if( _.ministryDetails.ministryPagesCustom?.length > 0 ){
                                    _.ministryDetails.ministryPagesCustom.forEach( ( customPage, index ) => {
                                        if (customPage.menuType === 'page'){
                                            customPageSlug = customPage.menuTitle.replace(/[^\w\s]/gi, '').replace(/ /g,"_").toLowerCase() 
                                            actions.createPage({
                                                path: `/${campus.slug}/${config.ministrySlug}/${_.slug}/${customPageSlug}`,
                                                component: path.resolve(`./src/components/templates/ministry/ministryDetails.js`),
                                                context: {
                                                    ..._,
                                                    title: _.title,
                                                    slug: _.slug,
                                                    id: _.id,
                                                    customPageIndex: index,
                                                    featuredImage: _.general.featuredPhoto,
                                                    excerpt: _.general.summary,
                                                    layout: 'ministryDetailsCustomPage',
                                                    view: 'customPage',
                                                    campusId: `/${campus.databaseId}/`,
                                                    breadcrumbs: {
                                                                    'campus': campus.slug,
                                                                    'rootApp': `/${campus.slug}/${config.ministrySlug}`,
                                                                    'back': `/${campus.slug}/${config.ministrySlug}`,
                                                                    'currentPath': `/${campus.slug}/${config.ministrySlug}/${_.slug}/${customPageSlug}`,
                                                                    'slug': _.slug,
                                                                    'currentSlug': customPageSlug,
                                                                },
                                                }
                                            })
                                        }

                                    })
                                }
                            })
                        }
                    })
                }
            }
        }
    }

    /*******************
     * 7. Course Pages creation 
     *******************/
    if( config.cpt.createCourses ) {
        if ( result.data.wp.websiteSettings.websiteSettings.settingsPages.settingsPagesCourses.active === true ) {
            if ( createCourses && result.data.courses?.nodes?.length > 0 ) {
                if ( result.data.courses?.nodes?.length > 0 ) {
                    result.data.courses.nodes.forEach( _ => {
                        if( _.general.campus?.length > 0 ) {
                            _.general.campus.forEach ( campus => {
                                actions.createPage({
                                    path: `/${campus.slug}/${config.coursesSlug}/${_.slug}`,
                                    component: path.resolve(`./src/components/templates/course/courseDetails.js`),
                                    context: {
                                        ..._,
                                        title: _.title,
                                        slug: _.slug,
                                        id: _.id,
                                        featuredImage: _.general.featuredPhoto,
                                        excerpt: _.general.summary,
                                        layout: "courseDetails",
                                        campusId: `/${campus.databaseId}/`,
                                        courseId: `/${_.databaseId}/`,
                                        breadcrumbs: {
                                                        'campus': campus.slug,
                                                        'rootApp': `/${campus.slug}/${config.coursesSlug}`,
                                                        'back': `/${campus.slug}/${config.coursesSlug}`,
                                                        'current': `/${campus.slug}/${config.coursesSlug}/${_.slug}`,
                                                    },
                                    }
                                })
                            })
                        }
                    })
                }
            }
        }
    }

    /*******************
     * 8. Group & Group Types Pages creation 
     *******************/
    // if( config.cpt.createGroups ) {
    //  if ( result.data.wp.websiteSettings.websiteSettings.settingsPages.settingsPagesGroups.active === true ) {
    //  }
    // }
    
    /*******************
     * 9. Volunteer Pages creation 
     *******************/
    if( config.cpt.createVolunteering ) {
        if ( result.data.wp.websiteSettings.websiteSettings.settingsPages.settingsPagesVolunteer.active === true ) {
            if ( createVolunteering && result.data.opportunities?.nodes?.length > 0 ) {
                if ( result.data.opportunities?.nodes?.length > 0 ) {
                    result.data.opportunities.nodes.forEach( _ => {
                        if( _.general.campus?.length > 0 ) {
                            _.general.campus.forEach ( campus => {
                                actions.createPage({
                                    path: `/${campus.slug}/${config.volunteeringSlug}/${_.slug}`,
                                    component: path.resolve(`./src/components/templates/volunteering/volunteeringDetails.js`),
                                    context: {
                                        ..._,
                                        title: _.title,
                                        slug: _.slug,
                                        id: _.id,
                                        featuredImage: _.general.featuredPhoto,
                                        excerpt: _.general.summary,
                                        layout: "volunteeringDetails",
                                        campusId: `/${campus.databaseId}/`,
                                        volunteeringId: `/${_.databaseId}/`,
                                        breadcrumbs: {
                                                        'campus': campus.slug,
                                                        'rootApp': `/${campus.slug}/${config.volunteeringSlug}`,
                                                        'back': `/${campus.slug}/${config.volunteeringSlug}`,
                                                        'current': `/${campus.slug}/${config.volunteeringSlug}/${_.slug}`,
                                                    },
                                    }
                                })
                            })
                        }
                    })
                }
            }
        }
    }

    /*******************
     * 10. Attachment Pages creation 
    *******************/
    if( config.cpt.createAttachments ) {
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
    }

    /*******************
     * 11. Landing Pages
    *******************/
    if( config.cpt.createLandingPages ) {
        if( result.data.landingPages?.nodes?.length > 0 ) {
            result.data.landingPages.nodes.forEach( _ => {
                if( _.general.campus?.length > 0 ) {
                    _.general.campus.forEach ( campus => {
                        actions.createPage({
                            path: `/${campus.slug}/${config.landingPageSlug}/${_.slug}`,
                            component: path.resolve(`./src/components/templates/landing/landingDetails.js`),
                            context: {
                                ..._,
                                title: _.title,
                                slug: _.slug,
                                id: _.id,
                                campusId: `/${campus.databaseId}/`,
                                breadcrumbs: {
                                                'campus': campus.slug,
                                            },
                            }
                        })
                    })
                }
            })
        }
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

/* 
 * Main Query 
 */
const query = `
    query {

        ${queriesWp}

        ## Always True CPTs on Headless
        ${queriesPostTypes.allWpCampus}

        ${queriesPostTypes.allWpPage}
        
        ${queriesPostTypes.allWpPosts}

        ${queriesCommon.allWpRedirect}

        ## CPTs
        ${config.cpt.createCourses ? queriesPostTypes.allWpCourse : ''}

        ${config.cpt.createNews ? queriesPostTypes.allWpNews : ''}

        ${config.cpt.createEvents ? queriesPostTypes.allWpEvents : ''}

        ${config.cpt.createWatch ? queriesPostTypes.allWpSeries : ''}

        ${config.cpt.createWatch ? queriesPostTypes.allWpVideo : ''}

        ${config.cpt.createMinistries ? queriesPostTypes.allWpMinistry : ''}

        ${config.cpt.createVolunteering ? queriesPostTypes.allWpVolunteeropportunity : ''}

        ${config.cpt.createLandingPages ? queriesPostTypes.allWpLandingPage : ''}

        ${config.cpt.createAttachments ? queriesPostTypes.allWpDocument : ''}
        
    }
`