import React from 'react'
import { useTranslation } from 'react-i18next'

import { useCreateMainMenu } from '../../hooks/useCreateMainMenu'
import { useTheme } from '../../hooks/useTheme'
import { useWebsiteConfiguration } from '../../hooks/useWebsiteConfiguration'
import { useWebsiteConfigurationMenus } from '../../hooks/useWebsiteConfigurationMenus'
import MenuMain from "../menu/menuMain"
import './navigation.scss'

export default function Navigation( { menuLocal, menuGlobal, location, campus, searchIndices, mode } ){

    // eslint-disable-next-line no-unused-vars
    const { t } = useTranslation()
    const theme = useTheme()

    const defaultCampus = useWebsiteConfiguration().settingsDefaultCampus?.slug

    // TODO: Temp fix. Needs better logic. Use states instead.
    if( campus === undefined ) {
        campus = defaultCampus
    }
    
    /* 
     * Get and parse menus
     */
    const rawMenus = useWebsiteConfigurationMenus()
    // Format Top Menu
    const parsedTopMenu = rawMenus?.menuPositions.topMenu?.menu ? useCreateMainMenu(campus, rawMenus.menuPositions.topMenu.menu) : undefined
    // Format Main Menu
    const parsedMainMenu = rawMenus?.menuPositions.mainMenu?.menu ? useCreateMainMenu(campus, rawMenus.menuPositions.mainMenu.menu) : undefined

    return (
        <header className='navigation'>

            {
                menuGlobal ?
                    <MenuMain 
                        className       = { parsedTopMenu.conf.css }
                        id              = { parsedTopMenu.conf.id }
                        location        = { location }
                        campus          = { campus }
                        mode            = { mode ? mode : theme?.layout.header.mode ? theme.layout.header.mode : 'light' }
                        menu            = { parsedTopMenu.items }
                        collapse        = { parsedTopMenu.conf.collapse }
                        menuLocation    = 'top'
                        campusSelector  = { rawMenus.menuPositions.topMenu.campusSelector }
                        languageSelector= { rawMenus.menuPositions.topMenu.languageSelector }
                        search          = { rawMenus.menuPositions.topMenu.search }
                        searchIndices   = { searchIndices }
                        auth            = { true }
                        alignRight
                    />
                :
                    undefined
            }
            {
                menuLocal ?
                    <MenuMain 
                        className       = { parsedMainMenu.conf.css }
                        id              = { parsedMainMenu.conf.id }
                        location        = { location }
                        campus          = { campus }
                        mode            = { mode ? mode : theme?.layout.header.mode ? theme.layout.header.mode : 'light' }
                        menu            = { parsedMainMenu.items }
                        collapse        = { parsedMainMenu.conf.collapse }
                        menuLocation    = 'main'
                    />
                :
                    undefined
            }

        </header>
    )
}