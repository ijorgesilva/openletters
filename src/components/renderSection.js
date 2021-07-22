// Dependencies
import React from 'react'
import { useTranslation } from "react-i18next"

// Components
import SectionTextPhoto from '../components/content/sectionTextPhoto'
import SectionFeedCarousel from '../components/vod/feed/sectionFeedCarousel'
import SectionPodcast from '../components/content/sectionPodcast'
import HeroDynamic from '../components/hero/heroDynamic'
import SectionLatestSeries from './vod/feed/sectionLatestSeries'

// Utils
import config from '../../data/SiteConfig'

export default function RenderSection ( { section, filter, campus, location } ) {
    
    /* Standard fields */
    const { t } = useTranslation()

    const sectionType = section.sectionDetails.sectionType.split(":")[0]
    const sectionTitle = (section.sectionDetails.sectionTitle) ? section.sectionDetails.sectionTitle : undefined
    const sectionContent = (section.sectionDetails.sectionContent) ? section.sectionDetails.sectionContent : undefined

    switch(sectionType){


        /*
         * Call To Action
         */
        case 'cta':
            const ctaItem = section.sectionDetails.sectionCta
            return (
                <SectionTextPhoto 
                    id          = { section.slug }
                    title       = { sectionTitle }
                    content     = { sectionContent }
                    className   = { (ctaItem.sectionCtaClassname) ? ctaItem.sectionCtaClassname : undefined }
                    subtitle    = { (ctaItem.sectionCtaSubtitle) ? ctaItem.sectionCtaSubtitle : undefined }
                    variant     = { (ctaItem.sectionCtaVariant) ? ctaItem.sectionCtaVariant : undefined }
                    buttonText  = { (ctaItem.sectionCtaButton.sectionButtonText) ? ctaItem.sectionCtaButton.sectionButtonText : undefined }
                    buttonType  = { (ctaItem.sectionCtaButton.sectionButtonType) ? ctaItem.sectionCtaButton.sectionButtonType : undefined }
                    buttonLink  = { (ctaItem.sectionCtaButton.sectionButtonUrl) ?  ctaItem.sectionCtaButton.sectionButtonUrl : undefined }
                    linkText    = { (ctaItem.sectionCtaLink.sectionLinkText) ? ctaItem.sectionCtaLink.sectionLinkText : undefined }
                    linkType    = { (ctaItem.sectionCtaLink.sectionLinkType) ? ctaItem.sectionCtaLink.sectionLinkType : undefined }
                    link        = { (ctaItem.sectionCtaLink.sectionLinkUrl) ?  ctaItem.sectionCtaLink.sectionLinkUrl : undefined }
                    photo       = { (ctaItem.sectionCtaPhoto) ? 
                                        ctaItem.sectionCtaPhoto.localFile.childImageSharp.gatsbyImageData 
                                    : 
                                        undefined 
                                    }
                />
            )
            break

        /*
         * Podcast
         */
        case 'podcast':
            const podcastItem = section.sectionDetails.sectionPodcast
            console.log(section.sectionDetails.sectionPodcast)
            return (
                <>
                    <SectionPodcast 
                        id         = { section.slug }
                        title      = { sectionTitle }
                        content    = { sectionContent }
                        subtitle   = { (podcastItem.sectionPodcastSubtitle) ? podcastItem.sectionPodcastSubtitle : undefined }
                        Spotify    = { (podcastItem.sectionPodcastSpotifyUrl) ? podcastItem.sectionPodcastSpotifyUrl : undefined }
                        Soundcloud = { (podcastItem.sectionPodcastSoundcloudUrl) ? podcastItem.sectionPodcastSoundcloudUrl : undefined }
                        iTunes     = { (podcastItem.sectionPodcastItunesUrl) ? podcastItem.sectionPodcastItunesUrl : undefined }
                        graphic    = { (podcastItem.sectionPodcastGraphic) ? 
                                                podcastItem.sectionPodcastGraphic.localFile.childImageSharp.gatsbyImageData 
                                        : 
                                            undefined 
                                      }
                    />
                </>
            )
            break

        /*
         * Videos by Tags
         */
        case 'vodtags':
            const videoItems = (section.sectionDetails.sectionVodTags.sectionVodTag) ? section.sectionDetails.sectionVodTags.sectionVodTag : {}

            const filteredVideos = (videoItems) ? 
                                        videoItems.videosOnDemand.nodes.filter( item => (
                                            item.status === 'publish'
                                        )).filter( item => (
                                            item.videoDetails.videoCampus.some( item => item.slug === filter.campus )
                                        ))
                                    :
                                        {}

            function sortByDate(a, b) {
                const dateA = parseInt(a.videoDetails.videoDayDate, 10)
                const dateB = parseInt(b.videoDetails.videoDayDate, 10)
                let comparison = 0
                if (dateA < dateB) {
                  comparison = 1
                } else if (dateA > dateB) {
                  comparison = -1
                }
                return comparison
            }
            
            return (
                <>
                    {
                        (filteredVideos.length > 0) ?
                            <SectionFeedCarousel 
                                id           = { section.slug }
                                className    = "h-background-six-shade-three"
                                title        = { videoItems.name }
                                campus       = { campus }
                                items        = { filteredVideos.sort(sortByDate)  }
                                configLayout =  {{
                                                    excerpt: false,
                                                    itemsVisible: 5,
                                                }}
                            />
                        :
                            undefined
                    }
                </>
            )
            break

        /*
         * Videos on Series
         */
        case 'vodseries':
            // const seriesSlug = section.sectionVodSeries.sectionVodSeriesList.slug
            // const seriesTitle = section.sectionVodSeries.sectionVodSeriesList.title
            // const seriesVideoItems = section.sectionVodSeries.sectionVodSeriesList
            return (
                <></>
            )
            break

        /*
         * Latest Series
         */
        case 'latestseries':
            
            return (
                <SectionLatestSeries 
                    id              = { section.slug }
                    className       = "h-background-six-shade-three"
                    title           = { sectionTitle }
                    campus          = { campus }
                    configLayout    =  {{
                                            excerpt: false,
                                            itemsVisible: 5,
                                       }}
                />
            )
            break

        /*
         * Hero
         */      
        case 'hero':
            
            let relatedPost = null
            let postFilterByCampus
            const postValidContext =    (section.sectionDetails.sectionHero.sectionHeroRelated?.length > 0 ) ?
                                            section.sectionDetails.sectionHero.sectionHeroRelated.filter( 
                                                item => (item.status === 'publish'))
                                        :
                                            ''
            const postType = postValidContext[0]?.nodeType 

            switch( postType ) {

                case 'Post':

                    postFilterByCampus = postValidContext.filter( item => (
                            item.postDetails.postCampus.some (item => ( item.slug === campus))
                    ))[0]
                    
                    relatedPost = {
                        type: postFilterByCampus.nodeType.toLowerCase(),
                        title: postFilterByCampus.title,
                        subtitle: '',
                        excerpt: postFilterByCampus.excerpt,
                        url: `/${campus}/${config.blogPostDetailsSlug}/${postFilterByCampus.slug}`,
                        tag: t('global.blog.title'),
                        tagClassName: 'badge-secondary',
                        featuredImage:  ( postFilterByCampus.featuredImage.node ) ? 
                                            postFilterByCampus.featuredImage.node.localFile.childImageSharp.gatsbyImageData
                                        :
                                            undefined,
                    }
                    break

                case 'Newspost':

                    postFilterByCampus = postValidContext.filter( item => (
                        item.newsDetails.newsCampus.some (item => ( item.slug === campus))
                    ))[0]

                    relatedPost = {
                        type: postFilterByCampus.nodeType.toLowerCase(),
                        title: postFilterByCampus.title,
                        subtitle: '',
                        excerpt: postFilterByCampus.excerpt,
                        url: `/${campus}/${config.newsPostDetailsSlug}/${postFilterByCampus.slug}`,
                        tag: t('global.news.title'),
                        tagClassName: 'badge-secondary',
                        featuredImage:  ( postFilterByCampus.featuredImage?.node ) ? 
                                            postFilterByCampus.featuredImage.node.localFile.childImageSharp.gatsbyImageData 
                                        : 
                                            undefined,
                    }
                    
                    break

                case 'Event':

                    postFilterByCampus = postValidContext.filter( item => (
                        item.eventDetails.eventCampus.some (item => ( item.slug === campus))
                    ))[0]
                    
                    relatedPost = {
                        type: postFilterByCampus.nodeType.toLowerCase(),
                        eventDates: ( postFilterByCampus.eventDetails.eventDates.length > 0 ) ? 
                                        postFilterByCampus.eventDetails.eventDates
                                    : 
                                        undefined,
                        title: postFilterByCampus.title,
                        subtitle: '',
                        excerpt: postFilterByCampus.excerpt,
                        url: `/${campus}/${config.eventPostDetailsSlug}/${postFilterByCampus.slug}`,
                        tag: t('global.events.title'),
                        tagClassName: 'badge-secondary',
                        featuredImage:  ( postFilterByCampus.featuredImage?.node ) ? 
                                            postFilterByCampus.featuredImage.node.localFile.childImageSharp.gatsbyImageData 
                                        : 
                                            undefined,
                    }
                    
                    break
                default:
                    break
            }
            
            return (
                <HeroDynamic
                    title           = { sectionTitle }
                    subtitle        = { sectionContent }
                    backgroundPhoto = { section.sectionDetails.sectionHero.sectionHeroBackground?.localFile.childImageSharp.gatsbyImageData }
                    buttons         = { section.sectionDetails.sectionHero.sectionHeroButtons?.sectionHeroButton }
                    related         = { ( relatedPost ) ? relatedPost : undefined }
                    location        = { location }
                />
      
            )
            break

        /*
         * Default
         */
        default:
            return (
                <></>
            )
    }
}

