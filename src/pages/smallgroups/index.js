import React, { useState } from "react"
import { Helmet } from "react-helmet"
import { graphql } from 'gatsby'
import { useTranslation } from "react-i18next"
import { Tab, Nav, Container, Button, Accordion, Card } from 'react-bootstrap'
import * as queryString from "query-string";
import SEO from '../../components/seo/seo'
import config from '../../../data/SiteConfig'

import HeroBasic from "../../components/hero/heroBasic"
import SectionTextBasic from "../../components/content/sectionTextBasic"
import MenuSticky from "../../components/menu/menuSticky"
import SectionPhotoText from "../../components/content/sectionPhotoText"
import TestimonialCarousel from "../../components/testimonial/testimonialCarousel"
import ShareSection from "../../components/social/shareSection"
import SectionVideoPlayerSimple from "../../components/content/sectionVideoPlayerSimple"
import SectionSteps from "../../components/content/sectionSteps"
import SectionEmpty from "../../components/content/sectionEmpty"
import BlurbHorizontal from "../../components/blurb/blurbHorizontal"
import SectionPhotoFormText from "../../components/form/sectionPhotoFormText"
import SectionFaqSimple from "../../components/content/sectionFaqSimple"
import AlertDismissibleBar from "../../components/alert/alertDismissibleBar"

