import { graphql } from 'gatsby'
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import config from '../../../../data/SiteConfig'
import { useGlobalIndeces } from '../../../hooks/useGlobalIndeces'
import AlertEmptyState from '../../alert/alertEmptyState'
import BlurbHorizontal from '../../blurb/blurbHorizontal'
import FooterSimpleText from '../../footer/footerSimpleText'
import HeaderPage from '../../headerPage'
import MenuPage from '../../menu/menuPage'
import Navigation from '../../menu/navigation'
import { getDate } from '../../utils/utils'

import './newsCampus.scss'

export default function NewsCampus ( { data, location, pageContext } ){

    const { title, featuredImage, breadcrumbs } = pageContext

    const { t } = useTranslation()
    const mode          = 'dark'
    const contentMode   = 'light'
    
    return (
        <>

            <HeaderPage 
                title       = { t('global.news.title') + ' | ' + title }
                location    = { location } 
                className   = 'newsCampus'
                mode        = { contentMode }
                cover       = { 
                                (featuredImage?.node?.localFile) ?
                                    featuredImage.node.localFile.childImageSharp.gatsbyImageData.images.fallback.src
                                : 
                                    undefined 
                                }
                description = { t('global.news.description') }
            />
            
            <Navigation
                location        = { location }
                campus          = { breadcrumbs.campus }
                searchIndices   = { useGlobalIndeces() }
                mode            = { mode }
                menuGlobal
                menuLocal
            />
            
            <MenuPage
                mode        = { mode }
                menuBrand   =   { 
                                    {
                                        'name': t('global.blog.title'),
                                        'link': '/' + breadcrumbs.campus + '/' + config.blogPostDetailsSlug,
                                    }
                                } 
                menu        =   { 
                                    [
                                        {
                                            name: t('global.news.title'), 
                                            link: '/' + breadcrumbs.campus + '/' + config.newsPostDetailsSlug, 
                                            as: '', 
                                            target: ''
                                        }
                                    ]
                                }
            />

            <section className = {`content ${ contentMode ? contentMode : 'light' }`}>
                <Container className='mt-3 mb-3'>
                    <Row>
                        <Col xs={12} md={8}>
                            {
                                ( data.news?.nodes.length > 0 ) ?
                                    data.news.nodes.map( ( news, index ) => (
                                        <BlurbHorizontal 
                                            key             = { index }
                                            className       = { 'mb-4' }
                                            featuredImage   =   {  
                                                                    ( news.featuredImage?.node?.localFile ) ? 
                                                                        news.featuredImage.node.localFile.childImageSharp.gatsbyImageData
                                                                    : 
                                                                        undefined    
                                                                }
                                            mode            = { contentMode }
                                            title           = { news.title }
                                            subtitle        = { getDate(news.modified.toString(), 2, 'us', 'LLLL d, yyyy' ) }
                                            tags            =   { 
                                                                    ( news.tags?.nodes ) ? 
                                                                        news.tags 
                                                                    : 
                                                                        undefined  
                                                                }
                                            link            = { `/${breadcrumbs.campus}/${config.newsPostDetailsSlug}/${news.slug}` }
                                            linkText        = { news.title }
                                            excerpt         = { news.excerpt }
                                        />
                                    ))
                                :
                                    <AlertEmptyState mode = { mode } className='mt-5' content='' />
                            }
                        </Col>
                    </Row>
                </Container>
            </section>
            
            <FooterSimpleText 
                campus = { breadcrumbs.campus } 
                mode   = { contentMode }
            />

        </>
    )
}


export const query = graphql`
    query news ( $campusId: String! ) {

        news: allWpNewspost(
            filter: {
                status: {
                    eq: "publish"
                },
                newsDetails: {
                    newsCampusId: {regex: $campusId}
                }
                
            },
            sort: {
                fields: modified, 
                order: DESC
            }
            limit: 12
        ) {
            nodes{
                id
                title
                excerpt
                slug
                date(formatString: "YYYYMMDD")
                modified(formatString: "YYYYMMDD")
                featuredImage {
                    node {
                        localFile {
                            childImageSharp {
                                gatsbyImageData(layout: FULL_WIDTH)
                            }
                        }
                    }
                }
                tags {
                    nodes {
                        slug
                        name
                    }
                }
            }
        }
    }
`