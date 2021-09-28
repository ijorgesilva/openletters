
export const useGetFeed = ( feedObject ) => {

    const feedType = feedObject.feedType
    let rawList = []
    let parsedList = []
    console.log(feedType)
    // console.log('feedObject:')
    // console.log(feedObject)

    switch( true ) {
        case feedType === 'videos':
            rawList = feedObject.feedVideos.feedVideosCategory.videosOnDemand.nodes
            console.log(rawList)

            if ( rawList?.length > 0 ) {
                parsedList = rawList.map( (_, index) => (
                    // TODO: Get url
                    parsedList.push(
                        {
                            title: _.title,
                            subtitle: '', // series url, send link (?)
                            excerpt: _.excerpt,
                            featuredPhoto: '',
                            date: _.videoDetails.videoDayDate,
                            url: '',
                            tags: '',
                            campus: '',
                        }
                    )
                ))
            }
            else undefined
            console.log(parsedList)

            break
        default:
    }

    // TODO: Order 
    // TODO: Skip

    return feedType
}