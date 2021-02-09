// Dependencies
import React from 'react'
import { Helmet } from "react-helmet"

// Components
import SEO from '../components/seo/seoGatsby'

export default function HeaderPage( { title, location, cover, description, article } ){

    const url = location.href ? location.href : ''
    const current = location.pathname.split( '/' )
    
    return (
        <>
            <Helmet>
                <html class={`page-${current[1]}${ (current[2]) ? ' ' + current[2] : ''}`} />
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
