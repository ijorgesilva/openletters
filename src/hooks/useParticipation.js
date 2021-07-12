import { useStaticQuery, graphql } from 'gatsby'
import { partition } from 'lodash-es'

export const useParticipation = ( campusData, videoData ) => {
    
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
                                                    participationRaisehandCustomTarget
                                                    participationRaisehandCustomClass
                                                    participationRaisehandCustomIcon {
                                                        localFile {
                                                            childImageSharp {
                                                                gatsbyImageData(
                                                                    layout: FIXED
                                                                    width: 32
                                                                    height: 32
                                                                )
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

    let participation =   {
                                raiseHandList: [],
                            }

    /* Lists of Data */
    const globalRaiseHandList   = ( wp.websiteSettings.participation.participationRaisehand.participationRaisehandCustom ) ?
                                    wp.websiteSettings.participation.participationRaisehand?.participationRaisehandCustom : []
    const campusRaiseHandList   = ( campusData?.participationRaisehand.participationRaisehandCustom ) ?
                                    campusData.participationRaisehand.participationRaisehandCustom : []
    const videoRaiseHandList    = ( videoData?.participationRaisehand.participationRaisehandCustom ) ? 
                                    videoData.participationRaisehand.participationRaisehandCustom : []

    /* Behavior of Data */
    const campusRaiseHandBehavior   = campusData?.participationRaisehand.participationRaisehandBehavior.split(':')[0]
    const videoRaiseHandBehavior    = videoData?.participationRaisehand.participationRaisehandBehavior.split(':')[0]

    /* Downstream Logic */
    let raiseHandCase
    raiseHandCase = ( globalRaiseHandList.length > 0 ) ? 'G' : ''
    raiseHandCase += ( campusRaiseHandList.length > 0 ) ? 'C' + campusRaiseHandBehavior : ''
    raiseHandCase += ( videoRaiseHandList.length > 0 ) ? 'V' + videoRaiseHandBehavior : ''
    
    switch( raiseHandCase ){
        case 'G':
            participation.raiseHandList = [...globalRaiseHandList]
            break
            
        case 'GCadd':
            participation.raiseHandList = [...globalRaiseHandList, ...campusRaiseHandList]
            break

        case 'GCaddVadd':
            participation.raiseHandList = [...globalRaiseHandList, ...campusRaiseHandList, ...videoRaiseHandList]
            break

        case 'GVadd':
            participation.raiseHandList = [...globalRaiseHandList, ...videoRaiseHandList]
            break

        case 'GCreplace':
        case 'Cadd':
        case 'Creplace':
            participation.raiseHandList = [...campusRaiseHandList]
            break

        case 'Vadd':
        case 'Vreplace':
        case 'GVreplace':
        case 'GCreplaceVreplace':
            participation.raiseHandList = [...videoRaiseHandList]
            break

        case 'CreplaceVadd':
        case 'GCreplaceVadd':
            participation.raiseHandList = [...campusRaiseHandList, ...videoRaiseHandList]
            break

        default:
            participation.raiseHandList = [...globalRaiseHandList, ...campusRaiseHandList, ...videoRaiseHandList]
            break

    }

    return participation
}