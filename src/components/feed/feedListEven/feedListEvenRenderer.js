// Dependencies
import React from 'react'

// Components
import BlurbVerticalDark from '../../blurb/blurbVerticalDark'

// Tools
import { useWebsiteConfiguration } from '../../../hooks/useWebsiteConfiguration'
import config from '../../../../data/SiteConfig'

export default function FeedListEvenRenderer ( { items, variant, hasExcerpt, campus } ) {

    // console.log(items)
    const defaultCampusSlug = useWebsiteConfiguration().settingsDefaultCampus.slug
    let findPageCampus 
    let findPageCampusSlug
    let bestCampusSlug
    let components = []

    items.map( (item, index ) => {
        if ( item.linkDetails ) {
            components.push(<BlurbVerticalDark 
                    key             = { index }
                    className       = 'link'
                    title           = {item.title}
                    link            =   { ( item.linkDetails.linkLink.linkLinkUrl ) ? 
                                                item.linkDetails.linkLink.linkLinkUrl 
                                            : 
                                                undefined 
                                        }
                    target          = { ( item.linkDetails.linkLink.linkLinkTarget ) ? item.linkDetails.linkLink.linkLinkTarget : undefined }
                    linkType        = { ( item.linkDetails.linkLink.linkLinkType ) ? item.linkDetails.linkLink.linkLinkType : undefined }
                    featuredImage   = { ( item.featuredImage?.node?.localFile ) ? 
                                            item.featuredImage.node.localFile.childImageSharp.gatsbyImageData 
                                        : 
                                            undefined 
                                        }
                    excerpt         = { ( item.excerpt && hasExcerpt === true ) ? item.excerpt : undefined }
                    variant         = { ( variant ) ? variant : undefined }
                />)
        }
        else if ( item.postDetails ) {
            findPageCampus      = item.postDetails.postCampus.find( x => x.slug === campus )
            findPageCampusSlug  = (findPageCampus?.slug) ? findPageCampus.slug : undefined
            bestCampusSlug =    ( findPageCampus ) ?
                                    ( findPageCampusSlug === campus ) ?
                                        campus
                                    :
                                        ( findPageCampusSlug === defaultCampusSlug ) ?
                                            defaultCampusSlug
                                        :
                                            item.postDetails.postCampus[0].slug
                                :
                                    undefined

            components.push(<BlurbVerticalDark 
                    key             = {index}
                    className       = 'post'
                    title           = { item.title }
                    link            = {`/${(bestCampusSlug) ? bestCampusSlug : '' }/${config.blogPostDetailsSlug}/${item.slug}`}
                    featuredImage   =   { ( item.featuredImage?.node?.localFile ) ? 
                                            item.featuredImage.node.localFile.childImageSharp.gatsbyImageData 
                                        : 
                                            undefined
                                        }
                    excerpt         = { ( item.excerpt && hasExcerpt === true ) ? item.excerpt : undefined }
                    variant         = { ( variant ) ? variant : undefined }
                />)
        }
    })
    return components

}