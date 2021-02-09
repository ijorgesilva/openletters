import React from "react"

import MenuGlobal from "../menu/menuGlobal"
import MenuLocal from "../menu/menuLocal"

import './navigation.scss'

export default function Navigation( { menuCampusSelector, menuGlobalHelp, menuGlobalGive, menuLocal, logo, as, siteTitle, ...props } ){
    
    return (
        <header className="c-nav h-background-six-shade-three">

            <MenuGlobal 
                className={"h-background-six-shade-three"} 
                menuCampusSelector={menuCampusSelector} 
                helpMenu={menuGlobalHelp} 
                giveMenu={menuGlobalGive} 
            />

            <MenuLocal 
                data={menuLocal} 
                logo={logo} 
                as={as}>
                {siteTitle}
            </MenuLocal>

        </header>
    )
}