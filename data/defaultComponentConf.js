const componentConf = {

    blurbVertical: {
        'orientation': 'horizontal',
        'truncate': true,
        'truncateLines': 3,
        'stretchedLink': true,
        'itemClass': '',
        'aspectRatio': '16_9',
        'imageFit': 'cover',
        'imagePosition': 'center-center',
        'border': undefined,
        'borderColor': undefined,
        'itemGrow': false,
        'hideImage': true, // Hiding Image because the Algolia Indexes is not configured to store the images
        'hideTitle': false,
        'hideSubtitle': false,
        'hideExcerpt': false,
        'hideButton': false,
        'itemCssRemoveDefault': false,
    }

};

module.exports = componentConf;