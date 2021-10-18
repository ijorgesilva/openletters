import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Link } from "gatsby"
import { Dropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { faHandSparkles } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import './raiseHand.scss'

export default function RaiseHand ( 
    { 
        className, 
        dropDirection, 
        mode, 
        options 
    } 
    ) {
    
    
    const { t } = useTranslation()

    const drop = ( dropDirection ) ? dropDirection : 'up'
    
    if ( options ) {
        return (

            <Dropdown 
                className={`raiseHand ${ mode ? mode : 'light' } ${ className ? className : ''}`} 
                drop={drop}
            >

                <Dropdown.Toggle className = 'toggler primary' id = "Share" variant = { mode }>
                    <FontAwesomeIcon 
                        className="icon" 
                        icon={faHandSparkles} 
                        size="lg" 
                    />
                    <span>{t('global.participation.raisehand.title')}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="">
                    <Dropdown.ItemText className="user-select-none">
                        <strong>{t('global.participation.raisehand.dropdown-text')}</strong>
                    </Dropdown.ItemText>
                    {
                        options.map( (option, index) => (
                            <Dropdown.Item 
                                as          =   {
                                                    ( option.participationRaisehandCustomType.split(":")[0] === 'internal' ) ?
                                                        Link
                                                    :
                                                        'a'
                                                }
                                to          = { option.participationRaisehandCustomUrl }
                                href        = { option.participationRaisehandCustomUrl }
                                target      = { option.participationRaisehandCustomTarget.split(":")[0] }
                                eventKey    = { index } 
                                key         = { index }
                                className   = { ( option.participationRaisehandCustomClass ) ? option.participationRaisehandCustomClass : '' }
                            >
                                {
                                    ( option.participationRaisehandCustomIcon?.localFile ) ?
                                        <GatsbyImage 
                                            image           = {option.participationRaisehandCustomIcon.localFile.childImageSharp.gatsbyImageData}
                                            className       = 'item-icon'
                                            width           = { 32 }
                                            height          = { 32 }
                                            alt             = ''
                                        />
                                    :
                                        <div className = 'item-icon'></div>
                                }
                                <span>{option.participationRaisehandCustomTitle}</span>
                            </Dropdown.Item>
                        ))
                    }
                </Dropdown.Menu>

            </Dropdown>
        
        )
    }
    else {
        return <></>
    }
}