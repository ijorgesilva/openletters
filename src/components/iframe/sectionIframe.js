import IframeResizer from 'iframe-resizer-react'
import React from 'react'

import Background from '../UI/background'

export default function SectionIframe ( 
    { 
        id, 
        title,
        content,
        iframeUrl,
        containerWidth,
        className,
        mode,
        size,
        backgroundLayers,
    } 
    ) {

    return (

        <section
            id          = {id}
            className   = {`sectionVideo ${ size ? size : 'md'} ${ mode ? mode : 'light' } ${ className ? className : ''}`}
        >
            <div className = {`columns`}>
                <div className = {`${ ( containerWidth ) ? containerWidth : 'container' }`}>

                    {
                        title ?
                            <h2 className = 'title'
                                dangerouslySetInnerHTML={{__html: title}}
                            ></h2>
                        : undefined
                    }
                    
                    {
                        content ?
                            <div className = 'content' dangerouslySetInnerHTML ={{__html: content}} ></div>
                        : undefined
                    }
                    
                    {
                        iframeUrl ?
                            <IframeResizer 
                                src         = {iframeUrl} 
                                style       = {{minHeight: '600px', minWidth: '100%', width: '1px'}}
                                frameborder = '0' 
                            />
                        : undefined
                    }

                </div>
            </div>

            <Background
                layers  = { backgroundLayers }
            />

        </section>
    )
}