// Dependencies
import React, { useContext } from 'react'

// Components
import ContextConsumer from '../../provider/context'
import { useWebsiteConfiguration } from '../../hooks/useWebsiteConfiguration'
import MenuGlobal from "../menu/menuGlobal"
import MenuLocal from "../menu/menuLocal"

// Data
import { menuHelp, menuGive } from '../../../data/menues'

// Styles
import './navigation.scss'

export default function Navigation( { menuLocal, menuGlobal, location, campus } ){

    /* Get current campus */
    const defaultCampus = useWebsiteConfiguration().settingsDefaultCampus
    const contextData = useContext( ContextConsumer )
    let currentCampusState  =   ( contextData?.data?.currentCampus ) ? 
                                    contextData.data.currentCampus
                                :
                                    defaultCampus

    return (
        <header className='c-nav h-background-six-shade-three'>

            {
                ( menuGlobal ) ?
                    <MenuGlobal 
                        className   = 'h-background-six-shade-three'
                        helpMenu    = { menuHelp } 
                        giveMenu    = { menuGive } 
                        location    = { location }
                        campus      = { ( campus ) ? campus : currentCampusState }
                    />
                :
                    undefined
            }
            {
                ( menuLocal ) ?
                    <MenuLocal 
                        location    = { location }
                        campus      = { ( campus ) ? campus : currentCampusState }
                    />
                :
                    undefined
            }

        </header>
    )
}