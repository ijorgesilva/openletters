import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { Container } from 'react-bootstrap'

import SocialNetworkList from './socialNetworkList'
import './sectionShare.scss'

export default function ShareSection( 
    { 
        title,
        id,
        content,
        className,
        image,
        imageAlignment,
        location,
        containerWidth,
        networks,
        itemClass,
        mode,
        size,
    } ) {

    let networkList = []
    let networkName
    // Variable building for each Network
    if( networks ){
        networks.sectionShareNetworksType.forEach(function(_){
            if( _.includes(':') ) {// Support to Old DB structure where ':' was present
                networkName = 'networks.sectionShareNetworks'+_.split(':')[1].replace(/ /g,'')
                networkList.push( { 
                    'type': _.split(':')[0],
                    'params': eval(networkName),
                })
            } else {
                networkName = `networks.sectionShareNetworks${_[0].toUpperCase()}${_.slice(1)}`
                networkList.push( { 
                    'type': _,
                    'params': eval(networkName),
                })
            }
        })
    }

    return (

        <section className = {`sectionShare ${ className ? className : '' } ${ size ? size : 'md' } ${ mode ? mode : 'light' }`} id = {id} >
            
            <div className = {`${ image?.sectionTextbasicMediaType ? 'two-columns' : 'one-column' }`}>

                <Container fluid = { containerWidth === 'container' ? undefined : true }>

                    <div className = 'general'>
                        {
                            ( title ) ?
                                    <h4 className = 'title text-break' dangerouslySetInnerHTML={{__html: title}}></h4>
                            :
                                undefined
                        }
                        { 
                            ( content ) ?
                                <div className = 'content' dangerouslySetInnerHTML={{__html: content}}></div>
                            :
                                undefined
                        }
                        <SocialNetworkList 
                            items       = { networkList }
                            mode        = { mode }
                            itemClass   = { itemClass }
                            location    = { location }
                        />
                    </div>

                </Container>

                {
                    image ?
                        <div className = {`media ${ ( imageAlignment ) ? imageAlignment : '' }`}>
                            <GatsbyImage 
                                image           = { image }
                                height          = '100%'
                                alt             = ''
                            />
                        </div>
                    :
                        undefined
                }

            </div>
        </section>

    )
}