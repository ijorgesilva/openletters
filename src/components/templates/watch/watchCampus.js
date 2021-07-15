// Dependencies
import React from 'react'
import { useTranslation } from 'react-i18next'
import { graphql } from 'gatsby'

// Components
import HeaderPage from '../../headerPage'
import Navigation from '../../menu/navigation'
import { getHeroDescription } from '../../utils/utils'
import HeroSimple from '../../vod/hero/heroSimple'
import SectionFeedCarousel from '../../../components/vod/feed/sectionFeedCarousel'
import RenderSection from '../../renderSection'
import FooterSimpleText from '../../footer/footerSimpleText'
import config from '../../../../data/SiteConfig'

// Hooks
import { useGlobalIndeces } from '../../../hooks/useGlobalIndeces'

// Styles
import './watchCampus.scss'

export default function WatchPage( { pageContext, data, location } ) {

    const { title, slug, campusDetails, breadcrumbs } = pageContext
    
    const { t } = useTranslation()

    let hero = data.hero.nodes[0]
    let backgroundImage =   ( hero.featuredImage?.node?.localFile?.childImageSharp ) ? 
                                hero.featuredImage.node.localFile.childImageSharp.gatsbyImageData
                            : 
                                ( hero.videoDetails?.videoSeries?.seriesGraphics?.background ) ? 
                                    hero.videoDetails.videoSeries.seriesGraphics.background.localFile.childImageSharp.gatsbyImageData
                                : 
                                    undefined

    const sections =    ( campusDetails.campusWatch.campusWatchSections?.length > 0 ) ? 
                            campusDetails.campusWatch.campusWatchSections 
                        : 
                            undefined
        
    return (
        <>
        
            <HeaderPage 
                title       = { t('global.watch.title') + ' | ' + title  }
                location    = { location } 
                cover       = { ( backgroundImage?.images ) ? backgroundImage.images.fallback.src : undefined }
                description = { t('global.watch.meta-description') }
            />

            <Navigation
                location        = { location }
                campus          = { breadcrumbs.campus }
                searchIndices   = { useGlobalIndeces() }
                menuGlobal
                menuLocal
            />
            
            <HeroSimple 
                id              = "hero"
                iconSerie       =   { ( hero.videoDetails?.videoSeries?.seriesGraphics?.logo?.localFile ) ? 
                                        hero.videoDetails.videoSeries.seriesGraphics.logo.localFile.childImageSharp.gatsbyImageData 
                                    : 
                                        undefined 
                                    }
                iconSerieTitle  =   { ( hero.videoDetails?.videoSeries?.title ) ? 
                                        hero.videoDetails.videoSeries.title 
                                    : 
                                        undefined 
                                    }
                iconSerieLink   =   { ( hero.videoDetails?.videoSeries?.slug ) ? 
                                        `/${slug}/${config.watchSeriesDetailsSlug}/`+ hero.videoDetails.videoSeries.slug 
                                    : 
                                        undefined 
                                    }
                title           = { hero.title }
                description     = { getHeroDescription(hero) }
                playText        = { t('global.watch.watch-now') }
                serieLinkText   = { t('global.watch.more-info') }
                playUrl         = { (hero.slug) ? `/${slug}/${config.watchMessageDetailsSlug}/${hero.slug}` : undefined }
                seriesUrl       = { (hero.videoDetails.videoSeries) ? `/${slug}/${config.watchSeriesDetailsSlug}/${hero.videoDetails.videoSeries.slug}` : undefined }
                backgroundImage = { backgroundImage }
            />

            {
                ( data.latest.nodes.length > 0 ) ?
                    <SectionFeedCarousel
                        className       = "h-background-six-shade-three" 
                        id              = "latest"
                        title           = { t('global.watch.section-latest-title') }
                        items           = { data.latest.nodes }
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
                ( sections ) ?
                    sections.map( ( section, index ) => (
                        <RenderSection 
                            index   = { index }
                            section = { section }
                            campus  = { slug }
                            filter  = { {campus: slug } }
                        />
                    ))
                :
                    undefined
            }

            <FooterSimpleText campus = { breadcrumbs.campus } />
            
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