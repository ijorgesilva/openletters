// Dependencies
import React from 'react'
import { StaticImage, GatsbyImage } from 'gatsby-plugin-image'
import { Tabs, Tab, Alert } from 'react-bootstrap'
import { Link } from 'gatsby'
import { useTranslation } from "react-i18next"

// Components
import config from '../../../../data/SiteConfig'
import FeedListEven from '../../feed/feedListEven'
import TagSimple from '../../tag/tagSimple'

export default function WatchDetailsContent ( { title, videoDetails, excerpt, content, tags, resources, campus, backUrl } ) {
    
    /* Standard fields */
    const { t } = useTranslation()
    
    const seriesIcon = ( videoDetails.videoSeries?.seriesGraphics?.poster?.localFile ) ?
                            videoDetails.videoSeries.seriesGraphics.poster.localFile.childImageSharp.gatsbyImageData 
                        :
                            undefined

    return (

        <div className="watchDetailsContent content" id="content">
            <div className="overview">
                {
                    ( videoDetails.videoSeries?.slug && seriesIcon ) ?
                        <div className="introCard introCardGrid mb-5">
                            <Link className="serieGraphic" to={ backUrl }>
                                {
                                    ( seriesIcon ) ?
                                        <GatsbyImage 
                                            image       = { seriesIcon }
                                            className   = "graphic"
                                            alt         = ""
                                        />
                                    :
                                        <div></div>
                                }
                            </Link>
                            <div>
                                <h1 className="">
                                    {title}
                                </h1>
                                {
                                    ( videoDetails.videoSeries?.title ) ? 
                                        <Link to={`${config.watchSeriesDetailsSlug}/${videoDetails.videoSeries.slug}`}>
                                            <h2>
                                                {videoDetails.videoSeries.title}
                                            </h2>
                                        </Link> 
                                    : 
                                        undefined
                                }
                            </div>
                        </div>
                    : 
                        <div className="introCard mb-5">
                            <div>
                                <h1 className="">{title}</h1>
                                {
                                    ( videoDetails.videoSeries?.title ) ? 
                                        <h2 className="">{videoDetails.videoSeries.title}</h2> 
                                    : 
                                        undefined
                                }
                            </div>
                        </div>
                }
                {
                    ( excerpt ) ?
                        <div className="extract" dangerouslySetInnerHTML={{__html: excerpt}}></div>
                    :
                        undefined
                }
                

            </div>
            {   
                (videoDetails.videoAttachments) ? 
                    <div className="attachments" id="attachments">
                        {
                            videoDetails.videoAttachments.map( (attachment, index) => (
                                (attachment.attachment.attachmentFile && attachment.status === 'publish') ?
                                    <a 
                                        className   = "item" 
                                        href        = { attachment.attachment.attachmentFile.localFile.publicURL } 
                                        title       = { attachment.title } 
                                        rel         = "noreferrer" 
                                        target      = "_blank"
                                        key         = {index}
                                    >
                                        <StaticImage 
                                            src ='../../../assets/img/global/attachment-dark.svg'
                                            alt =""
                                        />
                                        <div>{attachment.title}</div>
                                    </a>
                                : undefined
                            ))
                        }
                    </div>
                : 
                    undefined
            }

            <Tabs className="mt-5 sticky" defaultActiveKey="notes" id="">
                
                {
                    (content) ? 
                        <Tab 
                            eventKey="notes" 
                            title={t('global.notes')}
                        >
                            <article dangerouslySetInnerHTML={{__html: content }}></article> 
                        </Tab>
                    : 
                        <Alert variant="dark">
                            {t('global.watch.content-empty')}
                        </Alert>
                }
                
                {
                    (videoDetails.videoTranscript) ? 
                        <Tab 
                            eventKey="transcript" 
                            title={t('global.transcripts')}
                        >
                            {videoDetails.videoTranscript}
                        </Tab>
                    :
                        undefined
                }

                {
                    (resources) ?
                        <Tab 
                            eventKey="resources" 
                            title={t('global.related-resources')}
                        >
                            <div className="resources"></div>
                            <FeedListEven
                                items   = { resources }
                                slug    = { config.blogPostDetailsSlug }
                                campus  = { campus }
                            />
                        </Tab>
                    : 
                        undefined
                }

            </Tabs>
            
            {
                ( tags?.length > 0 ) ?
                    <TagSimple terms={tags} variant="" />
                : 
                    undefined
            }
            
        </div>
    )
}