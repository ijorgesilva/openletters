
import React from 'react'
import { Container, Alert } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'



export default function AlertEmptyState ( { mode, className, content } ) {

    
    const { t } = useTranslation()

    return (
        <Container fluid>
            <Alert variant={ mode ? mode : 'transparent' } className={`${className}`}>
                {
                    (content) ?
                        <>{content}</>
                    :
                        <>{t('global.no-records')}</>
                }
            </Alert>
        </Container>
    )
}