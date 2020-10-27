/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)
const config = require("./data/SiteConfig");

exports.createPages = async( { page, actions, graphql, reporter } ) => {

    const { createPage } = actions

    const result = await graphql(
        `${query}`
    )

    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }

    let numberPages 

    /* Messages creation */
    numberPages = Math.ceil(result.data.allWpVideoOnDemand.edges.length / config.postsPerPage)
    Array.from( { length: numberPages } ).forEach( (_, i) => {
        actions.createPage({
            path: i === 0 ? config.watchMessageListSlug : `${config.watchMessageListSlug}/${i + 1}`,
            component: path.resolve(`./src/components/templates/watch/messageList.js`),
            context: {
                limit: config.postsPerPage,
                skip: i * config.postsPerPage,
                currentPage: i + 1,
                numberPages,
            }
        })
    })
    result.data.allWpVideoOnDemand.edges.forEach( video => {
        actions.createPage({
            path: `${config.watchMessageDetailsSlug}/${video.node.slug}`,
            component: path.resolve(`./src/components/templates/watch/watchDetails.js`),
            context: {
                ...video,
                title: video.node.title,
                slug: video.node.slug,
                id: video.node.id,
                layout: "watchDetails"
            }
        })
    })

    /* Serie creation */
    numberPages = Math.ceil(result.data.allWpSerie.edges.length / config.postsPerPage)
    Array.from( { length: numberPages } ).forEach( (_, i) => {
        actions.createPage({
            path: i === 0 ? config.watchSerieListSlug : `${config.watchSerieListSlug}/${i + 1}`,
            component: path.resolve(`./src/components/templates/watch/serieList.js`),
            context: {
                limit: config.postsPerPage,
                skip: i * config.postsPerPage,
                currentPage: i + 1,
                numberPages,
            }
        })
    })
    result.data.allWpSerie.edges.forEach( serie => {
        actions.createPage({
            path: `${config.watchSerieDetailsSlug}/${serie.node.slug}`,
            component: path.resolve(`./src/components/templates/watch/watchSeries.js`),
            context: {
                ...serie,
                title: serie.node.title,
                slug: serie.node.slug,
                id: serie.node.id,
            }
        })
    })
    
    /* Post creation */
    numberPages = Math.ceil(result.data.allWpPost.edges.length / config.postsPerPage)
    Array.from( { length: numberPages } ).forEach( (_, i) => {
        actions.createPage({
            path: i === 0 ? config.blogPostListSlug : `${config.blogPostListSlug}/${i + 1}`,
            component: path.resolve(`./src/components/templates/post/postList.js`),
            context: {
                limit: config.postsPerPage,
                skip: i * config.postsPerPage,
                currentPage: i + 1,
                numberPages,
            }
        })
    })
    result.data.allWpPost.edges.forEach(post => {
        actions.createPage({
            path: `${config.blogPostDetailsSlug}/${post.node.slug}`,
            component: path.resolve(`./src/components/templates/post/postDetails.js`),
            context: {
                ...post,
                title: post.node.title,
                slug: post.node.slug,
                id: post.node.id,
            }
        })
    })

    /* News creation */
    numberPages = Math.ceil(result.data.allWpNewspost.edges.length / config.postsPerPage)
    Array.from( { length: numberPages } ).forEach( (_, i) => {
        actions.createPage({
            path: i === 0 ? config.newsPostListSlug : `${config.newsPostListSlug}/${i + 1}`,
            component: path.resolve(`./src/components/templates/news/newsList.js`),
            context: {
                limit: config.postsPerPage,
                skip: i * config.postsPerPage,
                currentPage: i + 1,
                numberPages,
            }
        })
    })
    result.data.allWpNewspost.edges.forEach(news => {
        actions.createPage({
            path: `${config.newsPostDetailsSlug}/${news.node.slug}`,
            component: path.resolve(`./src/components/templates/news/newsDetails.js`),
            context: {
                ...news,
                limit: config.postsPerPage,
                title: news.node.title,
                slug: news.node.slug,
                id: news.node.id,
            }
        })
    })
    
    /* Event creation */
    numberPages = Math.ceil(result.data.allWpEvent.edges.length / config.postsPerPage)
    Array.from( { length: numberPages } ).forEach( (_, i) => {
        actions.createPage({
            path: i === 0 ? config.eventsPostListSlug : `${config.eventsPostListSlug}/${i + 1}`,
            component: path.resolve(`./src/components/templates/event/eventList.js`),
            context: {
                limit: config.postsPerPage,
                skip: i * config.postsPerPage,
                currentPage: i + 1,
                numberPages,
            }
        })
    })
    result.data.allWpEvent.edges.forEach(event => {
        actions.createPage({
            path: `${config.eventPostDetailsSlug}/${event.node.slug}`,
            component: path.resolve(`./src/components/templates/event/eventDetails.js`),
            context: {
                ...event,
                title: event.node.title,
                slug: event.node.slug,
                id: event.node.id,
            }
        })
    })

}

