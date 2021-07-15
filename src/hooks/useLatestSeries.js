import { useStaticQuery, graphql } from 'gatsby'

export const useLatestSeries = ( campus ) => {
    
    const { latestVideos } =  useStaticQuery(
                        graphql`
                            {
                                latestVideos: allWpVideoOnDemand(
                                    limit: 80
                                    filter: {status: {eq: "publish"}}
                                    sort: {fields: videoDetails___videoDayDate, order: DESC}
                                ) {
                                    nodes {
                                        slug
                                        videoDetails {
                                            videoSeries {
                                                ... on WpSerie {
                                                    id
                                                    title
                                                    status
                                                    slug
                                                    seriesGraphics {
                                                        poster {
                                                            localFile {
                                                                childImageSharp {
                                                                    gatsbyImageData(layout: CONSTRAINED)
                                                                }
                                                            }
                                                        }
                                                        logo {
                                                            localFile {
                                                                childImageSharp {
                                                                    gatsbyImageData(layout: FULL_WIDTH)
                                                                }
                                                            }
                                                        }
                                                        background {
                                                            localFile {
                                                                childImageSharp {
                                                                    gatsbyImageData(layout: CONSTRAINED)
                                                                }
                                                            }
                                                        }
                                                    }
                                                    language {
                                                        slug
                                                    }
                                                }
                                            }
                                            videoCampus {
                                                ... on WpCampus {
                                                    id
                                                    databaseId
                                                    status
                                                    slug
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                        `
                    )  
    
    let latestSeries =  ( latestVideos?.nodes?.length > 0 ) ?
                                latestVideos.nodes.filter( 
                                    _ => (
                                        _.videoDetails.videoCampus.some( _ => ( _.slug === campus ) )
                                ))
                            :
                                []
    let seriesList = []
    
    latestSeries.forEach( _ => {
        if( _.videoDetails.videoSeries ) {
            seriesList.push(
                _.videoDetails.videoSeries
            )
        }
    })

    let uniqueList =    ( seriesList.length > 0 ) ?
                            seriesList.map(e => e['id'])
                            .map((e, i, final) => final.indexOf(e) === i && i)
                            .filter(obj=> seriesList[obj])
                            .map(e => seriesList[e])
                        :
                            []

    return uniqueList
}