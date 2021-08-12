// Dependencies
import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'

// Components
import SocialNetwork from './socialNetwork'
import './sectionShare.scss'

export default function ShareSection( { 
    title,
    id,
    content,
    className,
    variant,
    image,
    imageAlignment,
    location,
    containerWidth,
    networks,
    itemClass
    } ) {

    const variantClass = (variant) ? variant : 'light'
    let networkList = []
    let networkName

    // Variable building for each Network
    if( networks ){
        networks.sectionShareNetworksType.forEach(function(_){
            networkName = 'networks.sectionShareNetworks'+_.split(':')[1].replace(/ /g,'')
            networkList.push( { 
                'type': _.split(':')[0],
                'params': eval(networkName),
            })
        })
    }

    return (

        <section className={`sectionShare ${ ( className ) ? className : '' } ${ ( variantClass ) ? variantClass.split(':')[0] : 'light' }`} id={id}>
            
            <div className={`${ ( image?.sectionTextbasicMediaType ) ? 'two-columns' : 'one-column' }`}>

                <div className={`${ ( containerWidth ) ? containerWidth : 'container' }`}>

                        {
                            ( title ) ?
                                <h2 className='title'
                                    dangerouslySetInnerHTML={{__html: title}}
                                ></h2>
                            :
                                undefined
                        }

                        { 
                            ( content ) ?
                                <div className='content'
                                    dangerouslySetInnerHTML={{__html: content}}
                                ></div>
                            :
                                undefined
                        }

                        {
                            ( networkList?.length > 0 ) ?
                                <div className="shareButtons">
                                    {
                                        networkList.map( _ => (
                                            <SocialNetwork 
                                                type        = { _.type }
                                                params      = { _.params }
                                                variant     = { variant }
                                                location    = { location }
                                                itemClass   = { itemClass }
                                            />
                                        ))
                                    }
                                </div>
                            :
                                undefined
                        }

                </div>

                {
                    ( image ) ?
                        <div className={`media ${ ( imageAlignment ) ? imageAlignment : '' }`}>
                            <GatsbyImage 
                                image           = { image }
                                height          = '100%'
                            />
                        </div>
                    :
                        undefined
                }

            </div>
        </section>

    )
}