// Dependencies
import React from 'react'
import { Container, Alert } from 'react-bootstrap'
import { useTranslation } from "react-i18next"

// Components

export default function AlertEmptyState ( {variant, className, content} ) {

    /* Standard fields */
    const { t } = useTranslation()

    return (
        <Container fluid>
            <Alert variant={ (variant) ? variant : 'dark' } className={`${className}`}>
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