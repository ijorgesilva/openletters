// Dependecies
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Nav, Navbar } from 'react-bootstrap'

// Components
import LanguageSelector from './languageSelector'
import FollowDropdown from './followDropdown'
import DropdownMenu from './dropdownMenu'
import CampusSelector from './campusSelector'
import MenuAuth from './menuAuth'
import Search from "../search"

// Utils
import config from '../../../data/SiteConfig'

// Styles
import './menuGlobal.scss'

export default function MenuGlobal( { followOptions, helpMenu, giveMenu, className, location, searchIndices } ){

    const { t } = useTranslation()

    const globalNavbarCollapse = false
    
    return (
        
        <div className={`menuGlobal ${(className) ? className : ''}`}>

            <Navbar className="navglobal container-fluid" variant="dark" expand="lg">
                {
                    (config.menuCampusSelector === true) ?
                        <CampusSelector 
                            location={ location }
                            className='mr-auto'
                        />
                    : undefined
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
                        />
                        
                        {
                            ( helpMenu ) ?
                                <DropdownMenu 
                                    data={helpMenu} 
                                    title={t('global.help.need-help')} 
                                />
                            : 
                                undefined
                        }
                        {
                            ( giveMenu ) ?
                                <DropdownMenu 
                                    data={giveMenu} 
                                    title={t('global.give.title')} 
                                />
                            : 
                                undefined
                        }
                    </Nav>

                </Navbar.Collapse>

                {
                    ( config.menuLanguageSelector ) ?
                        <LanguageSelector 
                            className={`langselector`} 
                        />
                    : 
                        undefined
                }
                
                {
                    ( searchIndices?.length > 0 && config.hasSearch ) ? 
                        <div className='search'>
                            <Search indices={searchIndices} />
                        </div>
                    :
                        undefined
                }

                <MenuAuth />

            </Navbar>

        </div>
    )
}