const featuredImageFields = `
    featuredImage {
        node {
            localFile {
                childImageSharp {
                    fluid(maxWidth: 1800) {
                        src
                    }
                }
            }
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

const query = `
    query {

        allWpPost(filter: {status: {eq: "publish"}})  {
            edges{
                node{
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
                    }
                    author {
                        node {
                        slug
                        firstName
                        description
                        lastName
                        }
                    }
                    terms {
                    nodes {
                        slug
                        name
                    }
                    }
                }
            }
        }

        allWpVideoOnDemand (filter: {status: {eq: "publish"}}) {
            edges{
                node {
                    id
                    title
                    slug
                    content
                    excerpt
                    modified
                    ${seoFields}
                    ${featuredImageFields}
                    videoDetails {
                        oneLiner
                        transcript
                        dayDate
                        embed
                        url
                        campus {
                            ... on WpCampus {
                                id
                                title
                                slug
                                ${featuredImageFields}
                            }
                        }
                        serie {
                            ... on WpSerie {
                                id
                                title
                                slug
                                serieGraphics {
                                    poster {
                                        localFile {
                                            childImageSharp {
                                                fluid(maxWidth: 1800) {
                                                    src
                                                }
                                            }
                                        }
                                    }
                                    logo {
                                        localFile {
                                            childImageSharp {
                                                fluid(maxWidth: 1800) {
                                                    src
                                                }
                                            }
                                        }
                                    }
                                    background {
                                        localFile {
                                            childImageSharp {
                                                fluid {
                                                    src 
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        speaker {
                            ... on WpSpeaker {
                                id
                                title
                                uri
                                ${featuredImageFields}
                            }
                        }
                    }
                    terms {
                        nodes {
                            slug
                            name
                        }
                    }
                }
            }
        }

        allWpSerie (filter: {status: {eq: "publish"}}) {
            edges{
                node {
                    id
                    title
                    slug
                    content
                    ${seoFields}
                    serieDetails {
                        trailer
                        trailerPoster {
                            localFile {
                                childImageSharp {
                                    fluid {
                                        src 
                                    }
                                }
                            }
                        }
                    }
                    serieGraphics {
                        logo {
                            localFile {
                                childImageSharp {
                                    fluid {
                                        src
                                    }
                                }
                            }
                        }
                        background {
                            localFile {
                                childImageSharp {
                                    fluid {
                                        src
                                    }
                                }
                            }
                        }
                    }
                    terms {
                        nodes {
                            slug
                            name
                        }
                    }
                }
            }
        }

        
        allWpNewspost (filter: {status: {eq: "publish"}})  {
            edges{
                node{
                    id
                    title
                    excerpt
                    slug
                    content
                    date(formatString: "YYYYMMDD")
                    modified(formatString: "YYYYMMDD")
                    ${featuredImageFields}
                    ${seoFields}
                    terms {
                        nodes {
                            slug
                            name
                        }
                    }
                }
            }
        }


        allWpEvent(filter: {status: {eq: "publish"}}) {
            edges{
                node{
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
                            time
                        }
                        eventLink {
                            eventLinkText
                            eventLinkUrl
                        }
                    }
                    terms {
                    nodes {
                        slug
                        name
                    }
                    }
                }
            }
        }

    }
`
