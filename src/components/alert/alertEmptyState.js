import React from 'react'
import { Alert } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

export default function AlertEmptyState ( { mode, className, content } ) {
    
    const { t } = useTranslation()

    return (
        <Alert variant={ mode ? mode : 'transparent' } className={`${className}`}>
            {
                content ?
                    <>{content}</>
                :
                    <>{t('global.no-records')}</>
            }
        </Alert>
    )
}