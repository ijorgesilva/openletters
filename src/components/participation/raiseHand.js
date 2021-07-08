// Dependencies
import React from 'react'
import { StaticImage, GatsbyImage } from 'gatsby-plugin-image'
import { Dropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { faHandSparkles } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// Components
import { useParticipation } from '../../hooks/useParticipation'

// Styles
import './raiseHand.scss'

export default function RaiseHand ( { className, dropDirection, variant } ) {

    const options = useParticipation().participationRaisehand.participationRaisehandCustom
    
    /* Standard fields */
    const { t } = useTranslation()

    const drop          = ( dropDirection ) ? dropDirection : 'up'
    const variantClass  = ( variant ) ? variant : 'dark'
    
    return (

        <Dropdown 
            className={`netSimple ${ ( className ) ? className : ''} ${ ( variantClass ) ? variantClass : ''}`} 
            drop={drop}
        >

            <Dropdown.Toggle className='toggler' id="Share" variant="none" >
                <FontAwesomeIcon icon={faHandSparkles} size="lg" />
                <span>Raise Hand</span>
                {/* <img src={data.handraise.publicURL} alt={t('components.button.netSimple-title')} /> */}
            </Dropdown.Toggle>

            <Dropdown.Menu className="">
                <Dropdown.ItemText className="user-select-none">
                    <strong>I want to</strong>
                </Dropdown.ItemText>
                {
                    options.map( (option, index) => (
                        ( option.participationRaisehandCustomType.split(":")[0] === 'internal' ) ?
                            undefined
                        :
                            ( option.participationRaisehandCustomType.split(":")[0] === 'external' ) ?
                                <Dropdown.Item 
                                    href        = {option.participationRaisehandCustomUrl} 
                                    eventKey    = {index} 
                                    key         = {index}
                                >
                                    {option.participationRaisehandCustomTitle}
                                </Dropdown.Item>
                            :
                                undefined
                    ))
                }
            </Dropdown.Menu>

        </Dropdown>
    
    )
}