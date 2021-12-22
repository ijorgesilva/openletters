const queriesCommon = require('./queriesCommon')

const queriesFeedCategories = {
    videosOnDemand: `
        videosOnDemand {
            nodes {
                id
                title
                slug
                excerpt
                status
                ${queriesCommon.featuredImageFields}
                tags {
                    nodes {
                        ${queriesCommon.tag}
                    }
                }
                videoDetails {
                    videoDayDate
                    videoCampus {
                        ${queriesCommon.referenceCampus}
                    }
                    videoSeries {
                        ... on WpSerie {
                            id
                            title
                            slug
                            status
                            tags {
                                nodes {
                                    ${queriesCommon.tag}
                                }
                            }
                        }
                    }
                }
            }
        }
    `,
    series: `
        series {
            nodes {
                id
                slug
                title
                excerpt
                status
                tags {
                    nodes {
                        ${queriesCommon.tag}
                    }
                }
                seriesGraphics {
                    poster {
                        ${queriesCommon.localFile}
                    }
                }
            }
        }
    `,
    posts: `
        posts {
            nodes {
                id
                slug
                title
                excerpt
                status
                ${queriesCommon.featuredImageFields}
                postDetails {
                    postCampus {
                        ${queriesCommon.referenceCampus}
                    }
                }
                tags {
                    nodes {
                        ${queriesCommon.tag}
                    }
                }
            }
        }
    `,
    events: `
        events {
            nodes {
                id
                title
                excerpt
                slug
                status
                ${queriesCommon.featuredImageFields}
                tags {
                    nodes {
                        ${queriesCommon.tag}
                    }
                }
                eventDetails {
                    eventFeatured
                    eventRegistrationType
                    eventExternalOnly
                    eventDates {
                        eventDate
                        eventTime
                    }
                    eventLink {
                        eventLinkText
                        eventLinkUrl
                    }
                    eventCampus {
                        ${queriesCommon.referenceCampus}
                    }
                }
            }
        }
    `,
    newsposts: `
        newsposts {
            nodes {
                id
                title
                excerpt
                slug
                status
                date(formatString: "YYYYMMDD")
                modified(formatString: "YYYYMMDD")
                ${queriesCommon.featuredImageFields}
                newsDetails {
                    newsCampus {
                        ${queriesCommon.referenceCampus}
                    }
                }
                tags {
                    nodes {
                        ${queriesCommon.tag}
                    }
                }
            }
        }
    `,
    groups: `
        groups {
            nodes {
                id
                title
                slug
                status
                tags {
                    nodes {
                        ${queriesCommon.tag}
                    }
                }
            }
        }
    `,
    groupTypes: `
        groupTypes {
            nodes {
                id
                title
                slug
                status
                tags {
                    nodes {
                        ${queriesCommon.tag}
                    }
                }
            }
        }
    `,
    ministries: `
        ministries {
            nodes {
                id
                title
                slug
                status
                general {
                    summary
                    campus {
                        ${queriesCommon.referenceCampus}
                    }
                }
                tags {
                    nodes {
                        ${queriesCommon.tag}
                    }
                }
            }
        }
    `,
    volunteeropportunities: `
        volunteeropportunities {
            nodes {
                id
                title
                slug
                status
                ${queriesCommon.featuredImageFields}
                general {
                    summary
                    campus {
                        ${queriesCommon.referenceCampus}
                    }
                }
                tags {
                    nodes {
                        ${queriesCommon.tag}
                    }
                }
            }
        }
    `,
    courses: `
        courses {
            nodes {
                id
                title
                slug
                status
                general {
                    summary
                    campus {
                        ${queriesCommon.referenceCampus}
                    }
                }
                tags {
                    nodes {
                        ${queriesCommon.tag}
                    }
                }
            }
        }
    `,
    lessons: `
        lessons {
            nodes {
                id
                title
                slug
                status
            }
        }
    `
}

module.exports = queriesFeedCategories