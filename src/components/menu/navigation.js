import React from "react"

import MenuGlobal from "../menu/menuGlobal"
import MenuLocal from "../menu/menuLocal"

import './navigation.scss'

export default function Navigation( { menuGlobalHelp, menuGlobalGive, menuLocal, logo, as, siteTitle, location} ){
    
    return (
        <header className="c-nav h-background-six-shade-three">

            <MenuGlobal 
                className   = { "h-background-six-shade-three" } 
                helpMenu    = { menuGlobalHelp } 
                giveMenu    = { menuGlobalGive } 
                location    = { location }
            />

            <MenuLocal 
                data = {menuLocal} 
                logo = {logo} 
                as   = {as}
            >
                {siteTitle}
            </MenuLocal>

        </header>
    )
}