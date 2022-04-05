import React from 'react'
import { Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import sanitizeHtml from 'sanitize-html'

import './sectionSeriesDescription.scss'

export default function SectionSeriesDescription ( { excerpt, className, id, mode, width } ) {

    const { t } = useTranslation()
    
    return (
        <section 
            className={`sectionSeriesDescription ${ mode ? mode : 'light'} ${ className ? className : ''}`} 
            id = { id } 
        >
            <Container fluid = { width === 'container' ? undefined : true }>
                {
                    ( excerpt ) ?
                        <>
                            <h4>{ t('global.watch.about-series') }</h4> 
                            <p>
                                { sanitizeHtml(excerpt).replace( /(<([^>]+)>)/ig, '') }
                            </p>
                        </>
                    :
                        undefined
                }
            </Container>
        </section>
    )
}