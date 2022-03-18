import React from 'react'

import { useGetFeed } from '../../../../hooks/useGetFeed'

import FeedRenderingLayout from './feedRenderingLayout'

export default function FeedRendering (
    {
        feeds,
        view,
        campus,
        containerWidth,
        size,
        className,
        mode,
        itemsPerPage,
    }
) {
    
    let feedCategories = []
    let items = []
    let layoutType
    let sortBy = {}
    let feedButton 
    let builtFeedObject = {
        type: view,
        list: []
    }
    let layoutConf = {}

    switch (view) {
        
        case 'videos': {
            feedCategories  = feeds.ministryPages.ministryPageVideos.feedCategory
            feedCategories.forEach( _ => {
                items = [...items, ..._.videosOnDemand?.nodes]
            })
            builtFeedObject.list = items

            layoutType      = feeds.ministryPages.ministryPageVideos.feedLayout.split(':')[0]
            layoutConf      = feeds.ministryPages.ministryPageVideos.itemConfiguration
            sortBy          =   {
                'orderBy':  layoutConf.orderBy.split(':')[0],
                'sorting':  layoutConf.sorting.split(':')[0],
                'maxItems': layoutConf.maxItems,
                'skip':     layoutConf.skip,
            }
            feedButton =    {
                'buttonText': layoutConf.buttonBehavior.buttonText,
                'buttonTarget': layoutConf.buttonBehavior.buttonTarget,
                'buttonCss': layoutConf.buttonBehavior.buttonCss,
                'buttonCssRemoveDefault': layoutConf.buttonBehavior.buttonCssRemoveDefault,
            }
            
            return (
                <FeedRenderingLayout 
                    nodes           = { useGetFeed( undefined, campus, feedButton, builtFeedObject, sortBy ) }
                    layoutType      = { layoutType }
                    containerWidth  = { containerWidth }
                    size            = { size }
                    className       = { className }
                    mode            = { mode }
                    itemsPerPage    = { itemsPerPage }
                    // Aspect
                    truncate        = { layoutConf.itemTruncate }
                    truncateLines   = { layoutConf.itemTruncateLines }
                    orientation     = { layoutConf.itemOrientation }
                    itemClass       = { layoutConf.itemClass }
                    imagePosition   = { layoutConf.itemImagePosition }
                    imageFit        = { layoutConf.itemImageFit }
                    aspectRatio     = { layoutConf.itemImageAspect }
                    border          = { layoutConf.itemBorder}
                    borderColor     = { layoutConf.itemBorderColor }
                    gap             = { layoutConf.itemGap.split(':')[0] }
                    // Button Behavior
                    removeDefaultCss= { layoutConf.buttonBehavior.removeDefaultCss }
                    stretchedlink   = { layoutConf.buttonBehavior.buttonStretch }
                    // Visibility
                    hideTitle       = { layoutConf.hideTitle }
                    hideSubtitle    = { layoutConf.hideSubtitle }
                    hideExcerpt     = { layoutConf.hideExcerpt }
                    hideImage       = { layoutConf.hideImage }
                    hideButton      = { layoutConf.hideButton }
                />
            )

        }

        case 'blog': { // Blog: Posts & News
            feedCategories = feeds.ministryPages.ministryPageBlogNews.feedCategory
            feedCategories.forEach( _ => {
                items = [...items, ..._.newsposts?.nodes, ..._.posts?.nodes]
            })
            builtFeedObject.list = items

            layoutType      = feeds.ministryPages.ministryPageBlogNews.feedLayout.split(':')[0]
            layoutConf      = feeds.ministryPages.ministryPageBlogNews.itemConfiguration
            sortBy          =   {
                'orderBy':  layoutConf.orderBy.split(':')[0],
                'sorting':  layoutConf.sorting.split(':')[0],
                'maxItems': layoutConf.maxItems,
                'skip':     layoutConf.skip,
            }
            feedButton =    {
                'buttonText': layoutConf.buttonBehavior.buttonText,
                'buttonTarget': layoutConf.buttonBehavior.buttonTarget,
                'buttonCss': layoutConf.buttonBehavior.buttonCss,
                'buttonCssRemoveDefault': layoutConf.buttonBehavior.buttonCssRemoveDefault,
            }
            return(
                <FeedRenderingLayout 
                    nodes           = { useGetFeed( undefined, campus, feedButton, builtFeedObject, sortBy ) }
                    layoutType      = { layoutType }
                    containerWidth  = { containerWidth }
                    size            = { size }
                    className       = { className }
                    mode            = { mode }
                    itemsPerPage    = { itemsPerPage }
                    // Aspect
                    truncate        = { layoutConf.itemTruncate }
                    truncateLines   = { layoutConf.itemTruncateLines }
                    orientation     = { layoutConf.itemOrientation }
                    itemClass       = { layoutConf.itemClass }
                    imagePosition   = { layoutConf.itemImagePosition }
                    imageFit        = { layoutConf.itemImageFit }
                    aspectRatio     = { layoutConf.itemImageAspect }
                    border          = { layoutConf.itemBorder}
                    borderColor     = { layoutConf.itemBorderColor }
                    gap             = { layoutConf.itemGap.split(':')[0] }
                    // Button Behavior
                    removeDefaultCss= { layoutConf.buttonBehavior.removeDefaultCss }
                    stretchedlink   = { layoutConf.buttonBehavior.buttonStretch }
                    // Visibility
                    hideTitle       = { layoutConf.hideTitle }
                    hideSubtitle    = { layoutConf.hideSubtitle }
                    hideExcerpt     = { layoutConf.hideExcerpt }
                    hideImage       = { layoutConf.hideImage }
                    hideButton      = { layoutConf.hideButton }
                />
            )
        }

        case 'events': {
            feedCategories = feeds.ministryPages.ministryPageEvents.feedCategory
            feedCategories.forEach( _ => {
                items = [...items, ..._.events?.nodes]
            })
            builtFeedObject.list = items

            layoutType      = feeds.ministryPages.ministryPageEvents.feedLayout.split(':')[0]
            layoutConf      = feeds.ministryPages.ministryPageEvents.itemConfiguration
            sortBy          =   {
                'orderBy':  layoutConf.orderBy.split(':')[0],
                'sorting':  layoutConf.sorting.split(':')[0],
                'maxItems': layoutConf.maxItems,
                'skip':     layoutConf.skip,
            }
            feedButton =    {
                'buttonText': layoutConf.buttonBehavior.buttonText,
                'buttonTarget': layoutConf.buttonBehavior.buttonTarget,
                'buttonCss': layoutConf.buttonBehavior.buttonCss,
                'buttonCssRemoveDefault': layoutConf.buttonBehavior.buttonCssRemoveDefault,
            }
            return(
                <FeedRenderingLayout 
                    nodes           = { useGetFeed( undefined, campus, feedButton, builtFeedObject, sortBy ) }
                    layoutType      = { layoutType }
                    containerWidth  = { containerWidth }
                    size            = { size }
                    className       = { className }
                    mode            = { mode }
                    itemsPerPage    = { itemsPerPage }
                    // Aspect
                    truncate        = { layoutConf.itemTruncate }
                    truncateLines   = { layoutConf.itemTruncateLines }
                    orientation     = { layoutConf.itemOrientation }
                    itemClass       = { layoutConf.itemClass }
                    imagePosition   = { layoutConf.itemImagePosition }
                    imageFit        = { layoutConf.itemImageFit }
                    aspectRatio     = { layoutConf.itemImageAspect }
                    border          = { layoutConf.itemBorder}
                    borderColor     = { layoutConf.itemBorderColor }
                    gap             = { layoutConf.itemGap.split(':')[0] }
                    // Button Behavior
                    removeDefaultCss= { layoutConf.buttonBehavior.removeDefaultCss }
                    stretchedlink   = { layoutConf.buttonBehavior.buttonStretch }
                    // Visibility
                    hideTitle       = { layoutConf.hideTitle }
                    hideSubtitle    = { layoutConf.hideSubtitle }
                    hideExcerpt     = { layoutConf.hideExcerpt }
                    hideImage       = { layoutConf.hideImage }
                    hideButton      = { layoutConf.hideButton }
                />
            )
        }

        case 'courses': {
            feedCategories = feeds.ministryPages.ministryPageCourses.feedCategory
            feedCategories.forEach( _ => {
                items = [...items, ..._.courses?.nodes]
            })
            builtFeedObject.list = items
            layoutType      = feeds.ministryPages.ministryPageCourses.feedLayout.split(':')[0]
            layoutConf      = feeds.ministryPages.ministryPageCourses.itemConfiguration
            sortBy          =   {
                'orderBy':  layoutConf.orderBy.split(':')[0],
                'sorting':  layoutConf.sorting.split(':')[0],
                'maxItems': layoutConf.maxItems,
                'skip':     layoutConf.skip,
            }
            feedButton =    {
                'buttonText': layoutConf.buttonBehavior.buttonText,
                'buttonTarget': layoutConf.buttonBehavior.buttonTarget,
                'buttonCss': layoutConf.buttonBehavior.buttonCss,
                'buttonCssRemoveDefault': layoutConf.buttonBehavior.buttonCssRemoveDefault,
            }
            return(
                <FeedRenderingLayout 
                    nodes           = { useGetFeed( undefined, campus, feedButton, builtFeedObject, sortBy ) }
                    layoutType      = { layoutType }
                    containerWidth  = { containerWidth }
                    size            = { size }
                    className       = { className }
                    mode            = { mode }
                    itemsPerPage    = { itemsPerPage }
                    // Aspect
                    truncate        = { layoutConf.itemTruncate }
                    truncateLines   = { layoutConf.itemTruncateLines }
                    orientation     = { layoutConf.itemOrientation }
                    itemClass       = { layoutConf.itemClass }
                    imagePosition   = { layoutConf.itemImagePosition }
                    imageFit        = { layoutConf.itemImageFit }
                    aspectRatio     = { layoutConf.itemImageAspect }
                    border          = { layoutConf.itemBorder}
                    borderColor     = { layoutConf.itemBorderColor }
                    gap             = { layoutConf.itemGap.split(':')[0] }
                    // Button Behavior
                    removeDefaultCss= { layoutConf.buttonBehavior.removeDefaultCss }
                    stretchedlink   = { layoutConf.buttonBehavior.buttonStretch }
                    // Visibility
                    hideTitle       = { layoutConf.hideTitle }
                    hideSubtitle    = { layoutConf.hideSubtitle }
                    hideExcerpt     = { layoutConf.hideExcerpt }
                    hideImage       = { layoutConf.hideImage }
                    hideButton      = { layoutConf.hideButton }
                />
            )
        }

        case 'volunteering': {
            feedCategories = feeds.ministryPages.ministryPageVolunteering.feedCategory
            feedCategories.forEach( _ => {
                items = [...items, ..._.volunteeropportunities?.nodes]
            })
            builtFeedObject.list = items
            layoutType      = feeds.ministryPages.ministryPageVolunteering.feedLayout.split(':')[0]
            layoutConf      = feeds.ministryPages.ministryPageVolunteering.itemConfiguration
            sortBy          =   {
                'orderBy':  layoutConf.orderBy.split(':')[0],
                'sorting':  layoutConf.sorting.split(':')[0],
                'maxItems': layoutConf.maxItems,
                'skip':     layoutConf.skip,
            }
            feedButton =    {
                'buttonText': layoutConf.buttonBehavior.buttonText,
                'buttonTarget': layoutConf.buttonBehavior.buttonTarget,
                'buttonCss': layoutConf.buttonBehavior.buttonCss,
                'buttonCssRemoveDefault': layoutConf.buttonBehavior.buttonCssRemoveDefault,
            }
            return(
                <FeedRenderingLayout 
                    nodes           = { useGetFeed( undefined, campus, feedButton, builtFeedObject, sortBy ) }
                    layoutType      = { layoutType }
                    containerWidth  = { containerWidth }
                    size            = { size }
                    className       = { className }
                    mode            = { mode }
                    itemsPerPage    = { itemsPerPage }
                    // Aspect
                    truncate        = { layoutConf.itemTruncate }
                    truncateLines   = { layoutConf.itemTruncateLines }
                    orientation     = { layoutConf.itemOrientation }
                    itemClass       = { layoutConf.itemClass }
                    imagePosition   = { layoutConf.itemImagePosition }
                    imageFit        = { layoutConf.itemImageFit }
                    aspectRatio     = { layoutConf.itemImageAspect }
                    border          = { layoutConf.itemBorder}
                    borderColor     = { layoutConf.itemBorderColor }
                    gap             = { layoutConf.itemGap.split(':')[0] }
                    // Button Behavior
                    removeDefaultCss= { layoutConf.buttonBehavior.removeDefaultCss }
                    stretchedlink   = { layoutConf.buttonBehavior.buttonStretch }
                    // Visibility
                    hideTitle       = { layoutConf.hideTitle }
                    hideSubtitle    = { layoutConf.hideSubtitle }
                    hideExcerpt     = { layoutConf.hideExcerpt }
                    hideImage       = { layoutConf.hideImage }
                    hideButton      = { layoutConf.hideButton }
                />
            )
        }

        case 'groups': {
            feedCategories = feeds.ministryPages.ministryPageGroups.feedCategory
            feedCategories.forEach( _ => {
                items = [...items, ..._.groups?.nodes]
            })
            builtFeedObject.list = items
            layoutType      = feeds.ministryPages.ministryPageGroups.feedLayout.split(':')[0]
            layoutConf      = feeds.ministryPages.ministryPageGroups.itemConfiguration
            sortBy          =   {
                'orderBy':  layoutConf.orderBy.split(':')[0],
                'sorting':  layoutConf.sorting.split(':')[0],
                'maxItems': layoutConf.maxItems,
                'skip':     layoutConf.skip,
            }
            feedButton =    {
                'buttonText': layoutConf.buttonBehavior.buttonText,
                'buttonTarget': layoutConf.buttonBehavior.buttonTarget,
                'buttonCss': layoutConf.buttonBehavior.buttonCss,
                'buttonCssRemoveDefault': layoutConf.buttonBehavior.buttonCssRemoveDefault,
            }
            return(
                <FeedRenderingLayout 
                    nodes           = { useGetFeed( undefined, campus, feedButton, builtFeedObject, sortBy ) }
                    layoutType      = { layoutType }
                    containerWidth  = { containerWidth }
                    size            = { size }
                    className       = { className }
                    mode            = { mode }
                    itemsPerPage    = { itemsPerPage }
                    // Aspect
                    truncate        = { layoutConf.itemTruncate }
                    truncateLines   = { layoutConf.itemTruncateLines }
                    orientation     = { layoutConf.itemOrientation }
                    itemClass       = { layoutConf.itemClass }
                    imagePosition   = { layoutConf.itemImagePosition }
                    imageFit        = { layoutConf.itemImageFit }
                    aspectRatio     = { layoutConf.itemImageAspect }
                    border          = { layoutConf.itemBorder}
                    borderColor     = { layoutConf.itemBorderColor }
                    gap             = { layoutConf.itemGap.split(':')[0] }
                    // Button Behavior
                    removeDefaultCss= { layoutConf.buttonBehavior.removeDefaultCss }
                    stretchedlink   = { layoutConf.buttonBehavior.buttonStretch }
                    // Visibility
                    hideTitle       = { layoutConf.hideTitle }
                    hideSubtitle    = { layoutConf.hideSubtitle }
                    hideExcerpt     = { layoutConf.hideExcerpt }
                    hideImage       = { layoutConf.hideImage }
                    hideButton      = { layoutConf.hideButton }
                />
            )
        }

        case 'customPage': {
            return(
                <>
                </>
            )
        }

        default:{
            return(
                <>
                </>
            )
        }

    }

}