export default function SmallGroupsPage( { data, websiteTitle, location } ) {

  /* Standard fields */
  const { t } = useTranslation()
  const url = location.href ? location.href : ''
  
  let pageNode = {
    excerpt: '',
    frontmatter: {
      title: 'Small Groups',
      date: '',
      cover: '/logos/logo-1024.png',
      description: t('smallgroups.meta-description'),
    }
  }

  /* Page specific content */
  const stickyMenuJoin = (t) => [
    {id: 1, linkText: t('smallgroups.tab-join-sticky-about'), link: "#about"},
    {id: 2, linkText: t('smallgroups.tab-join-sticky-grouptypes'), link: "#types"},
    {id: 3, linkText: t('smallgroups.tab-join-sticky-testimonials'), link: "#testimonials"}
  ]

  const stickyMenuLead = (t) => [
    {id: 1, linkText: t('smallgroups.tab-host-sticky-about'), link: "#about_lead"},
    {id: 2, linkText: t('smallgroups.tab-host-sticky-steps'), link: "#steps"},
    {id: 3, linkText: t('smallgroups.tab-host-sticky-application'), link: "#application"},
    {id: 4, linkText: t('smallgroups.tab-host-sticky-faq'), link: "#faq"}
  ]

  const smallGroupsTypes = (t) => [
    {
      id: 1, 
      tabTitle: t('smallgroups.tab-join-grouptypes-online-tab-title'), 
      title:  t('smallgroups.tab-join-grouptypes-online-title'), 
      link: t('smallgroups.tab-join-grouptypes-online-link'), 
      linkText: t('smallgroups.tab-join-grouptypes-online-linktext'), 
      content: t('smallgroups.tab-join-grouptypes-online-content'), 
      sideContent: "<img src='"+ data.groupOnePhoto.publicURL +"' class='c-groups__image'/><div class='g-brandpattern g-brandpattern--blue'></div>"
    },
    {
      id: 2, 
      tabTitle: t('smallgroups.tab-join-grouptypes-single-tab-title'),
      title: t('smallgroups.tab-join-grouptypes-single-title'),
      link: t('smallgroups.tab-join-grouptypes-single-link'),
      linkText: t('smallgroups.tab-join-grouptypes-single-linktext'),
      content: t('smallgroups.tab-join-grouptypes-single-content'),
      sideContent: "<img src='"+ data.groupTwoPhoto.publicURL +"' class='c-groups__image'/><div class='g-brandpattern g-brandpattern--red'></div>"
    },
    {
      id: 3, 
      tabTitle: t('smallgroups.tab-join-grouptypes-care-tab-title'),
      title: t('smallgroups.tab-join-grouptypes-care-title'),
      link: t('smallgroups.tab-join-grouptypes-care-link'),
      linkText: t('smallgroups.tab-join-grouptypes-care-linktext'),
      content: t('smallgroups.tab-join-grouptypes-care-content'),
      sideContent: "<img src='"+ data.groupThreePhoto.publicURL +"' class='c-groups__image'/><div class='g-brandpattern g-brandpattern--purple'></div>"
    }
  ]

  const decorCircleWords = {
    top: '-220px',
    left: '30px'
  }

  const leadTestimonials = (t) => [
      {name: "Consuela", subtitle: t('smallgroups.tab-join-testimonial-subtitle'), photo: data.testimonialPhotoConsuela.publicURL, quote: t("smallgroups.tab-join-testimonial-two-quote"), class: "h-background-one" },

      {name: "Dewey Hom", subtitle: t('smallgroups.tab-join-testimonial-subtitle'), photo: data.testimonialPhotoDeweyHom.publicURL, quote: t("smallgroups.tab-join-testimonial-eleven-quote"), class: "h-background-six"},

      {name: "Todd", subtitle: t('smallgroups.tab-join-testimonial-subtitle'), photo: data.testimonialPhotoTodd.publicURL, quote: t("smallgroups.tab-join-testimonial-three-quote"), class: "h-background-two" },

      {name: "Rachelle", subtitle: t('smallgroups.tab-join-testimonial-subtitle'), photo: "", quote: t("smallgroups.tab-join-testimonial-five-quote"), class: "h-background-six" },
      {name: "Janise", subtitle: t('smallgroups.tab-join-testimonial-subtitle'), photo: data.testimonialPhotoJanise.publicURL, quote: t("smallgroups.tab-join-testimonial-six-quote"), class: "h-background-five" },

      {name: "Angela", subtitle: t('smallgroups.tab-join-testimonial-subtitle'), photo: "", quote: t("smallgroups.tab-join-testimonial-seven-quote"), class: "h-background-four" },
      {name: "Ragine", subtitle: t('smallgroups.tab-join-testimonial-subtitle'), photo: "", quote: t("smallgroups.tab-join-testimonial-thirteen-quote" ), class: "h-background-three" },

      {name: "Adele", subtitle: t('smallgroups.tab-join-testimonial-subtitle'), photo: data.testimonialPhotoAdele.publicURL, quote: t("smallgroups.tab-join-testimonial-eleven-quote"), class: "h-background-six" },
      {name: "Linda", subtitle: t('smallgroups.tab-join-testimonial-subtitle'), photo: "", quote: t("smallgroups.tab-join-testimonial-ten-quote"), class: "h-background-two" },

      {name: "Meaghan Kelley", subtitle: t('smallgroups.tab-join-testimonial-subtitle'), photo: data.testimonialPhotoMeaghan.publicURL, quote: t("smallgroups.tab-join-testimonial-twelve-quote"), class: "h-background-six"},
      
  ]

  const playerPlaylist = (t) => [
    {
      src: t('smallgroups.tab-host-section-video-link'),
      poster: t('smallgroups.tab-host-section-video-poster'),
      skipTo: '40'
    }
  ]
  
  const leadSteps = (t) => [
    {id: 1, 
      title: t('smallgroups.tab-host-section-steps-one-title') , 
      text: t('smallgroups.tab-host-section-steps-one-text') , 
      photo: data.leadStepOnePhoto.publicURL},
    {id: 2, 
      title: t('smallgroups.tab-host-section-steps-two-title') , 
      text: t('smallgroups.tab-host-section-steps-two-text'), 
      photo: data.leadStepTwoPhoto.publicURL},
    {id: 3, 
      title: t('smallgroups.tab-host-section-steps-three-title'), 
      text: t('smallgroups.tab-host-section-steps-three-text'), 
      photo: data.leadStepThreePhoto.publicURL}
  ]

  const joinNews = [
    {
      title: t('smallgroups.tab-join-section-news-one-title'), 
      content: t('smallgroups.tab-join-section-news-one-content'), 
      tags: ["<img src='"+data.leadEventIcon.publicURL+"'>Upcoming Event"], 
      link: t('smallgroups.tab-join-section-news-one-link'),
      linkText: t('smallgroups.tab-join-section-news-one-link-text'), 
      target: "_blank",
      photo: data.joinNewsPhoto.publicURL,
    }
  ]

  const leadNews = [
    {id:1, 
      title: t('smallgroups.tab-host-section-news-one-title'), 
      content: t('smallgroups.tab-host-section-news-one-content'), 
      tags: ["<img src='"+data.leadNewsIcon.publicURL+"'>News"], 
      photo: data.leadNewsPhoto.publicURL}
  ]

  const leadFaq = (t) => [
    {id: 0, title: "", content: "", class: "d-none"},
    {id: 1, 
      title: t('smallgroups.tab-host-section-faq-one-title') , 
      content: t('smallgroups.tab-host-section-faq-one-content'),
    },
    {id: 2, title: t('smallgroups.tab-host-section-faq-two-title'), 
    content: t('smallgroups.tab-host-section-faq-two-content')},
    
    {id: 3, title: t('smallgroups.tab-host-section-faq-three-title'), 
    content: t('smallgroups.tab-host-section-faq-three-content')},
    
    {id: 4, title: t('smallgroups.tab-host-section-faq-four-title'), 
    content: t('smallgroups.tab-host-section-faq-four-content')},
  ]
  
  const [key, setKey] = useState( (location.hash.replace('#', '') === "lead") ? location.hash.replace('#', '') : 'join' )

  function changeTab(tab){
    setKey(tab);
  }
  
  return (
    <>

      <Helmet>
          <title> {t('smallgroups.title')} {config.separator} {config.siteTitle} </title>
      </Helmet>
      <SEO postPath={url} postNode={pageNode} postSEO />

      {/* <AlertDismissibleBar 
        className={''}
        title={t('smallgroups.alertbar-title')}
        content={t('smallgroups.alertbar-content')}
        link={t('smallgroups.alertbar-link')} 
        handler={() => changeTab("join")}
        linkUrl="https://victoryatl.zoom.us/meeting/register/tJ0kce6rqTwtE9aSz7LUL6SqG_68lA6hikAd"
        linkTarget="_blank"
      /> */}

      <HeroBasic
        title={t('smallgroups.hero')}
        subtitle={t('smallgroups.hero-subtitle')}
        backgroundPhoto={data.heroImage.publicURL}
        className={"c-hero position-relative z-index-1"}
        >
          <Button className="btn btn--animation btn--three ml-3" variant="none" href="https://my.victoryatl.com/default.aspx?page=4364" target="_blank" >
            {t('smallgroups.find-a-group')}
          </Button>
          <Button className="btn btn--animation btn--light-outline ml-3" variant="none" onClick={() => changeTab("lead")}  href="#application" target="_self">
              {t('smallgroups.host-a-group')}
          </Button>
          <Button className="btn btn--animation btn--light-outline ml-3" variant="none" href="https://my.victoryatl.com/default.aspx?page=4236" target="_self">
              {t('smallgroups.leader-login')}
          </Button>
      </HeroBasic>

      <div className="p-0 position-relative z-index-2">

        <Tab.Container defaultActiveKey={key} onSelect={k => setKey(k)} activeKey={key}>

              <Nav className="c-tabs user-select-none">
                <Nav.Item className="c-tabs__item">
                  <Nav.Link className="c-tabs__link" eventKey="join">{t('smallgroups.tab-join')}</Nav.Link>
                </Nav.Item>
                <Nav.Item className="c-tabs__item">
                  <Nav.Link className="c-tabs__link" eventKey="lead">{t('smallgroups.tab-host')}</Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content>

                {/* Join an Small Group */}
                <Tab.Pane eventKey={"join"} id="join">

                  <SectionTextBasic id={'intro'} 
                    link={'https://my.victoryatl.com/default.aspx?page=4364'} 
                    linkText={t('smallgroups.find-a-group')}
                    title={t('smallgroups.tab-join-intro-title')} 
                    target="_blank"
                    >
                    {t('smallgroups.tab-join-intro-content')}
                  </SectionTextBasic>

                  <hr/>

                  <SectionEmpty id={"news"}>
                    <Container className="c-news">
                        <h3 class='card-title h-color-one mt-3' dangerouslySetInnerHTML={{__html: t('smallgroups.tab-host-section-news-title')}}></h3>
                        <div className="c-news__list mt-5">
                          { joinNews.map((news, index) => (
                              <BlurbHorizontal 
                                key={index} 
                                title={news.title}
                                tags={news.tags}
                                photo={news.photo}
                                link={news.link}
                                linkText={news.linkText}
                                target={news.target}
                                >
                                {news.content}
                              </BlurbHorizontal>
                            )) }
                        </div>
                    </Container>
                  </SectionEmpty>
                  
                  <MenuSticky 
                    link={"https://my.victoryatl.com/default.aspx?page=4364"} 
                    linkText={t('smallgroups.find-a-group')} menuLinks={stickyMenuJoin(t)} />

                  <SectionPhotoText id={'about'} title={t('smallgroups.tab-join-section-phototext-title')}>
                    {t('smallgroups.tab-join-section-phototext-content')}
                  </SectionPhotoText>

                  {/* Group Types */}
                  <section className="c-groups overflow-hidden" id="types">
                      <div className="g-circlewords g-circlewords--pillar-two" style={decorCircleWords}></div>

                      <Container>
                        <div className="c-groups__introduction">
                            <h2 className="h-color-six" dangerouslySetInnerHTML={{__html: t('smallgroups.tab-join-section-grouptypes-title')}}></h2>
                            <p className="mt-5">{t('smallgroups.tab-join-section-grouptypes-content')}</p>
                        </div>
                        <Tab.Container className="mt-5 tabbable" defaultActiveKey="1">

                          <Nav className="c-tabs--simple mt-5 user-select-none">
                            {smallGroupsTypes(t).map( (smallGroupTypeTab, index) => (
                                  <Nav.Item key={index}>
                                    <Nav.Link eventKey={smallGroupTypeTab.id}> {smallGroupTypeTab.tabTitle} </Nav.Link>
                                  </Nav.Item>
                                )
                              )}
                          </Nav>

                          <Tab.Content>
                            {smallGroupsTypes(t).map((smallGroupTypePane) => (
                                <Tab.Pane key={smallGroupTypePane.id} eventKey={smallGroupTypePane.id}>
                                  <div className="c-groups__panel">
                                      <div className="c-groups__content">
                                        <h2 className="h-color-six" dangerouslySetInnerHTML={{__html: smallGroupTypePane.title}}></h2>
                                        <div className="c-groups__overview mt-5" dangerouslySetInnerHTML={{__html: smallGroupTypePane.content}}></div>
                                        {
                                          (smallGroupTypePane.link && smallGroupTypePane.linkText) ?
                                          <Button className="btn btn--animation btn--dark-outline mt-5" href={smallGroupTypePane.link} target="_blank" rel="noreferrer">
                                            {smallGroupTypePane.linkText}
                                          </Button>
                                          : <div></div>
                                        }
                                      </div>
                                      <div className="c-groups__photo user-select-none" dangerouslySetInnerHTML={{__html: smallGroupTypePane.sideContent}}></div>
                                  </div>
                                </Tab.Pane>
                              )
                            )}
                          </Tab.Content>

                        </Tab.Container>
                      </Container>
                  </section>
                  {/*. Group Types */}

                  {/* <TestimonialWall 
                    testimonials={leadTestimonials(t)} 
                    id="testimonials" 
                    title={t('smallgroups.testimonials-title')} /> */}

                    <TestimonialCarousel 
                      testimonials={leadTestimonials(t)} 
                      id="testimonials" 
                      title={t('smallgroups.testimonials-title')}
                    />

                </Tab.Pane>
                {/*. Join an Small Group */}

                {/* Lead an Small Group */}
                <Tab.Pane eventKey={"lead"} id="lead">

                  <SectionTextBasic id={'leaders-intro'} title={t('smallgroups.tab-host-section-intro-title')}>
                    {t('smallgroups.tab-host-section-intro-content')}
                  </SectionTextBasic>

                  <hr/>

                  <SectionEmpty id={"news"}>
                    <Container className="c-news">
                        <h3 class='card-title h-color-one mt-3' dangerouslySetInnerHTML={{__html: t('smallgroups.tab-host-section-news-title')}}></h3>
                        <div className="c-news__list mt-5">
                          { leadNews.map((news, index) => (
                              <BlurbHorizontal 
                                key={index} 
                                title={news.title}
                                tags={news.tags}
                                photo={news.photo}
                                link={news.link}
                                linkText={news.linkText}
                                target={news.target}
                              >
                                {news.content}
                              </BlurbHorizontal>
                            )) }
                        </div>
                    </Container>
                  </SectionEmpty>

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
                    link="#application"
                    linkText={t('smallgroups.apply-now')}>
                    <Accordion className="c-accordion mt-5" defaultActiveKey="0">
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

                </Tab.Pane>
                {/*. Lead an Small Group */}

              </Tab.Content>

        </Tab.Container>

        <ShareSection 
          title={t('smallgroups.share-title')}
          subtitle={t('smallgroups.share-content')} />

      </div>

    </>
  )
}


