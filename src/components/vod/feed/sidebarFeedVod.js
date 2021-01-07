import React from 'react'
import {Card} from 'react-bootstrap'
import { useTranslation } from "react-i18next"
import CustomScroll from 'react-custom-scroll'
import TextTruncate from 'react-text-truncate'
import { Link } from 'gatsby'

// Components
import BlurbHorizontalVod from '../blurb/blurbHorizontalVod'
import config from '../../../../data/SiteConfig'
import './sidebarFeedVod.scss'

export default function SidebarFeedVod( { items, serieSlug, title, background, className, id, ...props } ){

    /* Standard fields */
    const { t } = useTranslation()
    
    const backgroundImage = {
        backgroundImage: "url("+ background +")"
    }

    console.log(items)

    return (
        <section className={`sidebarFeedVod ${className}`}id={id}>
            {
                (title) ?
                    <Card className="header bg-dark text-white">
                        <div className={'card-img'} style={backgroundImage} aria-hidden="true"></div>
                        <Card.ImgOverlay>
                            <Card.Title>
                                <Link to={`${config.watchSerieDetailsSlug}/${ (serieSlug) ? serieSlug : '' }`}>
                                    <TextTruncate line={1} truncateText="…" text={title} />
                                </Link>
                            </Card.Title>
                            <Card.Text>
                            </Card.Text>
                        </Card.ImgOverlay>
                    </Card>
                : undefined
            }
            <CustomScroll>
                <div className="list"  style={{maxHeight: "420px"}} >
                {
                    items.nodes.map( (obj, index) => (
                        <BlurbHorizontalVod 
                            key={index}
                            className={(obj.active) ? 'active' : ''}
                            title={ (obj.videoDetails.serie) ? obj.title : null }
                            featuredImage={ (obj.featuredImage) ? obj.featuredImage.node.localFile.childImageSharp.fluid : undefined }
                            link={ (obj.slug) ? `${config.watchMessageDetailsSlug}/${obj.slug}` : null }
                            excerpt={ (obj.excerpt) ? obj.excerpt : null }
                        />
                    ))
                }
                </div>
            </CustomScroll>
        </section>
    )
}