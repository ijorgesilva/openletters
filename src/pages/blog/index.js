// Dependencies
import React from 'react'
import { graphql } from 'gatsby'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from "react-i18next"

// Components
import AlertEmptyState from '../../components/alert/alertEmptyState'
import HorizontalScrollingMenu from '../../components/menu/horizontalScrollingMenu'
import HeaderPage from '../../components/headerPage'
import { blogMenuBrand, blogMenu } from '../../../data/menues'
import '../../components/templates/post/postList.scss'

export default function Blog ( { data, location } ) {

    /* Standard fields */
    const { t } = useTranslation()

    return (
        <>

            <HeaderPage 
                title={t('blog.title')}
                location={location} 
                cover={data.blogPoster.publicURL}
                description={t('blog.description')}
            />
            
            <HorizontalScrollingMenu
                menuBrand={blogMenuBrand}
                menu={blogMenu}
            />

            <section className="">
                <Container className="mt-5 mb-5">
                    <Row>
                        <Col xs={12} md={8}>
                            <AlertEmptyState variant="transparent" className="mt-5" content="" />
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export const query = graphql`
    query blogDefaultView {

        blogPoster: file(relativePath: {eq: "img/smallgroups/Background.jpg"}) {
            publicURL
        }

    }  
`