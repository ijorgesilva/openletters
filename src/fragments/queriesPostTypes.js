const queriesCommon         = require('./queriesCommon')
const queriesMenus          = require('./queriesMenus')
const queriesMinistryPages  = require('./queriesMinistryPages')
const queriesSections       = require('./queriesSections')
const queriesSectionsMain     = require('./queriesSectionsMain')

const queriesPostTypes = {
    allWpCampus: `
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
                ${queriesCommon.featuredImageFields}
                ${queriesCommon.seoFields}
                campusDetails {
                    campusPages {
                        campusWatch {
                            pageActive
                        }
                        campusEvents {
                            pageActive
                        }
                        campusBlog {
                            pageActive
                        }
                        campusNews {
                            pageActive
                        }
                        campusMinistry {
                            pageActive
                        }
                        campusGroups {
                            pageActive
                        }
                        campusVolunteering {
                            pageActive
                        }
                        campusCourses {
                            pageActive
                        }
                    }
                    campusBrand {
                        campusBrandOverwrite
                        campusBrandUrl
                        campusBrandLogo {
                            ${queriesCommon.localFile}
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
    `,
    allWpVideo: `
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
                ${queriesCommon.seoFields}
                ${queriesCommon.featuredImageFields}
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
                            ${queriesCommon.featuredImageFields}
                            campusDetails {
                                campusPages {
                                    campusWatch {
                                        pageActive
                                    }
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
                                    ${queriesCommon.localFile}
                                }
                                seriesSeasonsActive
                            }
                            seriesGraphics {
                                poster {
                                    ${queriesCommon.localFile}
                                }
                                logo {
                                    ${queriesCommon.localFile}
                                }
                                background {
                                    ${queriesCommon.localFile}
                                }
                            }
                        }
                    }
                    videoSpeaker {
                        ... on WpSpeaker {
                            id
                            title
                            uri
                            ${queriesCommon.featuredImageFields}
                        }
                    }
                    videoHide {
                    videoHideSearchEngines
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
    allWpSeries: `
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
                ${queriesCommon.seoFields}
                seriesDetails {
                    seriesTrailer
                    seriesSeasonsActive
                    seriesTrailerPoster {
                        ${queriesCommon.localFile}
                    }
                    seriesHide {
                        seriesHideSearchEngines
                    }
                }
                seriesGraphics {
                    poster {
                        ${queriesCommon.localFile}
                    }
                    logo {
                        ${queriesCommon.localFile}
                    }
                    background {
                        ${queriesCommon.localFile}
                    }
                }
            }
        }
    `,
    allWpNews: `
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
                ${queriesCommon.featuredImageFields}
                ${queriesCommon.seoFields}
                newsDetails {
                    newsCampus {
                        ${queriesCommon.referenceCampus}
                    }
                    newsHide {
                    newsHideSearchEngines
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
    allWpEvents: `
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
                ${queriesCommon.featuredImageFields}
                ${queriesCommon.seoFields}
                eventDetails {
                    eventAddress
                    eventCampus {
                        ${queriesCommon.referenceCampus}
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
                        ${queriesCommon.tag}
                    }
                }
            }
        }
    `,
    allWpMinistry: `
        ########
        # Ministries 
        ########
        ministries: allWpMinistry (
            filter: {
                status: {eq: "publish"}
            }
        ) {
            nodes {
                id
                title
                slug
                databaseId
                ${queriesCommon.seoFields}
                general {
                    summary
                    campus {
                        ${queriesCommon.referenceCampus}
                    }
                    featuredPhoto {
                        ${queriesCommon.localFile}
                    }
                }
                ministryDetails {
                    ministryPages {
                        ministryPageFrontpage {
                            generatePage
                            sections {
                                ${queriesSectionsMain}
                            }
                        }
                        ministryPageGroups {
                            ${queriesMinistryPages}
                        }
                        ministryPageVolunteering {
                            ${queriesMinistryPages}
                        }
                        ministryPageCourses {
                            ${queriesMinistryPages}
                        }
                        ministryPageEvents {
                            ${queriesMinistryPages}
                        }
                        ministryPageBlogNews {
                            ${queriesMinistryPages}
                        }
                        ministryPageVideos {
                            ${queriesMinistryPages}
                        }
                    }

                    ministryPagesCustom {
                        menuTitle
                        menuWeight
                        sections {
                            ${queriesSectionsMain}
                        }
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
    allWpDocument: `
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
                        ${queriesCommon.referenceCampus}
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
    `,
    allWpPage: `
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
                ${queriesCommon.seoFields}
                ${queriesCommon.featuredImageFields}
                pageDetails {
                    pageCampus {
                        ${queriesCommon.referenceCampus}
                    }
                    pageMenues {
                        ${queriesMenus}
                    }
                    pageHideContent
                    pageHideShare
                    pageSections {
                        ${queriesSectionsMain}
                    }
                    pageHide {
                        pageHideSearchEngines
                    }
                }
                ${queriesCommon.wpParent}
            }
        }
    `,
    allWpPosts: `
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
                ${queriesCommon.featuredImageFields}
                ${queriesCommon.seoFields}
                postDetails {
                    postCampus {
                        ... on WpCampus {
                            id
                            title
                            slug
                            databaseId
                            ${queriesCommon.featuredImageFields}
                        }
                    }
                    postAuthor {
                        ... on WpSpeaker {
                            id
                            title
                            slug
                            ${queriesCommon.featuredImageFields}
                        }
                    }
                    postFooterSection {
                        ... on WpContentSection {
                                id
                                slug
                                databaseId
                                status
                                sectionDetails {
                                    ${queriesSections}
                                }
                        }
                    }
                    postHide {
                        postHideSearchEngines
                    }
                }
                tags {
                    nodes {
                        ${queriesCommon.tag}
                    }
                }
            }
        }
    `
}

module.exports = queriesPostTypes;