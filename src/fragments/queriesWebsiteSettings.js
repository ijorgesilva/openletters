const queriesCommon = require('./queriesCommon')

const queriesWebsiteSettings = {
    archivesConf: `
        settingsPagesWatch {
            ${queriesCommon.itemConfiguration}
        }
        settingsPagesBlog {
            ${queriesCommon.itemConfiguration}
        }
        settingsPagesCourses {
            ${queriesCommon.itemConfiguration}
        }
        settingsPagesEvents {
            ${queriesCommon.itemConfiguration}
        }
        settingsPagesGroups {
            ${queriesCommon.itemConfiguration}
        }
        settingsPagesMinistries {
            ${queriesCommon.itemConfiguration}
        }
        settingsPagesVolunteer {
            ${queriesCommon.itemConfiguration}
        }
    `,
}

module.exports = queriesWebsiteSettings