// Dependencies
import React from 'react'
import { useTranslation } from "react-i18next"
import { graphql } from 'gatsby'

// Components
import HeaderPage from '../../components/headerPage'
import { isEmpty, getHeroDescription, getSerieLink, getHeroBackground } from '../../components/utils/utils'
import HeroSimple from '../../components/vod/hero/heroSimple'
import SectionFeedCarousel from '../../components/vod/feed/sectionFeedCarousel'
import SectionFeedCarouselDescription from '../../components/vod/feed/sectionFeedCarouselDescription'
import SectionPodcast from '../../components/content/sectionPodcast'
import SectionTextPhoto from '../../components/content/sectionTextPhoto'

export default function WatchPage( { data, location } ){
    
    const { t } = useTranslation()

    const serieLink = `/watch/serie/`+ getSerieLink(data.hero.nodes[0])
    const heroDescription = getHeroDescription(data.hero.nodes[0])

    const backgroundImage = getHeroBackground(data.hero.nodes[0], data.noImage.childImageSharp)

    return (
        <>
            
            <HeaderPage 
                title='Watch'
                location={location} 
                cover={backgroundImage}
                description={t('smallgroups.meta-description')}
                article={false}
            />

            <HeroSimple 
                id="hero" 
                iconSerie={(data.hero.nodes[0].videoDetails.serie.serieGraphics.logo) ? data.hero.nodes[0].videoDetails.serie.serieGraphics.logo.localFile.childImageSharp.fluid : undefined}
                iconSerieTitle={data.hero.nodes[0].videoDetails.serie.title}
                iconSerieLink={serieLink}
                title={data.hero.nodes[0].title}
                description={heroDescription}
                playText={t('global.watch.watch-now')}
                serieLinkText={t('global.watch.more-info')}
                playUrl={ (data.hero.nodes[0].slug) ? `/watch/message/${data.hero.nodes[0].slug}` : undefined }
                seriesUrl={ (data.hero.nodes[0].slug) ? `/watch/message/${data.hero.nodes[0].slug}` : undefined }
                backgroundImage={backgroundImage}
                iconPlay={data.playButton.publicURL}
            />
            
            {(isEmpty(data.latest.nodes)) ?
                    undefined
                : 
                <SectionFeedCarousel
                    className="h-background-six-shade-three" 
                    id="latest"
                    title={t('global.watch.section-latest-title')}
                    items={data.latest}
                    iconCarousel={data.playButton.publicURL}
                    blurbType="vertical-dark"
                    itemsVisible = {5}
                />
            }

            {(isEmpty(data.forgiveness.nodes)) ?
                    undefined
                : 
                    <SectionFeedCarouselDescription 
                        className="h-background-six-shade-three" 
                        id="forgiveness" 
                        title="Forgiveness"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                        items={data.forgiveness}
                        iconCarousel={data.playButton.publicURL}
                        itemsVisible = {4}
                    />
            }

            {(isEmpty(data.classics.nodes)) ?
                    undefined
                : 
                <SectionFeedCarousel 
                    className="h-background-six-shade-three" 
                    id="classics" 
                    title="Classics"
                    items={data.classics}
                    itemsVisible = {5}
                    iconCarousel={data.playButton.publicURL}
                />
            }

            <hr className="dark" />

            <SectionPodcast 
                iTunes="https://itunes.apple.com/us/podcast/victory-world-church/id219403834"
            />

            <SectionTextPhoto 
                title="Test"
                subtitle="Excepteur sint "
                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                buttonLink="#"
                buttonText="Know more"
                link="#"
                linkText="Press here"
                className="h-background-six"
                variant="light"
                photo={data.sectionPhoto.childImageSharp.fluid}
            />

        </>
    )
}

