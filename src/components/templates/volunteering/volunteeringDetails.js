import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import config from '../../../../data/SiteConfig'
import { useGlobalIndeces } from '../../../hooks/useGlobalIndeces'
import { useTheme } from '../../../hooks/useTheme'
import FooterSimpleText from '../../footer/footerSimpleText'
import HeaderPage from '../../headerPage'
import HeroDynamic from '../../hero/heroDynamic'
import MenuPage from '../../menu/menuPage'
import Navigation from '../../menu/navigation'
import ToolbarDetails from '../../toolbar/toolbarDetails'
import { getDate } from '../../utils/utils'

import './volunteeringDetails.scss'

export default function VolunteeringDetails( { pageContext, location } ){

    const { t } = useTranslation()
    const theme         = useTheme()
    const contentMode   = 'light'
        
    const { title, excerpt, date, modified, breadcrumbs, general, postContent, serveDetails } = pageContext

    const htmlDate = modified ? getDate( modified, 2, config.dateLocale, 'yyyy-MM-dd' ) : getDate( date, 2, config.dateLocale, 'yyyy-MM-dd' )
    const createdDate = getDate( date, 2, config.dateLocale, config.dateFormat )
    const modifiedDate = getDate( modified, 2, config.dateLocale, config.dateFormat )
    
    return (
        <>
            {/* TODO: Add Control Visibility */}
            <HeaderPage 
                title       = { title + ' | ' + t('global.volunteering.title') }
                location    = { location } 
                cover       = { general.featuredPhoto?.localFile.childImageSharp.gatsbyImageData.images.fallback.src }
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
                close       = { '/' + breadcrumbs.campus + '/' +  config.volunteeringSlug }
                menuBrand   =   { 
                                    {
                                        'name': t('global.volunteering.title-plural'),
                                        'link': '/' + breadcrumbs.campus + '/' + config.volunteeringSlug,
                                    }
                                } 
                menu        =   { 
                                    [
                                    ]
                                }
            />

            <article className='contentMain mb-3'>

                <HeroDynamic
                    id              = { 'hero' }
                    className       = { 'z-index-0' }
                    titleClassName  = { 'display-4' }
                    mode            = { theme.styles.header }
                    width           = { 'fullwidth' }
                    title           = { title }
                    size            = { 'md' }
                    backgroundPhoto = { general.featuredPhoto?.localFile.childImageSharp.gatsbyImageData }
                    location        = { location }
                    overlay         = { true }
                />

                <ToolbarDetails 
                    location    = { location } 
                    mode        = { contentMode } 
                /> 
                
                <Container className='mt-3'>
                    <Row>
                        <Col>
                        </Col>
                        <Col className='' xs={12} md={8}>
                            
                            <p className='lead' dangerouslySetInnerHTML={{__html: general.summary}}></p>

                            <div className='' dangerouslySetInnerHTML={{__html: postContent.content}}></div>

                            {
                                config.blogShowDates ?
                                    <div className='createdDate user-select-none'>
                                        <small>
                                            {
                                                modifiedDate ? 
                                                    <time className = 'text-muted' dateTime={htmlDate}> {t('global.modified-on')} {modifiedDate} </time> 
                                                : 
                                                    <time className = 'text-muted' dateTime={htmlDate}> {t('global.created-on')} {createdDate} </time>
                                            }
                                        </small>
                                    </div>
                                :
                                    undefined
                            }
                        </Col>
                        <Col>
                            <div className='sticky text-muted'>
                                {
                                    serveDetails.volunteerRelatedMinistry?.length ?
                                        <dl>
                                            <dt className='pb-1 user-select-none'>
                                                {
                                                    serveDetails.volunteerRelatedMinistry?.length > 0 ?
                                                        t('global:global.ministry.related-ministries')
                                                    : 
                                                        t('global:global.ministry.related-ministry')
                                                }
                                            </dt>
                                            <dd className=''>
                                                {
                                                    serveDetails.volunteerRelatedMinistry.map( (_, index) => (
                                                        _.status === 'publish' ?
                                                            <>
                                                                <a key = {index} href = {`/${breadcrumbs.campus}/${config.ministrySlug}/${_.slug}`} 
                                                                    className='text-muted'>
                                                                    {_.title}
                                                                </a>
                                                                {
                                                                    index + 1 < serveDetails.volunteerRelatedMinistry.length ? ', ' : ''
                                                                }
                                                            </>
                                                        : undefined
                                                    ))
                                                }
                                            </dd>
                                        </dl>
                                    : undefined
                                }
                            </div>
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