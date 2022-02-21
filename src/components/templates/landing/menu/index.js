import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { useCampuses } from '../../../../hooks/useCampuses'
import { useTheme } from '../../../../hooks/useTheme'

export default function Menu ( 
    { 
        campus, 
        mode,
        logo,
    } 
) {

    const { t } = useTranslation()

    const currentCampus     = useCampuses( campus )
    const theme             = useTheme()

    const campusLogo    =   logo?.images?.fallback.src ?
                                logo.images.fallback.src
                            :
                                theme.graphics.logo ?
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
            className   = {`navlocal container-fluid z-index-3 ${ mode ? mode : 'light' }`}         
            bg          = { mode ? mode : 'light' } 
            variant     = { mode ? mode : 'light' } 
            expand      = 'lg' 
        >

            <Navbar.Brand
                rel         = 'home'
                title       = { currentCampus.title + ' ' + t('global.home-page')}
                className   = {`${( campusLogo === undefined ) ? '' : 'text-hide' } navbar-brand font-weight-bold d-block navbrand`} 
                style       = {campusLogoStyle}
            >
                { currentCampus.title }
            </Navbar.Brand>

            <Navbar.Collapse className={`mainnav`} id='responsive-navbar-nav'>
                <Nav className={`navbarmenu`}>
                </Nav>
            </Navbar.Collapse>

        </Navbar>
    )
}

