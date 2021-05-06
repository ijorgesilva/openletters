// Dependecies
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Nav, Navbar } from 'react-bootstrap'

// Components
import LanguageSelector from './languageSelector'
import FollowDropdown from './followDropdown'
import DropdownMenu from './dropdownMenu'
import CampusSelector from './campusSelector'
import config from '../../../data/SiteConfig'
import './menuGlobal.scss'

export default function MenuGlobal( { helpMenu, giveMenu, className, location } ){

    const { t } = useTranslation()

    return (
        
        <div className={`menuGlobal ${(className) ? className : ''}`}>

            <Navbar className="navglobal container-fluid" bg="transparent" expand="lg">
                {
                    (config.menuCampusSelector === true) ?
                        <CampusSelector 
                            location={ location }
                        />
                    : undefined
                }

                <Navbar.Toggle aria-controls="global-navbar-nav" />

                <Navbar.Collapse className="c-global__top p-0 justify-content-end" id="global-navbar-nav">
                    <Nav>
                        <FollowDropdown mailchimpUrl={config.mailChimpUrl} />
                        
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
                    ( config.menuLanguageSelector === true ) ?
                        <LanguageSelector 
                            className={`langselector`} 
                        />
                    : 
                        undefined
                }
                

            </Navbar>

        </div>
    )
}