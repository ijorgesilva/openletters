import React from 'react'
import { Container } from 'react-bootstrap'

import RaiseHand from '../participation/raiseHand'
import ShareSimpleIcon from '../social/shareSimpleIcon'

import './toolbarDetails.scss'

export default function ToolbarDetails ( 
    { 
        location, 
        className, 
        id, 
        participation, 
        mode
    }
    ) {
    
    return (
        <div className = {`toolbarDetails ${ mode ? mode : 'light' } ${ className ? className : ''}`} id = {id} >
            <Container className='buttons'>
                {
                    ( participation?.raiseHandList?.length > 0 ) ?
                        <RaiseHand 
                            mode     = { mode ? mode : 'light' }
                            options  = { participation.raiseHandList }
                        />
                    :
                        undefined
                }
                <ShareSimpleIcon 
                    location    = { location } 
                    style       = { 'toolBar' }
                    mode        = { mode ? mode : 'light' }
                    label
                />
            </Container>
        </div>
    )
}