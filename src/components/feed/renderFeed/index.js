import React from 'react'

import { useGetFeed } from '../../../hooks/useGetFeed'
import { useWebsiteConfiguration } from '../../../hooks/useWebsiteConfiguration'
import AlertEmptyState from '../../alert/alertEmptyState'

import FeedRenderingLayout from './feedRenderingLayout'

export default function RenderFeed (
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
    const itemConf    = useWebsiteConfiguration().settingsPages
    
    let layoutType
    let sortBy = {}
    let feedButton 
    let layoutConf = {}
    let builtFeedObject = {
        type: view,
        list: []
    }

    switch (true) {
        
        case view === 'ministries': {
            builtFeedObject.list = feeds.nodes
            layoutType      = itemConf.settingsPagesMinistries.feedLayout.split(':')[0]
            layoutConf      = itemConf.settingsPagesMinistries.itemConfiguration
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

        case view === 'courses': {
            builtFeedObject.list = feeds.nodes
            layoutType      = itemConf.settingsPagesCourses.feedLayout.split(':')[0]
            layoutConf      = itemConf.settingsPagesCourses.itemConfiguration
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

        case view === 'volunteering': {
            builtFeedObject.list = feeds.nodes
            layoutType      = itemConf.settingsPagesVolunteer.feedLayout.split(':')[0]
            layoutConf      = itemConf.settingsPagesVolunteer.itemConfiguration
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

        case view === 'groups': {
            builtFeedObject.list = feeds.nodes
            layoutType      = itemConf.settingsPagesGroups.feedLayout.split(':')[0]
            layoutConf      = itemConf.settingsPagesGroups.itemConfiguration
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

        case view === 'groupTypes': {
            builtFeedObject.list = feeds.nodes
            layoutType      = itemConf.settingsPagesGroups.feedLayout.split(':')[0]
            layoutConf      = itemConf.settingsPagesGroups.itemConfiguration
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

        case view === 'posts': { 
            builtFeedObject.list = feeds.nodes
            layoutType      = itemConf.settingsPagesBlog.feedLayout.split(':')[0]
            layoutConf      = itemConf.settingsPagesBlog.itemConfiguration
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

        case view === 'news': { 
            builtFeedObject.list = feeds.nodes
            layoutType      = itemConf.settingsPagesBlog.feedLayout.split(':')[0]
            layoutConf      = itemConf.settingsPagesBlog.itemConfiguration
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

        case view === 'events': { 
            builtFeedObject.list = feeds.nodes
            layoutType      = itemConf.settingsPagesEvents.feedLayout.split(':')[0]
            layoutConf      = itemConf.settingsPagesEvents.itemConfiguration
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

        case view === 'videos': {
            return (
                <>
                </>
            )

        }

        case (builtFeedObject.list.length === 0):
        default: {
            return(
                <AlertEmptyState />
            )
        }

    }

}