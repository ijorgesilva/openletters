import React from 'react'
import { useTranslation } from 'react-i18next'

import componentConf from '../../../../data/defaultComponentConf'
import BlurbVertical from '../../blurb/blurbVertical'

export default function Hit(
    {
        hit,
        mode,
        buttonText,
    }
) {
    const { t } = useTranslation()
    return (
        <BlurbVertical // TODO: Video (doesn't work for other types)
            key                 = { hit.__position }
            image               = { hit.image }
            title               = { `${hit.title} ${ hit.series ? ' | ' + hit.series : ''}` }
            subtitle            = { `${ hit.speakers?.length >= 0 ? hit.speakers[0] : ''}` }
            content             = { hit.excerpt }
            mode                = { mode }
            buttons             =   { 
                                        [
                                            {
                                                'buttonLink': hit.link,
                                                'buttonType': 'internal: Internal',
                                                'buttonText': buttonText ? buttonText : t('global:global.read_more'),
                                                'buttonTarget': '_self: Self',
                                                'buttonCss': '',
                                                'buttonCssRemoveDefault': componentConf.blurbVertical.itemCssRemoveDefault,
                                            }
                                        ]
                                    }
            orientation         = { componentConf.blurbVertical.orientation }
            truncate            = { componentConf.blurbVertical.truncate }
            truncateLines       = { componentConf.blurbVertical.truncateLines }
            stretchedlink       = { componentConf.blurbVertical.stretchedlink }
            className           = { `${componentConf.blurbVertical.itemClass} mb-1 ml-0 mr-0`}
            removeDefaultCss    = { componentConf.blurbVertical.itemCssRemoveDefault }
            aspectRatio         = { componentConf.blurbVertical.aspectRatio }
            imageFit            = { componentConf.blurbVertical.imageFit }
            imagePosition       = { componentConf.blurbVertical.imagePosition }
            border              = { componentConf.blurbVertical.border }
            borderColor         = { componentConf.blurbVertical.borderColor }
            itemGrow            = { componentConf.blurbVertical.itemGrow }
            // Visibility
            hideImage           = { componentConf.blurbVertical.hideImage }
            hideTitle           = { componentConf.blurbVertical.hideTitle }
            hideSubtitle        = { componentConf.blurbVertical.hideSubtitle }
            hideExcerpt         = { componentConf.blurbVertical.hideExcerpt }
            hideButton          = { componentConf.blurbVertical.hideButton }
        />
    )
}
