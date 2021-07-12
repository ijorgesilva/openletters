// Dependencies
import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Link } from "gatsby"
import { Dropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { faHandSparkles } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// Styles
import './raiseHand.scss'

export default function RaiseHand ( { className, dropDirection, variant, options } ) {
    
    /* Standard fields */
    const { t } = useTranslation()

    const drop          = ( dropDirection ) ? dropDirection : 'up'
    const variantClass  = ( variant ) ? variant : 'dark'
    
    if ( options ) {
        return (

            <Dropdown 
                className={`raiseHand ${ ( className ) ? className : ''} ${ ( variantClass ) ? variantClass : ''}`} 
                drop={drop}
            >

                <Dropdown.Toggle className='toggler' id="Share" variant="none" >
                    <FontAwesomeIcon 
                        className="icon" 
                        icon={faHandSparkles} 
                        size="lg" 
                    />
                    <span>{t('global:global.participation.raisehand.title')}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="">
                    <Dropdown.ItemText className="user-select-none">
                        <strong>{t('global:global.participation.raisehand.dropdown-text')}</strong>
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