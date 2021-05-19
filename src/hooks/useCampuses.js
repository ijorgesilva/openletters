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
                                            campusBrand {
                                                campusBrandOverwrite
                                                campusBrandUrl
                                                campusBrandLogo {
                                                    localFile {
                                                        childImageSharp {
                                                            gatsbyImageData(layout: FULL_WIDTH)
                                                        }
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
                                            campusWatch {
                                                campusWatchPage
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
