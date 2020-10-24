// Dependencies
import React from "react"
import { graphql } from 'gatsby'
import { useTranslation } from "react-i18next"
import { Button, Accordion, Card } from 'react-bootstrap'

// Components
import './index.scss'
import HeaderPage from '../../components/headerPage'
import HeroBasic from "../../components/hero/heroBasic"
import SectionTextBasic from "../../components/content/sectionTextBasic"
import SectionEmpty from '../../components/content/sectionEmpty'
import AlertEmptyState from '../../components/alert/alertEmptyState'
import MenuSticky from "../../components/menu/menuSticky"
import ShareSection from "../../components/social/shareSection"
import SectionVideoPlayerSimple from "../../components/content/sectionVideoPlayerSimple"
import SectionSteps from "../../components/content/sectionSteps"
import SectionPhotoFormText from "../../components/form/sectionPhotoFormText"
import SectionFaqSimple from "../../components/content/sectionFaqSimple"
import HorizontalScrollingMenu from '../../components/menu/horizontalScrollingMenu'
import SectionFeedCarouselMultipleSources from '../../components/feed/sectionFeedCarouselMultipleSources'
import {smallGroupBrand, smallGroupMenu} from '../../../data/menues'

export default function SmallGroupsPage( { data, location } ) {

  /* Standard fields */
  const { t } = useTranslation()
  
  const stickyMenuLead = (t) => [
    {linkText: t('smallgroups.tab-host-sticky-about'), link: "#about_lead"},
    {linkText: t('smallgroups.tab-host-sticky-steps'), link: "#steps"},
    {linkText: t('smallgroups.tab-host-sticky-application'), link: "#application"},
    {linkText: t('smallgroups.tab-host-sticky-faq'), link: "#faq"}
  ]

  // const decorCircleWords = {
  //   top: '-220px',
  //   left: '30px'
  // }

  const playerPlaylist = (t) => [
    {
      src: t('smallgroups.tab-host-section-video-link'),
      poster: t('smallgroups.tab-host-section-video-poster'),
      skipTo: '40'
    }
  ]
  
  const leadSteps = (t) => [
    {
      id: 1, 
      title: t('smallgroups.tab-host-section-steps-one-title') , 
      text: t('smallgroups.tab-host-section-steps-one-text') , 
      photo: data.leadStepOnePhoto.publicURL
    },
    {
      id: 2, 
      title: t('smallgroups.tab-host-section-steps-two-title') , 
      text: t('smallgroups.tab-host-section-steps-two-text'), 
      photo: data.leadStepTwoPhoto.publicURL
    },
    {
      id: 3, 
      title: t('smallgroups.tab-host-section-steps-three-title'), 
      text: t('smallgroups.tab-host-section-steps-three-text'), 
      photo: data.leadStepThreePhoto.publicURL
    }
  ]

  const leadFaq = (t) => [
    {title: "", content: "", class: "d-none"},
    {
      title: t('smallgroups.tab-host-section-faq-one-title') , 
      content: t('smallgroups.tab-host-section-faq-one-content'),
    },
    {
      title: t('smallgroups.tab-host-section-faq-two-title'), 
      content: t('smallgroups.tab-host-section-faq-two-content')
    },
    
    {
      title: t('smallgroups.tab-host-section-faq-three-title'), 
      content: t('smallgroups.tab-host-section-faq-three-content')
    },
    
    {
      title: t('smallgroups.tab-host-section-faq-four-title'), 
      content: t('smallgroups.tab-host-section-faq-four-content')
    },
  ]
  

  const itemsLenght = data.news.nodes.length + data.events.nodes.length

  return (
    <>

        <HeaderPage 
            title={t('smallgroups.title')} 
            location={location} 
            cover={data.heroImage.publicURL}
            description={t('smallgroups.meta-description')}
            article={true}
        />

        <HorizontalScrollingMenu
            menuBrand={smallGroupBrand}
            menu={smallGroupMenu}
        />

        <HeroBasic
          title={t('smallgroups.hero')}
          subtitle={t('smallgroups.hero-subtitle')}
          backgroundPhoto={data.heroImage.publicURL}
          className={"c-hero position-relative z-index-1"}
          >
            <Button className="btn btn--animation btn--three" variant="none" href="#application" target="_self">
                {t('smallgroups.host-a-group')}
            </Button>
        </HeroBasic>

      <div className="p-0 position-relative z-index-2">

                  <SectionTextBasic id={'leaders-intro'} title={t('smallgroups.tab-host-section-intro-title')}>
                    {t('smallgroups.tab-host-section-intro-content')}
                  </SectionTextBasic>

                  <hr/>

                  {
                    ( itemsLenght > 0 ) ?
                      <SectionFeedCarouselMultipleSources
                        title = {t('smallgroups.tab-host-section-news-title')}
                        id="news"
                        className="h-background-gray-one"
                        itemsNews={data.news}
                        itemsEvents={data.events}
                        slugOne = "/news/"
                        slugTwo = "/events/"
                        itemsVisible = {3}
                      />
                    : 
                      <SectionEmpty 
                        className="h-background-gray-one" 
                        title = {t('smallgroups.tab-host-section-news-title')} 
                        id="news"
                      >
                        <AlertEmptyState variant="transparent" className="mt-5" content="" />
                      </SectionEmpty>
                  }

                  <MenuSticky link={"#application"} linkText={t('smallgroups.apply-now')} menuLinks={stickyMenuLead(t)}></MenuSticky>
                  
                  <SectionVideoPlayerSimple 
                      id="about_lead" 
                      title={t('smallgroups.tab-host-section-player-title')}
                      playerId={"smallgrouplead"}
                      playerPlaylist={playerPlaylist(t)}
                  />

                  <SectionSteps 
                    title={t('smallgroups.tab-host-section-steps-title')}
                    text={t('smallgroups.tab-host-section-steps-content')}
                    steps={leadSteps(t)}
                    id={'steps'}
                    link="#application"
                    linkText={t('smallgroups.apply-now')}>
                      <Accordion className="accordionIndicator mt-5" defaultActiveKey="0">
                        <Card>
                          <Card.Header className="accordion-header font-weight-bolder h-cursor-pointer h5">
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                              {t('smallgroups.tab-host-section-steps-faq-title')}
                            </Accordion.Toggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey="0">
                            <Card.Body dangerouslySetInnerHTML={{__html: t('smallgroups.tab-host-section-steps-faq-content')}}></Card.Body>
                          </Accordion.Collapse>
                        </Card>
                      </Accordion>
                  </SectionSteps>     

                  <SectionPhotoFormText
                    id={"application"}
                    formTitle={t('smallgroups.tab-host-section-form-title')}
                    formContent={t('smallgroups.tab-host-section-form-content')}
                    formIframeUrl={t('smallgroups.tab-host-section-form-iframe')}
                    photoClassName={"h-background-one"}
                    photoImageBackground={data.applicationFormPhoto.publicURL}
                    photoContentTitle={t('smallgroups.tab-host-section-form-content-title')}
                    photoContentText={t('smallgroups.tab-host-section-form-content-text')}
                    backgroundClassName={"h-background-six"}
                  />

                  <SectionFaqSimple
                    id={"faq"}
                    title={t('smallgroups.tab-host-section-faq-title')}
                    data={leadFaq(t)}
                    defaultActiveKey={0}
                  ></SectionFaqSimple>

        <ShareSection 
          className="h-background-one"
          id="share"
          title={t('smallgroups.share-title')}
          subtitle={t('smallgroups.share-content')} 
          photo={data.backgroundShare.childImageSharp.fluid}
          variant="light"
        />

      </div>

    </>
  )
}


