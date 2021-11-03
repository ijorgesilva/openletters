import { graphql } from 'gatsby'
import React from 'react'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import FooterSimpleText from '../components/footer/footerSimpleText'
import HeaderPage from '../components/headerPage'
import HeroBasic from '../components/hero/heroBasic'
import Navigation from '../components/menu/navigation'
import { useGlobalIndeces } from '../hooks/useGlobalIndeces'

export default function Home( { data, location } ) {

  const { t } = useTranslation()

  return (

    <>


      <HeaderPage
          title       = {t('global.404-title')}
          location    = { location } 
          className   = '404'
          cover       = { ( data.poster != null ) ? data.poster.publicURL : undefined }
          description = {t('global.404-description')}
      />
            
      <Navigation
          location        = { location }
          mode            = { 'dark' }
          campus          = { 'global' }
          searchIndices   = { useGlobalIndeces() }
          menuGlobal
          menuLocal
      />
      
      <HeroBasic
        title={t('global.404-title')}
        subtitle={t('global.404-description')}
        backgroundPhoto={ ( data.poster != null ) ? data.poster.publicURL : undefined }
        className={'c-hero position-relative z-index-1'}
        >
          <Button className='ml-3' variant='none' href='/' target='_self'>
            {t('global.404-go-back')}
          </Button>
      </HeroBasic>

      <FooterSimpleText 
          campus = { 'global' } 
          mode   = { 'dark' }
      />

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