// Dependencies
import React from "react"
import { graphql } from 'gatsby'
import { useTranslation } from "react-i18next"
import { Tab, Nav, Container, Button } from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.min.css'

// Components
import HeaderPage from '../../components/headerPage'
import HeroBasic from '../../components/hero/heroBasic'
import BlurbHorizontalDarkFeatured from '../../components/blurb/blurbHorizontalDarkFeatured'
import SectionEmpty from '../../components/content/sectionEmpty'
import SectionTextBasic from "../../components/content/sectionTextBasic"
import MenuSticky from "../../components/menu/menuSticky"
import SectionPhotoText from "../../components/content/sectionPhotoText"
import TestimonialCarousel from "../../components/testimonial/testimonialCarousel"
import ShareSection from "../../components/social/shareSection"
import HorizontalScrollingMenu from '../../components/menu/horizontalScrollingMenu'
import AlertEmptyState from '../../components/alert/alertEmptyState'
import { smallGroupBrand, smallGroupMenu } from '../../../data/menues'
import SectionFeedCarouselMultipleSources from '../../components/feed/sectionFeedCarouselMultipleSources'
import './index.scss'
import config from '../../../data/SiteConfig'

export default function SmallGroupsPage( { data, location } ) {

  /* Standard fields */
  const { t } = useTranslation()
  
  /* Page specific content */
  const stickyMenuJoin = (t) => [
    {id: 1, linkText: t('smallgroups.tab-join-sticky-about'), link: "#about"},
    {id: 2, linkText: t('smallgroups.tab-join-sticky-grouptypes'), link: "#types"},
    {id: 3, linkText: t('smallgroups.tab-join-sticky-testimonials'), link: "#testimonials"}
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
  
  const itemsLenght = data.news.nodes.length + data.events.nodes.length

  // const latestUpdate = ( data.news && data.events ) ? 
  //                         ( data.news.nodes[0].date > data.events.nodes[0].date ) ?
  //                           data.news.nodes[0]
  //                         :
  //                           data.events.nodes[0]
  //                       : 
  //                         ( data.news || data.events ) ?
  //                             ( data.news ) ?
  //                               data.news.nodes[0]
  //                             :
  //                               data.events.nodes[0]
  //                         :
  //                           undefined

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
          <Button className="btn btn--animation btn--three" variant="none" href="https://my.victoryatl.com/default.aspx?page=4364" target="_blank" >
            {t('smallgroups.find-a-group')}
          </Button>
          <BlurbHorizontalDarkFeatured 
            title={'Latest Event lorem'}// (latestUpdate.title) ? latestUpdate.title : undefined
            subtitle={'Check out our lorem ipsum'}
            featuredImage={data.noImage.childImageSharp.fluid.src}
            className={''}
            link={'/events'}
            excerpt={'Lorem ipsum dolor sit amet. Salvatore'}
          />
      </HeroBasic>
      
      <div className="p-0 position-relative z-index-2">

        <SectionTextBasic id={'intro'} 
          link={'https://my.victoryatl.com/default.aspx?page=4364'} 
          linkText={t('smallgroups.find-a-group')}
          title={t('smallgroups.tab-join-intro-title')} 
          target="_blank"
        >
          {t('smallgroups.tab-join-intro-content')}
        </SectionTextBasic>

        <hr/>

        {
          ( data.news || data.events ) ? 
            ( itemsLenght > 0 ) ?
              <SectionFeedCarouselMultipleSources
                title = {t('smallgroups.tab-host-section-news-title')}
                id="news"
                className="h-background-gray-one"
                itemsNews = { (data.news) ? data.news : undefined}
                itemsEvents = { (data.events) ? data.events : undefined}
                slugOne = { (data.news) ? `${config.newsPostListSlug}/` : undefined}
                slugTwo = { (data.events) ? `${config.eventsPostListSlug}/` : undefined}
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
          : undefined
        }
        
        <MenuSticky 
          link={"https://my.victoryatl.com/default.aspx?page=4364"} 
          linkText={t('smallgroups.find-a-group')} 
          menuLinks={stickyMenuJoin(t)} 
        />

        <SectionPhotoText 
          className="h-background-six-shade-three"
          id={'about'} 
          photo={data.aboutPhoto.childImageSharp.fluid.src}
          title={t('smallgroups.tab-join-section-phototext-title')}
          text={t('smallgroups.tab-join-section-phototext-content')}
        />

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
                  {smallGroupsTypes(t).map((smallGroupTypePane, index) => (
                      <Tab.Pane key={index} eventKey={smallGroupTypePane.id}>
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
        
        <ShareSection 
          className="h-background-one"
          id="share"
          title={t('smallgroups.share-title')}
          subtitle={t('smallgroups.share-content')} 
          photo={data.backgroundShare.childImageSharp.fluid}
          variant="light"
          location={location}
        />

      </div>

    </>
  )
}

export const query = graphql`
  query{

      noImage: file(relativePath: {eq: "img/global/noimage.jpg"}) {
            childImageSharp {
                fluid {
                    src
                }
            }
      }  

      backgroundShare: file(relativePath: {eq: "img/smallgroups/share_background.jpg"}) {  
        childImageSharp {
          fluid {
            src
          }
        }            
      }

      news: allWpNewspost(filter: {newsTags: {nodes: {elemMatch: {slug: {in: "small-groups-join"}}}}, status: {eq: "publish"}}, sort: {fields: date, order: DESC}, limit: 3) {
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

      events: allWpEvent(filter: {eventTags: {nodes: {elemMatch: {slug: {in: "small-groups-join"}}}}, status: {eq: "publish"}}, sort: {fields: date, order: DESC}, limit: 3) {
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
                  eventTime
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
      aboutPhoto: file(relativePath: {eq: "img/smallgroups/Video@2x.jpg"}) {
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