const queriesCommon    = require('./queriesCommon')
const queriesSections  = require('./queriesSections')

const queriesSectionsMain = `
    ... on WpContentSection {
        status
        sectionDetails {

            ${queriesSections}
            
            ## Tabs
            sectionTabs {
                sectionTabsTab {
                    sectionTabsTabType
                    sectionTabsTabName
                    sectionTabsTabContent
                    sectionTabsTabSection {
                        ... on WpContentSection {
                            status
                            sectionDetails {
                                ${queriesSections}
                            }
                        }
                    }
                }
            }

            ## Text, Media and Buttons
            sectionText {
                sectionTextButtons {
                    sectionTextButton {
                        ${queriesCommon.buttons}
                    }
                }
                sectionTextMedia {
                    sectionTextbasicMediaType
                    sectionTextbasicMediaAlignment
                    sectionTextbasicMediaPhoto {
                        ${queriesCommon.localFile}
                    }
                }
                sectionTextSections {
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
            }

        }
    }
`

module.exports = queriesSectionsMain