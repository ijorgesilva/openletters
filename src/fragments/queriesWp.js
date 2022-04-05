const queriesWebsiteSettings = require('./queriesWebsiteSettings')

const queriesWp = `
    wp {
        websiteGeneralSettings {
            websiteSettings {
                settingsPages {
                    ${queriesWebsiteSettings.archivesConf}
                }
            }
        }
    }
`

module.exports = queriesWp