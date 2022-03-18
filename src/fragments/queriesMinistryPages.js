const queriesFeedCategories     = require('./queriesFeedCategories')
const queriesLanguage           = require('./queriesLanguage')
const queriesSectionsMain       = require('./queriesSectionsMain')

const queriesMinistryPages = `
    active
    menuTitle
    menuWeight
    feed
    feedLayout
    itemConfiguration {
        ## Aspect
        itemBorder
        itemBorderColor
        itemClass
        itemGap
        itemImageAspect
        itemImageFit
        itemImagePosition
        itemOrientation
        itemTruncate
        itemTruncateLines
        ## Button Behavior
        buttonBehavior {
            buttonText
            buttonTarget
            buttonStretch
            buttonCss
            buttonCssRemoveDefault
        }
        ## Sorting & Listing
        itemType
        maxItems
        orderBy
        skip
        sorting
        ## Visibility
        hideButton
        hideExcerpt
        hideImage
        hideSubtitle
        hideTitle
    }
    feedCategory {
        id
        slug
        ${queriesLanguage.language}
        ${queriesFeedCategories.videosOnDemand}
        ${queriesFeedCategories.posts}
        ${queriesFeedCategories.newsposts}
        ${queriesFeedCategories.events}
        ${queriesFeedCategories.groups}
        ${queriesFeedCategories.groupTypes}
        ${queriesFeedCategories.volunteeropportunities}
        ${queriesFeedCategories.courses}
    }
    sections {
        ${queriesSectionsMain}
    }

`

module.exports = queriesMinistryPages