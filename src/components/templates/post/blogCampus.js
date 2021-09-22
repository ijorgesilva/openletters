
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { graphql } from 'gatsby'


import AlertEmptyState from '../../alert/alertEmptyState'
import Navigation from '../../menu/navigation'
import { getDate } from '../../utils/utils'
import BlurbHorizontal from '../../blurb/blurbHorizontal'
import MenuPage from '../../menu/menuPage'
import HeaderPage from '../../headerPage'
import FooterSimpleText from '../../footer/footerSimpleText'
import config from '../../../../data/SiteConfig'
import './blogCampus.scss'


import { useGlobalIndeces } from '../../../hooks/useGlobalIndeces'

export default function BlogCampus ( { data, location, pageContext } ){

    const { title, slug, featuredImage, breadcrumbs } = pageContext

    const { t } = useTranslation()
    const mode          = 'dark'
    const contentMode   = 'light'
    
    return (
        <>

            <HeaderPage 
                title       = { t('global.blog.title') + ' | ' + title }
                location    = { location } 
                className   = 'blogCampus'
                mode        = { contentMode }
                cover       = { 
                                (featuredImage?.node?.localFile) ?
                                    featuredImage.node.localFile.childImageSharp.gatsbyImageData.images.fallback.src
                                : 
                                    undefined 
                                }
                description = { t('global.blog.description') }
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
                                        'link': breadcrumbs.rootApp,
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
                                ( data.posts?.nodes.length > 0 ) ?
                                    data.posts.nodes.map( ( post, index ) => (
                                        <BlurbHorizontal 
                                            key             = { index }
                                            className       = { 'mb-4' }
                                            featuredImage   =   {  
                                                                    ( post.featuredImage?.node?.localFile ) ? 
                                                                        post.featuredImage.node.localFile.childImageSharp.gatsbyImageData
                                                                    : 
                                                                        undefined    
                                                                }
                                            mode            = { contentMode }
                                            title           = { post.title }
                                            subtitle        = { getDate(post.modified.toString(), 2, 'us', 'LLLL d, yyyy' ) }
                                            tags            =   { 
                                                                    ( post.tags.nodes ) ? 
                                                                        post.tags 
                                                                    : 
                                                                        undefined  
                                                                }
                                            link            = { `/${breadcrumbs.campus}/${config.blogPostDetailsSlug}/${post.slug}` }
                                            linkText        = { post.title }
                                            excerpt         = { post.excerpt }
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
                mode    = { contentMode }
                campus  = { breadcrumbs.campus } 
            />
            
        </>
    )
}

export const query = graphql`
    query posts ( $campusId: String! ) {

        posts: allWpPost(
            filter: {
                status: {
                    eq: "publish"
                },
                postDetails: {
                    postCampusId: {regex: $campusId}
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