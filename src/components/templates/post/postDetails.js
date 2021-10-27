import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import config from '../../../../data/SiteConfig'
import HeroPost from '../../../components/hero/heroPost'
import { useGlobalIndeces } from '../../../hooks/useGlobalIndeces'
import FooterSimpleText from '../../footer/footerSimpleText'
import HeaderPage from '../../headerPage'
import MenuPage from '../../menu/menuPage'
import Navigation from '../../menu/navigation'
import TagSimple from '../../tag/tagSimple'
import ToolbarDetails from '../../toolbar/toolbarDetails'
import { getDate } from '../../utils/utils'

import './postDetails.scss'

export default function PostDetails( { location, pageContext } ){
    
    const { title, excerpt, date, modified, featuredImage, content, terms, postDetails, breadcrumbs } = pageContext

    const { t } = useTranslation()
    const mode          = 'dark'
    const contentMode   = 'light'
    
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
                mode        = { contentMode }
                cover       = { cover }
                description = { ( excerpt ) ? excerpt : excerpt}
                article     = { true }
                metaTags    =   {{
                                    noIndex: ( typeof postDetails.postHide?.postHideSearchEngines === 'undefined' ) ? 
                                                    false : (postDetails.postHide?.postHideSearchEngines === true ) ? true : false,
                                }}
            />
            
            <Navigation
                location        = { location }
                campus          = { breadcrumbs.campus }
                mode            = { mode }
                searchIndices   = { useGlobalIndeces() }
                menuGlobal
                menuLocal
            />
            
            <MenuPage
                mode        = { mode }
                close       = { '/' + breadcrumbs.campus + '/' +  config.blogPostDetailsSlug }
                menuBrand   =   { 
                                    {
                                        name: t('global.blog.title'),
                                        link: breadcrumbs.rootApp,
                                    }
                                }
                menu        =   { 
                                    [
                                        {
                                            name: t('global.news.title'), 
                                            link: '/' + breadcrumbs.campus + '/' + config.newsPostDetailsSlug, 
                                            as: '', 
                                            target: '',
                                        }
                                    ]
                                }
            />

            <article className='contentMain mb-5'>
                <HeroPost 
                    mode            = { contentMode }
                    title           = { title }
                    backgroundPhoto =   {
                                            ( featuredImage?.node?.localFile ) ? 
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
                            <div className='authors'>
                                {   
                                    (postDetails.postAuthor) ?
                                        postDetails.postAuthor.map( (author, index) => (
                                                <div key = { index } className = 'author'>
                                                    {
                                                        (author.featuredImage) ? 
                                                            <></>
                                                        : 
                                                            undefined
                                                    }
                                                    <address className='author' key={index}>{author.title}</address>
                                                </div>
                                        ))
                                    : 
                                        undefined
                                }
                            </div>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </Container>

            </article>

            <FooterSimpleText 
                campus = { breadcrumbs.campus } 
                mode   = { contentMode }
            />
            
        </>
    )
}