import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from '@reach/router'

import FooterSimpleText from '../components/footer/footerSimpleText'
import Navigation from '../components/menu/navigation'
import PageHeader from '../components/pageHeader'
import { useGlobalIndeces } from '../hooks/useGlobalIndeces'

const default404 = {
  mode: 'light',
}
export default function Home() {

  const { t } = useTranslation()
  const location = useLocation()

  return (
    <>
      <PageHeader
          title       = {t('global.404-title')}
          className   = '404'
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
          hideLinks = { false }
      />

    </>
  )
}