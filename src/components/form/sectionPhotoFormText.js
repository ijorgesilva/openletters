import IframeResizer from 'iframe-resizer-react'
import React from 'react'

import './sectionPhotoFormText.scss'

export default function SectionPhotoFormText ( 
    { 
        id, 
        formIframeUrl, 
        formTitle, 
        formContent, 
        photoContentTitle, 
        photoContentText, 
        photoImageBackground, 
        backgroundClassName, 
        photoClassName,
    } 
    ) {


    const photoStyle = {
        backgroundImage: 'url(' + photoImageBackground +')',
    }
    
    return (
        <section id={id} className={`sectionPhotoFormText  ${backgroundClassName ? backgroundClassName : ''}`}>
            <div className='container-lg'>
                <div className='form h-background-white'>
                    <div className='photo h-background-one position-relative'>
                        <div className={`${photoClassName} `}>
                            <div className='text text-white z-index-2 position-relative'>
                                <h2 className='display-5 text-uppercase' dangerouslySetInnerHTML={{__html: photoContentTitle}}></h2>
                                <div dangerouslySetInnerHTML={{__html: photoContentText}}></div>
                            </div>
                            <div className='image opacity-20 position-absolute z-index-1' style={photoStyle}></div>
                        </div>
                    </div>
                    <div className='content mt-4'>
                        <h2 className='display-4 h-color-one text-uppercase' dangerouslySetInnerHTML={{__html: formTitle}}></h2>
                        <div dangerouslySetInnerHTML={{__html: formContent}}></div>
                        {
                            (formIframeUrl) ?
                                <IframeResizer src={formIframeUrl} style={{minHeight: '600px', minWidth: '100%', width: '1px'}} frameborder='0'></IframeResizer>
                            : <div></div>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}