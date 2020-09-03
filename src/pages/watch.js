import React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from "react-i18next"
import { graphql } from 'gatsby'
// import { Link } from 'gatsby'
// import { Container } from 'react-bootstrap'
// import Img from 'gatsby-image'
import config from '../../data/SiteConfig'
import SEO from '../components/seo/seo'

import SectionFeedCarousel from '../components/vod/feed/sectionFeedCarousel'


export default function WatchPage( {data, location} ){
    
    const { t } = useTranslation()
    const url = location.href ? location.href : ''

    let pageNode = {
        excerpt: '',
        frontmatter: {
          title: 'Small Groups',
          date: '',
          cover: '/logos/logo-1024.png',
          description: t('smallgroups.meta-description'),
        }
      }
      
    return (
        <>

            <Helmet>
                <title>{t('vod.title')} {config.separator} {config.siteTitle}</title>
            </Helmet>
            <SectionFeedCarousel 
                className="h-background-six-shade-three" 
                id="latest" 
                title="Latest Messages"
                data={data}
                noImage={data.noImage.childImageSharp.fluid}
                iconCarousel={data.playButton.publicURL}
            />

            <SEO postPath={url} postNode={pageNode} postSEO />

        </>
    )
}

export const query = graphql`
    query {
        
        allWpVideoOnDemand (filter: {status: {eq: "publish"}}, sort: {fields: VodVideo___dayDate, order: DESC}, limit: 10) {
            nodes {
                title
                slug
                excerpt
                modified
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
                VodVideo {
                    oneLiner
                    dayDate
                    url
                    campus {
                        ... on WpCampus {
                            title
                            slug
                        }
                    }
                    serie {
                        ... on WpSerie {
                            id
                            title
                        }
                    }
                    speaker {
                        ... on WpSpeaker {
                            id
                            title
                            uri
                        }
                    }
                    speaker {
                        ... on WpSpeaker {
                            id
                            title
                        }
                    }
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

        playButton: file(relativePath: {eq: "img/global/button__play-white.svg"}) {
            publicURL
        }
          
    }  
`