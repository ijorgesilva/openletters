// Dependecies
import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'

// Components
import LanguageSelector from './languageSelector'
import FollowDropdown from './followDropdown'
import DropdownMenu from './dropdownMenu'
import CampusSelector from './CampusSelector'
import "./menuGlobal.scss"

export default function MenuGlobal( props ){

    return (
        <>
            {/* <!-- Global Navigation --> */}
            <div className={`menuGlobal ${props.className}`}>

                <Navbar className="navglobal container-fluid" bg="bg-transparent" expand="lg">

                    <CampusSelector 
                        campuses={props.menuCampusSelector} 
                        />

                    <Navbar.Toggle aria-controls="global-navbar-nav" />

                    <Navbar.Collapse className="c-global__top p-0 justify-content-end" id="global-navbar-nav">
                        <Nav className="">
                            <FollowDropdown mailchimpUrl={"https://victoryatl.us6.list-manage.com/subscribe/post?u=3b7891d118a85a8202d7cead5&id=8a2be25566"} />
                            <DropdownMenu data={props.helpMenu} title={"Need help?"}></DropdownMenu>
                            <DropdownMenu data={props.giveMenu} title={"Give"}></DropdownMenu>
                        </Nav>
                    </Navbar.Collapse>

                    <LanguageSelector className={`langselector`} />

                </Navbar>

            </div>
        </>
    )
}