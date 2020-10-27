// Dependencies
import React from 'react'
import { useTranslation } from "react-i18next"
import { Container } from 'react-bootstrap'
import { useQuery, gql } from '@apollo/client';

// Components
import HeaderPage from '../components/headerPage'

const wpPosts = gql`
    query getPosts{
        posts {
            nodes {
              title
            }
        }
    }
`

export default function Home({location}){
    
    const { t } = useTranslation()

    const { loading, error, data } = useQuery(wpPosts)
    
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>
    
    return (
        <>

            <section className="">
                <Container>
                    {
                        data.posts.nodes.map( (post, index) =>(
                            <p key={index}>
                                {post.title}
                            </p>
                        ))
                    }
                </Container>
            </section>

        </>
    )
}
