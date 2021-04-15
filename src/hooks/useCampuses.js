import { useStaticQuery, graphql } from 'gatsby'

export const useCampuses = () => {
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
                                                        gatsbyImageData
                                                    }
                                                }
                                            }
                                        }
                                        campusDetails {
                                            campusConfiguration {
                                                campusConfigurationVisibility
                                            }
                                            campusHome {
                                                campusHomeUrl
                                                campusHomeType
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
    return allWpCampus.nodes
}
