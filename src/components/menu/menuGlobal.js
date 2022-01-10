import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { useWebsiteConfiguration } from '../../hooks/useWebsiteConfiguration'
import Search from "../search"

import CampusSelector from './campusSelector'
import DropdownMenu from './dropdownMenu'
import FollowDropdown from './followDropdown'
import LanguageSelector from './languageSelector'
import MenuAuth from './menuAuth'

import './menuGlobal.scss'

export default function MenuGlobal( 
    { 
        followOptions, 
        helpMenu, 
        giveMenu, 
        className, 
        location, 
        searchIndices, 
        mode,
    } 
    ){

    const { t } = useTranslation()

    const globalNavbarCollapse = false
    const menuConf = useWebsiteConfiguration()
    
    return (
        
        <div className={`menuGlobal ${(className) ? className : ''}`}>

            <Navbar 
                className   = "navglobal container-fluid" 
                bg          = { ( mode ) ? mode : 'light' } 
                variant     = { ( mode ) ? mode : 'light' } 
                expand      = "lg"
            >
                {
                    menuConf.settingsMenus.settingsMenuCampusSelector ?
                        <CampusSelector 
                            location    = { location }
                            className   = 'mr-auto'
                            mode        = { mode }
                        />
                    : 
                        undefined
                }
                {
                    ( globalNavbarCollapse ) ?
                        <Navbar.Toggle className="menu-collapsed" aria-controls="global-navbar-nav" />
                    :
                        undefined
                }
                <Navbar.Collapse className="menu" id="global-navbar-nav">

                    <Nav>
                        <FollowDropdown 
                            instagramUrl    = { followOptions.instagramUrl }
                            facebookUrl     = { followOptions.facebookUrl }
                            twitterUrl      = { followOptions.twitterUrl }
                            youtubeUrl      = { followOptions.youtubeUrl }
                            appStoreUrl     = { followOptions.appStoreUrl }
                            playStoreUrl    = { followOptions.playStoreUrl }
                            mailchimpUrl    = { followOptions.mailChimpUrl }
                            mode            = { mode }
                        />
                        
                        {
                            helpMenu ?
                                <DropdownMenu 
                                    data    = {helpMenu} 
                                    title   = {t('global.help.need-help')} 
                                    mode    = { mode }
                                />
                            : 
                                undefined
                        }
                        {
                            giveMenu ?
                                <DropdownMenu 
                                    data    = {giveMenu} 
                                    title   = {t('global.give.title')}
                                    mode    = { mode }
                                />
                            : 
                                undefined
                        }
                    </Nav>

                </Navbar.Collapse>

                {
                    menuConf.settingsMenus.settingsMenuLanguageSelector ?
                        <LanguageSelector 
                            className ={`langselector`}
                        />
                    : 
                        undefined
                }
                
                {
                    ( searchIndices?.length > 0 && menuConf.settingsMenus.settingsMenuSearch ) ? 
                        <div className='search'>
                            <Search 
                                indices = {searchIndices} 
                                mode    = { mode }
                            />
                        </div>
                    :
                        undefined
                }

                <MenuAuth 
                    mode    = { mode }
                />

            </Navbar>

        </div>
    )
}