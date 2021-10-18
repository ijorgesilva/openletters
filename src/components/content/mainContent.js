import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { getDate } from '../utils/utils'
import config from '../../../data/SiteConfig'

export default function MainContent ( { date, modified, content } ) {

    
    const { t } = useTranslation()
    
    const htmlDate = (modified) ? getDate(modified,2,'us','yyyy-MM-dd' ) : getDate(date,2,'us','yyyy-MM-dd' )
    const createdDate = getDate(date,2,'us','LLLL d, yyyy' )
    const modifiedDate = getDate(modified,2,'us','LLLL d, yyyy' )

    return (

        <article className='contentMain mb-5'>
            <Container className='mt-5'>
                <Row>
                    <Col>
                        <div className='watchLeft sticky'>
                        </div>
                    </Col>
                    <Col className='' xs={12} md={8}>
                        <div dangerouslySetInnerHTML={{__html: content}}></div>
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
    )
}