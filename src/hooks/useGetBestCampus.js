
export const useGetBestCampus = ( currentCampus, availableCampuses ) => {
    
    let campus
    
    switch ( true ) {
        case currentCampus && availableCampuses?.length > 0:
            campus = availableCampuses.find( x => x.slug === currentCampus ).slug
            break;

        case !currentCampus && availableCampuses?.length > 0:
            campus = availableCampuses[0].slug
            break;

        default:
            campus = ''
            break;
    }

    return campus
}