import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useGlobalIndeces } from '../../../hooks/useGlobalIndeces'
import { useTheme } from '../../../hooks/useTheme'
import FooterSimpleText from '../../footer/footerSimpleText'
import HeroDynamic from '../../hero/heroDynamic'
import Navigation from '../../menu/navigation'
import PageHeader from '../../pageHeader'

import './attachmentDetails.scss'

export default function AttachmentDetails ( { location, pageContext } ) {
    
    const { title, excerpt, breadcrumbs, attachmentDetails } = pageContext
    
    const { t } = useTranslation()

    const theme         = useTheme()
    const contentMode   = 'light'

    return (
        <div className={'attachmentDetails'}>

            <PageHeader 
                title       = { title + ' | ' + t('global.attachment.title-alt') } 
                location    = { location } 
                description = { excerpt }
                article     = { false }
                className   = 'groupsCampus'
                mode        = { contentMode }
                metaTags    =   {{
                                    noIndex: ( typeof attachmentDetails.attachmentHide?.attachmentHideSearchEngines === 'undefined' ) ? 
                                                    false : (attachmentDetails.attachmentHide?.attachmentHideSearchEngines === true ) ? true : false,
                                }}
            />
            
            <Navigation
                location        = { location }
                campus          = { breadcrumbs.campus }
                searchIndices   = { useGlobalIndeces() }
                mode            = { theme.styles.header }
                menuGlobal
                menuLocal
            />

            <main className='main contentMain'>

                <HeroDynamic
                    id              = { 'hero' }
                    className       = { 'download z-index-0' }
                    titleClassName  = { 'display-4' }
                    mode            = { contentMode }
                    width           = { 'fullwidth' }
                    title           = { title }
                    size            = { 'md' }
                    backgroundPhoto = { undefined }
                    location        = { location }
                    overlay         = {true}
                >
                    <h4>{title}</h4>
                    <p>
                        {excerpt.replace(/<p>/, '').replace(/<\/p>/, '')}
                    </p>
                    {
                        attachmentDetails.attachmentFile?.localFile ?
                            <a  href        = { attachmentDetails.attachmentFile.localFile.publicURL } 
                                target      = '_blank' 
                                rel         = 'noreferrer' 
                                className   = {`user-select-none ${ contentMode ? 'btn '+ 'btn-' + contentMode : 'btn btn-light' }`}
                                title       = { title } 
                            >
                                <FontAwesomeIcon icon={faCloudDownloadAlt} size='lg' />{t('global.attachments.download')}
                            </a>
                        :
                            <>{t('global.no-records')}</>
                    }
                </HeroDynamic>

            </main>

            <FooterSimpleText 
                campus  = { breadcrumbs.campus } 
                mode    = { theme.styles.footer }
            />

        </div>
    )
}