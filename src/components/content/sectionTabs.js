import React from 'react'
import { Tab, Nav } from 'react-bootstrap'

import RenderSection from '../renderSection'
import './sectionTabs.scss'

export default function SectionTabs ( 
    { 
        id, 
        className, 
        campus, 
        location, 
        mode, 
        content, 
        title, 
        tabs, 
        containerWidth,
        size,
    } 
    ) {
    
    return (
        <section
            id          = {id}
            className   = {`sectionTabs ${ className ? className : ''} ${ size ? size : ''} ${ mode ? mode : 'light' } `}
        >
            <div className={`${ ( containerWidth ) ? containerWidth : 'container' }`}>
                
                {
                    ( title || content ) ?
                        <div className='general'>
                            {
                                ( title ) ?
                                    <h2 className='title' dangerouslySetInnerHTML={{__html: title}}></h2>
                                :
                                    undefined
                            }
        
                            { 
                                ( content ) ?
                                    <div className='content' dangerouslySetInnerHTML={{__html: content}}></div>
                                :
                                    undefined
                            }
                        </div>
                    :
                        undefined
                }
            
                <div className='tabs'>
                    { 
                        (tabs?.length > 0) ?
                            <Tab.Container className='mt-5 tabbable' defaultActiveKey='1'>

                                    <Nav className='tab-menu style-one mt-5 user-select-none'>
                                        {
                                            tabs.map( ( _ , index ) => (
                                                <Nav.Item key={index}>
                                                    <Nav.Link eventKey={index}> 
                                                        {_.sectionTabsTabName} 
                                                    </Nav.Link>
                                                </Nav.Item>
                                            ))
                                        }
                                    </Nav>

                                    <Tab.Content>
                                        {
                                            tabs.map( ( _ , index ) => (
                                                <Tab.Pane key={index} eventKey={index}>
                                                    {
                                                        ( _.sectionTabsTabType.split(':')[0] === 'content' ) ?
                                                            <div  dangerouslySetInnerHTML={{__html:_.sectionTabsTabContent}}></div>
                                                        :
                                                            undefined
                                                    }
                                                    {
                                                        ( _.sectionTabsTabType.split(':')[0] === 'nestedsection' ) ?
                                                            <RenderSection 
                                                                key         = { index }
                                                                mode        = { mode }
                                                                size        = { size }
                                                                section     = { _.sectionTabsTabSection }
                                                                campus      = { campus }
                                                                filter      = { { campus: campus } }
                                                                location    = { location }
                                                                className   = { 'nested' }
                                                            />
                                                        :
                                                            undefined

                                                    }
                                                </Tab.Pane>
                                            ))
                                        }
                                    </Tab.Content>

                            </Tab.Container>
                        :
                            undefined
                    }
                </div>

            </div>

        </section>
    )
    
}