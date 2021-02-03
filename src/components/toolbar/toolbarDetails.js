// Dependencies
import React from 'react'

// Components
import './toolbarDetails.scss'
import ShareSimpleIcon from '../social/shareSimpleIcon'

export default function ToolbarDetails ( {location, className, id, ...props} ) {
    return (
        <div className={`toolbarDetails ${(className) ? className : ''}`} id={id}>
            <div className="mobile">
                <ShareSimpleIcon 
                    location={location} 
                    variant="light"
                />
            </div>
            <div className="desktop">
                <ShareSimpleIcon 
                    location={location} 
                    variant=""
                />
            </div>
            
        </div>
    )
}