// Dependencies
import React from 'react'
// import { useStaticQuery, graphql } from 'gatsby'
import { useTranslation } from "react-i18next"
import { Container, Row, Col } from 'react-bootstrap'
import Img from 'gatsby-image'

// Components
import { getDate } from '../../utils/utils'
import HeroPost from '../../../components/hero/heroPost'
import HeaderPage from '../../headerPage'
import TagSimple from '../../tag/tagSimple'
import ToolbarDetails from '../../toolbar/toolbarDetails'
import './postDetails.scss'
import { blogMenu, blogMenuBrand } from '../../../../data/menues'
import HorizontalScrollingMenu from '../../menu/horizontalScrollingMenu'

export default function PostDetails( { pageContext, location } ){
    
    const { title, node: {excerpt, date, modified, featuredImage, content, terms, postDetails} } = pageContext

    /* Standard fields */
    const { t } = useTranslation()
    
    const htmlDate = (modified) ? getDate(modified,2,'us','yyyy-MM-dd' ) : getDate(date,2,'us','yyyy-MM-dd' )
    const createdDate = getDate(date,2,'us','LLLL d, yyyy' )
    const modifiedDate = getDate(modified,2,'us','LLLL d, yyyy' )

    return (
        <>

            <HeaderPage 
                title={(title) ? title : undefined} 
                location={location} 
                cover={(featuredImage) ? featuredImage.node.localFile.childImageSharp.fluid.src : undefined}
                description={(excerpt) ? excerpt : excerpt}
                article={true}
            />
            
            <HorizontalScrollingMenu
                menuBrand={blogMenuBrand}
                menu={blogMenu}
            />

            <article className="contentMain mb-5">

                <HeroPost 
                    title={title}
                    backgroundPhoto={(featuredImage) ? featuredImage.node.localFile.childImageSharp.fluid.src : undefined}
                    className="z-index-0"
                />
                
                <Container className="mt-5">
                    
                    <Row>

                        <Col>
                            <div className="watchLeft sticky">
                                <hr />
                                <ToolbarDetails location={location} />
                            </div>
                        </Col>

                        <Col className="" xs={12} md={8}>

                            <div dangerouslySetInnerHTML={{__html: content}}>
                            </div>

                            <TagSimple terms={terms} />

                            <div className="createdDate user-select-none">
                                {
                                    (modifiedDate) ? 
                                        <time datetime={htmlDate}> {modifiedDate} </time> 
                                    : 
                                        <time datetime={htmlDate}> {createdDate} </time>
                                }
                            </div>

                            <div className="authors">
                            {   
                                (postDetails.blogPostSpeaker) ?
                                    postDetails.blogPostSpeaker.map( (author, index) => (
                                        <>
                                            <div className="author">
                                                {
                                                    (author.featuredImage) ? <Img className="photo" fluid={author.featuredImage.node.localFile.childImageSharp.fluid} alt={author.title} />
                                                    : undefined
                                                }
                                                <address className="author" key={index}>{author.title}</address>
                                            </div>
                                        </>
                                    ))
                                : undefined
                            }
                            </div>
                            
                        </Col>

                        <Col>
                        </Col>
                    </Row>
                </Container>

            </article>
        </>
    )
}