const queriesCommon = require('./queriesCommon');
const queriesFeedCategories = require('./queriesFeedCategories');

const queriesFeed = `
    feedType
        
    ## Feed Videos
    feedVideos {
        feedVideosCategory {
            ${queriesCommon.tag}
            ${queriesFeedCategories.videosOnDemand}
        }
    }

    ## Feed Series
    feedSeries {
        feedSeriesCategory {
            ${queriesCommon.tag}
            ${queriesFeedCategories.series}
        }
    }

    ## Feed Posts
    feedPosts {
        feedPostsCategory {
            ${queriesCommon.tag}
            ${queriesFeedCategories.posts}
        }
    }

    ## Feed News
    feedNews {
        feedNewsCategory {
            ${queriesCommon.tag}
            ${queriesFeedCategories.newsposts}
        }
    }

    ## Feed Groups
    feedGroups {
        feedGroupsCategory {
            ${queriesCommon.tag}
            ${queriesFeedCategories.groups}
        }
    }

    ## Feed Group Types
    feedGrouptypes {
        feedGrouptypesCategory {
            ${queriesCommon.tag}
            ${queriesFeedCategories.groupTypes}
        }
    }

    ## Feed Events
    feedEvents {
        feedEventsCategory {
            ${queriesCommon.tag}
            ${queriesFeedCategories.events}
        }
    }

    ## Ministries
    feedMinistries {
        feedMinistriesCategory {
            ${queriesCommon.tag}
            ${queriesFeedCategories.ministries}
        }
    }

    ## Volunteering
    feedVolunteering {
        feedVolunteeringCategory {
            ${queriesCommon.tag}
            ${queriesFeedCategories.volunteeropportunities}
        }
    }

    ## Courses
    feedCourses {
        feedCoursesCategory {
            ${queriesCommon.tag}
            ${queriesFeedCategories.courses}
        }
    }

    ## Lessons
    feedLessons {
        feedLessonsCategory {
            ${queriesCommon.tag}
            ${queriesFeedCategories.lessons}
        }
    }

    ## Button Behavior
    ${queriesCommon.feedButtonOptions}
`

module.exports = queriesFeed;