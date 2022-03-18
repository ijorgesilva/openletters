import React, { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import config from '../../../../../data/SiteConfig'
import HeroDynamic from '../../../hero/heroDynamic'
import RenderSection from '../../../renderSection'
import TagSimple from '../../../tag/tagSimple'
import ToolbarDetails from '../../../toolbar/toolbarDetails'
import { getDate } from '../../../utils/utils'
import '../eventDetails.scss'

export default function DefaultLayoutDetails ( 
    { 
        title, 
        date, 
        modified, 
        featuredImage, 
        content, 
        tags, 
        eventDetails, 
        location,
        mode,
        sections,
        campus,
    } 
){

    const { t } = useTranslation()

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

    const htmlDate = modified ? getDate(modified,2, config.dateLocale, 'yyyy-MM-dd' ) : getDate(date, 2, config.dateLocale, 'yyyy-MM-dd' )
    const createdDate = getDate(date, 2, config.dateLocale, config.dateFormat )
    const modifiedDate = getDate(modified, 2, config.dateLocale, config.dateFormat )
    
    return (
            
        <main className=''>

            <HeroDynamic
                id              = { 'hero' }
                className       = { 'z-index-0' }
                titleClassName  = { 'display-4' }
                mode            = { mode }
                width           = { 'fullwidth' }
                title           = { title }
                size            = { 'xl' }
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
                mode        = { mode } 
            /> 

            <Container className='mt-3 mb-3'>
                <Row>
                    {/* LEFT COLUMN */}
                    <Col>
                        <div className='leftColumn sticky'>
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
                                    eventDetails.eventDates.length > 0 ?
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
                                    eventDetails.eventAddress ?
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
                                    eventDetails.eventCampus ? 
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
                        </div>
                    </Col>

                    {/* MAIN COLUMN */}
                    <Col className='content' xs={12} md={7}>
                        <div dangerouslySetInnerHTML={{__html: content}}>
                        </div>
                        
                        <TagSimple 
                            items   = { tags }
                            mode    = { mode }
                        />    
                    </Col>

                    {/* RIGHT COLUMN */}
                    <Col>
                    </Col>

                </Row>
            </Container>

            {
                sections ?
                    sections.map( ( section, index ) => (
                        <RenderSection 
                            key         = { index }
                            section     = { section }
                            campus      = { `/${campus}/` }
                            filter      = { {campus: campus } }
                            location    = { location }
                        />
                    ))
                :
                    undefined
            }
        </main>
    )
}