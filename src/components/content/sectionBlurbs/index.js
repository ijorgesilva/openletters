import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Fuse from 'fuse.js'
import React, { useEffect, useState } from 'react'
import { Container, Form, InputGroup, FormControl, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import ReactPaginate from 'react-paginate'

import BlurbVertical from '../../blurb/blurbVertical'
import Background from '../../UI/background'

import './sectionBlurbs.scss'
/**
 * @param  {String} id
 * @param  {String} title
 * @param  {String} content
 * @param  {String} className
 * @param  {String} mode: 'light', 'dark'
 * @param  {} containerWidth
 * @param  {} backgroundLayers
 * @param  {} size
 * @param  {} orientation
 * @param  {} items
 * @param  {} itemType
 * @param  {} imagePosition
 * @param  {} imageFit
 * @param  {} aspectRatio
 * @param  {} itemClass
 * @param  {} truncate
 * @param  {} truncateLines
 * @param  {} direction
 * @param  {} gap
 * @param  {} justification
 * @param  {} stretchedLink
 * @param  {} stretchedBlurb
 * @param  {} border
 * @param  {} borderColor
 * @param  {} itemGrow
 * @param  {Boolean} hideImage
 * @param  {Boolean} hideTitle
 * @param  {Boolean} hideSubtitle
 * @param  {Boolean} hideExcerpt
 * @param  {Boolean} hideButton
 * @param  {Boolean} navigation
 * @param  {Object} filtering
 */
export default function SectionBlurbs ( 
    { 
        id, title, content, className, mode, containerWidth, backgroundLayers,
        // Configuration
        size, orientation, items, itemType, imagePosition, imageFit, aspectRatio, itemClass, truncate, truncateLines, direction, gap, justification, stretchedLink, stretchedBlurb, border, borderColor, itemGrow,
        // Visibility
        hideImage, hideTitle, hideSubtitle, hideExcerpt, hideButton,
        // Navigation, Filtering and Sorting
        filtering, navigation,
    }
) {
    const { t } = useTranslation()

    let itemList = items?.list

    // Pagination
    const [currentItems, setCurrentItems] = useState(null)
    const [pageCount, setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0)
    // Search Queries
    const [query, updateQuery] = useState('') 

    let itemsPP = navigation?.itemsPerPage ? navigation.itemsPerPage : 12
    const endOffset = itemOffset + itemsPP

    const flexConfig = {
        display: 'flex',
        gap: gap.includes('-') ? `${gap?.split('-')[1]}rem` : '1rem',
        flexDirection: direction ? direction : 'row',
        justifyContent: justification ? justification : 'flex-start',
        alignItems: stretchedBlurb ? 'stretch' : 'flex-start',
        alignContent: stretchedBlurb ? 'stretch' : 'flex-start',
    }

    const searchOptions = {
        keys: [
            {
                name: 'title',
                weight: 0.9,
            },
            {
                name: 'subtitle',
                weight: 0.7,
            },
            {
                name: 'excerpt',
                weight: 0.6,
            },
            {
                name: 'tags',
                weight: 0.1,
            },
        ],
        includeScore: true,
    }

    const fuse = new Fuse(itemList, searchOptions)
    const resultsQuery = fuse.search(query)
    const liveQueryResults = query != '' ? resultsQuery.map( _ => _.item ) : itemList

    useEffect(() => {
        if ( !navigation?.pagination && !filtering ) {
            setCurrentItems(itemList)
        }
        else {
            // TODO: Reset listing when query === '', currently not working as expected.
            if( query != '' ) {
                setCurrentItems(liveQueryResults.slice(itemOffset, endOffset))
                setPageCount(Math.ceil(liveQueryResults.length / itemsPP))
            } 
            if( query === '' ) {
                setCurrentItems( itemList.slice(itemOffset, endOffset ) )
                setPageCount(Math.ceil( itemList.length / itemsPP ) )
            }
        }
    }, [ itemOffset, itemsPP, query, pageCount, liveQueryResults ])

    const handlePageClick = ( event ) => {
        const newOffset = (event.selected * itemsPP) % itemList.length
        setItemOffset(newOffset)
    }

    function onSearch( { currentTarget } ) {
        updateQuery(currentTarget.value)
        setItemOffset(0)
        setPageCount( Math.ceil( liveQueryResults.length / itemsPP ) )
    }


    return (
        <section 
            id          = { id}
            className   = {`sectionBlurbs ${ size ? size : ''}  ${ className ? className : ''} ${ mode ? mode : 'light' }`}
        >
            <Container fluid = { containerWidth === 'container' ? undefined : true }>

                {
                    ( title || content ) ?
                        <div className='general'>
                            {
                                title ?
                                    <h2 className='title' dangerouslySetInnerHTML={{__html: title}}></h2>
                                :
                                    undefined
                            }
                            { 
                                content ?
                                    <div className='content' dangerouslySetInnerHTML={{__html: content}}></div>
                                :
                                    undefined
                            }
                        </div>
                    :
                        undefined
                }

                {
                    filtering ? 
                        <Form>
                            <Form.Row className='align-items-center'>
                                <Col xs='auto'>
                                    <Form.Label htmlFor='inlineFormInputGroup' srOnly>
                                        {t('global.search.placeholder')}
                                    </Form.Label>
                                    <InputGroup 
                                    >
                                        <InputGroup.Append>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon 
                                                    icon      = {faSearch} 
                                                    size      = 'lg'
                                                    className = {`SearchIcon ${ ( mode ) ? mode : 'light'}`}
                                                />
                                            </InputGroup.Text>
                                        </InputGroup.Append>
                                        <FormControl 
                                            id='inlineFormInputGroup'
                                            className     = {`SearchInput ${ mode ? mode : 'light'}`}
                                            type          = 'text'
                                            placeholder   = { t('global.search.placeholder') }
                                            aria-label    = { t('global.search.placeholder') }
                                            value         = { query }
                                            onChange      = { onSearch }
                                            aria-describedby = 'search'
                                        />
                                    </InputGroup>
                                </Col>
                            </Form.Row>
                        </Form>
                    : undefined
                }

                <div className = 'items' style = {flexConfig}>
                    {
                        query === '' ?
                        currentItems?.map( (_, index) => (
                            <BlurbVertical
                                key                 = { index }
                                image               = { _.image }
                                title               = { _.title }
                                subtitle            = { _.subtitle }
                                content             = { _.excerpt }
                                tags                = { _.tags }
                                style               = { { maxWidth: stretchedBlurb ? '100%' : '320px', } }
                                
                                itemType            = { itemType }
                                mode                = { mode }
                                buttons             = { _.buttons }

                                counter             = { index + 1 }
                                orientation         = { orientation }
                                
                                truncate            = { truncate }
                                truncateLines       = { truncateLines }
                                stretchedlink       = { stretchedLink }
                                className           = { `${ _.cssClass ? _.cssClass : ''} ${ itemClass ? itemClass : '' }` }
                                removeDefaultCss    = { _.itemCssRemoveDefault }
                                aspectRatio         = { aspectRatio }
                                imageFit            = { imageFit }
                                imagePosition       = { imagePosition }
                                border              = { border }
                                borderColor         = { borderColor }
                                itemGrow            = { itemGrow }
                                // Visibility
                                hideImage           = { hideImage }
                                hideTitle           = { hideTitle }
                                hideSubtitle        = { hideSubtitle }
                                hideExcerpt         = { hideExcerpt }
                                hideButton          = { hideButton }
                            />
                        ))
                        :
                        currentItems?.map( (_, index) => (
                            <BlurbVertical
                                key                 = { index }
                                image               = { _.image }
                                title               = { _.title }
                                subtitle            = { _.subtitle }
                                content             = { _.excerpt }
                                tags                = { _.tags }
                                style               = { { maxWidth: stretchedBlurb ? '100%' : '320px', } }
                                
                                itemType            = { itemType }
                                mode                = { mode }
                                buttons             = { _.buttons }

                                counter             = { index + 1 }
                                orientation         = { orientation }
                                
                                truncate            = { truncate }
                                truncateLines       = { truncateLines }
                                stretchedlink       = { stretchedLink }
                                className           = { `${ _.cssClass ? _.cssClass : ''} ${ itemClass ? itemClass : '' }` }
                                removeDefaultCss    = { _.itemCssRemoveDefault }
                                aspectRatio         = { aspectRatio }
                                imageFit            = { imageFit }
                                imagePosition       = { imagePosition }
                                border              = { border }
                                borderColor         = { borderColor }
                                itemGrow            = { itemGrow }
                                // Visibility
                                hideImage           = { hideImage }
                                hideTitle           = { hideTitle }
                                hideSubtitle        = { hideSubtitle }
                                hideExcerpt         = { hideExcerpt }
                                hideButton          = { hideButton }
                            />
                        ))
                    }
                </div>

                {
                    navigation?.pagination ?
                        <nav className='mt-2'>
                            <ReactPaginate
                                onPageChange            = { handlePageClick }
                                pageRangeDisplayed      = {5}
                                pageCount               = { pageCount }
                                nextLabel               = { t('global.next') }
                                previousLabel           = { t('global.previous') }
                                renderOnZeroPageCount   = {null}
                                // Class Assignment
                                containerClassName      = 'pagination'
                                breakClassName          = 'page-item'
                                breakLabel              = {<a className='page-link'>...</a>}
                                pageClassName           = 'page-item'
                                previousClassName       = 'page-item'
                                nextClassName           = 'page-item'
                                pageLinkClassName       = 'page-link'
                                previousLinkClassName   = 'page-link'
                                nextLinkClassName       = 'page-link'
                                activeClassName         = 'active'
                                forcePage               = { query ? 0 : undefined }
                            />
                        </nav>
                    : undefined
                }

            </Container>

            <Background
                layers  = { backgroundLayers }
            />

        </section>
    )
}