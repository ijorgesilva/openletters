import React from 'react'

import config from '../../../data/SiteConfig'
import BlurbVertical from '../blurb/blurbVertical'
import './feedListMultipleSources.scss'

export default function FeedListMultipleSources ( { data, className, excerpt } ) {

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
                                            />
                                        </div>
                                    : 
                                        undefined
                                    
                            }
                        </>
                    ))
                :
                    undefined
            }
        </div>
    )
}

