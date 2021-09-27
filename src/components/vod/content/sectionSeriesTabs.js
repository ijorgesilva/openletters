import React from 'react'
import { Tabs, Tab, Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import FeedListEven from '../../feed/feedListEven'
import SectionFeedCarousel from '../../vod/feed/sectionFeedCarousel'
import TabSeasons from '../../vod/tab/tabSeasons'

import './sectionSeriesTabs.scss'

export default function SectionSeriesTabs ( 
    {
        className, 
        id, 
        width, 
        mode,
        campus,
        slugSeries,
        videos,
        seasons,
        resources,
        breadcrumbs,
        playButtonIcon,
        hasExcerpt,
        count,
        order,
    } 
    ) {
    
    const { t } = useTranslation()

    return (
        <section 
            className = {`sectionSeriesTabs ${ mode ? mode : 'light'} ${ className ? className : ''}`}
            id = { id }
        >
            <Container fluid = { width === 'container' ? false : true }>

                <Tabs className={`${ mode ? mode : 'light'}`} defaultActiveKey="0">

                    <Tab eventKey="0" title={ 
                            ( videos && seasons === false ) ? 
                                t('global.watch.videos') 
                            : 
                                t('global.watch.videos')  
                    }>
                        {
                            ( videos && seasons === false ) ?
                                <SectionFeedCarousel 
                                    id              = 'episodes'
                                    title           = ''
                                    mode            = { mode }
                                    items           = { videos }
                                    campus          = { campus }
                                    configLayout    =   {{
                                                            excerpt: hasExcerpt,
                                                            itemsVisible: 5,
                                                        }}
                                    iconCarousel    = { playButtonIcon }
                                    infinite
                                    count           = { count ? true : false }
                                    order           = { order }
                                />
                            :
                                ( videos && seasons === true) ?
                                    <TabSeasons
                                        id           = 'episodes'
                                        title        = ''
                                        items        = { videos }
                                        mode         = { mode }
                                        itemsVisible = {5}
                                        campus       = { campus }
                                        series       = {slugSeries}
                                        count        = { count ? true : false }
                                    />
                                :
                                    <SectionFeedCarousel 
                                        id              = 'episodes'
                                        mode            = { mode }
                                        title           = ''
                                        items           = { videos }
                                        campus          = { campus }
                                        configLayout    =   {{
                                                                excerpt: true,
                                                                itemsVisible: 4,
                                                            }}
                                        infinite
                                        count           = { count ? true : false }
                                        order           = { order }
                                    />
                        }
                    </Tab>
                    {
                        ( resources?.length > 0 ) ?
                            <Tab eventKey="1" title={t('global.related-resources')}>
                                <FeedListEven
                                    items       = { resources } 
                                    mode        = { mode }
                                    campus      = { breadcrumbs.campus }
                                    hasExcerpt  = { hasExcerpt }
                                />
                            </Tab>
                        :
                            undefined
                    }
                </Tabs>
            </Container>
        </section>
    )
}