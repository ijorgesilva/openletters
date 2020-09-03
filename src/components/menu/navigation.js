import React from "react"

import MenuGlobal from "../menu/menuGlobal"
import MenuLocal from "../menu/menuLocal"
// import ModalBasic from "../modal/basic"

export default function Navigation(props){
    
    return (
        <header className="c-nav h-background-six">
            <MenuGlobal menuCampusSelector={props.menuCampusSelector} helpMenu={props.menuGlobalHelp} giveMenu={props.menuGlobalGive} />
            <MenuLocal data={props.menuLocal} logo={props.logo} as={props.as}>{props.siteTitle}</MenuLocal>
        </header>
    )
}