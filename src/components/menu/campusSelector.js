import { navigate } from 'gatsby'
import React from 'react' //ContextProviderComponent
import { useState } from 'react'
import Select from 'react-select'
import Cookies from 'universal-cookie'

import { useCampuses } from '../../hooks/useCampuses'
import { useWebsiteConfiguration } from '../../hooks/useWebsiteConfiguration'
// import ContextConsumer from '../../provider/context'

import './campusSelector.scss'

export default function CampusSelector( { className, location, mode } ) {

    let initialCampus
    const cookies = new Cookies()
    const defaultCampus = useWebsiteConfiguration().settingsDefaultCampus
    // const contextData = useContext( ContextConsumer )

    // Getter Campuses and Formatter
    const campusesData = useCampuses()
    const campuses = []
    if(campusesData?.length > 0) {
        campusesData.forEach ( campus => {
            campuses.push(
                {
                    "value": campus.slug, 
                    "label": campus.title, 
                    "link": ( campus.campusDetails.campusSelector ) ? 
                                campus.campusDetails.campusSelector.campusSelectorHome.campusHomeUrl 
                            : 
                                '/' + campus.slug,
                    "visibility": campus.campusDetails.campusConfiguration.campusConfigurationVisibility,
                    "logo": campus.featuredImage?.node ? 
                                campus.featuredImage.node.localFile.childImageSharp.gatsbyImageData 
                            : 
                                '',
                    "target": campus.campusDetails.campusSelector.campusSelectorHome.campusHomeTarget,
                    "style": (campus.slug === defaultCampus.slug) ? 
                                {} 
                            : 
                                {
                                    'fontWeight': 'bolder',
                                    'backgroundColor': 'white',
                                    'color': 'white',
                                },
                }
            )
        })
    }
    
    // Set initial Campus
    initialCampus = setInitialCampus( location, defaultCampus )

    function setInitialCampus( location, defaultCampus ) {
        
        let currentCampus
        let currentUrl          =  location.pathname.split( '/' )
        let currentCampusState  = ''//( contextData?.data?.currentCampus ) ? contextData.data.currentCampus : undefined
        let currentCampusCookie = ( campuses.find( x => x.value === cookies.get('campus') ) ) ? true : false

        // Current Campus Resolver
        if ( currentCampusState ) {
            currentCampus = { 
                value: currentCampusState,
                label: campuses.find( x => x.value === currentCampusState ).label
            }
        }
        else if ( currentUrl.length > 2 && campuses.find( x => x.value === currentUrl[1] ) ) {
            currentCampus = { 
                value: currentUrl[1], 
                label: campuses.find( x => x.value === currentUrl[1] ).label,
            }
        }
        else if ( currentCampusCookie ) {
            currentCampus = { 
                value: cookies.get('campus'), 
                label: campuses.find( x => x.value === cookies.get('campus') ).label,
            }
        }
        else {
            currentCampus = { 
                value: defaultCampus.slug,
                label: defaultCampus.title
            }
        }

        // Current Campus State Setter
        // if( currentCampusState === undefined || currentCampusState === '' ) {
        //     if ( currentCampus.slug != currentCampusState ) {
        //         contextData.set({currentCampus: currentCampus.value})
        //     }
        //     else {
        //         contextData.set({currentCampus: defaultCampus.slug})
        //     }
        // }

        // Current Campus Cookie creation
        if( cookies.get( 'campus' ) === undefined && campuses.find( x => x.value === currentUrl[1] ) ){
            cookies.set( 'campus' , currentCampus.value, { path: '/' } )
        }
        else {
            cookies.set( 'campus' , currentCampus.value, { path: '/' } )
        }

        return currentCampus
    }

    // Handle Local State
    const [ selectedOption, setOption ] = useState ( initialCampus )
    function handleChange(option){
        setOption( option )
        
        // contextData.set({currentCampus: option.value})

        if(option.link) { 
            if ( option.target === '_blank') {
                window.open( option.link , "_blank")
            } else {
                navigate( option.link, { state: {option} })
            }
            cookies.set( 'campus' , option.value, { path: '/' } )
        }
        if( option.link === undefined) {
            cookies.set( 'campus' , option.value, { path: '/' } )
        }
    }

    // React Selector Style
    const selectedCampus = ( style ) => ({
        alignItems: 'center',
        display: 'flex',
        backgroundColor: style?.backgroundColor,
        color: style?.color,
        fontWeight: style?.fontWeight
    })

    const colorStyles = {
        option: (styles, { data }) => {
            return {
                ...styles,
                backgroundColor: data.style?.backgroundColor,
            }
        },
        singleValue: (styles, { data }) => (
            { 
                ...styles, 
                ...selectedCampus(data.style) 
            }
        ),
    }
    
    return(
        <>
            <Select 
                className       = {`campusSelector ${ (className) ? className : '' } ${ ( mode ) ? mode : 'light' }`}
                classNamePrefix = "item"
                value           = { selectedOption }
                defaultValue    = { defaultCampus.value }
                onChange        = { option => handleChange(option) }
                options         = { campuses.filter( item => ( item.visibility === true ) ) }
                styles          = { colorStyles }
            />
        </>
    )
}
