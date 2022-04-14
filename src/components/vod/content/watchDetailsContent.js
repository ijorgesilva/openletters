import { Link } from 'gatsby'
import { StaticImage, GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { Tabs, Tab, Alert } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import TextTruncate from 'react-text-truncate'

import config from '../../../../data/SiteConfig'
import YouVersion from '../../bible/youVersion'
import FeedListEven from '../../feed/feedListEven'
import TagSimple from '../../tag/tagSimple'

import './watchDetailsContent.scss'

export default function WatchDetailsContent ( 
    { 
        id,
        title,
        className,
        videoDetails, 
        excerpt, 
        content, 
        tags, 
        resources, 
        campus, 
        backUrl, 
        bibleUrl,
        bible,
        mode,
    } 
    ) {
    
    const { t } = useTranslation()
    
    const seriesIcon = ( videoDetails.videoSeries?.seriesGraphics?.poster?.localFile ) ?
                            videoDetails.videoSeries.seriesGraphics.poster.localFile.childImageSharp.gatsbyImageData 
                        :
                            undefined

    return (

        <div className={`watchDetailsContent content ${ mode ? mode : 'light' } ${ className ? className : ''}`} id = {id}>
            <div className='overview'>
                {
                    ( videoDetails.videoSeries?.slug && seriesIcon ) ?
                        <div className='introCard introCardGrid'>
                            <Link className='serieGraphic' to={ backUrl }>
                                {
                                    seriesIcon ?
                                        <GatsbyImage 
                                            image       = { seriesIcon }
                                            className   = 'graphic'
                                            alt         = ''
                                        />
                                    :
                                        <div></div>
                                }
                            </Link>
                            <div>
                                <h1 className=''>
                                    {title}
                                </h1>
                                {
                                    ( videoDetails.videoSeries?.title ) ? 
                                        <Link to={backUrl}>
                                            {/* ${config.watchSeriesDetailsSlug}/${videoDetails.videoSeries.slug} */}
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
                        <div className='introCard'>
                            <div>
                                <h1 className=''>{title}</h1>
                                {
                                    ( videoDetails.videoSeries?.title ) ? 
                                        <h2 className=''>{videoDetails.videoSeries.title}</h2> 
                                    : 
                                        undefined
                                }
                            </div>
                        </div>
                }
                {
                    ( excerpt ) ?
                        <div className='extract lead' dangerouslySetInnerHTML={{__html: excerpt}}></div>
                    :
                        undefined
                }
            </div>

            {   
                (videoDetails.videoAttachments) ? 
                    <div className='attachments' id='attachments'>
                        {
                            videoDetails.videoAttachments.map( (attachment, index) => (
                                (attachment.attachment.attachmentFile && attachment.status === 'publish') ?
                                    <a 
                                        className   = 'item' 
                                        href        = { attachment.attachment.attachmentFile.localFile.publicURL } 
                                        title       = { attachment.title } 
                                        rel         = 'noreferrer' 
                                        target      = '_blank'
                                        key         = {index}
                                    >
                                        <StaticImage 
                                            src ='../../../assets/img/global/attachment-dark.svg'
                                            alt =''
                                        />
                                        <div className       = 'item-title'>
                                            <TextTruncate 
                                                element         = 'div' 
                                                line            = {1} 
                                                truncateText    = '…' 
                                                text            = {attachment.title} 
                                            />
                                        </div>
                                    </a>
                                : undefined
                            ))
                        }
                    </div>
                : 
                    undefined
            }

            <Tabs className='sticky z-index-5' defaultActiveKey='notes' id=''>
                {
                    ( content ) ? 
                        <Tab 
                            eventKey='notes' 
                            title={t('global.notes')}
                        >
                            <div className = 'notes'>
                                <article dangerouslySetInnerHTML={{__html: content }}></article> 
                            </div>
                        </Tab>
                    : 
                        <Alert variant='dark'>
                            {t('global.watch.content-empty')}
                        </Alert>
                }
                {
                    ( bible ) ?
                        <Tab 
                            eventKey='bible' 
                            title={t('global.bible.title')}
                        >
                            <div className = 'bible'>
                                <YouVersion 
                                    bibleUrl = { bibleUrl }
                                />
                            </div>
                        </Tab>
                    :
                        undefined
                }
                {
                    ( videoDetails.videoTranscript ) ? 
                        <Tab 
                            eventKey='transcript' 
                            title={t('global.transcripts')}
                        >
                            <div className = 'transcript' dangerouslySetInnerHTML={{__html: videoDetails.videoTranscript }}>
                            </div>
                        </Tab>
                    :
                        undefined
                }
                {
                    ( resources ) ?
                        <Tab 
                            eventKey='resources' 
                            title={t('global.related-resources')}
                        >
                            <div className='resources'>
                                <FeedListEven
                                    items   = { resources }
                                    slug    = { config.blogPostDetailsSlug }
                                    campus  = { campus }
                                    mode    = { mode }
                                />
                            </div>
                        </Tab>
                    : 
                        undefined
                }

            </Tabs>
            
            {
                ( tags?.length > 0 ) ?
                    <TagSimple 
                        variant = { mode } 
                        width   = 'container'
                        items   = { tags }
                    />
                : 
                    undefined
            }
            
        </div>
    )
}