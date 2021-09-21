
import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { Jumbotron } from 'react-bootstrap'
import TextTruncate from 'react-text-truncate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo, faPlay } from '@fortawesome/fontawesome-free-solid'
import '@fortawesome/fontawesome-svg-core/styles.css'


import './heroSimple.scss'

export default function HeroSimple( 
    { 
        backgroundImage, 
        className, 
        id, 
        iconSeries, 
        iconSeriesLink, 
        iconSeriesTitle, 
        playUrl, 
        title, 
        seriesLinkText, 
        description, 
        playText, 
        iconPlay, 
        iconPlayFlag,
        mode,
    } ) {
    
    const backgroundImageUrl = (backgroundImage?.images?.fallback?.src) ? backgroundImage.images.fallback.src : ''
    const styleBackground = {
        backgroundImage: 'url(' + backgroundImageUrl + ')'
    }

    return (
        <section className={`heroSimple ${ mode ? ' ' + mode : 'light' } ${ className ? ' ' + className : '' }`} id={id}>
            <Jumbotron className=''>

                <div className='content-container fluid'>

                    <div className='content p-4'>
                        {
                            (iconSeries && iconSeriesLink) ?
                                <Link to={`${iconSeriesLink}`}>
                                    <div className='position-relative z-index-2 iconSeries mb-4'>
                                        <GatsbyImage image={iconSeries} alt={iconSeriesTitle}/>
                                    </div>
                                </Link>
                            : 
                                (iconSeriesTitle && iconSeriesLink) ?
                                    <Link to={`${iconSeriesLink}`}>
                                        <div className='position-relative z-index-2 mb-1'>
                                            <h1 className='display-1'>{iconSeriesTitle}</h1>
                                        </div>
                                    </Link>
                                : undefined
                        }
                        
                        <h1 className='position-relative z-index-2'>
                            <Link className='' to={playUrl}>
                                {title}
                            </Link>
                        </h1>
                        
                        {
                            (description) ? <TextTruncate className='position-relative z-index-2' line={2} element='p' truncateText='…' text={description.replace(/<p>/, '').replace(/<\/p>/, '')} /> 
                            : <></>
                        }

                        <div className='buttons z-index-2'>
                            <Link to={playUrl} className={`btn btn-outline-${ mode === 'light' ? 'dark' : mode === 'dark' ? 'light' : mode } btn-lg`} >
                                <FontAwesomeIcon 
                                    icon={faPlay} 
                                    size='md'
                                    className='mr-2'
                                /> 
                                {playText}
                            </Link>
                            {
                                (iconSeriesLink) ?
                                    <Link to={iconSeriesLink} className={`btn btn-outline-${ mode === 'light' ? 'dark' : mode === 'dark' ? 'light' : mode } btn-lg`} >
                                        <FontAwesomeIcon 
                                            icon={faInfo} 
                                            size='md'
                                            className='mr-2'
                                        />
                                        {seriesLinkText}
                                    </Link>
                                : undefined
                            }
                        </div>
                    </div>

                        
                </div>
                
                <div className='z-index-1 heroBackground'>
                    <div className='z-index-2 heroBackgroundIcon'>
                        {
                            (iconPlayFlag) ?
                                (iconPlay) ?
                                    
                                        <Link className='' to={playUrl}>
                                                <GatsbyImage image={iconPlay} alt=''/>
                                        </Link>
                                : 
                                        <Link className='' to={playUrl}>
                                            <StaticImage
                                                src='../../../assets/img/global/button__play-white.svg'
                                                alt=''
                                                layout='fixed'
                                                className='photo'
                                            />
                                        </Link>
                            :
                                undefined
                        }
                    </div>
                    <div className='z-index-2 backgroundImage'>
                        {
                            (backgroundImage) ?
                                <div className='background' style={styleBackground}></div>
                            : 
                                <StaticImage
                                    src='../../../assets/img/global/noImage.jpg'
                                    className='photo'
                                    alt=''
                                />
                        }
                    </div>
                </div>
                
            </Jumbotron>

        </section>
    )

}