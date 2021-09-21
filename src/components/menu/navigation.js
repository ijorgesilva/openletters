
import React from 'react'
import { useTranslation } from 'react-i18next'


import { useWebsiteConfiguration } from '../../hooks/useWebsiteConfiguration'
import MenuGlobal from "../menu/menuGlobal"
import MenuLocal from "../menu/menuLocal"


import { useTheme } from '../../hooks/useTheme'

// Data
import { menuHelp, menuGive, followOptions } from '../../../data/menues'


import './navigation.scss'

export default function Navigation( { menuLocal, menuGlobal, location, campus, searchIndices, mode } ){

    
    const { t } = useTranslation()
    const theme = useTheme()

    const defaultCampus = useWebsiteConfiguration().settingsDefaultCampus?.slug

    // TODO: Temp fix. Needs better logic. Use states instead.
    if( campus === undefined ) {
        campus = defaultCampus
    }
    
    return (
        <header className='navigation'>

            {
                ( menuGlobal ) ?
                    <MenuGlobal 
                        className       = ''
                        followOptions   = { followOptions }
                        helpMenu        = { menuHelp } 
                        giveMenu        = { menuGive } 
                        location        = { location }
                        campus          = { campus }
                        searchIndices   = { searchIndices }
                        mode            = { ( mode ) ? mode : theme?.layout.header.mode ? theme.layout.header.mode : 'light' }
                    />
                :
                    undefined
            }
            {
                ( menuLocal ) ?
                    <MenuLocal 
                        location        = { location }
                        campus          = { campus }
                        mode            = { ( mode ) ? mode : theme?.layout.header.mode ? theme.layout.header.mode : 'light' }
                    />
                :
                    undefined
            }

        </header>
    )
}