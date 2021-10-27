import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector';
import React, { useState, useEffect } from 'react'
import ReactFlagsSelect from 'react-flags-select';
import { useTranslation } from "react-i18next"
import Cookies from 'universal-cookie';

import './languageSelector.scss'

i18n.use(LanguageDetector).init({
    detection: {
        order: ['path', 'cookie', 'navigator', 'localStorage', 'subdomain', 'queryString', 'htmlTag'],
        lookupQuerystring: 'lang',
        lookupCookie: 'lang',
        lookupFromPathIndex: 0
    },
});

export default function LanguageSelector(props){
    
    // eslint-disable-next-line no-unused-vars
    const { t, i18n } = useTranslation()

    const options = [
        { value: 'EN', label: 'English', flag: 'US' },
        { value: 'ES', label: 'Spanish', flag: 'ES' },
    ];

    const cookies = new Cookies()

    let initialLang

    if ( cookies.get( 'lang' ) === undefined ) {
        initialLang = { value: 'EN', label: 'English', flag: 'US' }
        cookies.set( 'lang' , 'EN', { path: '/' } )
    } else {
        initialLang = { 
            value: cookies.get('lang').toUpperCase(), 
            label: options.find( x => x.value === cookies.get('lang').toUpperCase() ).label, 
            flag: options.find( x => x.value === cookies.get('lang').toUpperCase() ).flag, 
        }
    }

    const [selectedOption, setSelectedOption] = useState( initialLang );

    useEffect(() => {
        i18n.changeLanguage(initialLang.value.toLowerCase())
    },[selectedOption])

    // Get only the flags from options var
    let flags = options.map(a => a.flag);

    // Resolves the language based on the flag selection by comparing it with options var
    function onSelectFlag(countryCode){
        let lang = options.find(x => x.flag === countryCode).value
        i18n.changeLanguage(lang.toLowerCase())
        cookies.set('lang', lang.toLowerCase(), { path: '/' })
        setSelectedOption({value: lang, flag: countryCode})
    }

    return (
        <>
            <ReactFlagsSelect
                className={props.className}
                defaultCountry={selectedOption.flag}
                countries={flags}
                customLabels={{"US": 'English', "ES": "Español"}} 
                alignOptions="left"
                onSelect={onSelectFlag}
            />
        </>
    )
}