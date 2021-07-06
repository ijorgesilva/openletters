// Dependencies
import React from 'react'
import { useTranslation } from "react-i18next"

// Style
import './youVersion.scss'

export default function YouVersion ( { id, className, title, bibleUrl } ) {

    /* Standard fields */
    const { t } = useTranslation()

    return (
        <div className="youversion">
            <iframe 
                id          = {`${ (id) ? id : ''}`}
                className   = {`${ (className) ? className : ''}`}
                title       = {`${ (title) ? title : 'YouVersion'}`}
                src         = {`${ (bibleUrl) ? bibleUrl : t('global.bible.youversion-default') }`}
                frameborder="0"
            >
            </iframe>
        </div>
    )
}