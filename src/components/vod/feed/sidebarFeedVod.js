import React from 'react'
import { Card } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import CustomScroll from 'react-custom-scroll'
import TextTruncate from 'react-text-truncate'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

// Components
import BlurbHorizontalVod from '../blurb/blurbHorizontalVod'
import config from '../../../../data/SiteConfig'
import './sidebarFeedVod.scss'

export default function SidebarFeedVod( { items, serieSlug, title, background, className, id, campus } ){

    /* Standard fields */
    const { t } = useTranslation()

    return (
        <section className={`sidebarFeedVod ${className}`} id={`${ (id) ? id :''}`}>
            {
                (title) ?
                    <Card className="header text-white">
                        <div className={'card-img'} aria-hidden="true">
                            <GatsbyImage
                                image={background}
                                alt=''
                            />
                        </div>
                        <Card.ImgOverlay>
                            <Card.Title>
                                <Link to={`${ (campus) ? '/' + campus : '' }/${config.watchSeriesDetailsSlug}/${ (serieSlug) ? serieSlug : '' }`}>
                                    <TextTruncate line={1} truncateText="…" text={title} />
                                </Link>
                            </Card.Title>
                            <Card.Text>
                            </Card.Text>
                        </Card.ImgOverlay>
                    </Card>
                : 
                    undefined
            }
            <CustomScroll>
                <div className="list">
                {
                    items.map( (obj, index) => (
                        <BlurbHorizontalVod 
                            key             =   { index }
                            className       =   { ( obj.active ) ? 'active' : ''}
                            title           =   { ( obj.videoDetails.videoSeries ) ? obj.title : null }
                            featuredImage   =   { ( obj.featuredImage?.node?.localFile ) ? obj.featuredImage.node.localFile.childImageSharp.gatsbyImageData : undefined }
                            link            =   { `${ (campus) ? '/' + campus : '' }/${config.watchMessageDetailsSlug}/${obj.slug}` }
                            excerpt         =   { ( obj.excerpt ) ? obj.excerpt : null }
                        />
                    ))
                }
                </div>
            </CustomScroll>
        </section>
    )
}