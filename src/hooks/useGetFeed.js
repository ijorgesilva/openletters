import config from '../../data/SiteConfig'

import { useGetBestCampus } from './useGetBestCampus'

export const useGetFeed = ( feedObject, campus ) => {

    let rawList = []
    let listObject = {
        type: feedObject?.feedType ? feedObject.feedType : 'custom' ,
        list: [],
    } 

    switch( true ) {

        /*
         * Videos
         */
        case listObject.type === 'videos':
            rawList = feedObject.feedVideos.feedVideosCategory.videosOnDemand.nodes
            if ( rawList?.length > 0 ) {
                rawList.map( _ => (
                    (_.videoDetails.videoCampus.length > 0) ?
                        listObject.list.push(
                            {
                                title: _.title,
                                subtitle:   _.videoDetails.videoSeries?.slug ? 
                                                `<a href='${'/' + useGetBestCampus( campus, _.videoDetails.videoCampus ) + '/' + config.watchSeriesDetailsSlug + '/' + _.videoDetails.videoSeries.slug }'>${_.videoDetails.videoSeries.title}</a>`
                                            : '', 
                                excerpt: _.excerpt,
                                image: _.featuredImage?.node.localFile.childImageSharp.gatsbyImageData,
                                date: _.videoDetails.videoDayDate,
                                // TODO: USE Buttons structure
                                url: '/' + useGetBestCampus( campus, _.videoDetails.videoCampus ) + '/' + config.watchSlug + '/' + _.slug,
                                tags: _.tags,
                                buttons: [],
                            }
                        )
                    :
                        undefined
                ))
            }
            else undefined
            // console.log('rawList:')
            // console.log(rawList)
            // console.log(listObject)
        break

        /*
         * Series
         */
        case listObject.type === 'series':
        break

        /*
         * Events
         */
        case listObject.type === 'events':
        break

        /*
         * Posts
         */
        case listObject.type === 'posts':
        break

        /*
         * News
         */
        case listObject.type === 'news':
        break
        /*
         * Groups
         */
        case listObject.type === 'groups':
        break
        /*
         * Group types
         */
        case listObject.type === 'grouptypes':
        break
        /*
         * Ministries
         */
        case listObject.type === 'ministries':
        break
        /*
         * Volunteering
         */
        case listObject.type === 'volunteering':
        break

        /*
         * Courses
         */
        case listObject.type === 'courses':
        break

        /*
         * Lessons
         */
        case listObject.type === 'lessons':
        break
        /*
         * Custom
         */
        default:
        case listObject.type === 'custom': 
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
            // console.log('rawList')
            // console.log(rawList)
            // console.log('listObject')
            // console.log(listObject)
        break
    }
    // TODO: Order 
    // TODO: Skip

    return listObject
}