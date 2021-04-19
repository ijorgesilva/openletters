// // Dependencies
// import React from 'react'
// import Cookies from 'universal-cookie'

// import { useWebsiteConfiguration } from './useWebsiteConfiguration'
// import { useCampuses } from './useCampuses'

// export function useInitialCampus( location ) {
        
//     const cookies = new Cookies()

//     let currentCampus
//     let campusExist
//     let currentUrl =  location.pathname.split( '/' )

//     const campuses = []
//     const campusesData = useCampuses()
//     const defaultCampus = useWebsiteConfiguration().settingsDefaultCampus

//     if(campusesData?.length > 0) {
//         campusesData.forEach ( campus => {
//             campuses.push(
//                 {
//                     "value": campus.slug, 
//                     "label": campus.title, 
//                     "link": ( campus.campusDetails.campusHome ) ? 
//                                 campus.campusDetails.campusHome.campusHomeUrl 
//                             : 
//                                 '/' + campus.slug,
//                     "visibility": campus.campusDetails.campusConfiguration.campusConfigurationVisibility,
//                     "logo": ( campus.featuredImage?.node?.localFile ) ? 
//                                 campus.featuredImage.node.localFile.childImageSharp.gatsbyImageData 
//                             : 
//                                 '',
//                     "style": (campus.slug === defaultCampus.slug) ? 
//                                 {} 
//                             : 
//                                 {
//                                     'fontWeight': 'bolder',
//                                     'backgroundColor': 'var(--color-white)',
//                                     'color': 'var(--color-white)',
//                                 },
//                 }
//             )
//         })
//     }
    
//     if( currentUrl.length > 2 ){ 
//         if( campuses.find( x => x.value === currentUrl[1] ) ){
//             if ( cookies.get( 'campus' ) === undefined ) {
//                 if( currentUrl[1] === defaultCampus.slug) {
//                     currentCampus = { 
//                                         value: defaultCampus.slug,
//                                         label: defaultCampus.title
//                                     }
//                     cookies.set( 'campus' , defaultCampus.slug, { path: '/' } )
//                 }
//                 else {
//                     currentCampus = { 
//                         value: currentUrl[1], 
//                         label: campuses.find( x => x.value === currentUrl[1] ).label,
//                     }
//                     cookies.set( 'campus' , currentUrl[1], { path: '/' } )
//                 }
//             } else {
//                 campusExist = ( campuses.find( x => x.value === cookies.get('campus') ) ) ? true : false
//                 if ( campusExist ){
//                     if ( cookies.get('campus') === currentUrl[1] ){
//                         currentCampus = { 
//                             value: cookies.get('campus'), 
//                             label: campuses.find( x => x.value === cookies.get('campus') ).label,
//                         }
//                     }
//                     else {
//                         cookies.set( 'campus' , currentUrl[1], { path: '/' } )
//                         currentCampus = { 
//                             value: currentUrl[1], 
//                             label: campuses.find( x => x.value === currentUrl[1] ).label,
//                         }
//                     }
//                 }
//                 else {
//                     currentCampus = { 
//                         value: defaultCampus.slug,
//                         label: defaultCampus.title
//                     }
//                     cookies.set( 'campus' , defaultCampus.slug, { path: '/' } )
//                 }
//             }
//         }

//     }
//     else {
//         if ( cookies.get( 'campus' ) === undefined ) {
//             currentCampus = { 
//                 value: defaultCampus.slug,
//                 label: defaultCampus.title
//             }
//             cookies.set( 'campus' , defaultCampus.slug, { path: '/' } )
//         }
//         else {
//             currentCampus = { 
//                 value: cookies.get('campus'), 
//                 label: campuses.find( x => x.value === cookies.get('campus') ).label,
//             }
//         }
//     }

//     return currentCampus
// }
