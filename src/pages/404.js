import React from "react"
import { Helmet } from "react-helmet"
import { useTranslation } from "react-i18next"
import { Button } from 'react-bootstrap'

import HeroBasic from "../components/hero/heroBasic"
import heroImage from "../assets/img/smallgroups/Background.jpg";

export default function Home(props) {

  const { t } = useTranslation()

  return (

    <>
      <Helmet>
          <meta charSet="utf-8" />
          <title>{t('global.404-title')}</title>
          <meta name="description" content="Helmet application" />
      </Helmet>

      <HeroBasic
        title={t('global.404-title')}
        subtitle={t('global.404-description')}
        backgroundPhoto={heroImage}
        className={"c-hero position-relative z-index-1"}
        >
          <Button className="btn btn--animation btn--light-outline ml-3" variant="none" href="/" target="_self">
            {t('global.404-go-back')}
          </Button>
      </HeroBasic>

    </>

  )
}
