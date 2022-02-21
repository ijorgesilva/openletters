import React from 'react'
import { useTranslation } from 'react-i18next'

import FooterSimpleText from '../components/footer/footerSimpleText'
import HeaderPage from '../components/headerPage'
import Navigation from '../components/menu/navigation'
import { useGlobalIndeces } from '../hooks/useGlobalIndeces'

export default function Home( { location } ) {

  const { t } = useTranslation()

  return (

    <>

      <HeaderPage
          title       = {t('global.404-title')}
          location    = { location } 
          classNameName   = '404'
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

      <div className='container'>
          <div className='row'>
              <div className='col-md-12'>
                  <div 
                    className='error-template d-flex flex-column justify-content-center align-content-center flex-wrap'
                    style={{minHeight: '600px',}}
                  >
                      <h1>{t('global.404-title')}</h1>
                      <h2>404</h2>
                      <div className='error-details'>
                        {t('global.404-description')}
                      </div>
                      <div className='error-actions'>
                          <a href='/' className='btn btn-primary btn-lg'>Home</a>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <FooterSimpleText 
          campus = { 'global' } 
          mode   = { 'dark' }
      />

    </>

  )
}