import { faBookOpen, faClock, faLaptop, faUserFriends, faLaptopHouse, faChalkboardTeacher, faFastForward, faCertificate, faLanguage, faCalendarAlt, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { graphql } from 'gatsby'
import { DateTime } from 'luxon'
import React from 'react'
import { Container, Row, Col, ListGroup, Accordion, Card } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import config from '../../../../data/SiteConfig'
import { useGetFeed } from '../../../hooks/useGetFeed'
import { useTheme } from '../../../hooks/useTheme'
import SectionCarousel from '../../carousel/sectionCarousel'
import FooterSimpleText from '../../footer/footerSimpleText'
import HeroDynamic from '../../hero/heroDynamic'
import MenuPage from '../../menu/menuPage'
import Navigation from '../../menu/navigation'
import PageHeader from '../../pageHeader'
import RenderComponent from '../../renderer'
import TagSimple from '../../tag/tagSimple'
import './courseDetails.scss'

export default function CourseDetails( { pageContext, data, location } ){
    
    const { title, excerpt, postContent, general, tags, breadcrumbs, courseDetails, pageLayout } = pageContext

    const { t } = useTranslation()
    const theme         = useTheme()
    const contentMode   = 'light'

    const searchIndices = [{ name: `vod`, title: `Messages` }, { name: `pages`, title: `Pages`} ]
    
    const linkType =    courseDetails.courseProvider.providerType?.includes(':') ? 
                            courseDetails.courseProvider.providerType.split(':')[0]
                        : courseDetails.courseProvider.providerType

    const button = (  linkType === 'external' ) ?
                [
                    {
                        'sectionHeroButtonType': 'internal',
                        'sectionHeroButtonLink': courseDetails.courseProvider.providerExternal?.providerExternalUrl,
                        'sectionHeroButtonTarget': '_blank',
                        'sectionHeroButtonText': courseDetails.courseProvider.providerExternal?.providerExternalUrlText || t('global.courses.enroll-now'),
                    } 
                ]
                : ( linkType === 'internal' ) ?
                    [
                        {
                            'sectionHeroButtonType': 'internal',
                            'sectionHeroButtonLink': '#',
                            'sectionHeroButtonTarget': '_self',
                            'sectionHeroButtonText': t('global.read_more'),
                        } 
                    ]
                    : undefined
    
    const instructors = useGetFeed(courseDetails.courseInstructors, breadcrumbs.campus, undefined, undefined, undefined, 'people') 
    const pageNavitation = [
        {
            'name': t('global.overview'),
            'link': '#overview',
        }
    ]
    if(data.lessons?.nodes?.length) {
        pageNavitation.push(
            {
                'name': t('global:global.courses.lessons'),
                'link': '#lessons',
            },
        )
    }
    if(instructors.list?.length){
        pageNavitation.push(
            {
                'name': t('global:global.courses.instructors'),
                'link': '#instructors',
            },
        )
    }

    return (
        <>
            <PageHeader 
                title       = { title + ' | ' + t('global.courses.title') }
                location    = { location }
                className   = 'eventDetails'
                mode        = { contentMode }
                cover       = { general.featuredPhoto?.localFile.childImageSharp.gatsbyImageData.images.fallback.src }
                description = { excerpt ? excerpt : excerpt }
                article     = { true }
            />
            
            <Navigation
                location        = { location }
                campus          = { breadcrumbs.campus }
                searchIndices   = { searchIndices }
                mode            = { theme.styles.header }
                menuGlobal
                menuLocal
            />
            
            <MenuPage
                mode        = { theme.styles.header }
                close       = { '/' + breadcrumbs.campus + '/' +  config.coursesSlug }
                menuBrand   =   { 
                                    {
                                        'name': t('global.courses.title-plural'),
                                        'link': '/' + breadcrumbs.campus + '/' + config.coursesSlug,
                                    }
                                } 
                menu        =   { 
                                    [
                                        
                                    ]
                                }
            />
            
            <main className=''>

                <HeroDynamic
                    id              = { 'hero' }
                    className       = { 'z-index-0' }
                    titleClassName  = { 'display-4' }
                    mode            = { theme.styles.header }
                    width           = { 'fullwidth' }
                    title           = { title }
                    size            = { 'md' }
                    backgroundPhoto = { general.featuredPhoto?.localFile.childImageSharp.gatsbyImageData }
                    buttons         = { button }
                    location        = { location }
                    overlay         = {true}
                />
                
                <MenuPage
                    mode        = { contentMode }
                    menu        = { pageNavitation }
                    className   = {'sticky'}
                />
                
                <Container className='mt-3'>
                    <Row>
                        <Col id='overview' className='content' xs={12} md={7}>
                            {
                                postContent ?
                                    <div dangerouslySetInnerHTML={{__html: postContent.content}}>
                                    </div>
                                : undefined
                            }
                        </Col>
                        <Col>
                            <div className='sticky'>
                                <ListGroup>
                                {
                                    courseDetails.courseCertificate ?
                                        <ListGroup.Item>
                                            <strong>
                                                <FontAwesomeIcon icon={faCertificate} size='sm' /> 
                                                {' ' + t('global.courses.certificate.available')}
                                            </strong>
                                        </ListGroup.Item>
                                    : undefined
                                }
                                {
                                    courseDetails.courseModality === 'inperson' ?
                                        <ListGroup.Item>
                                            <strong>
                                                <FontAwesomeIcon icon={faUserFriends} size='sm' />  {t('global.courses.modality.in-person')}
                                            </strong>
                                        </ListGroup.Item>
                                    : 
                                        courseDetails.courseModality === 'online' ?
                                            <ListGroup.Item>
                                                <strong>
                                                    <FontAwesomeIcon icon={faLaptop} size='sm' /> {t('global.courses.modality.online')}
                                                </strong>
                                            </ListGroup.Item>
                                        : 
                                            courseDetails.courseModality === 'blended' ?
                                                <ListGroup.Item>
                                                    <strong>
                                                        <FontAwesomeIcon icon={faLaptopHouse} size='sm' />  {t('global.courses.modality.blended')}
                                                    </strong>
                                                </ListGroup.Item>
                                            : undefined
                                }
                                {
                                    courseDetails.courseDuration.duration ?
                                        <ListGroup.Item>
                                            <strong>
                                                <span title={t('global.courses.duration.total-duration')}>
                                                    <FontAwesomeIcon icon={faClock} size='sm' /> 
                                                    {' ' + courseDetails.courseDuration.duration + ' '}
                                                    {
                                                        courseDetails.courseDuration.duration > 1 ?
                                                            t('global.time.hours')
                                                        :
                                                            t('global.time.hour')
                                                    }
                                                </span>
                                            </strong>
                                            <span title = {t('global.courses.duration.recommended-time')}>
                                                {
                                                    courseDetails.courseDuration.weeklyHours > 1 ?
                                                        ' ' + courseDetails.courseDuration.weeklyHours + ' ' + t('global.time.hours') + ' ' + t('global.courses.duration.a-week')
                                                    : courseDetails.courseDuration.weeklyHours === 1 ?
                                                        ' ' + courseDetails.courseDuration.weeklyHours + ' ' + t('global.time.hour') + ' ' + t('global.courses.duration.a-week')
                                                        : undefined
                                                }
                                            </span>
                                        </ListGroup.Item>
                                    : undefined
                                }
                                {
                                    courseDetails.coursePace.split(':')[0] === 'self-paced' ?
                                        <ListGroup.Item>
                                            <strong>
                                                <FontAwesomeIcon icon={faFastForward} size='sm' /> 
                                                {' ' + t('global.courses.pace.self-pace')}
                                            </strong>
                                        </ListGroup.Item>
                                    :
                                        courseDetails.coursePace.split(':')[0] === 'instructor-paced' ?
                                            <ListGroup.Item>
                                                <strong>
                                                    <FontAwesomeIcon icon={faChalkboardTeacher} size='sm' /> 
                                                    {' ' + t('global.courses.pace.instructor-paced')}
                                                </strong>
                                            </ListGroup.Item>
                                        : undefined
                                }
                                {
                                    courseDetails.courseLanguages?.length > 0 ?
                                    <ListGroup.Item>
                                        <strong>
                                            <FontAwesomeIcon icon={faLanguage} size='sm' /> 
                                            {' ' + t('global.languages.languages-available') + ' '}
                                        </strong>
                                        {
                                            courseDetails.courseLanguages.map ( (_, index ) => (
                                                <span key = {index} title = {t(`global.languages.iso-name.${_.toLowerCase()}`)}>
                                                    {
                                                        index + 1 < courseDetails.courseLanguages.length ?
                                                            _ + ', '
                                                        : _
                                                    }
                                                </span>
                                            ))
                                        }
                                    </ListGroup.Item>
                                    : undefined
                                }
                                </ListGroup>

                                <ListGroup className='mt-2'>
                                    {
                                        courseDetails.courseTimeLocation.startDate ?
                                            <ListGroup.Item>
                                                <FontAwesomeIcon icon={faCalendarAlt} size='sm' /> 
                                                {' ' + t('global.courses.starts-on') + ' '}
                                                {
                                                    DateTime.fromFormat(courseDetails.courseTimeLocation.startDate, 'MM/dd/yyyy').toFormat('MMMM dd, yyyy')
                                                }
                                            </ListGroup.Item>
                                        : undefined
                                    }
                                    {
                                        courseDetails.courseTimeLocation.endDateActive ?
                                            <ListGroup.Item>
                                                {' ' + t('global.courses.ends-on') + ' '}
                                                {
                                                    DateTime.fromFormat(courseDetails.courseTimeLocation.startDate, 'MM/dd/yyyy').toFormat('MMMM dd, yyyy')
                                                }
                                            </ListGroup.Item>
                                        : undefined
                                    }
                                    {
                                        courseDetails.courseTimeLocation.location?.length >= 0 ?
                                            courseDetails.courseTimeLocation.location[0].venueDetails.venueAddress ?
                                                <ListGroup.Item>
                                                    <FontAwesomeIcon icon={faMapMarkedAlt} size='sm' /> 
                                                    {' ' + courseDetails.courseTimeLocation.location[0].venueDetails.venueAddress}
                                                </ListGroup.Item>
                                            : undefined
                                        : undefined
                                    }
                                </ListGroup>

                            </div>
                        </Col>
                    </Row>
                </Container>

                {
                    data.lessons?.nodes?.length > 0 ?
                        <section id = {'lessons'} className = {`sectionForm md ${ contentMode ? contentMode : 'light' }`}>
                            <Container fluid >
                                <div className='general'>
                                    <h2 className='title' dangerouslySetInnerHTML={{__html: t('global.courses.lessons')}}></h2>
                                </div>
                                <div className='content'>
                                    <Accordion>
                                        {
                                            data.lessons.nodes.map( ( _, index ) => (
                                                <Card key={index+1}>
                                                    <Accordion.Toggle as={Card.Header} eventKey={index+1}>
                                                        <FontAwesomeIcon icon={faBookOpen} size='sm' /> {_.title}
                                                    </Accordion.Toggle>
                                                    <Accordion.Collapse eventKey={index+1}>
                                                        <Card.Body dangerouslySetInnerHTML={{ __html: _.lessonDetails.lessonSummary }}></Card.Body>
                                                    </Accordion.Collapse>
                                                </Card>
                                            ))
                                        }
                                    </Accordion>
                                </div>
                            </Container>
                        </section>
                    : undefined
                }

                <SectionCarousel 
                    title           = { t('global.courses.instructors') }
                    id              = { 'instructors' }
                    className       = { '' }
                    mode            = { contentMode }
                    containerWidth  = { 'fullwidth' }
                    size            = { 'md' }
                    items           = { instructors }
                    orientation     = 'vertical'
                    swipeable       = { true }
                    draggable       = { true }
                    aspectRatio     = { '1_1' }
                    itemGrow        = { true }
                    hideImage       = { false }
                    hideTitle       = { false }
                    hideSubtitle    = { true }
                    hideExcerpt     = { false }
                    hideButton      = { true }
                />

            </main>


            {
                pageLayout.pageLayout ?
                    pageLayout.pageLayout.map( ( _, index ) => (
                        <RenderComponent 
                            key         = { index }
                            section     = { _ }
                            campus      = { breadcrumbs.campus }
                            location    = { location }
                            mode        = { contentMode }
                        />
                    ))
                :
                    undefined
            }

            <TagSimple 
                items   = { tags }
                mode    = { contentMode }
            />

            <FooterSimpleText 
                campus  = { breadcrumbs.campus } 
                mode    = { theme.styles.footer }
            />

        </>
    )
}

export const query = graphql`
    query lessons ( $courseId: String! ) {
        lessons: allWpLesson (
            filter: {
                lessonDetails: {
                    lessonCourseId: {
                        regex: $courseId
                    }
                }
            }
        ) {
            nodes {
                slug
                title
                lessonDetails {
                    lessonSummary
                }
            }
        }
    }
`