import React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from "react-i18next"
import { Link, graphql } from 'gatsby'
import { Container } from 'react-bootstrap'
import config from '../../data/SiteConfig'
import SEO from '../components/seo/seo'


export default function WatchPage( {data, location} ){
    
    const { t } = useTranslation()
    const url = location.href ? location.href : ''

    let pageNode = {
        excerpt: '',
        frontmatter: {
          title: 'Blog',
          date: '',
          cover: '/logos/logo-1024.png',
          description: t('blog.meta-description'),
        }
      }
      
    return (
        <>

            <Helmet>
                <title>{t('blog.title')} {config.separator} {config.siteTitle}</title>
            </Helmet>

            <SEO postPath={url} postNode={pageNode} postSEO />

            <section className="">
                <Container>
                    {console.log(data)}
                    {data.allWpPost.nodes.map((obj, index) => (
                        <Link key={index} to={`/blog/${obj.slug}`}>{obj.title}</Link>
                    ))}
                </Container>
            </section>

        </>
    )
}

export const query = graphql`
    query {
        allWpPost(filter: {status: {eq: "publish"}}) {
            nodes{
                title
                excerpt
                slug
                content
                modified
                featuredImage {
                    node {
                        altText
                        uri
                        sourceUrl
                        title
                    }
                }
            }
        }
    }  
`