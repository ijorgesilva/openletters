import React from "react"

export default function LatestMessage(props) {
    const style = {
        backgroundImage: "url(" + props.photo +")",
        width: "100%",
        height: "100%",
        backgroundPosition: "center",
        backgroundSize: "cover"
    }
    return (
        <a className="col-lg-5 col-xl-4 px-0 d-none d-lg-block" href={props.href} title={props.name}> 
            <div style={style}></div> 
        </a>
    )
}