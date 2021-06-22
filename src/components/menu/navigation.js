// Dependencies
import React from 'react'
import { useTranslation } from 'react-i18next'

// Components
import { useWebsiteConfiguration } from '../../hooks/useWebsiteConfiguration'
import MenuGlobal from "../menu/menuGlobal"
import MenuLocal from "../menu/menuLocal"

// Data
import { menuHelp, menuGive, followOptions } from '../../../data/menues'

// Styles
import './navigation.scss'

export default function Navigation( { menuLocal, menuGlobal, location, campus, searchIndices } ){

    /* Standard fields */
    const { t } = useTranslation()
    const defaultCampus = useWebsiteConfiguration().settingsDefaultCampus?.slug
    
    // TODO: Temp fix. Needs better logic. Use states instead.
    if( campus === undefined ) {
        campus = defaultCampus
    }
     
    return (
        <header className='c-nav h-background-six-shade-three'>

            {
                ( menuGlobal ) ?
                    <MenuGlobal 
                        className       = 'h-background-six-shade-three'
                        followOptions   = { followOptions }
                        helpMenu        = { menuHelp } 
                        giveMenu        = { menuGive } 
                        location        = { location }
                        campus          = { campus }
                        searchIndices   = { searchIndices }
                    />
                :
                    undefined
            }
            {
                ( menuLocal ) ?
                    <MenuLocal 
                        location        = { location }
                        campus          = { campus }
                    />
                :
                    undefined
            }

        </header>
    )
}