// Dependencies
import React from 'react'

// Components
import { getDate } from '../../utils/utils'
import ToolbarDetails from '../../toolbar/toolbarDetails'

export default function WatchDetailsSidebar ( {videoDetails, location} ) {

    const vodDate = (videoDetails.videoDayDate) ? 
                        getDate(videoDetails.videoDayDate,2,'us','LLLL d, yyyy') 
                    : 
                        undefined

    return (
        <div className="watchDetailsSidebar sidebar-left" id="left">
            <div className="sticky">
                <div className="details">
                    {
                        (videoDetails.videoCampus) ? 
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
                <ToolbarDetails 
                    location={location} 
                />
            </div>
        </div>
    )
}