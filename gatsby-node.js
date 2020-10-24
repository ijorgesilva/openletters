/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)

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

        allWpVideoOnDemand (filter: {status: {eq: "publish"}}) {
            nodes {
                id
                title
                slug
                content
                excerpt
                modified
                terms {
                  nodes {
                    slug
                    name
                  }
                }
                ${seoFields}
                ${featuredImageFields}
                videoDetails {
                    oneLiner
                    transcript
                    dayDate
                    embed
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
                    url
                    speaker {
                        ... on WpSpeaker {
                            id
                            title
                            uri
                            ${featuredImageFields}
                        }
                    }
                }
            }
        }

        allWpSerie (filter: {status: {eq: "publish"}}) {
            nodes {
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

        
        allWpNewspost (filter: {status: {eq: "publish"}})  {
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
                terms {
                  nodes {
                    slug
                    name
                  }
                }
            }
        }


        allWpEvent(filter: {status: {eq: "publish"}}) {
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
`

exports.createPages = async( { page, actions, graphql, reporter } ) => {

    const { createPage } = actions

    const result = await graphql(
        `${query}`
    )

    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }

    result.data.allWpVideoOnDemand.nodes.forEach( video => {
        createPage({
            path: `/watch/message/${video.slug}`,
            component: path.resolve(`./src/components/templates/watch/watchDetails.js`),
            context: {
                ...video,
                title: video.title,
                slug: video.slug,
                id: video.id,
                layout: "watchDetails"
            }
        })
    })

    result.data.allWpSerie.nodes.forEach( serie => {
        actions.createPage({
            path: `/watch/serie/${serie.slug}`,
            component: path.resolve(`./src/components/templates/watch/watchSeries.js`),
            context: {
                ...serie,
                title: serie.title,
                slug: serie.slug,
                id: serie.id,
            }
        })
    })
    
    result.data.allWpPost.nodes.forEach(post => {
        actions.createPage({
            path: `/blog/${post.slug}`,
            component: path.resolve(`./src/components/templates/post/postDetails.js`),
            context: {
                ...post,
                title: post.title,
                slug: post.slug,
                id: post.id,
            }
        })
    })

    result.data.allWpNewspost.nodes.forEach(news => {
        actions.createPage({
            path: `/news/${news.slug}`,
            component: path.resolve(`./src/components/templates/news/newsDetails.js`),
            context: {
                ...news,
                title: news.title,
                slug: news.slug,
                id: news.id,
            }
        })
    })
    
    result.data.allWpEvent.nodes.forEach(event => {
        actions.createPage({
            path: `/events/${event.slug}`,
            component: path.resolve(`./src/components/templates/event/eventDetails.js`),
            context: {
                ...event,
                title: event.title,
                slug: event.slug,
                id: event.id,
            }
        })
    })

}