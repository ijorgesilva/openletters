import { useStaticQuery, graphql } from 'gatsby'
/**
 * @param  {} campus: To filter current campus
 * @returns [{}] parsedByCampus: Get live streaming events parsed by the 'campus' param
 */
export const useGetLiveStreaming = ( campus ) => {
    
    const { live } =  useStaticQuery(
                        graphql`
                            {
                                live: allWpLiveStreaming(
                                    limit: 80
                                    filter: {status: {eq: "publish"}}
                                    sort: {order: ASC, fields: modified}
                                ) {
                                    nodes {
                                        title
                                        liveStreamingDetails {
                                            liveRepeat {
                                                liveRepeatType
                                                liveRepeatDate
                                                liveRepeatDay
                                                liveRepeatTime
                                            }
                                            liveSource {
                                                liveSourceType
                                                liveSourceExternal
                                            }
                                        }
                                        general {
                                            summary
                                            campus {
                                                ... on WpCampus {
                                                    id
                                                    slug
                                                    title
                                                    status
                                                    campusDetails {
                                                        campusLocal {
                                                            campusTimeZone
                                                        }
                                                    }
                                                }
                                            }
                                            featuredPhoto {
                                                localFile {
                                                    childImageSharp {
                                                        gatsbyImageData(layout: FULL_WIDTH)
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        `
                    )  
    
    let parsedByCampus =  live?.nodes?.length > 0 ?
                                live.nodes.filter( 
                                    _ => (
                                        _.general.campus?.some( _ => ( _.slug === campus ) )
                                ))
                            :
                                []
    
    return parsedByCampus
}