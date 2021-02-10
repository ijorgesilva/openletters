// Dependencies
import React, {useEffect} from 'react'
import { Tabs, Tab, Alert } from 'react-bootstrap'
import { useTranslation } from "react-i18next"
import { graphql } from 'gatsby'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

// Components
import config from '../../../../data/SiteConfig'
import watchDetailsConfig from '../../../../data/SiteConfig'
import { isEmpty, getDate } from '../../utils/utils'
import { watchDetailsBrand, watchDetailsMenu } from '../../../../data/menues'
import SidebarFeedVod from '../../../components/vod/feed/sidebarFeedVod'
import ToolbarDetails from '../../toolbar/toolbarDetails'
import HeaderPage from '../../headerPage'
import TagSimple from '../../tag/tagSimple'
import FeedListEven from '../../feed/feedListEven'
import VideoReactPlayer from '../../vod/player/videoReactPlayer'
import MenuWatchDetails from '../../vod/menu/menuWatchDetails'
import SectionTextPhoto from '../../content/sectionTextPhoto'
import './watchDetails.scss'

export default function WatchDetails( { pageContext, location, className, data, ...props } ) {
    
    const { title, slug, node: {excerpt, content, featuredImage, videoDetails, videoOnDemandTags} } = pageContext

    /* Standard fields */
    const { t } = useTranslation()

    let videosSerie = { nodes: [] }
    data.videos.nodes.map( (video, index) => (
        (video.slug === slug) ? 
            videosSerie.nodes.push({'active': true, ...video })
        : 
            videosSerie.nodes.push(video)
    ))
    
    const poster = featuredImage ? featuredImage.node.localFile.childImageSharp.fluid.src : '' 
    const vodDate = getDate(videoDetails.dayDate,2,'us','LLLL d, yyyy' )

    const closeUrl = (videoDetails.serie) ? config.watchSerieDetailsSlug + '/' + videoDetails.serie.slug : config.watchSlug

    /* Scrolled Player */
    const [scrolledPlayer,setScrolledPlayer]=React.useState(false);
    const handleScroll=() => {
        const offset=window.scrollY;
        if(offset > 700 ){
            setScrolledPlayer(true);
        }
        else{
            setScrolledPlayer(false);
        }
    }
    useEffect(() => {
        window.addEventListener('scroll',handleScroll)
    })
    let playerClasses=['player'];
    if(scrolledPlayer) {
        playerClasses.push('scrolled')
    }
    /*. Scrolled Player */

    const background = 
        (videoDetails.serie) ?
            (videoDetails.serie.serieGraphics) ?
                (videoDetails.serie.serieGraphics.background) ?
                    videoDetails.serie.serieGraphics.background.localFile.childImageSharp.fluid.src
                :
                    'none'
            :
                'none'
        : undefined


    const styleBackgroundHero = {
        backgroundImage:  "url(" + background + ")"
    }

    return (
        <div className={`watchDetails ${(className)? className : ''}`}>
            
            <HeaderPage 
                title={title} 
                location={location} 
                cover={poster}
                description={excerpt}
                article={true}
            />

            <MenuWatchDetails 
                menuBrand={watchDetailsBrand} 
                menu={watchDetailsMenu} 
                close={closeUrl}
            />

            <div className="watchPlayer h-background-six-shade-three" id="video">

                    <div className="content-container">
                        
                        <div className={playerClasses.join(" ")}>
                            {
                                (videoDetails.url) ?
                                    <VideoReactPlayer
                                        src={videoDetails.url}
                                        config={{
                                            file: {
                                                attributes: {
                                                    poster: poster,
                                                    autoplay: true,
                                                }
                                            }
                                        }}
                                    />
                                : null
                            }
                        </div>

                        <div className="playlist">
                            {(isEmpty(data.videos.nodes)) ?
                                    undefined
                                : 
                                <SidebarFeedVod 
                                    title={ (videoDetails.serie) ? videoDetails.serie.title : undefined}
                                    background={(watchDetailsConfig.sidebarBackground && videoDetails.serie.serieGraphics.background) ? videoDetails.serie.serieGraphics.background.localFile.childImageSharp.fluid.src : undefined}
                                    className="h-background-six-shade-three" 
                                    serieSlug={videoDetails.serie.slug}
                                    id={ (videoDetails.serie) ? videoDetails.serie.slug : undefined }
                                    items={videosSerie}
                                />
                            }
                        </div>
                        
                    </div>

                    <div className="background">
                        <div className="overlay"></div>
                        <div className="poster" style={styleBackgroundHero}></div>
                    </div>

            </div>

            <main className="main">
                <div className="columns">

                        <div className="sidebar-left" id="left">
                            <div className="sticky">
                                <div className="details">
                                    {
                                        (videoDetails.campus) ? 
                                            <div className="watchCampus mb-3">
                                                {
                                                    videoDetails.campus.map ( (campus, index) => (
                                                        <span key={index} className="user-select-none d-block">{campus.title}</span>
                                                    ))
                                                }
                                            </div> 
                                        : undefined
                                    }
                                    {
                                        (videoDetails.speaker) ? 
                                            <div className="watchSpeaker">
                                                <address className="watchAuthor">
                                                    {videoDetails.speaker.map ( ( speaker, index ) => (
                                                                <>{(index) ? ', ': ''}
                                                                    <span className="user-select-none" key={index}>{speaker.title}</span>
                                                                </>
                                                            )
                                                        )
                                                    }
                                                </address>
                                            </div> 
                                        : null
                                    }
                                    {
                                        (videoDetails.dayDate) ? 
                                            <div className="watchDate user-select-none">
                                                {vodDate}
                                            </div>
                                            : null
                                    }
                                </div>

                                <ToolbarDetails 
                                    location={location} 
                                />

                            </div>
                        </div>

                        <div className="content" id="content">

                            
                                <div className="overview">
                                    {
                                        (videoDetails.serie) ?
                                            (videoDetails.serie.slug) ?
                                                <div className="introCard introCardGrid mb-5">
                                                    <Link className="serieGraphic" to={`${config.watchSerieDetailsSlug}/${videoDetails.serie.slug}`}>
                                                        <Img className="graphic" fluid={(videoDetails.serie.serieGraphics.poster) ? videoDetails.serie.serieGraphics.poster.localFile.childImageSharp.fluid : undefined} alt="" />
                                                    </Link>
                                                    <div>
                                                        <h1 className="">{title}</h1>
                                                        {
                                                            (videoDetails.serie.title) ? <Link to={`${config.watchSerieDetailsSlug}/${videoDetails.serie.slug}`}><h2>{videoDetails.serie.title}</h2></Link> : undefined
                                                        }
                                                    </div>
                                                </div>
                                            : 
                                                <div className="introCard mb-5">
                                                    <div>
                                                        <h1 className="">{title}</h1>
                                                        {
                                                            (videoDetails.serie.title) ? <h2 className="">{videoDetails.serie.title}</h2> : undefined
                                                        }
                                                    </div>
                                                </div>
                                        : undefined
                                    }
                                    
                                    <div className="extract" dangerouslySetInnerHTML={{__html: excerpt}}></div>

                                </div>


                            
                            {   
                                (videoDetails.videoAttachments) ? 
                                    <div className="attachments" id="resources">
                                    {
                                        videoDetails.videoAttachments.map( (attachment, index) => (
                                            (attachment.attachment.attachmentFile && attachment.status === 'publish') ?
                                                <a className="item" href={attachment.attachment.attachmentFile.localFile.publicURL} title={attachment.title} target="_blank">
                                                    <img src={data.attachmentIcon.publicURL} /><div key={index}>{attachment.title}</div>
                                                </a>
                                            : undefined
                                        ))
                                    }
                                    </div>
                                : undefined
                            }

                            <Tabs className="mt-5 sticky" defaultActiveKey="notes" id="">
                                <Tab eventKey="notes" title={t('global.notes')}>
                                    {
                                        (content) ? 
                                            <article dangerouslySetInnerHTML={{__html: content }}></article> 
                                        : 
                                            <Alert variant="dark">
                                                {t('global.watch.content-empty')}
                                            </Alert>
                                    }
                                </Tab>
                                <Tab eventKey="transcript" title={t('global.transcripts')}>
                                    {
                                        (videoDetails.videoTranscript) ? 
                                            videoDetails.videoTranscript 
                                        :   
                                            <Alert variant="dark">
                                                {t('global.watch.transcript-empty')}
                                            </Alert>
                                    }
                                </Tab>

                                {
                                    (videoDetails.videoRelatedResources) ?
                                        <Tab eventKey="resources" title={t('global.related-resources')}>
                                            <div className="resources"></div>
                                            <FeedListEven
                                                className=""
                                                items={videoDetails.videoRelatedResources}
                                                slug={config.blogPostDetailsSlug}
                                                excerpt={false}
                                                noImage={data.noImage}
                                                variant=''
                                            />
                                            {/* <FeedListMultipleSources 
                                                className="related"
                                                data={videoDetails.videoRelatedResources}
                                            /> */}
                                        </Tab>
                                    : 
                                        undefined
                                }

                            </Tabs>
                            
                            {
                                (videoOnDemandTags) ?
                                    <TagSimple terms={videoOnDemandTags} variant="" />
                                : 
                                    undefined
                            }
                            
                        </div>

                        <div className="sidebar-right" id="right">
                            <div className="sticky">
                                        
                                    
                            </div>
                        </div>

                </div>
            </main>

            {
                (videoDetails.videoCtaSection) ? 
                    <SectionTextPhoto 
                        title={videoDetails.videoCtaSection.sectionDetails.sectionTitle}
                        className={(videoDetails.videoCtaSection.sectionDetails.sectionClassname) ? videoDetails.videoCtaSection.sectionDetails.sectionClassname : undefined}
                        content={(videoDetails.videoCtaSection.sectionDetails.sectionContent) ? videoDetails.videoCtaSection.sectionDetails.sectionContent : undefined}
                        subtitle={(videoDetails.videoCtaSection.sectionDetails.sectionSubtitle) ? videoDetails.videoCtaSection.sectionDetails.sectionSubtitle : undefined}
                        variant={videoDetails.videoCtaSection.sectionDetails.sectionVariant}
                        buttonText={(videoDetails.videoCtaSection.sectionDetails.sectionButton) ? videoDetails.videoCtaSection.sectionDetails.sectionButton.sectionButtonText : undefined}
                        buttonType={(videoDetails.videoCtaSection.sectionDetails.sectionButton) ? videoDetails.videoCtaSection.sectionDetails.sectionButton.sectionButtonType : undefined}
                        buttonLink={(videoDetails.videoCtaSection.sectionDetails.sectionButton) ? videoDetails.videoCtaSection.sectionDetails.sectionButton.sectionButtonUrl : undefined}
                        linkText={(videoDetails.videoCtaSection.sectionDetails.sectionLink) ? videoDetails.videoCtaSection.sectionDetails.sectionLink.sectionLinkText : undefined}
                        linkType={(videoDetails.videoCtaSection.sectionDetails.sectionLink) ? videoDetails.videoCtaSection.sectionDetails.sectionLink.sectionLinkType : undefined}
                        link={(videoDetails.videoCtaSection.sectionDetails.sectionLink) ? videoDetails.videoCtaSection.sectionDetails.sectionLink.sectionLinkUrl : undefined}
                        photo={(videoDetails.videoCtaSection.sectionDetails.sectionPhoto) ? videoDetails.videoCtaSection.sectionDetails.sectionPhoto.localFile.childImageSharp.fluid : undefined}
                    />
                : undefined
            }

        </div>
    )

}

export const query = graphql`
    query getVideos($serieId: String!){

        videos: allWpVideoOnDemand (filter: {videoDetails: {videoSerieId: {eq: $serieId}}, status: {eq: "publish"}}, sort: {fields: videoDetails___dayDate, order: DESC}, limit: 10) {
            nodes{
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
                }

            }
        }

        attachmentIcon: file(relativePath: {eq: "img/global/attachment-dark.svg"}) {
            publicURL
        }

        noImage: file(relativePath: {eq: "img/global/noimage.jpg"}) {
            childImageSharp {
                fluid {
                    src
                }
            }
        }

    }
    
`