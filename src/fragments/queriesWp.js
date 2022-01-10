const queriesWebsiteSettings = require('./queriesWebsiteSettings')

const queriesWp = `
    wp {
        websiteSettings {
            websiteSettings {
                settingsPages {
                    ${queriesWebsiteSettings.archivesConf}
                }
            }
        }
    }
`

module.exports = queriesWp