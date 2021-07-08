import { useStaticQuery, graphql } from 'gatsby'

export const useParticipation = () => {
    const { wp } =  useStaticQuery(
                        graphql`
                            {
                                wp {
                                    websiteSettings {
                                        participation {
                                            participationRaisehand {
                                                participationRaisehandCustom {
                                                    participationRaisehandCustomType
                                                    participationRaisehandCustomTitle
                                                    participationRaisehandCustomUrl
                                                    participationRaisehandCustomLink
                                                    participationRaisehandCustomTarget
                                                    participationRaisehandCustomClass
                                                    participationRaisehandCustomIcon {
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
                                }
                            }
                        `
                    )   
    return wp.websiteSettings.participation
}