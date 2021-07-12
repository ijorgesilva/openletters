// Dependencies
import React from 'react'

// Components
import ShareSimpleIcon from '../social/shareSimpleIcon'
import RaiseHand from '../participation/raiseHand'

// Style
import './toolbarDetails.scss'

export default function ToolbarDetails ( { location, className, id, variant, participation } ) {
    
    let variantColor = ( variant === 'dark' ) ? 'dark' : 'light'

    return (
        <div className={`toolbarDetails ${variantColor} ${(className) ? className : ''} `} id={id}>
            <div className="toolbarContainer">
                <ShareSimpleIcon 
                    location    = {location} 
                    variant     = {variantColor}
                    label
                />
                {
                    ( participation.raiseHandList?.length > 0 ) ?
                        <RaiseHand 
                            variant = 'dark'
                            options = { participation.raiseHandList }
                        />
                    :
                        undefined
                }
            </div>
        </div>
    )
}