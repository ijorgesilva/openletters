import React, { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import config from '../../../../data/SiteConfig'
import HeroPost from '../../../components/hero/heroPost'
import FooterSimpleText from '../../footer/footerSimpleText'
import HeaderPage from '../../headerPage'
import MenuPage from '../../menu/menuPage'
import Navigation from '../../menu/navigation'
import TagSimple from '../../tag/tagSimple'
import ToolbarDetails from '../../toolbar/toolbarDetails'
import { getDate } from '../../utils/utils'
import './eventDetails.scss'

export default function EventDetails( { pageContext, location } ){
    
    const { title, excerpt, date, modified, featuredImage, content, tags, eventDetails, breadcrumbs } = pageContext

    const { t } = useTranslation()
    const mode          = 'dark'
    const contentMode   = 'light'

    const [copySuccessTime, setCopySuccessTime] = useState('')
    const copyToClipBoardTime = async copyMe => {
        try {
          await navigator.clipboard.writeText(copyMe)
          setCopySuccessTime('Copied!')
        } catch (err) {
            setCopySuccessTime('Failed to copy!')
        }
    }

    const [copySuccess, setCopySuccess] = useState('')
    const copyToClipBoard = async copyMe => {
        try {
          await navigator.clipboard.writeText(copyMe)
          setCopySuccess(t('global.copied'))
        } catch (err) {
          setCopySuccess(t('global.copied-failed'))
        }
    }

    const htmlDate = ( modified ) ? 
                        getDate(modified,2,'us','yyyy-MM-dd' ) 
                    : 
                        getDate(date,2,'us','yyyy-MM-dd' )
    const createdDate = getDate(date,2,'us','LLLL d, yyyy' )
    const modifiedDate = getDate(modified,2,'us','LLLL d, yyyy' )
    
    const cover = ( featuredImage?.node?.localFile?.localFile ) ?
                        featuredImage.node.localFile.localFile.childImageSharp.gatsbyImageData.images.fallback.src
                    :
                        undefined

    const searchIndices = [{ name: `vod`, title: `Messages` }, { name: `pages`, title: `Pages`} ]
    
    return (
        <>
            <HeaderPage 
                title       = { title + ' | ' + t('global.events.title') }
                location    = { location }
                className   = 'eventDetails'
                mode        = { contentMode }
                cover       = { cover }
                description = { ( excerpt ) ? excerpt : excerpt}
                article     = { true }
                // TODO: Incorporate meta tags into header
                // metaTags    =   {{
                //                     noIndex: ( typeof eventDetails.eventHide?.eventHideSearchEngines === 'undefined' ) ? 
                //                                     false : (eventDetails.eventHide?.eventHideSearchEngines === true ) ? true : false,
                //                 }}
            />
            
            <Navigation
                location        = { location }
                campus          = { breadcrumbs.campus }
                searchIndices   = { searchIndices }
                mode            = { mode }
                menuGlobal
                menuLocal
            />
            
            <MenuPage
                mode        = { mode }
                close       = { '/' + breadcrumbs.campus + '/' +  config.eventPostDetailsSlug }
                menuBrand   =   { 
                                    {
                                        'name': t('global.events.title'),
                                        'link': '/' + breadcrumbs.campus + '/' + config.eventPostDetailsSlug,
                                    }
                                } 
                menu        =   { 
                                    [
                                        
                                    ]
                                }
            />
            
            <main className=''>

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
                                {
                                    ( eventDetails.eventLink.eventLinkText && eventDetails.eventLink.eventLinkUrl ) ?
                                        <div className = 'register'>
                                            <Button 
                                                className   = {`btn btn-${ mode === 'light' ? 'outline-primary' : mode === 'dark' ? 'outline-primary' : mode } btn-lg`}
                                                variant = { 'transparent' }
                                                href={eventDetails.eventLink.eventLinkUrl} 
                                                target='_blank'
                                            >
                                                {eventDetails.eventLink.eventLinkText}
                                            </Button>
                                        </div>
                                    : 
                                        undefined
                                }
                                <div className = 'details'>
                                    {
                                        ( eventDetails.eventDates.length > 0 ) ?
                                            <div  onClick={() => copyToClipBoardTime( getDate(eventDetails.eventDates[0].eventDate,2,'us','LLLL d, yyyy' ) + '. ' + eventDetails.eventDates[0].eventTime )}>
                                                <h6>{t('global.events.date-time')}</h6>
                                                {
                                                    eventDetails.eventDates.map( (date, index) => (
                                                        <span key={index}>
                                                            <time dateTime={getDate(date.eventDate,2,'us','yyyy-MM-dd' )}> 
                                                                {getDate(date.eventDate,2,'us','LLLL d, yyyy' )} {date.eventTime}
                                                            </time> 
                                                        </span>
                                                    ))
                                                }
                                                {  
                                                    copySuccessTime ? 
                                                        <span className = 'badge badge-pill badge-secondary ml-2 copy'>{copySuccessTime}</span>
                                                    : undefined
                                                }
                                            </div>
                                        : 
                                            undefined
                                    }
                                    {
                                        ( eventDetails.eventAddress ) ?
                                            <div onClick={() => copyToClipBoard(eventDetails.eventAddress)}>
                                                <h6>
                                                    {t('global.events.location')} 
                                                </h6>
                                                <span>{eventDetails.eventAddress}</span>
                                                {  
                                                    copySuccess ? 
                                                        <span className = 'badge badge-pill badge-secondary ml-2 copy '>{copySuccess}</span>
                                                    : undefined
                                                }
                                            </div>
                                        :
                                            undefined
                                    }
                                    {
                                        (eventDetails.eventCampus) ? 
                                            <div>
                                                <h6>{t('global.events.organized-by')}</h6>
                                                {
                                                    eventDetails.eventCampus.map ( (campus, index) => (
                                                        <span key={index} className='user-select-none d-block'>
                                                            {campus.title}
                                                        </span>
                                                    ))
                                                }
                                            </div> 
                                        : 
                                            undefined
                                    }
                                </div>
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
                            </div>
                        </Col>

                        <Col className='content' xs={12} md={7}>
                            <div dangerouslySetInnerHTML={{__html: content}}>
                            </div>
                            
                            <TagSimple 
                                items   = { tags }
                                mode    = { contentMode }
                            />
                            
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </Container>

            </main>

            <FooterSimpleText 
                campus  = { breadcrumbs.campus } 
                mode    = { contentMode }
                />
        </>
    )
}