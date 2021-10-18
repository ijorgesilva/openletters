import React from 'react'
import { useTranslation } from 'react-i18next'

import FollowNetworks from './followNetworks'

export default function FollowNetworkLists ( 
    {
        items,
        mode,
        alignment,
    } 
    ) {

    const { t } = useTranslation()
    
    return (
        <div 
            className   = {`followNetworkLists ${ mode ? mode : 'light' } noselect`} 
            style       = {{ justifyContent: alignment }} 
        >
            <span>{t('components.social.share-on')}</span>
            <div className = 'list'  style = {{ justifyContent: alignment }} >
                {
                    ( items?.length > 0 ) ?
                        items.map( ( _, index ) => (
                            <FollowNetworks 
                                key         = { index }
                                type        = { _.type }
                                params      = { _.params }
                                mode        = { mode }
                            />
                        ))
                    :
                        undefined
                }
            </div>
        </div>
    )
}