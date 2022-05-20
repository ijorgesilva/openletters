import React from 'react'
import { useLocation } from '@reach/router'
import { Helmet } from 'react-helmet'

import SEO from '../components/seo/seoGatsby'

interface confProps {
    title: string,
    cover?: string,
    description?: string,
    article?: boolean,
    className?: string,
    metaTags?: {
        noIndex?: boolean,
    },
    mode?: string,
}
const defaultProps : confProps = {
    title: '',
    cover: undefined,
    description: undefined,
    article: false,
    className: null,
    metaTags: {
        noIndex: true,
    },
    mode: 'light',
}
export default function PageHeader( 
    { title, cover, description, article, className, metaTags, mode } : typeof defaultProps
) {

    const { pathname } = useLocation()
    const current : Array<String> = pathname?.split( '/' )
    
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