import { useStaticQuery, graphql } from 'gatsby'

export const useGlobalIndeces = ( ) => {

    const { wp } =  useStaticQuery(
        graphql`
            {
                wp {
                    websiteSettings {
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
                                }
                            }
                        }
                    }
                }
            }
        `
    )  
    let indexes = []
    let searchFunctions = ( wp.websiteSettings.websiteSettings.settingsSearch.settingsSearchFunctions ) ?
                                wp.websiteSettings.websiteSettings.settingsSearch.settingsSearchFunctions
                            :
                                undefined
    
    if( searchFunctions?.settingsSearchFunctionsPagesActive === true ){
        indexes.push( { name: `pages`, title: `Pages` } )
    }
    if( searchFunctions?.settingsSearchFunctionsVideosActive === true ){
        indexes.push( { name: `videos`, title: `Messages` } )
    }
    if( searchFunctions?.settingsSearchFunctionsSeriesActive === true ){
        indexes.push( { name: `series`, title: `Series` } )
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
    
    return indexes
}