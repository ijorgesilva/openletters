// Dependencies
import React from 'react'
import { useState } from 'react'
import { navigate } from 'gatsby'
import Select from 'react-select'
import Cookies from 'universal-cookie';

// Components
import './campusSelector.scss'

export default function CampusSelector(props) {
    
    const cookies = new Cookies()

    let initialCampus

    if ( cookies.get( 'campus' ) === undefined ) {
        initialCampus = { value: 'glo', label: 'Global'}
        cookies.set( 'campus' , 'glo', { path: '/' } )
    } else {
        initialCampus = { 
            value: cookies.get('campus'), 
            label: props.campuses.find( x => x.value === cookies.get('campus') ).label,
        }
    }

    const [ selectedOption, setOption ] = useState ( initialCampus )

    function handleChange(option){
        setOption( option )
        
        if(option.link) { 
            navigate( option.link, { state: {option} }) 
        } 
        if( option.link === undefined) {
            cookies.set( 'campus' , option.value, { path: '/' } )
        }

    }

    return(
        <>
            <Select 
                className="campusSelector"
                classNamePrefix="item"
                // menuIsOpen={true}
                value={selectedOption}
                defaultValue={initialCampus.value}
                onChange={option => handleChange(option)}
                options={props.campuses}
            />
        </>
    )
}
