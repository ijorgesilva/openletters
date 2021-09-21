import React from 'react'

import { getDate } from '../../utils/utils'

import './watchDetailsSidebar.scss'

export default function WatchDetailsSidebar ( 
    { 
        id,
        className,
        videoDetails, 
        hasCampus,
        mode,
        position,
        sticky,
    } 
    ) {

    const vodDate = (videoDetails.videoDayDate) ? 
                        getDate(videoDetails.videoDayDate,2,'us','LLLL d, yyyy') 
                    : 
                        undefined

    return (
        <div className={`watchDetailsSidebar sidebar-${ position ? position : 'left' } ${ mode ? mode : 'light' } ${ className ? className : ''}`} id = {id}>
            <div className={`${ sticky ? 'sticky' : ''}`}>
                <div className="details">
                    {
                        (hasCampus && videoDetails.videoCampus) ? 
                            <div className="watchCampus mb-3">
                                {
                                    videoDetails.videoCampus.map ( (campus, index) => (
                                        <span key={index} className="user-select-none d-block">
                                            {campus.title}
                                        </span>
                                    ))
                                }
                            </div> 
                        : 
                            undefined
                    }
                    {
                        (videoDetails.videoSpeaker) ? 
                            <div className="watchSpeaker">
                                <address className="watchAuthor">
                                    {
                                        videoDetails.videoSpeaker.map ( ( speaker, index ) => (
                                                <>
                                                    {(index) ? ', ': ''}
                                                    <span className="user-select-none" key={index}>
                                                        {speaker.title}
                                                    </span>
                                                </>
                                            )
                                        )
                                    }
                                </address>
                            </div> 
                        : 
                            undefined
                    }
                    {
                        (videoDetails.videoDayDate) ? 
                            <div className="watchDate user-select-none">
                                {vodDate}
                            </div>
                        : 
                            undefined
                    }
                </div>
            </div>
        </div>
    )
}