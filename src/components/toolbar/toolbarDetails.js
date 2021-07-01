// Dependencies
import React from 'react'

// Components
import './toolbarDetails.scss'
import ShareSimpleIcon from '../social/shareSimpleIcon'

export default function ToolbarDetails ( { location, className, id, variant } ) {
    
    let variantColor = ( variant === 'dark' ) ? 'dark' : 'light'

    return (
        <div className={`toolbarDetails ${variantColor} ${(className) ? className : ''} `} id={id}>
            <div className="toolbarContainer">
                <ShareSimpleIcon 
                    location    = {location} 
                    variant     = {variantColor}
                />
            </div>
        </div>
    )
}