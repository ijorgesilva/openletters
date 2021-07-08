// Dependencies
import React from 'react'

// Components
import ShareSimpleIcon from '../social/shareSimpleIcon'
import RaiseHand from '../participation/raiseHand'

// Style
import './toolbarDetails.scss'

export default function ToolbarDetails ( { location, className, id, variant, raiseHand } ) {
    
    let variantColor = ( variant === 'dark' ) ? 'dark' : 'light'

    return (
        <div className={`toolbarDetails ${variantColor} ${(className) ? className : ''} `} id={id}>
            <div className="toolbarContainer">
                <ShareSimpleIcon 
                    location    = {location} 
                    variant     = {variantColor}
                />
                {
                    ( raiseHand )  ?
                        <RaiseHand 
                            variant='dark'
                        />
                    :
                        undefined
                }
            </div>
        </div>
    )
}