export const query = graphql`
  query{

    backgroundShare: file(relativePath: {eq: "img/smallgroups/share_background.jpg"}) {  
      childImageSharp {
        fluid {
          src
        }
      }            
    }

    news: allWpNewspost(filter: {terms: {nodes: {elemMatch: {slug: {in: "small-groups-host"}}}}, status: {eq: "publish"}}, sort: {fields: date, order: DESC}, limit: 3) {
      nodes {
        title
        excerpt
        slug
        date(formatString: "YYYYMMDD")
        featuredImage {
            node {
                localFile {
                  childImageSharp {
                    fluid {
                      src
                    }
                  }
                }
            }
        }
      }
    }

    events: allWpEvent(filter: {terms: {nodes: {elemMatch: {slug: {in: "small-groups-host"}}}}, status: {eq: "publish"}}, sort: {fields: date, order: DESC}, limit: 3) {
      nodes {
        title
        excerpt
        slug
        date(formatString: "YYYYMMDD")
        eventDetails {
            eventAddress
            eventCampus {
                ... on WpCampus {
                    id
                    title
                    slug
                }
            }
            eventDates {
                eventDate
                time
            }
            eventLink {
                eventLinkText
                eventLinkUrl
            }
        }
        featuredImage {
            node {
                localFile {
                  childImageSharp {
                    fluid {
                      src
                    }
                  }
                }
            }
        }
      }
    }

      heroImage: file(relativePath: {eq: "img/smallgroups/Background.jpg"}) {
            childImageSharp {
                fluid {
                    src
                }
            }
            publicURL
      }
      leadStepOnePhoto: file(relativePath: {eq: "img/smallgroups/step_01_v2@2x.jpg"}) {
          childImageSharp {
              fluid {
                  src
              }
          }
          publicURL
      }
      leadStepTwoPhoto: file(relativePath: {eq: "img/smallgroups/step_02_v2@2x.jpg"}) {
          childImageSharp {
              fluid {
                  src
              }
          }
          publicURL
      }
      groupOnePhoto: file(relativePath: {eq: "img/smallgroups/groups-photo-online-groups.jpg"}) {
          childImageSharp {
              fluid {
                  src
              }
          }
          publicURL
      }
      leadStepThreePhoto: file(relativePath: {eq: "img/smallgroups/step_03_v2@2x.jpg"}) {
          childImageSharp {
              fluid {
                  src
              }
          }
          publicURL
      }
      groupTwoPhoto: file(relativePath: {eq: "img/smallgroups/groups-photo-single-groups.jpg"}) {
          childImageSharp {
              fluid {
                  src
              }
          }
          publicURL
      }
      groupThreePhoto: file(relativePath: {eq: "img/smallgroups/groups-photo-care-groups.jpg"}) {
          childImageSharp {
              fluid {
                  src
              }
          }
          publicURL
      }
      leadNewsPhoto: file(relativePath: {eq: "img/smallgroups/photo_news_01_v2@2x.jpg"}) {
          childImageSharp {
              fluid {
                  src
              }
          }
          publicURL
      }
      joinNewsPhoto: file(relativePath: {eq: "img/smallgroups/photo_news_join_01_v2@2x.jpg"}) {
          childImageSharp {
              fluid {
                  src
              }
          }
          publicURL
      }
      applicationFormPhoto: file(relativePath: {eq: "img/smallgroups/photo_03@2x.jpg"}) {
          childImageSharp {
              fluid {
                  src
              }
          }
          publicURL
      }
      leadNewsIcon: file(relativePath: {eq: "img/global/icon-news-white.svg"}) {
        publicURL
      }
      leadEventIcon: file(relativePath: {eq: "img/global/icon-calendar-white.svg"}) {
        publicURL
      }
      iconCheckboxWhite: file(relativePath: {eq: "img/global/icon-checkbox-white.svg"}) {
        publicURL
      }
      testimonialPhotoAdele: file(relativePath: {eq: "img/smallgroups/Adele.jpg"}) {
            childImageSharp {
                fluid {
                    src
                }
            }
            publicURL
      }
      testimonialPhotoConsuela: file(relativePath: {eq: "img/smallgroups/Consuela.jpg"}) {
            childImageSharp {
                fluid {
                    src
                }
            }
            publicURL
      }
      testimonialPhotoDeweyHom: file(relativePath: {eq: "img/smallgroups/DeweyHom.jpg"}) {
            childImageSharp {
                fluid {
                    src
                }
            }
            publicURL
      }
      testimonialPhotoJanise: file(relativePath: {eq: "img/smallgroups/Janise.jpg"}) {
            childImageSharp {
                fluid {
                    src
                }
            }
            publicURL
      }
      testimonialPhotoMeaghan: file(relativePath: {eq: "img/smallgroups/Meaghan.jpg"}) {
            childImageSharp {
                fluid {
                    src
                }
            }
            publicURL
      }
      testimonialPhotoTodd: file(relativePath: {eq: "img/smallgroups/Todd.jpg"}) {
            childImageSharp {
                fluid {
                    src
                }
            }
            publicURL
      }
  }
`