// Dependencies
import React from 'react'

// Components
import './toolbarDetails.scss'
import ShareSimpleIcon from '../social/shareSimpleIcon'

export default function ToolbarDetails ( { location, className, id } ) {
    return (
        <div className={`toolbarDetails ${(className) ? className : ''}`} id={id}>
            <div className="toolbarContainer">
                <ShareSimpleIcon 
                    location={location} 
                    variant="light"
                />
            </div>
        </div>
    )
}