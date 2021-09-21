
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'


import { getDate } from '../../utils/utils'
import Navigation from '../../menu/navigation'
import HeroPost from '../../../components/hero/heroPost'
import HeaderPage from '../../headerPage'
import TagSimple from '../../tag/tagSimple'
import ToolbarDetails from '../../toolbar/toolbarDetails'
import MenuPage from '../../menu/menuPage'
import FooterSimpleText from '../../footer/footerSimpleText'
import config from '../../../../data/SiteConfig'


import { useGlobalIndeces } from '../../../hooks/useGlobalIndeces'


import './newsDetails.scss'

export default function NewsDetails( { pageContext, location } ){

    const { t } = useTranslation()
    const mode          = 'dark'
    const contentMode   = 'light'
        
    const { title, excerpt, date, modified, featuredImage, content, terms, breadcrumbs } = pageContext

    const htmlDate = (modified) ? getDate(modified,2,'us','yyyy-MM-dd' ) : getDate(date,2,'us','yyyy-MM-dd' )
    const createdDate = getDate(date,2,'us','LLLL d, yyyy' )
    const modifiedDate = getDate(modified,2,'us','LLLL d, yyyy' )

    const cover = ( featuredImage?.node?.localFile?.localFile ) ?
                        featuredImage.node.localFile.localFile.childImageSharp.gatsbyImageData.images.fallback.src
                    :
                        undefined
    
    return (
        <>

            <HeaderPage 
                title       = { title + ' | ' + t('global.blog.title') }
                location    = { location } 
                cover       = { cover }
                description = { ( excerpt ) ? excerpt : excerpt}
                article     = { true }
                mode        = { contentMode }
            />
            
            <Navigation
                mode            = { mode }
                location        = { location }
                campus          = { breadcrumbs.campus }
                searchIndices   = { useGlobalIndeces() }
                menuGlobal
                menuLocal
            />
            
            <MenuPage
                mode        = { mode }
                close       = { '/' + breadcrumbs.campus + '/' +  config.newsPostDetailsSlug }
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

            <article className='contentMain mb-5'>

                <HeroPost 
                    mode            = { contentMode }
                    title           = { title }
                    backgroundPhoto =   {
                                            ( featuredImage ) ? 
                                                featuredImage.node.localFile.childImageSharp.gatsbyImageData
                                            : 
                                                undefined
                                        }
                    className       = 'z-index-0'
                    size            = 'sm'
                />

                <ToolbarDetails 
                    location    = { location } 
                    mode        = { contentMode } 
                /> 
                
                <Container className='mt-5'>
                    <Row>
                        <Col>
                            <div className='watchLeft sticky'>
                            </div>
                        </Col>
                        <Col className='' xs={12} md={8}>
                            <div dangerouslySetInnerHTML={{__html: content}}></div>
                            {
                                ( terms ) ?
                                    <TagSimple 
                                        terms   = { terms } 
                                        mode    = { contentMode }
                                    />
                                :
                                    undefined
                            }
                            {
                                ( config.blogShowDates ) ?
                                    <div className='createdDate user-select-none'>
                                        { 
                                            (modifiedDate) ? 
                                                <time dateTime={htmlDate}> {t('global.modified-on')} {modifiedDate} </time> 
                                            : 
                                                <time dateTime={htmlDate}> {t('global.created-on')} {createdDate} </time>
                                        }
                                    </div>
                                :
                                    undefined
                            }
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </Container>

            </article>

            <FooterSimpleText 
                campus  = { breadcrumbs.campus }
                mode    = { contentMode }
            />
            
        </>
    )
}