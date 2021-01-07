// Dependencies
import React from 'react'

// Components
import './toolbarWatchDetails.scss'
import ShareSimpleIcon from '../../social/shareSimpleIcon'

export default function ToolbarWatchDetails ( {location, className, id, ...props} ) {
    return (
        <div className={`toolbarWatchDetails ${(className) ? className : ''}`} id={id}>
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