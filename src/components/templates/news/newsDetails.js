import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import config from '../../../../data/SiteConfig'
import { useGlobalIndeces } from '../../../hooks/useGlobalIndeces'
import { useTheme } from '../../../hooks/useTheme'
import FooterSimpleText from '../../footer/footerSimpleText'
import HeroDynamic from '../../hero/heroDynamic'
import MenuPage from '../../menu/menuPage'
import Navigation from '../../menu/navigation'
import PageHeader from '../../pageHeader'
import TagSimple from '../../tag/tagSimple'
import ToolbarDetails from '../../toolbar/toolbarDetails'
import { getDate } from '../../utils/utils'

import './newsDetails.scss'

export default function NewsDetails( { pageContext, location } ){

    const { t } = useTranslation()
    const theme         = useTheme()
    const contentMode   = 'light'
        
    const { title, excerpt, date, modified, featuredImage, content, terms, breadcrumbs } = pageContext

    const htmlDate = modified ? getDate(modified,2, config.dateLocale, 'yyyy-MM-dd' ) : getDate(date, 2, config.dateLocale, 'yyyy-MM-dd' )
    const createdDate = getDate(date, 2, config.dateLocale, config.dateFormat )
    const modifiedDate = getDate(modified, 2, config.dateLocale, config.dateFormat )

    const cover =   featuredImage?.node?.localFile?.localFile ?
                        featuredImage.node.localFile.localFile.childImageSharp.gatsbyImageData.images.fallback.src
                    :
                        undefined
    
    return (
        <>

            <PageHeader 
                title       = { title + ' | ' + t('global.blog.title') }
                location    = { location } 
                cover       = { cover }
                description = { excerpt ? excerpt : excerpt}
                article     = { true }
                mode        = { contentMode }
            />
            
            <Navigation
                mode            = { theme.styles.header }
                location        = { location }
                campus          = { breadcrumbs.campus }
                searchIndices   = { useGlobalIndeces() }
                menuGlobal
                menuLocal
            />
            
            <MenuPage
                mode        = { theme.styles.header }
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

                <HeroDynamic
                    id              = { 'hero' }
                    className       = { 'z-index-0' }
                    titleClassName  = { 'display-4' }
                    mode            = { contentMode }
                    width           = { 'fullwidth' }
                    title           = { title }
                    size            = { 'md' }
                    backgroundPhoto =   {
                                            featuredImage ? 
                                                featuredImage.node.localFile.childImageSharp.gatsbyImageData
                                            : 
                                                undefined
                                        }
                    location        = { location }
                    overlay         = { true }
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
                                terms ?
                                    <TagSimple 
                                        items   = { terms } 
                                        mode    = { contentMode }
                                    />
                                :
                                    undefined
                            }
                            {
                                config.blogShowDates ?
                                    <div className='createdDate user-select-none'>
                                        { 
                                            modifiedDate ? 
                                                <time className = 'text-muted' dateTime={htmlDate}> {t('global.modified-on')} {modifiedDate} </time> 
                                            : 
                                                <time className = 'text-muted' dateTime={htmlDate}> {t('global.created-on')} {createdDate} </time>
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
                mode    = { theme.styles.footer }
            />
            
        </>
    )
}