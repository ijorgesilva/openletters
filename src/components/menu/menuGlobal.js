// Dependecies
import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'

// Components
import LanguageSelector from './languageSelector'
import FollowDropdown from './followDropdown'
import DropdownMenu from './dropdownMenu'
import CampusSelector from './CampusSelector'
import "./menuGlobal.scss"
import { config } from '@fortawesome/fontawesome-svg-core'
import '../../../data/SiteConfig'

export default function MenuGlobal( {helpMenu, giveMenu, menuCampusSelector, mailChimpUrl, className, ...props} ){

    return (
        <>
            {/* <!-- Global Navigation --> */}
            <div className={`menuGlobal ${(className) ? className : ''}`}>

                <Navbar className="navglobal container-fluid" bg="bg-transparent" expand="lg">
                    {
                        (menuCampusSelector) ?
                            <CampusSelector 
                                campuses={menuCampusSelector} 
                            />
                        : undefined
                    }

                    <Navbar.Toggle aria-controls="global-navbar-nav" />

                    <Navbar.Collapse className="c-global__top p-0 justify-content-end" id="global-navbar-nav">
                        <Nav className="">
                            {
                                (mailChimpUrl) ?
                                    <FollowDropdown mailchimpUrl={mailChimpUrl} />
                                : 
                                    (config.mailChimpUrl) ?
                                        <FollowDropdown mailchimpUrl={config.mailChimpUrl} />
                                    : undefined
                            }
                            
                            {
                                (helpMenu) ?
                                    <DropdownMenu data={helpMenu} title={"Need help?"}></DropdownMenu>
                                : undefined
                            }
                            {
                                (giveMenu) ?
                                    <DropdownMenu data={giveMenu} title={"Give"}></DropdownMenu>
                                : undefined
                            }
                        </Nav>
                    </Navbar.Collapse>

                    <LanguageSelector className={`langselector`} />

                </Navbar>

            </div>
        </>
    )
}