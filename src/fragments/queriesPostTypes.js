const queriesCommon         = require('./queriesCommon')
const queriesMenus          = require('./queriesMenus')
const queriesMinistryPages  = require('./queriesMinistryPages')
const queriesSections       = require('./queriesSections')
const queriesSectionsMain     = require('./queriesSectionsMain')

const queriesPostTypes = {
    campuses: `
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
                            pageSections {
                                ${queriesSectionsMain}
                            }
                        }
                        campusEvents {
                            pageActive
                            pageSections {
                                ${queriesSectionsMain}
                            }
                        }
                        campusBlog {
                            pageActive
                            pageSections {
                                ${queriesSectionsMain}
                            }
                        }
                        campusNews {
                            pageActive
                            pageSections {
                                ${queriesSectionsMain}
                            }
                        }
                        campusMinistry {
                            pageActive
                            pageSections {
                                ${queriesSectionsMain}
                            }
                        }
                        campusGroups {
                            pageActive
                            pageSections {
                                ${queriesSectionsMain}
                            }
                        }
                        campusVolunteering {
                            pageActive
                            pageSections {
                                ${queriesSectionsMain}
                            }
                        }
                        campusCourses {
                            pageActive
                            pageSections {
                                ${queriesSectionsMain}
                            }
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
    vod: `
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
    series: `
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
    news: `
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
    events: `
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
                    eventExternalOnly
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
                    eventLayout
                    eventSections {
                        ${queriesSectionsMain}
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
    ministries: `
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
                        menuType
                        menuLink {
                            menuItemType
                            menuItemUrl
                            menuItemTarget
                            menuItemCss
                            menuItemRemoveCss
                        }
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
    attachments: `
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
    pages: `
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
                        ${queriesMenus.widgetMenu}
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
    posts: `
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
    `,
    courses: `
        ########
        # Courses 
        ########
        courses: allWpCourse {
            nodes {
                id
                title
                slug
                databaseId
                general {
                    summary
                    campus {
                        ${queriesCommon.referenceCampus}
                    }
                    featuredPhoto {
                        ${queriesCommon.localFile}
                    }
                }
                postContent {
                    content
                }
                pageLayout {
                    pageLayout {
                        ${queriesSectionsMain}
                    }
                }
                courseDetails {
                    courseDescription
                    courseInstructors {
                        ... on WpSpeaker {
                            id
                            title
                            uri
                            ${queriesCommon.featuredImageFields}
                        }
                    }
                    courseMediaTrailer
                    courseModality
                    coursePace
                    courseTimeLocation {
                        startDate
                        endDate
                        endDateActive
                        location {
                            ... on WpEventVenue {
                                venueDetails {
                                    venueAddress
                                }
                            }
                        }
                    }
                    courseProvider {
                        providerType
                        providerExternal {
                            providerExternalUrl
                            providerExternalUrlText
                        }
                    }
                    courseMediaThumbnail {
                        ${queriesCommon.localFile}
                    }
                    courseDuration {
                        weeklyHours
                        duration
                    }
                    courseLanguages
                    courseCertificate
                }
                tags {
                    nodes {
                        ${queriesCommon.tag}
                    }
                }
            }
        }
    `,
    landingPages:` 
        ########
        # Landing Pages 
        ########
        landingPages: allWpLandingPage {
            nodes {
                id
                title
                slug
                databaseId
                ${queriesCommon.seoFields}
                ${queriesCommon.pageSettings}
                general {
                    summary
                    campus {
                        ${queriesCommon.referenceCampus}
                    }
                    featuredPhoto {
                        ${queriesCommon.localFile}
                    }
                }
                pageLayout {
                    pageLayout {
                        ${queriesSectionsMain}
                    }
                }
            }
        }
    `,
    volunteering: `
        ########
        # Volunteering Opportunities
        ########
        volunteering: allWpVolunteeropportunity {
            nodes {
                id
                title
                slug
                databaseId
                date(formatString: "YYYYMMDD")
                modified(formatString: "YYYYMMDD")
                ${queriesCommon.seoFields}
                postContent {
                    content
                }
                serveDetails {
                    volunteerRelatedMinistry {
                        ${queriesCommon.wpMinistry}
                    }
                }
                general {
                    summary
                    campus {
                        ${queriesCommon.referenceCampus}
                    }
                    featuredPhoto {
                        ${queriesCommon.localFile}
                    }
                }
            }
        }
    `
}

module.exports = queriesPostTypes;