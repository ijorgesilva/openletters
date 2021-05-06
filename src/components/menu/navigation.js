// Dependencies
import React from 'react'
import { useTranslation } from 'react-i18next'

// Components
import { useWebsiteConfiguration } from '../../hooks/useWebsiteConfiguration'
import MenuGlobal from "../menu/menuGlobal"
import MenuLocal from "../menu/menuLocal"

// Data
import { menuHelp, menuGive } from '../../../data/menues'

// Styles
import './navigation.scss'

export default function Navigation( { menuLocal, menuGlobal, location, campus } ){

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
                        className   = 'h-background-six-shade-three'
                        helpMenu    = { menuHelp } 
                        giveMenu    = { menuGive } 
                        location    = { location }
                        campus      = { campus }
                    />
                :
                    undefined
            }
            {
                ( menuLocal ) ?
                    <MenuLocal 
                        location    = { location }
                        campus      = { campus }
                    />
                :
                    undefined
            }

        </header>
    )
}