import Fuse from 'fuse.js'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
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
        filtering,
        navigation,
    }
) {
    const { t } = useTranslation()

    let itemList = items?.list
    
    const flexConfig = {
        display: 'flex',
        gap: gap.includes('-') ? `${gap?.split('-')[1]}rem` : '1rem',
        flexDirection: direction ? direction : 'row',
        justifyContent: justification ? justification : 'flex-start',
        alignItems: stretchedBlurb ? 'stretch' : 'flex-start',
        alignContent: stretchedBlurb ? 'stretch' : 'flex-start',
    }

    // Sorting
        // Search
        const [query, updateQuery] = useState('')
        function onSearch({ currentTarget }) {
            updateQuery(currentTarget.value)
        }
        const fuse = new Fuse(itemList, {
            keys: [
                'name',
                'company',
                'species'
            ],
            includeScore: true
        })
        const results = fuse.search(query)
        const itemResults = results.map(_ => _)


    // Pagination
    let itemsPP = navigation?.itemsPerPage ? navigation.itemsPerPage : 12
    const [currentItems, setCurrentItems] = useState(null)
    const [pageCount, setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0)

    useEffect(() => {
        const endOffset = itemOffset + itemsPP
        setCurrentItems(itemList.slice(itemOffset, endOffset))
        setPageCount(Math.ceil(itemList.length / itemsPP))
    }, [itemOffset, itemsPP])

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPP) % itemList.length
        setItemOffset(newOffset)
    }
    
    console.log({filtering, itemResults})
    // console.log({navigation, items})
    // console.log({name:`${itemType}`,items})

    return (
        <section 
            id          = {id}
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
                        <div>
                            <input type='text' value={query} onChange={onSearch} />
                        </div>
                    : undefined
                }

                <div className='items' style={flexConfig}>
                    {/* {
                        filtering ? 
                            itemResults?.map( ( _, index ) => (

                            ))
                        : undefined
                            
                    } */}
                    {
                        navigation?.pagination ?
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
                            ( itemList?.length > 0 ) ?
                                itemList.map( (_, index) => (
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
                                undefined
                    }
                </div>

                {
                    navigation?.pagination ?
                        <nav className='mt-2'>
                            <ReactPaginate
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={5}
                                pageCount={pageCount}
                                nextLabel={t('global.next')}
                                previousLabel={t('global.previous')}
                                renderOnZeroPageCount={null}
                                // Class Assignment
                                containerClassName='pagination'
                                breakClassName='page-item'
                                breakLabel={<a className='page-link'>...</a>}
                                pageClassName='page-item'
                                previousClassName='page-item'
                                nextClassName='page-item'
                                pageLinkClassName='page-link'
                                previousLinkClassName='page-link'
                                nextLinkClassName='page-link'
                                activeClassName='active'
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