export const query = graphql`
    query {

        playButton: file(relativePath: {eq: "img/global/button__play-white.svg"}) {
            publicURL
        }

        sectionPhoto: file(relativePath: {eq: "img/watch/placeholder@2x.jpg"}) {
            childImageSharp {
                fluid {
                    src
                }
            }
        }

        noImage: file(relativePath: {eq: "img/global/noimage.jpg"}) {
            childImageSharp {
                fluid {
                    src
                }
            }
        }
        
        hero: allWpVideoOnDemand (filter: {status: {eq: "publish"}}, sort: {fields: videoDetails___dayDate, order: DESC}, limit: 1) {
            nodes {
                title
                slug
                excerpt
                featuredImage {
                    node {
                        localFile {
                          childImageSharp {
                            fluid(maxWidth: 1800) {
                                src
                            }
                          }
                        }
                    }
                }
                videoDetails {
                    oneLiner
                    dayDate
                    url
                    speaker {
                        ... on WpSpeaker {
                            id
                            title
                            uri
                        }
                    }
                    serie {
                      ... on WpSerie {
                        id
                        title
                        slug
                        serieDetails {
                          trailer
                        }
                        serieGraphics {
                            poster {
                                localFile {
                                    childImageSharp {
                                        fluid(maxWidth: 1800) {
                                            src
                                        }
                                    }
                                }
                            }
                            logo {
                                localFile {
                                    childImageSharp {
                                        fluid(maxWidth: 1800) {
                                            src
                                        }
                                    }
                                }
                            }
                            background {
                                localFile {
                                    childImageSharp {
                                        fluid {
                                            src 
                                        }
                                    }
                                }
                            }
                        }
                      }
                    }
                }
            }
        }

        latest: allWpVideoOnDemand (filter: {status: {eq: "publish"}}, sort: {fields: videoDetails___dayDate, order: DESC}, limit: 10, skip: 1) {
            nodes {
                title
                slug
                excerpt
                featuredImage {
                    node {
                        localFile {
                          childImageSharp {
                            fluid {
                              src
                            }
                          }
                        }
                    }
                }
                videoDetails {
                    oneLiner
                    dayDate
                    url
                    serie {
                        ... on WpSerie {
                            id
                            title
                            slug
                        }
                    }
                    speaker {
                        ... on WpSpeaker {
                            id
                            title
                            uri
                        }
                    }
                }
            }
        }

        classics: allWpVideoOnDemand(sort: {fields: videoDetails___dayDate, order: DESC}, filter: {status: {eq: "publish"}, videoOnDemandTags: {nodes: {elemMatch: {slug: {eq: "classics"}}}}}, limit: 10) { 
            nodes {
                title
                slug
                excerpt
                featuredImage {
                    node {
                        localFile {
                          childImageSharp {
                            fluid {
                              src
                            }
                          }
                        }
                    }
                }
                videoDetails {
                    oneLiner
                    dayDate
                    url
                    serie {
                        ... on WpSerie {
                            id
                            title
                            slug
                        }
                    }
                    speaker {
                        ... on WpSpeaker {
                            id
                            title
                            uri
                        }
                    }
                }
            }
        }

        forgiveness: allWpVideoOnDemand(sort: {fields: videoDetails___dayDate, order: DESC}, filter: {status: {eq: "publish"}, videoOnDemandTags: {nodes: {elemMatch: {slug: {eq: "forgiveness"}}}}}, limit: 10) { 
            nodes {
                title
                slug
                excerpt
                featuredImage {
                    node {
                        localFile {
                          childImageSharp {
                            fluid {
                              src
                            }
                          }
                        }
                    }
                }
                videoDetails {
                    oneLiner
                    dayDate
                    url
                    serie {
                        ... on WpSerie {
                            id
                            title
                            slug
                        }
                    }
                    speaker {
                        ... on WpSpeaker {
                            id
                            title
                            uri
                        }
                    }
                }
            }
        }
          
        sectionCTA: wpContentSection( status: {eq: "publish"}, slug: {eq: "visit-us"}) {
            title
            sectionDetails {
                sectionClassname
                sectionContent
                sectionSubtitle
                sectionVariant

                sectionButton {
                    sectionButtonText
                    sectionButtonType
                    sectionButtonUrl
                }
                sectionLink {
                    sectionLinkText
                    sectionLinkType
                    sectionLinkUrl
                }
                sectionPhoto {
                    localFile {
                        childImageSharp {
                            fluid {
                                src
                            }
                        }
                    }
                }

            }
        }

        
    }  
`