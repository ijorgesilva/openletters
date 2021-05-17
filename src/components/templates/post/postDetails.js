// Dependencies
import React from 'react'
import { useTranslation } from "react-i18next"
import { Container, Row, Col } from 'react-bootstrap'

// Components
import { getDate } from '../../utils/utils'
import Navigation from '../../menu/navigation'
import HeroPost from '../../../components/hero/heroPost'
import HeaderPage from '../../headerPage'
import TagSimple from '../../tag/tagSimple'
import ToolbarDetails from '../../toolbar/toolbarDetails'
import MenuPage from '../../menu/menuPage'
import FooterSimpleText from '../../footer/footerSimpleText'
import config from '../../../../data/SiteConfig'
import './postDetails.scss'

export default function PostDetails( { location, pageContext } ){
    
    const { title, excerpt, date, modified, featuredImage, content, terms, postDetails, breadcrumbs } = pageContext

    /* Standard fields */
    const { t } = useTranslation()
    
    const htmlDate = (modified) ? getDate(modified,2,'us','yyyy-MM-dd' ) : getDate(date,2,'us','yyyy-MM-dd' )
    const createdDate = getDate(date,2,'us','LLLL d, yyyy' )
    const modifiedDate = getDate(modified,2,'us','LLLL d, yyyy' )

    const cover = ( featuredImage?.node?.localFile?.localFile ) ?
                        featuredImage.node.localFile.localFile.childImageSharp.gatsbyImageData.images.fallback.src
                    :
                        undefined

    const searchIndices = [{ name: `vod`, title: `Messages` }, { name: `pages`, title: `Pages`} ]
    
    return (
        <>

            <HeaderPage 
                title       = { title + ' | ' + t('global.blog.title') }
                location    = { location } 
                cover       = { cover }
                description = { ( excerpt ) ? excerpt : excerpt}
                article     = { true }
            />
            
            <Navigation
                location        = { location }
                campus          = { breadcrumbs.campus }
                searchIndices   = { searchIndices }
                menuGlobal
                menuLocal
            />
            
            <MenuPage
                menuBrand   =   { 
                                    {
                                        'link': breadcrumbs.rootApp,
                                        'name': t('global.blog.title')
                                    }
                                }
                menu        =   { 
                                    [
                                        {
                                            name: "News", 
                                            link: '/' + breadcrumbs.campus + '/' + config.newsPostDetailsSlug, 
                                            as: "", 
                                            target: ""
                                        }
                                    ]
                                }
            />

            <article className="contentMain mb-5">

                <HeroPost 
                    title           = { title }
                    backgroundPhoto =   {
                                            ( featuredImage?.node?.localFile ) ? 
                                                featuredImage.node.localFile.childImageSharp.gatsbyImageData
                                            : 
                                                undefined
                                        }
                    className       = "z-index-0"
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

                            <div dangerouslySetInnerHTML={{__html: content}}></div>
                            {
                                ( terms ) ?
                                    <TagSimple terms={terms} />
                                :
                                    undefined
                            }

                            {
                                ( config.blogShowDates ) ?
                                    <div className="createdDate user-select-none">
                                        { 
                                            (modifiedDate) ? 
                                                <time datetime={htmlDate}> {t('global.modified-on')} {modifiedDate} </time> 
                                            : 
                                                <time datetime={htmlDate}> {t('global.created-on')} {createdDate} </time>
                                        }
                                    </div>
                                :
                                    undefined
                            }
                            

                            <div className="authors">
                                {   
                                    (postDetails.postAuthor) ?
                                        postDetails.postAuthor.map( (author, index) => (
                                            <>
                                                <div className="author">
                                                    {
                                                        (author.featuredImage) ? 
                                                            <></>
                                                            // <Img className="photo" fluid={author.featuredImage.node.localFile.childImageSharp.fluid} alt={author.title} />
                                                        : 
                                                            undefined
                                                    }
                                                    <address className="author" key={index}>{author.title}</address>
                                                </div>
                                            </>
                                        ))
                                    : 
                                        undefined
                                }
                            </div>
                            
                        </Col>

                        <Col>
                        </Col>
                    </Row>
                </Container>

            </article>

            <FooterSimpleText campus={ breadcrumbs.campus } />
            
        </>
    )
}