import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { useCampuses } from '../../hooks/useCampuses'
import { useTheme } from '../../hooks/useTheme'
import SearchModal from '../search/modal'

import CampusSelector from './campusSelector'
import LanguageSelector from './languageSelector'
import MenuAuth from './menuAuth'
import MegaMenu from './menuLocal/megaMenu'
import MenuLink from './menuLocal/menuLink'
import RegularMenu from './menuLocal/regularMenu'

import './menuMain.scss'

export default function MenuMain ( 
    { 
        campus, 
        mode,
        menu, // Array: Menu items
        className,
        id,
        collapse, // Flag: If true then the three bar icon will shown on mobile
        menuLocation, // Menu configuration. Params: top and main.
        campusSelector, // Flag: Shows the Campus dropdown
        languageSelector, // Flag: Shows the language dropdown
        search, // Flag: Shows the search function
        searchIndices, // Algolia search indices
        auth, // Flag: Shows the Auth Icon
        location,
        alignRight, // Align Menu to Right
    } 
    ) {

    const { t } = useTranslation()

    const collapsible = collapse ? collapse : false

    const currentCampus     = useCampuses( campus )
    const theme             = useTheme()

    const campusLogoUrl =   ( currentCampus.campusDetails?.campusBrand?.campusBrandUrl ) ?
                                currentCampus.campusDetails.campusBrand.campusBrandUrl    
                            :
                                '/' + campus

    const campusLogo    =   theme.graphics.logo ?
                                theme.graphics.logo
                            :
                                currentCampus.campusDetails.campusBrand.campusBrandLogo?.localFile.publicURL ?
                                    currentCampus.campusDetails.campusBrand.campusBrandLogo?.localFile.publicURL
                                :
                                    undefined

    const campusLogoStyle = {
        backgroundImage: 'url('+ campusLogo +')',
    }

    return (
        <Navbar 
            className   = {`navlocal container-fluid ${ menuLocation ? menuLocation : 'main' } ${ mode ? mode : 'light' } ${ className ? className : ''}`}         
            id          = { id }
            bg          = { mode ? mode : 'light' } 
            variant     = { mode ? mode : 'light' } 
            expand      = 'lg' 
        >

            {
                menuLocation === 'main' ?
                    <Navbar.Brand
                        rel         = 'home'
                        to          = { campusLogoUrl }
                        href        = { campusLogoUrl }
                        title       = { currentCampus.title + ' ' + t('global.home-page')}
                        className   = {`${( campusLogo === undefined ) ? '' : 'text-hide' } navbar-brand font-weight-bold d-block navbrand`} 
                        style       = { campusLogoStyle }
                    >
                        { currentCampus.title }
                    </Navbar.Brand>
                : undefined
            }

            {
                campusSelector && menuLocation === 'top'?
                    <CampusSelector 
                        location    = { location }
                        className   = 'mr-auto'
                        mode        = { mode }
                    />
                : 
                    undefined
            }

            {
                collapsible ?
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' className={`navbar-${ mode ? mode : 'light'}`}>
                        <FontAwesomeIcon icon={faBars} size='md' />
                    </Navbar.Toggle>
                :
                    undefined
            }

            <Navbar.Collapse className={`mainnav`} id='responsive-navbar-nav'>
                <Nav className={`navbarmenu`}>
                    { 
                        menu?.length > 0 ?
                            menu.map( (_, index) => 
                                (
                                    _.submenu ?
                                        (_.megamenu === true) ?
                                            <MegaMenu 
                                                className   = {`${_.class ? _.class : ''}`} 
                                                key         = {index} 
                                                content     = {_.submenu} 
                                                title       = {_.name} 
                                                index       = {_.index}
                                                columns     = {_.columns}
                                                mode        = { mode }
                                            />
                                        : 
                                            <RegularMenu 
                                                className   = {`${_.class ? _.class : ''}`} 
                                                key         = {index} 
                                                menu        = {_.submenu}
                                                title       = {_.name} 
                                                index       = {_.index}
                                                alignRight  = { alignRight }
                                                mode        = { mode }
                                            />
                                    : 
                                        <MenuLink 
                                            key         = {index} 
                                            className   = {`${_.class ? _.class : ''}`} 
                                            content     = {_.submenu} 
                                            name        = {_.name} 
                                            type        = {_.type} 
                                            link        = {_.link} 
                                            target      = {_.target}
                                            iframe      = {_.iframe} 
                                            iframeTitle = {_.iframeTitle} 
                                            mode        = { mode }
                                        />
                                )
                            )
                        : undefined
                    }
                </Nav>
            </Navbar.Collapse>
            {
                languageSelector && menuLocation === 'top' ?
                    <LanguageSelector 
                        className ={`langselector`}
                    />
                : 
                    undefined
            }
            
            {
                ( searchIndices?.length > 0 && search && menuLocation === 'top' ) ? 
                    <SearchModal 
                        indices = { searchIndices } 
                        mode    = { mode }
                    />
                :
                    undefined
            }

            {
                auth && menuLocation === 'top' ?
                    <MenuAuth 
                        mode    = { mode }
                    />
                : undefined
            }

        </Navbar>
    )
}

