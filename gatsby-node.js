/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)

const mediaFields = `
    altText
    encodeURI
    uri
    sourceUrl
    title
`

const seoFields = `
    seo {
        title
        focuskw 
        metaDesc 
        metaKeywords 
        opengraphDescription 
        opengraphImage {
            ${mediaFields}
        }
        opengraphTitle 
        twitterDescription 
        twitterImage {
            ${mediaFields}
        }
        twitterTitle
    }
`

const query = `
    query {

        allWpPost(filter: {status: {eq: "publish"}})  {
            nodes{
                title
                excerpt
                slug
                content
                modified
                ${seoFields}
                featuredImage {
                    node {
                        localFile {
                            childImageSharp {
                                fluid {
                                    src
                                }
                            }
                        }
                    }
                }
                postDetails {
                    campus {
                        ... on WpCampus {
                            title
                            slug
                            featuredImage {
                                node {
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
                ${seoFields}
                featuredImage {
                    node {
                        localFile {
                          childImageSharp {
                            fluid {
                              src
                            }
                          }
                        }
                    }
                }
                VodVideo {
                    oneLiner
                    transcript
                    dayDate
                    embed
                    campus {
                        ... on WpCampus {
                            id
                            title
                            slug
                            
                            featuredImage {
                                node {
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
                    serie {
                        ... on WpSerie {
                            id
                            title

                            featuredImage {
                                node {
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
                            
                            featuredImage {
                                node {
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
                }
            }
        }

    }  
`

exports.createPages = async( {actions, graphql} ) => {
    const { data } = await graphql(`
        ${query}
    `)

    if(!data.allWpVideoOnDemand) return null

    data.allWpPost.nodes.forEach(post => {
        actions.createPage({
            path: `/blog/${post.slug}`,
            component: path.resolve(`./src/components/templates/post/postDetails.js`),
            context: {
                ...post,
                slug: post.slug
            }
        })
    })

    data.allWpVideoOnDemand.nodes.forEach(video => {
        actions.createPage({
            path: `/message/${video.slug}`,
            component: path.resolve(`./src/components/templates/watch/watchDetails.js`),
            context: {
                ...video,
                id: video.id,
                slug: video.slug
            }
        })
    })

}