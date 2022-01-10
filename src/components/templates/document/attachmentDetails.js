import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useTranslation } from 'react-i18next'

import HeroPost from '../../../components/hero/heroPost'
import { useGlobalIndeces } from '../../../hooks/useGlobalIndeces'
import FooterSimpleText from '../../footer/footerSimpleText'
import HeaderPage from '../../headerPage'
import Navigation from '../../menu/navigation'

import './attachmentDetails.scss'

export default function AttachmentDetails ( { location, pageContext } ) {
    
    const { title, excerpt, breadcrumbs, attachmentDetails } = pageContext
    
    const { t } = useTranslation()

    const mode          = 'dark'
    const contentMode   = 'light'

    return (
        <div className={'attachmentDetails'}>

            <HeaderPage 
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
                mode            = { mode }
                menuGlobal
                menuLocal
            />

            <main className='main contentMain'>

                <HeroPost 
                    className       = 'download z-index-0'
                    excerpt         = { excerpt }
                >
                    <h4>{title}</h4>
                    <p>
                        {excerpt.replace(/<p>/, '').replace(/<\/p>/, '')}
                    </p>
                    {
                        ( attachmentDetails.attachmentFile?.localFile ) ?
                            <a 
                                className   = 'button button--animation button--three button button-none' 
                                href        = { attachmentDetails.attachmentFile.localFile.publicURL } 
                                title       = { title } 
                                rel         = 'noreferrer' 
                                target      = '_blank'
                            >
                                <h6>
                                    <FontAwesomeIcon icon={faCloudDownloadAlt} size='lg' />
                                    <div>{t('global.attachments.download')}</div>
                                </h6>
                            </a>
                        :
                            <>{t('global.no-records')}</>
                    }
                </HeroPost>

            </main>

            <FooterSimpleText 
                campus  = { breadcrumbs.campus } 
                mode    = { contentMode }
            />

        </div>
    )
}