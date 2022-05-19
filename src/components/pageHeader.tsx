import React from 'react'
import { Helmet } from 'react-helmet'
import { PageProps } from 'gatsby'

import SEO from '../components/seo/seoGatsby'

type DataProps = {
    title: string,
    location: object,
    cover: string,
    description: string,
    article: boolean,
    className: string,
    metaTags: object,
    mode: string,
}
export default function PageHeader( 
    title, location, cover, description, article, className, metaTags, mode : PageProps<DataProps>
){

    const current : string = location.pathname.split( '/' )
    
    return (
        <>
            <Helmet>
                <html className = {`page-${current[1]}${ (current[2]) ? ' ' + current[2] : ''} ${ mode ? mode : 'light' } ${ className ? className : '' }`} />
                {
                    metaTags?.noIndex ?
                        <meta name='robots' content='noindex' />
                    : undefined
                }
            </Helmet>
            <SEO 
                title       = { title } 
                image       = { cover }
                article     = { article }
                description = { description }
            />
        </>
    )
}