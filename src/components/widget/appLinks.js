import React from "react"


import appStoreIcon from "../../assets/img/global/Download_on_the_App_Store_Badge.svg"
import playStoreIcon from "../../assets/img/global/Google_Play_Store_badge_EN.svg"

export default function AppLinks ( { className, appStoreUrl, playStoreUrl } ){
    return (
        <div className={`${ ( className ) ? className + ' ' : ''}applinks`}>

            <a href={ appStoreUrl } 
                title="Download on App Store" 
                target="_blank" 
                rel="noreferrer"
                alt="Download on App Store"
            > 
                <img src={appStoreIcon} width="150" alt="Apple App" /> 
            </a>

            <a 
                href={ playStoreUrl } 
                title="Get it on the Play Store" 
                target="_blank" 
                rel="noreferrer" 
                alt="Get it on the Play Store"
            > 
                <img src={playStoreIcon} width="150" alt="Android App" /> 
            </a>

        </div>
    )
}