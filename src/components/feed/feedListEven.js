// Dependencies
import React from 'react'

// Components
import config from '../../../data/SiteConfig'
import BlurbVerticalDark from '../blurb/blurbVerticalDark'
import './feedListEven.scss'

export default function FeedListEven ( { items, className, variant, noImage, excerpt, ...props } ) {
   
    return (
        
        <div className={`feedListEven ${ (className) ? className : '' }`}>
            <div className="list">
            {
                (items) ?
                    items.map( (item, index) => (
                        (item.status === 'publish' && item.linkDetails) ? 
                            <div key={index}>
                                <BlurbVerticalDark 
                                    title={item.title}
                                    link={ (item.linkDetails.linkLink.linkLinkUrl) ? item.linkDetails.linkLink.linkLinkUrl : undefined }
                                    target={ (item.linkDetails.linkLink.linkLinkTarget) ? item.linkDetails.linkLink.linkLinkTarget : undefined }
                                    linkType={ (item.linkDetails.linkLink.linkLinkType) ? item.linkDetails.linkLink.linkLinkType : undefined }
                                    featuredImage={ (item.featuredImage) ? item.featuredImage.node.localFile.childImageSharp.fluid : undefined }
                                    excerpt={ (item.excerpt && excerpt === true) ? item.excerpt : undefined }
                                    noImage={ (noImage) ? noImage.childImageSharp.fluid : undefined }
                                    variant={ (variant) ? variant : undefined }
                                />
                            </div>
                        :
                            (item.status === 'publish') ?
                                <div key={index}>
                                    <BlurbVerticalDark 
                                        title={item.title}
                                        link={`${config.blogPostDetailsSlug}/${item.slug}`}
                                        featuredImage={(item.featuredImage) ? item.featuredImage.node.localFile.childImageSharp.fluid : undefined}
                                        excerpt={ (item.excerpt && excerpt === true) ? item.excerpt : undefined }
                                        noImage={ (noImage) ? noImage.childImageSharp.fluid : undefined }
                                        variant={ (variant) ? variant : undefined }
                                    />
                                </div>
                            : undefined
                    ))
                : 
                    undefined
            }
            </div>
        </div>
    )
}