import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { Card } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import TextTruncate from 'react-text-truncate'

import config from '../../../../data/SiteConfig'
import BlurbHorizontalVod from '../blurb/blurbHorizontalVod'

// Styling
import './sidebarFeedVod.scss'

export default function SidebarFeedVod( 
    { 
        items, 
        serieSlug, 
        title, 
        background, 
        className, 
        id, 
        campus,
        mode,
        order,
        count,
    } 
    ){

    const { t } = useTranslation()
    let sortedItems = []

    switch ( order ) {
        case 'asc':
            sortedItems = items.sort().reverse()
            break
        case 'desc':
        default:
            sortedItems = items
            break
    }

    return (
        <section 
            className   = {`sidebarFeedVod ${ mode ? mode : 'light' } ${ className ? className : '' }`} 
            id          = {`${ id ? id :' '}`}
        >
            <Card className='header' >
                <div className={'card-img'} aria-hidden="true">
                    <GatsbyImage
                        image={background}
                        alt=''
                    />
                </div>
                <Card.ImgOverlay>
                    <Card.Title>
                        {
                            ( title ) ?
                                <Link to={`${ (campus) ? '/' + campus : '' }/${config.watchSeriesDetailsSlug}/${ (serieSlug) ? serieSlug : '' }`}>
                                    <TextTruncate line={1} truncateText="…" text={title} />
                                </Link>
                            :
                                <TextTruncate line={1} truncateText="…" text={t('global.watch.playlist')} />
                        }       
                    </Card.Title>
                    <Card.Text>
                    </Card.Text>
                </Card.ImgOverlay>
            </Card>

            <div className="list">
            {
                sortedItems.map( (obj, index) => (
                    <BlurbHorizontalVod 
                        key             = { index }
                        className       = { obj.active ? 'active' : ''}
                        title           = { `${ ( count === true ) ? ( order === 'asc' ) ? '<span>' + (index + 1) + ' |</span> ' : ( order === 'desc' ) ? '<span>' + Math.abs( index - sortedItems.length ) + ' |</span> ' : '' : ''}  ${obj.title}` }
                        featuredImage   = { obj.featuredImage?.node ? obj.featuredImage.node.localFile.childImageSharp.gatsbyImageData : undefined }
                        link            = { `${ campus ? '/' + campus : '' }/${config.watchMessageDetailsSlug}/${obj.slug}` }
                        excerpt         = { obj.excerpt ? obj.excerpt : undefined }
                        mode            = { mode }
                    />
                ))
            }
            </div>
           
        </section>
    )
}