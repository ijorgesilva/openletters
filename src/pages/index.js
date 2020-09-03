import React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from "react-i18next"
import { Container } from 'react-bootstrap'
import config from '../../data/SiteConfig'
import SEO from '../components/seo/seo'


export default function WatchPage( {data, location} ){
    
    const { t } = useTranslation()
    const url = location.href ? location.href : ''

    let pageNode = {
        excerpt: '',
        frontmatter: {
          title: '',
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
                    
                </Container>
            </section>

        </>
    )
}
