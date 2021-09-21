
import React from "react"
import { useTranslation } from "react-i18next"
import { Button } from 'react-bootstrap'
import { graphql } from 'gatsby'


import Navigation from '../components/menu/navigation'
import HeaderPage from '../components/headerPage'
import HeroBasic from "../components/hero/heroBasic"
import FooterSimpleText from '../components/footer/footerSimpleText'

export default function Home( { data, location } ) {

  const { t } = useTranslation()

  const searchIndices = [{ name: `vod`, title: `Messages` }, { name: `pages`, title: `Pages`} ]

  return (

    <>
    
      <HeaderPage 
        title={t('global.404-title')}
        location={location} 
        cover={ ( data.poster != null ) ? data.poster.publicURL : undefined }
        description={t('global.404-description')}
      />
            
      <Navigation
          location        = { location }
          campus          = { 'global' }
          searchIndices   = { searchIndices }
          menuGlobal
          menuLocal
      />
      
      <HeroBasic
        title={t('global.404-title')}
        subtitle={t('global.404-description')}
        backgroundPhoto={ ( data.poster != null ) ? data.poster.publicURL : undefined }
        className={"c-hero position-relative z-index-1"}
        >
          <Button className="button button--animation bbuttontbuttonn--light-outline ml-3" variant="none" href="/" target="_self">
            {t('global.404-go-back')}
          </Button>
      </HeroBasic>

      <FooterSimpleText campus={ 'global' } />
      
    </>

  )
}


export const query = graphql`
    query fourOfourPage {

        poster: file(relativePath: {eq: "img/smallgroups/Background.jpg"}) {
            publicURL
        }

    }  
`