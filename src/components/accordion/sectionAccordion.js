import React from 'react'
import { Container, Accordion, Card } from 'react-bootstrap'
import './sectionAccordion.scss'

export default function SectionAccordion ( 
    {
        id, 
        className, 
        title, 
        content, 
        containerWidth, 
        mode, 
        size, 
        items, 
        itemClass,
        containerClass,
    } 
    ) {
        return (
            <section id = {id} className = {`sectionAccordion ${ size ? size : ''} ${ className ? className : ''} ${ mode ? mode : 'light' }`}>

                <Container fluid = { containerWidth === 'container' ? false : true }>
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
                    {
                        items?.length > 0 ?
                            <Accordion className={`${ containerClass ? containerClass : ''}`} defaultActiveKey="1">
                                {
                                    items.map( (_, index) => (
                                        <Card key={index+1} className={`${ itemClass ? itemClass : ''} ${ _.itemCss ? _.itemCss : ''}`}>
                                            <Accordion.Toggle as={Card.Header} eventKey={index+1}>
                                                {_.itemTitle}
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey={index+1}>
                                                <Card.Body dangerouslySetInnerHTML={{ __html: _.itemContent }}></Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    ))
                                }
                            </Accordion>
                        :
                            undefined
                    }
                </Container>

            </section>
        )
}