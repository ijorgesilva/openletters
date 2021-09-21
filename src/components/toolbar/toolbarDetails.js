
import React from 'react'
import { Container } from 'react-bootstrap'


import ShareSimpleIcon from '../social/shareSimpleIcon'
import RaiseHand from '../participation/raiseHand'


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
                <ShareSimpleIcon 
                    location    = { location } 
                    mode        = { mode ? mode : 'light' }
                    label
                />
                {
                    ( participation?.raiseHandList?.length > 0 ) ?
                        <RaiseHand 
                            mode     = { mode ? mode : 'light' }
                            options  = { participation.raiseHandList }
                        />
                    :
                        undefined
                }
            </Container>
        </div>
    )
}