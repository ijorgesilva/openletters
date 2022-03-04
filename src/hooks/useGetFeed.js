import { orderBy } from 'lodash'
import { useTranslation } from "react-i18next"

import config from '../../data/SiteConfig'
import { getDate } from '../components/utils/utils'

import { useFormatEventData } from "./useFormatEventData"
import { useGetBestCampus } from './useGetBestCampus'

export const useGetFeed = ( 
    /*
        feedObject: When the List of object is provided directly from WP.
    */
    feedObject,
    campus, 
    /* 
        Button Configuration 
        buttonLink: Internal Gatsby Link, buttonType needs to be internal
        buttonUrl: External URL, buttonType needs to be external
        buttonType: Gatsby Link (internal), or regular URL (external)
        buttonText: Replace default Button text
        buttonTarget: Self or Blank. When Gatsby Link is used, blank is ignored.
        buttonCss: Custom CSS class
        buttonCssRemoveDefault: Remove Default Bootstrap class
    */
    feedButton,
    /*
        builtFeedObject: When the feed list has been parsed or pre-formatted.
    */
    builtFeedObject,
    /*
        Sorting & Mutation Instructions
        orderBy: Parameter to order by specified field
        sorting: Ascending (asc), Descending (desc) or Random (predefined by server)
        maxItems: Truncate how many max amount of items to show
        skip: Skip the first item in list
     */
    sortBy,
    type,
    ) => {

    const { t } = useTranslation()
    let sortedBy =  sortBy?.orderBy ? 
                        sortBy.sorting === 'default' ?
                            'desc' : sortBy.sorting 
                    : 'desc'
    
    let rawList = []
    let listObject = {
        type: builtFeedObject?.type ? builtFeedObject.type : feedObject?.feedType ? feedObject.feedType : type ? type : 'custom' ,
        list: [],
    } 
    let eventData = {}

    switch( true ) {

        /*
         * Blog: Posts & News
         */
        case listObject.type === 'blog': {
            rawList = builtFeedObject?.list ? builtFeedObject.list : undefined
            if( rawList?.length > 0 ) {
                rawList.map( (_, index) => (
                     _.postDetails ?
                        listObject.list.push(
                            {
                                title: _.title,
                                subtitle: '',
                                excerpt: _.excerpt,
                                image: _.featuredImage?.node?.localFile.childImageSharp.gatsbyImageData,
                                cssClass: `${ 'item-'+index } ${_.itemCss ? _.itemCss : ''}`,
                                itemCssRemoveDefault: _.itemCssRemoveDefault,
                                tags: _.tags,
                                buttons: [
                                    {
                                        'buttonLink': `/${useGetBestCampus( campus, _.postDetails.postCampus )}/${config.blogPostDetailsSlug}/${_.slug}`,
                                        'buttonType': 'internal: Internal',
                                        'buttonText': feedButton?.buttonText || t('global.read_more'),
                                        'buttonTarget': feedButton?.buttonTarget || '_self: Self',
                                        'buttonCss': feedButton?.buttonCss,
                                        'buttonCssRemoveDefault': feedButton?.buttonCssRemoveDefault,
                                    }
                                ],
                            }
                        )
                    :   
                        _.newsDetails ?
                            listObject.list.push(
                                {
                                    title: _.title,
                                    subtitle: '',
                                    excerpt: _.excerpt,
                                    image: _.featuredImage?.node?.localFile.childImageSharp.gatsbyImageData,
                                    cssClass: `${ 'item-'+index } ${_.itemCss ? _.itemCss : ''}`,
                                    itemCssRemoveDefault: _.itemCssRemoveDefault,
                                    tags: _.tags,
                                    buttons: [
                                        {
                                            'buttonLink': `/${useGetBestCampus( campus, _.newsDetails.newsCampus )}/${config.newsPostDetailsSlug}/${_.slug}`,
                                            'buttonType': 'internal: Internal',
                                            'buttonText': feedButton?.buttonText || t('global.read_more'),
                                            'buttonTarget': feedButton?.buttonTarget || '_self: Self',
                                            'buttonCss': feedButton?.buttonCss,
                                            'buttonCssRemoveDefault': feedButton?.buttonCssRemoveDefault,
                                        }
                                    ],
                                }
                            )
                        : undefined
                ))
            }
            break
        }

        /*
         * Post
         */
        case listObject.type === 'posts': {
            rawList = builtFeedObject?.list ? builtFeedObject.list : feedObject.feedPosts.feedPostsCategory.posts.nodes
            if( rawList?.length > 0 ) {
                rawList.map( (_, index) => (
                    listObject.list.push(
                        {
                            title: _.title,
                            subtitle: '',
                            excerpt: _.excerpt,
                            image: _.featuredImage?.node?.localFile.childImageSharp.gatsbyImageData,
                            cssClass: `${ 'item-'+index } ${_.itemCss ? _.itemCss : ''}`,
                            itemCssRemoveDefault: _.itemCssRemoveDefault,
                            tags: _.tags,
                            buttons: [
                                {
                                    'buttonLink': `/${useGetBestCampus( campus, _.postDetails?.postCampus )}/${config.blogPostDetailsSlug}/${_.slug}`,
                                    'buttonType': 'internal: Internal',
                                    'buttonText': feedButton?.buttonText || t('global.read_more'),
                                    'buttonTarget': feedButton?.buttonTarget || '_self: Self',
                                    'buttonCss': feedButton?.buttonCss,
                                    'buttonCssRemoveDefault': feedButton?.buttonCssRemoveDefault,
                                }
                            ],
                        }
                    )
                ))
            }
            break
        }

        /*
         * Video
         */
        case listObject.type === 'videos': {
                rawList = builtFeedObject?.list ? builtFeedObject.list : feedObject.feedVideos.feedVideosCategory.videosOnDemand.nodes
                if ( rawList?.length > 0 ) {
                    rawList.map( (_, index) => (
                        (_.videoDetails.videoCampus.length > 0) ?
                            listObject.list.push(
                                {
                                    title: _.title,
                                    subtitle:   _.videoDetails.videoSeries?.slug ? 
                                                    `<a href='${'/' + useGetBestCampus( campus, _.videoDetails.videoCampus ) + '/' + config.watchSeriesDetailsSlug + '/' + _.videoDetails.videoSeries.slug }'>${_.videoDetails.videoSeries.title}</a>`
                                                : '', 
                                    excerpt: _.excerpt,
                                    image: _.featuredImage?.node?.localFile.childImageSharp.gatsbyImageData,
                                    date: _.videoDetails.videoDayDate,
                                    cssClass: `${ 'item-'+index } ${ _.itemCss ? _.itemCss : '' }`,
                                    tags: _.tags,
                                    buttons: [
                                        {
                                            'buttonLink': `/${useGetBestCampus( campus, _.videoDetails.videoCampus )}/${config.watchMessageDetailsSlug}/${_.slug}`,
                                            'buttonType': 'internal: Internal',
                                            'buttonText': feedButton?.buttonText || t('global:global.watch.watch-now'),
                                            'buttonTarget': feedButton?.buttonTarget || '_self: Self',
                                            'buttonCss': feedButton?.buttonCss,
                                            'buttonCssRemoveDefault': feedButton?.buttonCssRemoveDefault,
                                        }
                                    ],
                                }
                            )
                        :
                            undefined
                    ))
                }
                else undefined
                
            break
        }

        /* TODO: Faulty implementation
         * Series
         */
        case listObject.type === 'series': {
            rawList = builtFeedObject?.list ? builtFeedObject.list : feedObject.feedSeries.feedSeriesCategory.series.nodes
            if ( rawList?.length > 0 ) {
                rawList.map( (_, index) => (
                    listObject.list.push(
                        {
                            title: _.title,
                            subtitle: '', 
                            excerpt: _.excerpt,
                            image: _.seriesGraphics.poster?.localFile.childImageSharp.gatsbyImageData,
                            date: '',
                            tags: _.tags,
                            cssClass: `${ 'item-'+index } ${ _.itemCss ? _.itemCss : '' }`,
                            buttons: [
                                {
                                    'buttonLink': `/${useGetBestCampus( campus )}/${config.watchSeriesDetailsSlug}/${_.slug}`, // TODO: Not checking if URL exists 
                                    'buttonType': 'internal: Internal',
                                    'buttonText': feedButton?.buttonText || t('global:global.watch.more-info'),
                                    'buttonTarget': feedButton?.buttonTarget || '_self: Self',
                                    'buttonCss': feedButton?.buttonCss,
                                    'buttonCssRemoveDefault': feedButton?.buttonCssRemoveDefault,
                                }
                            ],
                        }
                    )
                ))
            }
            else undefined
            break
        }

        /*
         * Event
         */
        case listObject.type === 'events': {
            rawList = builtFeedObject?.list ? builtFeedObject.list : undefined // TODO: Incorporate feedObject query results. feedObject.feedEvents.feedEventsCategory.events.nodes
            
            if ( rawList?.length > 0 ) {
                rawList.map( (_, index) => {
                    if ( _.eventDetails?.eventCampus.length > 0)  {
                        eventData = useFormatEventData( _.eventDetails.eventDates )
                        listObject.list.push(
                            {
                                title: _.title,
                                excerpt: _.excerpt,
                                image: _.featuredImage?.node.localFile.childImageSharp.gatsbyImageData,
                                subtitle: eventData.dates?.length ? 
                                                `${ eventData.expired ? t('global.events.expired') : '' }
                                                ${ !eventData.expired && eventData.dates[0].eventDate ? eventData.dates[0].eventDate : ''}
                                                ${ !eventData.expired && eventData.dates[0].eventTime ? '| ' + eventData.dates[0].eventTime : ''}`
                                            : 
                                                undefined,
                                cssClass: `${ 'item-'+index } ${_.itemCss ? _.itemCss : ''} ${ eventData.expired ? 'expired' : '' } ${ _.eventDetails.eventFeatured ? 'featured' : ''}`,
                                
                                buttons: [
                                    {
                                        'buttonType': _.eventDetails.eventRegistrationType === 'internal' ? 'internal: Internal' : 'external: External',
                                        'buttonTarget': _.eventDetails.eventExternalOnly ? 
                                                            '_blank: Blank'
                                                        : '' ,
                                        'buttonLink': _.eventDetails.eventExternalOnly ? _.eventDetails.eventLink?.eventLinkUrl : `/${useGetBestCampus( campus, _.eventDetails.eventCampus )}/${config.eventPostDetailsSlug}/${_.slug}`,
                                        'buttonUrl': _.eventDetails.eventExternalOnly ? _.eventDetails.eventLink?.eventLinkUrl : `/${useGetBestCampus( campus, _.eventDetails.eventCampus )}/${config.eventPostDetailsSlug}/${_.slug}`,
                                        'buttonText': _.eventDetails.eventLink?.eventLinkText || t('global.events.view'),
                                        'buttonCss': '',
                                        'buttonCssRemoveDefault': '',
                                    }
                                ],
                                tag: t('global.events.title'),
                                tagClassName: 'badge-secondary',
                            }
                        )
                    }
                })
            }
            else undefined
            break
        }

        /*
         * News
         */
        case listObject.type === 'news': {
            rawList = builtFeedObject?.list ? builtFeedObject.list : feedObject.feedNews.feedNewsCategory.newsposts.nodes
            
            if( rawList?.length > 0 ) {
                rawList.map( (_, index) => (
                    listObject.list.push(
                        {
                            title: _.title,
                            subtitle: getDate(_.date, 2, config.dateLocale, config.dateFormat),
                            excerpt: _.excerpt,
                            image: _.itemImage?.localFile.childImageSharp.gatsbyImageData,
                            cssClass: `${ 'item-'+index } ${_.itemCss ? _.itemCss : ''}`,
                            itemCssRemoveDefault: _.itemCssRemoveDefault,
                            tags: _.tags,
                            buttons: [
                                {
                                    'buttonLink': `/${useGetBestCampus( campus, _.newsDetails.newsCampus )}/${config.newsPostDetailsSlug}/${_.slug}`,
                                    'buttonType': 'internal: Internal',
                                    'buttonText': feedButton?.buttonText || t('global.read_more'),
                                    'buttonTarget': feedButton?.buttonTarget || '_self: Self',
                                    'buttonCss': feedButton?.buttonCss,
                                    'buttonCssRemoveDefault': feedButton?.buttonCssRemoveDefault,
                                }
                            ],
                        }
                    )
                ))
            }
            break
        }

        /*
         * Custom
         */
        default:
        case listObject.type === 'custom': {
            rawList = feedObject
            listObject.type = 'custom'
            if( rawList?.length > 0 ) {
                rawList.map( (_, index) => (
                    listObject.list.push(
                        {
                            title: _.itemTitle,
                            subtitle: _.itemSubtitle,
                            excerpt: _.itemContent,
                            image: _.itemImage?.localFile.childImageSharp.gatsbyImageData,
                            date: '',

                            cssClass: `${ 'item-'+index } ${_.itemCss ? _.itemCss : ''}`,
                            itemCssRemoveDefault: _.itemCssRemoveDefault,
                            tags: [],

                            buttons: _.itemButtons?.itemButtonsButton?.length > 0 ? _.itemButtons.itemButtonsButton : [],
                        }
                    )
                ))
            }
            else undefined
            break
        }
        
        /*
         * Course
         */
        case listObject.type === 'courses': { // Generate Pages
            rawList = builtFeedObject?.list ? builtFeedObject.list : undefined //TODO: feedObject.feedCourses.feedCoursesCategory.courses.nodes
            if( rawList?.length > 0 ) {
                rawList.map( (_, index) => (
                    listObject.list.push(
                        {
                            title: _.title,
                            subtitle: '', // TODO: Add extra fields Start and End Date
                            excerpt: _.general?.summary ? _.general.summary : '',
                            image: _.general?.featuredPhoto?.localFile.childImageSharp.gatsbyImageData,
                            cssClass: `${ 'item-'+index } ${_.itemCss ? _.itemCss : ''}`,
                            itemCssRemoveDefault: _.itemCssRemoveDefault,
                            tags: _.tags,
                            buttons: [
                                {
                                    'buttonLink': `/${useGetBestCampus( campus, _.general.campus )}/${config.coursesSlug}/${_.slug}`,
                                    'buttonType': 'internal: Internal',
                                    'buttonText': feedButton?.buttonText || t('global.read_more'),
                                    'buttonTarget': feedButton?.buttonTarget || '_self: Self',
                                    'buttonCss': feedButton?.buttonCss,
                                    'buttonCssRemoveDefault': feedButton?.buttonCssRemoveDefault,
                                }
                            ],
                        }
                    )
                ))
            }
            break
        }

        /*
         * Volunteering
         */
        case listObject.type === 'volunteering': { // Generate Pages
            rawList = builtFeedObject?.list ? builtFeedObject.list : undefined 
            if( rawList?.length > 0 ) {
                rawList.map( (_, index) => (
                    listObject.list.push(
                        {
                            title: _.title,
                            subtitle: '',
                            excerpt: _.general?.summary ? _.general.summary : '',
                            image: _.general?.featuredPhoto?.localFile.childImageSharp.gatsbyImageData,
                            cssClass: `${ 'item-'+index }`,
                            itemCssRemoveDefault: _.itemCssRemoveDefault,
                            tags: _.tags,
                            buttons: [
                                {
                                    'buttonLink': `/${useGetBestCampus( campus, _.general.campus )}/${config.volunteeringSlug}/${_.slug}`,
                                    'buttonType': 'internal: Internal',
                                    'buttonText': feedButton?.buttonText || t('global.read_more'),
                                    'buttonTarget': feedButton?.buttonTarget || '_self: Self',
                                    'buttonCss': feedButton?.buttonCss,
                                    'buttonCssRemoveDefault': feedButton?.buttonCssRemoveDefault,
                                }
                            ],
                        }
                    )
                ))
            }
            break
        }

        /*
         * Group
         */
        case listObject.type === 'groups': { // Generate Pages
            rawList = builtFeedObject?.list ? builtFeedObject.list : undefined
            if( rawList?.length > 0 ) {
                rawList.map( (_, index) => (
                    listObject.list.push(
                        {
                            title: _.title, // TODO: Implement additional fields
                            subtitle: '',
                            excerpt: _.general?.summary ? _.general.summary : '',
                            image: _.general?.featuredPhoto?.localFile.childImageSharp.gatsbyImageData,
                            cssClass: `${ 'item-'+index }`,
                            itemCssRemoveDefault: _.itemCssRemoveDefault,
                            tags: _.tags,
                            buttons: [
                                {
                                    'buttonLink': `/${useGetBestCampus( campus, _.general.campus )}/${config.groupsSlug}/${_.slug}`,
                                    'buttonType': 'internal: Internal',
                                    'buttonText': feedButton?.buttonText || t('global.read_more'),
                                    'buttonTarget': feedButton?.buttonTarget || '_self: Self',
                                    'buttonCss': feedButton?.buttonCss,
                                    'buttonCssRemoveDefault': feedButton?.buttonCssRemoveDefault,
                                }
                            ],
                        }
                    )
                ))
            }
            break
        }

        /*
         * Group type
         */
        case listObject.type === 'groupTypes': { // Generate Pages
            rawList = builtFeedObject?.list ? builtFeedObject.list : undefined
            if( rawList?.length > 0 ) {
                rawList.map( (_, index) => (
                    listObject.list.push(
                        {
                            title: _.title,
                            subtitle: '',
                            excerpt: _.general?.summary ? _.general.summary : '',
                            image: _.general?.featuredPhoto?.localFile.childImageSharp.gatsbyImageData,
                            cssClass: `${ 'item-'+index }`,
                            itemCssRemoveDefault: _.itemCssRemoveDefault,
                            tags: _.tags,
                            buttons: [
                                {
                                    'buttonLink': `/${useGetBestCampus( campus, _.general.campus )}/${config.groupTypesSlug}/${_.slug}`,
                                    'buttonType': 'internal: Internal',
                                    'buttonText': feedButton?.buttonText || t('global.read_more'),
                                    'buttonTarget': feedButton?.buttonTarget || '_self: Self',
                                    'buttonCss': feedButton?.buttonCss,
                                    'buttonCssRemoveDefault': feedButton?.buttonCssRemoveDefault,
                                }
                            ],
                        }
                    )
                ))
            }
            break
        }

        /*
         * Ministries
         */
        case listObject.type === 'ministries': { // Generate Pages
            rawList = builtFeedObject?.list ? builtFeedObject.list : feedObject.nodes
            if( rawList?.length > 0 ) {
                rawList.map( (_, index) => (
                    listObject.list.push(
                        {
                            title: _.title,
                            subtitle: '',
                            excerpt: _.general?.summary ? _.general.summary : '',
                            image: _.general?.featuredPhoto?.localFile.childImageSharp.gatsbyImageData,
                            cssClass: `${ 'item-'+index }`,
                            itemCssRemoveDefault: _.itemCssRemoveDefault,
                            tags: _.tags,
                            buttons: [
                                {
                                    'buttonLink': `/${useGetBestCampus( campus, _.general.campus )}/${config.ministrySlug}/${_.slug}`,
                                    'buttonType': 'internal: Internal',
                                    'buttonText': feedButton?.buttonText || t('global.read_more'),
                                    'buttonTarget': feedButton?.buttonTarget || '_self: Self',
                                    'buttonCss': feedButton?.buttonCss,
                                    'buttonCssRemoveDefault': feedButton?.buttonCssRemoveDefault,
                                }
                            ],
                        }
                    )
                ))
            }
            break
        }

        /*
         * people
         */
        case listObject.type === 'people': { // Generate Pages
            // TODO: Potential Technical debt. Needs to be normalized.
            rawList = builtFeedObject?.list ? builtFeedObject.list : feedObject.nodes ? feedObject.nodes : feedObject ? feedObject : undefined  
            if( rawList?.length > 0 ) {
                rawList.map( (_, index) => (
                    listObject.list.push(
                        {
                            title: _.title,
                            subtitle: '',
                            excerpt: '',
                            image: _.featuredImage?.node?.localFile.childImageSharp.gatsbyImageData,
                            cssClass: `${ 'item-'+index }`,
                            itemCssRemoveDefault: '',
                            tags: _.tags,
                            // buttons: [
                            //     {
                            //         'buttonLink': `/${useGetBestCampus( campus, _.general.campus )}/${config.ministrySlug}/${_.slug}`,
                            //         'buttonType': 'internal: Internal',
                            //         'buttonText': feedButton?.buttonText || t('global.read_more'),
                            //         'buttonTarget': feedButton?.buttonTarget || '_self: Self',
                            //         'buttonCss': feedButton?.buttonCss,
                            //         'buttonCssRemoveDefault': feedButton?.buttonCssRemoveDefault,
                            //     }
                            // ],
                        }
                    )
                ))
            }
            break
        }

        /*
         * Lesson
         */
        case listObject.type === 'lessons': { // Generate Pages
            break
        }


    }
    
    let sortingTemp = []
    if(sortBy) {
        // Order and Sorting by
        if(sortBy.orderBy){
            sortingTemp = orderBy(listObject.list, sortBy.orderBy, sortedBy)
        }
        if(sortBy.maxItems){
            sortingTemp = sortingTemp.slice( 0, - listObject.list.length + sortBy.maxItems )
        }
        if(sortBy.skip){
            sortingTemp = sortingTemp.slice( sortBy.skip )
        }
        listObject.list = sortingTemp
    }

    return listObject
}

