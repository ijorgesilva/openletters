import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import BlurbVertical from '../../blurb/blurbVertical'
import Background from '../../UI/background'

import HeroButtons from './heroButtons.js'
import './heroDynamic.scss'

export default function HeroDynamic ( 
    { 
        title,
        titleClassName,
        subtitle,
        textAlignment,
        backgroundPhoto,
        id,
        className,
        buttons,
        children, 
        related,
        mode,
        width,
        size,
        overlay,
        backgroundLayers,
    } 
    ) {

    const { t } = useTranslation()

    return (

        <div id = {id} className = {`heroDynamic hero ${ mode ? mode : 'light' } ${ size ? size : 'md' } ${ className ? className : '' }`}>

            <Container className={'z-index-2'} fluid = { width === 'container' ? undefined : true }>
                <div className={`content ${ textAlignment ? 'align-items-'+textAlignment : 'align-items-center'}`}>
                    <div>
                        <h1 className={`${ mode === 'dark' ? 'text-white' : 'text-black'} ${ titleClassName ? titleClassName : ''}`} dangerouslySetInnerHTML={{__html: title}}></h1>
                        <h5 className={`mt-2 ${ mode === 'dark' ? 'text-white' : 'text-black'}`} dangerouslySetInnerHTML={{__html: subtitle}}></h5>
                        
                        {
                            buttons?.length >= 0 ?
                                <div className='buttons'>
                                    { 
                                        buttons?.map( ( _ , index ) => (
                                            <HeroButtons button = { _ } key = {index} />
                                        ))
                                    }
                                </div>
                            : undefined
                        }

                        {
                            related ? 
                                <div className='related'>
                                    <BlurbVertical
                                        image               = { related.featuredImage }
                                        title               = { related.title }
                                        content             = { related.excerpt }
                                        style               = { { maxWidth: '100%' } }
                                        subtitle            = {`${ related.subtitle ? related.subtitle : ''} ${ related.eventDates?.length > 0 ? related.eventDates : ''}`}
                                        itemType            = { related.type }
                                        className           = { `mt-1` }
                                        mode                = { mode }
                                        orientation         = { 'horizontal' }
                                        imagePosition       = { 'center-center' }
                                        buttons             =   { [{
                                                                    buttonType: 'internal',
                                                                    buttonLink: related.url,
                                                                    buttonCss: 'btn btn-outline-dark',
                                                                    buttonCssRemoveDefault: true,
                                                                    buttonTarget: '_self',
                                                                    buttonText: t('global.read_more'),
                                                                }] }
                                        truncate            = { true }
                                        truncateLines       = { 3 }
                                        stretchedLink       = { true }
                                        hideButton          = { true }

                                        // aspectRatio         = { aspectRatio }
                                        // hideImage           = { hideImage }
                                        // hideTitle           = { hideTitle }
                                        // hideSubtitle        = { hideSubtitle }
                                        // hideExcerpt         = { hideExcerpt }
                                    />
                                </div>
                            : undefined
                        }

                        {
                            children ?
                                <div className='children'>
                                    {children}
                                </div>
                            : undefined
                        }

                    </div>
                </div>
            </Container>

            <div className={`background noselect z-index-1 ${ overlay ? 'overlay' : ''}`}>
                {
                    backgroundPhoto ?
                        <GatsbyImage 
                            image     = {backgroundPhoto}
                            className = 'card-img-top'
                            height    = '100%'
                            alt = ''
                        />
                    : undefined
                }
                <Background
                    layers  = { backgroundLayers }
                />

            </div>

        </div>

    )
}