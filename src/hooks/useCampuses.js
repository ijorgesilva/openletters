import { useStaticQuery, graphql } from 'gatsby'

export const useCampuses = ( campus ) => {
    const { allWpCampus } = useStaticQuery( 
                        graphql`
                            {
                                allWpCampus(
                                    filter: {
                                        status: {eq: "publish"}
                                    }
                                ) {
                                    nodes {
                                        id
                                        title
                                        slug
                                        featuredImage {
                                            node {
                                                localFile {
                                                    childImageSharp {
                                                        gatsbyImageData(layout: FULL_WIDTH)
                                                    }
                                                }
                                            }
                                        }
                                        campusDetails {
                                            campusConfiguration {
                                                campusConfigurationVisibility
                                            }
                                            campusLocal {
                                                campusTimeZone
                                                campusMapLocation {
                                                    state
                                                    country
                                                    city
                                                    latitude
                                                    longitude
                                                    streetAddress
                                                    postCode
                                                }
                                            }
                                            campusBrand {
                                                campusBrandOverwrite
                                                campusBrandUrl
                                                campusBrandLogo {
                                                    localFile {
                                                        publicURL
                                                    }
                                                }
                                            }
                                            campusSelector {
                                                campusSelectorOverwrite
                                                campusSelectorHome {
                                                    campusHomeUrl
                                                    campusHomeType
                                                    campusHomeTarget
                                                }
                                            }
                                            campusPages {
                                                campusWatch {
                                                    pageActive
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        `
                    )

    if(campus){
        return allWpCampus.nodes.filter( item => (item.slug === campus) )[0]
    }
    else {
        return allWpCampus.nodes
    }
    
}