export const query = graphql`
  query{
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

/* Photos and Graphics */
// import heroImage from "../assets/img/smallgroups/Background.jpg";
// import leadStepOnePhoto from "../assets/img/smallgroups/step_01_v2@2x.jpg"
// import leadStepTwoPhoto from "../assets/img/smallgroups/step_02_v2@2x.jpg"
// import leadStepThreePhoto from "../assets/img/smallgroups/step_03_v2@2x.jpg"
// import groupOnePhoto from "../assets/img/smallgroups/groups-photo-online-groups.jpg"
// import groupTwoPhoto from "../assets/img/smallgroups/groups-photo-single-groups.jpg"
// import groupThreePhoto from "../assets/img/smallgroups/groups-photo-care-groups.jpg"
// import leadNewsPhoto from "../assets/img/smallgroups/photo_news_01_v2@2x.jpg"
// import joinNewsPhoto from "../assets/img/smallgroups/photo_news_join_01_v2@2x.jpg"
// import leadNewsIcon from "../assets/img/global/icon-news-white.svg"
// import leadEventIcon from "../assets/img/global/icon-calendar-white.svg"
// import applicationFormPhoto from "../assets/img/smallgroups/photo_03@2x.jpg"
// import iconCheckboxWhite from "../assets/img/global/icon-checkbox-white.svg"

/* Testimonial Photos */
// import testimonialPhotoAdele from "../assets/img/smallgroups/Adele.jpg"
// import testimonialPhotoConsuela from "../assets/img/smallgroups/Consuela.jpg"
// import testimonialPhotoDeweyHom from "../assets/img/smallgroups/DeweyHom.jpg"
// import testimonialPhotoJanise from "../assets/img/smallgroups/Janise.jpg"
// import testimonialPhotoMeaghan from "../assets/img/smallgroups/Meaghan.jpg"
// import testimonialPhotoRagine from "../assets/img/smallgroups/Ragine.jpg"
// import testimonialPhotoTodd from "../assets/img/smallgroups/Todd.jpg"
