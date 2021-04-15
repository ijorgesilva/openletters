// Dependencies
import React from 'react'
import { useState } from 'react'
import { navigate } from 'gatsby'
import Select from 'react-select'
import Cookies from 'universal-cookie'

// Components
import { useWebsiteConfiguration } from '../../hooks/useWebsiteConfiguration'
import { useCampuses } from '../../hooks/useCampuses'
import './campusSelector.scss'

export default function CampusSelector( { location } ) {
    
    let initialCampus
    const cookies = new Cookies()
    const campuses = []
    const campusesData = useCampuses()
    const defaultCampus = useWebsiteConfiguration().settingsDefaultCampus

    if(campusesData?.length > 0) {
        campusesData.forEach ( campus => {
            campuses.push(
                {
                    "value": campus.slug, 
                    "label": campus.title, 
                    "link": ( campus.campusDetails.campusHome ) ? 
                                campus.campusDetails.campusHome.campusHomeUrl 
                            : 
                                '/' + campus.slug,
                    "visibility": campus.campusDetails.campusConfiguration.campusConfigurationVisibility,
                    "logo": ( campus.featuredImage?.node?.localFile ) ? 
                                campus.featuredImage.node.localFile.childImageSharp.gatsbyImageData 
                            : 
                                '',
                    "style": (campus.slug === defaultCampus.slug) ? 
                                {} 
                            : 
                                {
                                    'fontWeight': 'bolder',
                                    'backgroundColor': 'var(--color-white)',
                                    'color': 'var(--color-white)',
                                },
                }
            )
        })
    }
    
    // Set initial Campus
    initialCampus = setInitialCampus( location, defaultCampus )

    function setInitialCampus( location, defaultCampus ) {
        
        let currentCampus
        let campusExist
        let currentUrl =  location.pathname.split( '/' )

        if( currentUrl.length > 2 ){ 
            if( campuses.find( x => x.value === currentUrl[1] ) ){
                if ( cookies.get( 'campus' ) === undefined ) {
                    if( currentUrl[1] === defaultCampus.slug) {
                        currentCampus = { 
                                            value: defaultCampus.slug,
                                            label: defaultCampus.title
                                        }
                        cookies.set( 'campus' , defaultCampus.slug, { path: '/' } )
                    }
                    else {
                        currentCampus = { 
                            value: currentUrl[1], 
                            label: campuses.find( x => x.value === currentUrl[1] ).label,
                        }
                        cookies.set( 'campus' , currentUrl[1], { path: '/' } )
                    }
                } else {
                    campusExist = ( campuses.find( x => x.value === cookies.get('campus') ) ) ? true : false
                    if ( campusExist ){
                        if ( cookies.get('campus') === currentUrl[1] ){
                            currentCampus = { 
                                value: cookies.get('campus'), 
                                label: campuses.find( x => x.value === cookies.get('campus') ).label,
                            }
                        }
                        else {
                            cookies.set( 'campus' , currentUrl[1], { path: '/' } )
                            currentCampus = { 
                                value: currentUrl[1], 
                                label: campuses.find( x => x.value === currentUrl[1] ).label,
                            }
                        }
                    }
                    else {
                        currentCampus = { 
                            value: defaultCampus.slug,
                            label: defaultCampus.title
                        }
                        cookies.set( 'campus' , defaultCampus.slug, { path: '/' } )
                    }
                }
            }

        }
        else {
            if ( cookies.get( 'campus' ) === undefined ) {
                currentCampus = { 
                    value: defaultCampus.slug,
                    label: defaultCampus.title
                }
                cookies.set( 'campus' , defaultCampus.slug, { path: '/' } )
            }
            else {
                currentCampus = { 
                    value: cookies.get('campus'), 
                    label: campuses.find( x => x.value === cookies.get('campus') ).label,
                }
            }
        }
        return currentCampus
    }

    const [ selectedOption, setOption ] = useState ( initialCampus )

    function handleChange(option){
        setOption( option )
        if(option.link) { 
            navigate( option.link, { state: {option} }) 
            cookies.set( 'campus' , option.value, { path: '/' } )
        }
        if( option.link === undefined) {
            cookies.set( 'campus' , option.value, { path: '/' } )
        }
    }

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
        <Select 
            className       = "campusSelector"
            classNamePrefix = "item"
            value           = { selectedOption }
            defaultValue    = { defaultCampus.value }
            onChange        = { option => handleChange(option) }
            options         = { campuses.filter( item => ( item.visibility === true ) ) }
            styles          = { colorStyles }
        />
    )
}
