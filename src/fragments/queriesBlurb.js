const queriesCommon = require('./queriesCommon')

const queriesBlurb = `
    itemImage {
        ${queriesCommon.localFile}
    }
    itemTitle
    itemSubtitle
    itemContent
    itemCss
    itemCssRemoveDefault
    itemButtons {
        itemButtonsButton {
            ${queriesCommon.buttons}
        }
    }
`
module.exports = queriesBlurb;