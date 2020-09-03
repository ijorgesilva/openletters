import React from "react"
import IframeResizer from "iframe-resizer-react"

export default function SectionPhotoFormText(props) {
    const photoClassName = props.photoClassName + " ";
    const backgroundClassName = props.backgroundClassName + " c-application--two-panes section";
    const photoStyle = {
        backgroundImage: "url(" + props.photoImageBackground +")",
    }
    
    return (
        <section id={props.id} className={backgroundClassName}>
            <div className="container-lg">
                <div className="c-application__form h-background-white">
                    <div className="c-application__photo h-background-one position-relative">
                        <div className={photoClassName}>
                            <div className="c-application__advantages text-white z-index-2 position-relative">
                                <h2 className="display-5 text-uppercase" dangerouslySetInnerHTML={{__html: props.photoContentTitle}}></h2>
                                <div dangerouslySetInnerHTML={{__html: props.photoContentText}}></div>
                            </div>
                            <div className="c-application__image opacity-20 position-absolute z-index-1" style={photoStyle}></div>
                        </div>
                    </div>
                    <div className="c-application__content mt-4">
                        <h2 className="display-4 h-color-one text-uppercase" dangerouslySetInnerHTML={{__html: props.formTitle}}></h2>
                        <div dangerouslySetInnerHTML={{__html: props.formContent}}></div>
                        {
                            (props.formIframeUrl) ?
                                <IframeResizer src={props.formIframeUrl} style={{minHeight: "600px", minWidth: '100%', width: '1px'}} frameborder="0"></IframeResizer>
                            : <div></div>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}