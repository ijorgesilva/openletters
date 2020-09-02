import React from 'react'
import {Link} from 'gatsby'
import { Container } from 'react-bootstrap'

export default function  WatchDetails(props){
    
    const { title, content } = props.pageContext

    return (
        <section>
            <Container>
                <h1>{title}</h1>
                <article dangerouslySetInnerHTML={{__html: content }}></article>
            </Container>
        </section>
    )
}