import React from 'react'
import { Helmet } from "react-helmet"

import SEO from '../components/seo/seoGatsby'

export default function HeaderPage( { title, location, cover, description, article, className, metaTags, mode } ){

    const url = location.href ? location.href : ''
    const current = location.pathname.split( '/' )
    
    return (
        <>
            <Helmet>
                <html className = {`page-${current[1]}${ (current[2]) ? ' ' + current[2] : ''} ${ mode ? mode : 'light' } ${ className ? className : '' }`} />
                {
                    ( metaTags?.noIndex ) ?
                        <meta name="robots" content="noindex" />
                    :
                        undefined
                }
            </Helmet>
            <SEO 
                postPath={url} 
                title={title} 
                description={description}
                image={cover}
                article={article}
            />
        </>
    )
}
