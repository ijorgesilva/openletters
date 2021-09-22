
import React from 'react'
import { StaticImage, GatsbyImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import { useTranslation } from 'react-i18next'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container } from 'react-bootstrap'


import VideoReactPlayer from '../player/videoReactPlayer'
import config from '../../../../data/SiteConfig'
import './heroSeries.scss'

export default function HeroSeries ( 
    { title, logo, campus, seriesGraphics, seriesDetails, featuredVideo, className, mode, width } 
    ) {

    
    const { t } = useTranslation()

    const thumbnail = ( seriesDetails.seriesTrailerPoster?.localFile ) ? 
                            seriesDetails.seriesTrailerPoster.localFile.childImageSharp.gatsbyImageData.images.fallback.src
                    : 
                        undefined
    
    return (
        <section className={`heroSeries ${ mode ? mode : '' } ${ className ? className : '' }`} >

            <Container fluid = { width === 'container' ? false : true }>

                <div className={`serieName`}>
                    {
                        (logo) ?
                            <GatsbyImage 
                                image={logo} 
                                alt={title}
                            />
                        :
                            <h1 className='display-1'>{title}</h1>
                    }
                </div>

                <div className='jumbotron'>
                    <div className='about'>
                        {
                            (featuredVideo) ? 
                                <>
                                    <h2>{featuredVideo.title}</h2>
                                    <p>
                                        { 
                                            (featuredVideo.excerpt) ? 
                                                featuredVideo.excerpt.replace(/<p>/, '').replace(/<\/p>/, '') 
                                            : 
                                                t('global.empty.text-not-available') 
                                        }
                                    </p>
                                    <Link to={`${(campus) ? '/' + campus + '/' : '/'}${config.watchMessageDetailsSlug}/${featuredVideo.slug}`} 
                                        className={`btn btn-${ mode === 'light' ? 'outline-dark' : mode === 'dark' ? 'outline-light' : mode } btn-lg z-index-2`}
                                    >
                                        <FontAwesomeIcon icon={faPlay} size='lg' /> {t('global.watch.watch-now')}
                                    </Link>
                                </>
                            :
                                undefined
                        }
                    </div>
                    <div className='trailer'>
                        {
                            (featuredVideo) ? 
                                <div className='playButton z-index-2'>
                                    <Link to={`${(campus) ? '/' + campus + '/' : '/'}${config.watchMessageDetailsSlug}/${featuredVideo.slug}`}>
                                        <StaticImage
                                            src='../../../assets/img/global/button__play-white.svg'
                                            width='120'
                                            alt=''
                                        />
                                    </Link>
                                </div>
                            :
                                undefined
                        }    
                        <div className='trailerContainer z-index-1'>
                            {
                                ( seriesDetails?.seriesTrailer ) ?
                                    <VideoReactPlayer
                                        src={ seriesDetails.seriesTrailer }
                                        controls={false}
                                        config={{
                                            file: {
                                                attributes: {
                                                    poster: thumbnail,
                                                    autoplay: true,
                                                }
                                            }
                                        }}
                                    />
                                :
                                    (featuredVideo?.featuredImage?.node?.localFile) ?
                                        <GatsbyImage 
                                            className='noTrailer' 
                                            image={featuredVideo.featuredImage.node.localFile.childImageSharp.gatsbyImageData}
                                            layout='fullWidth'
                                            objectFit='cover'
                                            objectPosition='50% 50%'
                                            alt={title}
                                        />
                                    :
                                        undefined
                            }
                        </div>
                    </div>
                </div>

            </Container>
            

            <div className='background'>
                <div className='overlay'></div>
                <GatsbyImage
                    className   = 'background-image'
                    image       = { 
                            ( seriesGraphics?.background?.localFile ) ?
                                seriesGraphics.background.localFile.childImageSharp.gatsbyImageData 
                            :
                                undefined
                        }
                    alt         = ''
                />
            </div>

        </section>
    )
}