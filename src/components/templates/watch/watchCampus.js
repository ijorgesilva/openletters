import { graphql } from 'gatsby'
import React from 'react'
import { useTranslation } from 'react-i18next'

import config from '../../../../data/SiteConfig'
import SectionFeedCarousel from '../../../components/vod/feed/sectionFeedCarousel'
import { useGlobalIndeces } from '../../../hooks/useGlobalIndeces'
import FooterSimpleText from '../../footer/footerSimpleText'
import HeaderPage from '../../headerPage'
import Navigation from '../../menu/navigation'
import RenderSection from '../../renderSection'
import { getHeroDescription } from '../../utils/utils'
import HeroSimple from '../../vod/hero/heroSimple'

import './watchCampus.scss'

export default function WatchPage( { pageContext, data, location } ) {

    const { title, slug, campusDetails, breadcrumbs } = pageContext
    
    const { t } = useTranslation()

    let hero = data.hero?.nodes[0]
    let backgroundImage =   hero?.featuredImage?.node?.localFile?.childImageSharp ? 
                                hero?.featuredImage.node.localFile.childImageSharp.gatsbyImageData
                            : 
                                hero?.videoDetails?.videoSeries?.seriesGraphics?.background ? 
                                    hero?.videoDetails.videoSeries.seriesGraphics.background.localFile.childImageSharp.gatsbyImageData
                                : 
                                    undefined

    const sections =    ( campusDetails.campusPages.campusWatch.pageSections?.length > 0 ) ? 
                            campusDetails.campusPages.campusWatch.pageSections 
                        : 
                            undefined
    // TODO: Force mode on page with mode override? Is that even needed?
    // TODO: Add secondary mode for content contentMode
    const mode          = 'dark'
    const contentMode   = 'dark'
        
    return (
        <>
        
            <HeaderPage 
                title       = { t('global.watch.title') + ' | ' + title  }
                location    = { location } 
                mode        = { contentMode }
                className   = 'watchCampus'
                cover       = { ( backgroundImage?.images ) ? backgroundImage.images.fallback.src : undefined }
                description = { t('global.watch.meta-description') }
            />

            <Navigation
                location        = { location }
                campus          = { breadcrumbs.campus }
                searchIndices   = { useGlobalIndeces() }
                mode            = { mode }
                menuGlobal
                menuLocal
            />
            
            <HeroSimple 
                id              = 'latest'
                className       = 'z-index-1'
                mode            = { contentMode }
                iconSeries       =   { hero.videoDetails?.videoSeries?.seriesGraphics?.logo?.localFile ? 
                                        hero.videoDetails.videoSeries.seriesGraphics.logo.localFile.childImageSharp.gatsbyImageData 
                                    : 
                                        undefined 
                                    }
                iconSeriesTitle  =   { hero.videoDetails?.videoSeries?.title ? 
                                        hero.videoDetails.videoSeries.title 
                                    : 
                                        undefined 
                                    }
                iconSeriesLink   =   { hero.videoDetails?.videoSeries?.slug ? 
                                        `/${slug}/${config.watchSeriesDetailsSlug}/`+ hero.videoDetails.videoSeries.slug 
                                    : 
                                        undefined 
                                    }
                title           = { hero.title }
                description     = { getHeroDescription(hero) }
                playText        = { t('global.watch.watch-now') }
                seriesLinkText   = { t('global.watch.more-info') }
                playUrl         = { hero.slug ? `/${slug}/${config.watchMessageDetailsSlug}/${hero.slug}` : undefined }
                seriesUrl       = { hero.videoDetails.videoSeries ? `/${slug}/${config.watchSeriesDetailsSlug}/${hero.videoDetails.videoSeries.slug}` : undefined }
                backgroundImage = { backgroundImage }
            />

            {
                ( data.latest.nodes.length > 0 ) ?
                    <SectionFeedCarousel
                        className       = 'z-index-2' 
                        id              = 'recent'
                        title           = { t('global.watch.section-latest-title') }
                        items           = { data.latest.nodes }
                        mode            = { contentMode }
                        campus          = { slug }
                        configLayout    =   {{
                                                excerpt: false,
                                                itemsVisible: 5,
                                            }}
                    />
                : 
                    undefined
            }
            
            {
                sections ?
                    sections.map( ( section, index ) => (
                        <RenderSection 
                            key     = { index }
                            section = { section }
                            campus  = { slug }
                            filter  = { {campus: slug } }
                        />
                    ))
                :
                    undefined
            }

            <FooterSimpleText 
                campus = { breadcrumbs.campus } 
                mode   = { contentMode }
            />
            
        </>
    )
}

export const query = graphql`
    query videosOnCampus($campusId: String!){
        
        hero: allWpVideoOnDemand (
                filter: {
                        status: {eq: "publish"}, 
                        videoDetails: {
                            videoCampusId: {regex: $campusId}
                        }
                    },
                sort: {
                    fields: videoDetails___videoDayDate, 
                    order: DESC
                    }, 
                limit: 1
            ) {
            nodes {
                title
                slug
                excerpt
                featuredImage {
                    node {
                        localFile {
                            childImageSharp {
                                gatsbyImageData(layout: FULL_WIDTH)
                            }
                        }
                    }
                }
                videoDetails {
                    videoOneLiner
                    videoDayDate
                    videoUrl
                    videoSpeaker {
                        ... on WpSpeaker {
                            id
                            title
                            uri
                        }
                    }

                    videoSeries {
                        ... on WpSerie {
                            id
                            title
                            slug
                            seriesDetails {
                                seriesTrailer
                            }
                            seriesGraphics {
                                poster {
                                    localFile {
                                        childImageSharp {
                                            gatsbyImageData(layout: FULL_WIDTH)
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

        latest: allWpVideoOnDemand (
                filter: {
                    status: {eq: "publish"}, 
                    videoDetails: {
                        videoCampusId: {regex: $campusId}
                    }
                }
                sort: {
                    fields: videoDetails___videoDayDate, 
                    order: DESC
                    }, 
                limit: 10, 
                skip: 1
            ) {
            nodes {
                title
                slug
                excerpt
                featuredImage {
                    node {
                        localFile {
                            childImageSharp {
                                gatsbyImageData(layout: FULL_WIDTH)
                            }
                        }
                    }
                }
                videoDetails {
                    videoOneLiner
                    videoDayDate
                    videoSeries {
                        ... on WpSerie {
                            id
                            title
                            slug
                        }
                    }
                }
            }
        }
        
    }  
`