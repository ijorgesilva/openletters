// Dependencies
import React, {useState} from "react"
import { useStaticQuery, graphql } from 'gatsby'
import { Dropdown, Modal } from 'react-bootstrap'
import { useTranslation } from "react-i18next"
import IframeResizer from "iframe-resizer-react"
import './netSimple.scss'

// Components

export default function NetSimple( { className, drop, variant, ...props} ) {

    /* Standard fields */
    const { t } = useTranslation()

    const data = useStaticQuery(graphql`
        query{
            handraise: file(relativePath: {eq: "img/global/icon-handraised-white.svg"}) {
                publicURL
            }
            noImage: file(relativePath: {eq: "img/global/noimage.jpg"}) {
                childImageSharp {
                    fluid {
                        src
                    }
                }
            }
            knowjesus: file(relativePath: {eq: "img/global/icon-cross-white.svg"}) {
                publicURL
            }
            prayrequest: file(relativePath: {eq: "img/global/icon-handstogether-white.svg"}) {
                publicURL
            }
            praisereport: file(relativePath: {eq: "img/global/icon-handsup-white.svg"}) {
                publicURL
            }
            connect: file(relativePath: {eq: "img/global/icon-group-white.svg"}) {
                publicURL
            }
            serve: file(relativePath: {eq: "img/global/icon-handholding-white.svg"}) {
                publicURL
            }
        }
    `)
    
    const options = [
        {
            title: t('components.button.netSimple-know-jesus'),
            icon: data.knowjesus.publicURL,
            iframeUrl: "https://cms.victorychur.ch/form/global-feedback/"
        },
        {
            title: t('components.button.netSimple-pray-request'),
            icon: data.prayrequest.publicURL,
            iframeUrl: "https://cms.victorychur.ch/form/global-feedback/"
        },
        {
            title: t('components.button.netSimple-praise-report'),
            icon: data.praisereport.publicURL,
            iframeUrl: "https://cms.victorychur.ch/form/global-feedback/"
        },
        {
            title: t('components.button.netSimple-connect'),
            icon: data.connect.publicURL,
            iframeUrl: "https://cms.victorychur.ch/form/global-feedback/"
        },
        {
            title: t('components.button.netSimple-serve'),
            icon: data.serve.publicURL,
            iframeUrl: "https://cms.victorychur.ch/form/global-feedback/"
        }
    ]
    

    // Create initial state
    // let initialState

    // const [show, setShow] = useState();

    // function openModal(id){
    //    setShow( {id: id, state: true} );
    // }
    // function closeModal(id){
    //    setShow( {id: id,state: false} )
    // }

    const dropDirection = (drop) ? drop : 'up'
    const variantClass = (variant) ? variant : 'dark'
    
    return (
        <>
            <Dropdown className={`netSimple ${className} ${variantClass}`} drop={dropDirection}>

                <Dropdown.Toggle id="Share" variant="none" >
                    <img src={data.handraise.publicURL} alt={t('components.button.netSimple-title')} />
                </Dropdown.Toggle>

                <Dropdown.Menu className="">
                    {
                        options.map( (option, index) => (
                            <Dropdown.Item href="#" eventKey={index} key={index}>
                                <img src={option.icon} alt={option.title} /> {option.title}
                            </Dropdown.Item>
                        ))
                    }
                </Dropdown.Menu>

            </Dropdown>

            {/* {
                options.map((option, index)=>(
                    <Modal id={index} show={show} onHide={handleClose(index)} animation={false}>
                        <Modal.Header closeButton>
                        <Modal.Title>{option.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <IframeResizer src={option.iframeUrl} style={{minHeight: "600px", minWidth: '100%', width: '1px'}} frameborder="0" />
                        </Modal.Body>
                    </Modal>
                ))
            } */}


        </>
        
    )
}