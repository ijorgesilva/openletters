// Dependencies
import React from "react"
import { useTranslation } from "react-i18next"
import { Button } from 'react-bootstrap'
import { graphql } from 'gatsby'

// Components
import HeaderPage from '../components/headerPage'
import HeroBasic from "../components/hero/heroBasic"

export default function Home( { data, location, ...props } ) {

  const { t } = useTranslation()

  return (

    <>
    
      <HeaderPage 
        title={t('global.404-title')}
        location={location} 
        cover={ ( data.poster != null ) ? data.poster.publicURL : undefined }
        description={t('global.404-description')}
      />
            

      <HeroBasic
        title={t('global.404-title')}
        subtitle={t('global.404-description')}
        backgroundPhoto={ ( data.poster != null ) ? data.poster.publicURL : undefined }
        className={"c-hero position-relative z-index-1"}
        >
          <Button className="btn btn--animation btn--light-outline ml-3" variant="none" href="/" target="_self">
            {t('global.404-go-back')}
          </Button>
      </HeroBasic>

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