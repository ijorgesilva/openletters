// Dependencies
import React from 'react'
import { graphql } from 'gatsby'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from "react-i18next"

// Components
// import PaginationBasic from '../../components/pagination/paginationBasic'
import AlertEmptyState from '../../components/alert/alertEmptyState'
import SectionEmpty from '../../components/content/sectionEmpty'
import { getDate } from '../../components/utils/utils'
import HorizontalScrollingMenu from '../../components/menu/horizontalScrollingMenu'
import BlurbHorizontal from '../../components/blurb/blurbHorizontal'
import HeaderPage from '../../components/headerPage'
import { smallGroupBrand, smallGroupMenu } from '../../../data/menues'
import config from '../../../data/SiteConfig'
import './events.scss'

export default function SmallGroupEventPage ( { data, location } ) {

    /* Standard fields */
    const { t } = useTranslation()

    const noImage = (data.noImage.childImageSharp) ? data.noImage.childImageSharp.fluid.src : undefined

    return (
        <>

            <HeaderPage 
                title="Events"
                location={location} 
                cover={data.eventPoster.publicURL}
                description="Small Group's Events"
            />
            
            <HorizontalScrollingMenu
                menuBrand={smallGroupBrand}
                menu={smallGroupMenu}
            />

            <section className="">
                <Container className="mt-5 mb-5">
                    <Row>
                        <Col xs={12} md={8}>
                            {
                                (data.events.nodes.length > 0) ?
                                    data.events.nodes.map( (obj, index) => (
                                        <>
                                            <BlurbHorizontal 
                                                key={index}
                                                className={'mb-4'}
                                                featuredImage={ (obj.featuredImage) ? obj.featuredImage.node.localFile.childImageSharp.fluid.src : noImage  }
                                                
                                                title={obj.title}
                                                subtitle={
                                                            (obj.eventDetails.eventDates[0].eventDate && obj.eventDetails.eventDates[0].eventTime) ? 
                                                                    getDate(obj.eventDetails.eventDates[0].eventDate,2,'us','LLLL d, yyyy' ) + ' | ' + obj.eventDetails.eventDates[0].eventTime
                                                            : 
                                                                (obj.eventDetails.eventDates[0].eventDate) ? 
                                                                    getDate(obj.eventDetails.eventDates[0].eventDate,2,'us','LLLL d, yyyy' )
                                                                :
                                                                    undefined
                                                        }
                                                excerpt={obj.excerpt}
                                                tag={t('global.event')}

                                                // linkType={obj.eventRegistrationType}
                                                link={`${config.eventPostDetailsSlug}/${obj.slug}`}
                                                linkText={obj.title}
                                            />
                                        </>
                                    ))
                                :
                                    <AlertEmptyState variant="transparent" className="mt-5" content="" />
                            }
                            
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export const query = graphql`
    query{

        events: allWpEvent(filter: {eventTags: {nodes: {elemMatch: {slug: {in: "small-groups"}}}}, status: {eq: "publish"}}, sort: {fields: date, order: DESC}, limit: 10) {
            
            nodes {
                title
                excerpt
                slug
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

                eventDetails {
                    eventAddress
                    eventDates {
                        eventDate
                        eventTime
                    }

                    eventRegistrationType
                    eventCampus {
                        ... on WpCampus {
                            id
                            title
                        }
                    }
                    eventLink {
                        eventLinkUrl
                        eventLinkText
                    }
                }

            }
            
        }

        noImage: file(relativePath: {eq: "img/global/noimage.jpg"}) {
            childImageSharp {
                fluid {
                    src
                }
            }
        }

        eventPoster: file(relativePath: {eq: "img/smallgroups/Background.jpg"}) {
            publicURL
        }

    }
`