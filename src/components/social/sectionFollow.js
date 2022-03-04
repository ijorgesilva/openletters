import React from 'react'
import { Container } from 'react-bootstrap'

import FollowNetworkLists from './followNetworkLists'

import './sectionFollow.scss'

export default function SectionFollow ( 
    { 
        title,
        id,
        content,
        className,
        mode,
        size,
        containerWidth,
        networks,
        alignment,
    } ) {

    let networkList = []
    let networkName

    // Variable building for each Network
    if( networks ){
        networks.sectionFollowNetworksType.forEach(function(_){
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

        <section className = {`sectionFollow ${ className ? className : '' } ${ size ? size : 'md' } ${ mode ? mode : 'light' }`} id = {id} >
        
                <Container fluid = { containerWidth === 'container' ? false : true }>
                    {
                        ( title || content ) ?
                            <div className='general'>
                                {
                                    title ?
                                        <h2 className = 'title display-4 text-break' dangerouslySetInnerHTML={{__html: title}}></h2>
                                    :
                                        undefined
                                }
                                { 
                                    content ?
                                        <div className='content' dangerouslySetInnerHTML={{__html: content}}></div>
                                    :
                                        undefined
                                }
                            </div>
                        :
                            undefined
                    }
                    <FollowNetworkLists 
                        items       = { networkList }
                        mode        = { mode }
                        alignment   = { alignment }
                    />
                </Container>

        </section>
    )
}