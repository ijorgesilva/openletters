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

import './ministryCampus.scss'

export default function MinistryCampus ( 
    { 
        data, 
        location, 
        pageContext 
    } 
){

    const { title, featuredImage, breadcrumbs } = pageContext

    const { t } = useTranslation()
    const mode          = 'dark'
    const contentMode   = 'light'
    
    return (
        <>

            <HeaderPage 
                title       = { t('global.ministry.title') + ' | ' + title }
                location    = { location } 
                className   = 'ministryCampus'
                mode        = { contentMode }
                cover       = { 
                                featuredImage?.node?.localFile ?
                                    featuredImage.node.localFile.childImageSharp.gatsbyImageData.images.fallback.src
                                : 
                                    undefined 
                                }
                description = { t('global.ministry.description') }
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
                                        'name': t('global.ministry.title-plural'),
                                        'link': '/' + breadcrumbs.campus + '/' + config.ministrySlug,
                                    }
                                } 
                menu        =   { 
                                    [
                                        
                                    ]
                                }
            />

            <section className = {`content ${ contentMode ? contentMode : 'light' }`}>
                <Container className='mt-3 mb-3'>
                    <Row>
                        <Col xs={12} md={8}>
                            {
                                ( data.ministries?.nodes.length > 0 ) ?
                                    data.ministries.nodes.map( ( _, index ) => (
                                        <BlurbHorizontal 
                                            key             = { index }
                                            className       = { '' }
                                            featuredImage   =   {  
                                                                    _.featuredImage?.node ? 
                                                                        _.featuredImage.node.localFile.childImageSharp.gatsbyImageData
                                                                    : 
                                                                        undefined    
                                                                }
                                            mode            = { contentMode }
                                            title           = { _.title }
                                            subtitle        = { '' }
                                            tags            =   { 
                                                                    _.tags?.nodes ? 
                                                                        _.tags 
                                                                    : 
                                                                        undefined  
                                                                }
                                            link            = { `/${breadcrumbs.campus}/${config.ministrySlug}/${_.slug}` }
                                            linkText        = { _.title }
                                            excerpt         = { _.excerpt }
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
    query ministries ( $campusId: String! ) {
        ministries: allWpMinistry(
            filter: {
                status: {
                    eq: "publish"
                },
                general: {
                    campusId: {regex: $campusId}
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
                slug
                date(formatString: "YYYYMMDD")
                modified(formatString: "YYYYMMDD")
                general {
                    summary
                    featuredPhoto {
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