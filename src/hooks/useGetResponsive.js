
export const useGetResponsive = ( responsive ) => {

    const responsiveConf = {
        largeDesktop: {
            breakpoint:     { 
                                max: ( responsive?.responsiveXlMax ) ? responsive.responsiveXlMax : 4000, 
                                min: ( responsive?.responsiveXlMin ) ? responsive.responsiveXlMin : 3000 
                            },
            items: ( responsive?.responsiveXlItems ) ? responsive.responsiveXlItems : 6
        },
        desktop: {
            breakpoint:     { 
                max: ( responsive?.responsiveLMax ) ? responsive.responsiveLMax : 3000, 
                min: ( responsive?.responsiveLMin ) ? responsive.responsiveLMin : 1024 
            },
            items: ( responsive?.responsiveLItems ) ? responsive.responsiveLItems : 5
        },
        tablet: {
            breakpoint:     { 
                max: ( responsive?.responsiveSMax ) ? responsive.responsiveSMax : 1024, 
                min: ( responsive?.responsiveSMin ) ? responsive.responsiveSMin : 464 
            },
            items: ( responsive?.responsiveSItems ) ? responsive.responsiveSItems : 3
        },
        mobile: {
            breakpoint:     { 
                max: ( responsive?.responsiveXsMax ) ? responsive.responsiveXsMax : 464, 
                min: ( responsive?.responsiveXsMin ) ? responsive.responsiveXsMin : 0 
            },
            items: ( responsive?.responsiveXsItems ) ? responsive.responsiveXsItems : 1
        }
    }

    return responsiveConf

}