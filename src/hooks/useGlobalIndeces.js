import { useStaticQuery, graphql } from 'gatsby'

export const useGlobalIndeces = ( ) => {

    const { wp } =  useStaticQuery(
        graphql`
            {
                wp {
                    websiteGeneralSettings {
                        websiteSettings {
                            settingsSearch {
                                settingsSearchFunctions {
                                    settingsSearchFunctionsSeriesActive
                                    settingsSearchFunctionsVideosActive
                                    settingsSearchFunctionsPagesActive
                                    settingsSearchFunctionsPostsActive
                                    settingsSearchFunctionsEventsActive
                                    settingsSearchFunctionsNewsActive
                                    settingsSearchFunctionsAttachmentsActive
                                    settingsSearchFunctionsMinistriesActive
                                    settingsSearchFunctionsCoursesActive
                                    settingsSearchFunctionsGroupTypesActive
                                    settingsSearchFunctionsGroupsActive
                                    settingsSearchFunctionsVolunteeringActive
                                }
                            }
                        }
                    }
                }
            }
        `
    )  
    let indexes = []
    let searchFunctions = ( wp.websiteGeneralSettings.websiteSettings.settingsSearch.settingsSearchFunctions ) ?
                                wp.websiteGeneralSettings.websiteSettings.settingsSearch.settingsSearchFunctions
                            :
                                undefined
    
    if( searchFunctions?.settingsSearchFunctionsSeriesActive === true ){
        indexes.push( { name: `series`, title: `Series` } )
    }
    if( searchFunctions?.settingsSearchFunctionsPagesActive === true ){
        indexes.push( { name: `pages`, title: `Pages` } )
    }
    if( searchFunctions?.settingsSearchFunctionsVideosActive === true ){
        indexes.push( { name: `videos`, title: `Messages` } )
    }
    if( searchFunctions?.settingsSearchFunctionsPostsActive === true ){
        indexes.push( { name: `posts`, title: `Posts` } )
    }
    if( searchFunctions?.settingsSearchFunctionsEventsActive === true ){
        indexes.push( { name: `events`, title: `Events` } )
    }
    if( searchFunctions?.settingsSearchFunctionsNewsActive === true ){
        indexes.push( { name: `news`, title: `News` } )
    }
    if( searchFunctions?.settingsSearchFunctionsAttachmentsActive === true ){
        indexes.push( { name: `attachments`, title: `Attachments` } )
    }
    if( searchFunctions?.settingsSearchFunctionsMinistriesActive === true ){
        indexes.push( { name: `ministries`, title: `Ministries` } )
    }
    if( searchFunctions?.settingsSearchFunctionsCoursesActive === true ){
        indexes.push( { name: `courses`, title: `Courses` } )
    }
    if( searchFunctions?.settingsSearchFunctionsGroupTypesActive === true ){
        indexes.push( { name: `groupTypes`, title: `Group Types` } )
    }
    if( searchFunctions?.settingsSearchFunctionsGroupsActive === true ){
        indexes.push( { name: `groups`, title: `Groups` } )
    }
    if( searchFunctions?.settingsSearchFunctionsVolunteeringActive === true ){
        indexes.push( { name: `volunteering`, title: `Volunteering` } )
    }
    
    return indexes
}