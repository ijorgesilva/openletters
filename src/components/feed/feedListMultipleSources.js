// Dependencies
import React from 'react'

// Components
import BlurbVertical from '../blurb/blurbVertical'
import config from '../../../data/SiteConfig'
import './feedListMultipleSources.scss'

export default function FeedListMultipleSources ( { data, className, slug, noImage, excerpt, ...props } ) {

    return (
        <div className={`feedListMultipleSources ${ (className) ? className : ''}`}>
            {
                (data) ?
                    data.map( (item, index) => (
                        <>
                            {
                                (item.status === 'publish' && item.linkDetails) ? 
                                    <div key={index}>
                                        <BlurbVertical 
                                            title={item.title}
                                            link={ (item.linkDetails.linkLink.linkLinkUrl) ? item.linkDetails.linkLink.linkLinkUrl : undefined }
                                            target={ (item.linkDetails.linkLink.linkLinkTarget) ? item.linkDetails.linkLink.linkLinkTarget : undefined }
                                            linkType={ (item.linkDetails.linkLink.linkLinkType) ? item.linkDetails.linkLink.linkLinkType : undefined }
                                            featuredImage={ (item.featuredImage) ? item.featuredImage.node.localFile.childImageSharp.fluid : undefined }
                                            excerpt={ (item.excerpt && excerpt === true) ? item.excerpt : undefined }
                                            noImage={ (noImage) ? noImage.childImageSharp.fluid : undefined }
                                        />
                                    </div>
                                :  
                                    (item.status === 'publish') ?
                                        <div key={index}>
                                            <BlurbVertical 
                                                title={item.title}
                                                link={`${config.blogPostDetailsSlug}/${item.slug}`}
                                                featuredImage={(item.featuredImage) ? item.featuredImage.node.localFile.childImageSharp.fluid : undefined}
                                                excerpt={ (item.excerpt && excerpt === true) ? item.excerpt : undefined }
                                                noImage={ (noImage) ? noImage.childImageSharp.fluid : undefined }
                                            />
                                        </div>
                                    : undefined
                                    
                            }
                        </>
                    ))
                :
                    undefined
            }
        </div>
    )
}

