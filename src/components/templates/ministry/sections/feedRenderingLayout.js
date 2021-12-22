import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import ReactPaginate from 'react-paginate'

import BlurbVertical from '../../../blurb/blurbVertical'

import './feedRenderingLayout.scss'

export default function FeedRenderingLayout (
    {
        nodes,
        layoutType,
        id,
        containerWidth,
        size,
        className,
        mode,
        itemsPerPage,
        // Sidebars
        sidebar,
        // Aspect
        itemClass,
        orientation,
        truncate,
        truncateLines,
        aspectRatio,
        imageFit,
        imagePosition,
        border,
        borderColor,
        stretchedlink,
        gap,
        // Visibility
        hideTitle,
        hideSubtitle,
        hideExcerpt,
        hideImage,
        hideButton,
    }
) {
    let items = nodes?.list
    let itemsPP = itemsPerPage ? itemsPerPage : 3

    const { t } = useTranslation()

    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPP;
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPP));
    }, [itemOffset, itemsPP]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPP) % items.length;
        setItemOffset(newOffset);
    };

    switch (layoutType) {
        case 'default':{
            return(
                <section  id = {id} className = {`feedLayout ${ layoutType ? layoutType+'-layout' : ''} ${ size ? size : ''} ${ className ? className : ''} ${ mode ? mode : 'light' }`}>
                    <Container fluid = { containerWidth === 'container' ? false : true } className='columns'>
                        {
                            sidebar?.left ?
                                <div className='sidebar-left'>{sidebar.left}</div>
                            :
                                undefined
                        }
                        <div className = {`main ${ gap ? gap : '' }`}>
                            <Items 
                                currentItems={currentItems} 
                                // Aspect
                                mode                = { mode }
                                orientation         = { `${ orientation ? orientation : 'horizontal'}` }
                                truncate            = { truncate }
                                truncateLines       = { truncateLines }
                                className           = { `${ itemClass ? itemClass : '' }` }
                                imagePosition       = { imagePosition }
                                imageFit            = { imageFit }
                                aspectRatio         = { aspectRatio }
                                border              = { border }
                                borderColor         = { borderColor }
                                // Button Behavior
                                // removeDefaultCss    = { removeDefaultCss }
                                stretchedlink       = { stretchedlink }
                                // Visibility
                                hideTitle           = { hideTitle }
                                hideSubtitle        = { hideSubtitle }
                                hideExcerpt         = { hideExcerpt }
                                hideImage           = { hideImage }
                                hideButton          = { hideButton }
                            />
                            <nav aria-label="Page navigation example">
                                <ReactPaginate
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={5}
                                    pageCount={pageCount}
                                    nextLabel={t('global.next')}
                                    previousLabel={t('global.previous')}
                                    renderOnZeroPageCount={null}
                                    // Class Assignment
                                    containerClassName="pagination"
                                    breakClassName="page-item"
                                    breakLabel={<a className="page-link">...</a>}
                                    pageClassName="page-item"
                                    previousClassName="page-item"
                                    nextClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousLinkClassName="page-link"
                                    nextLinkClassName="page-link"
                                    activeClassName="active"
                                />
                            </nav>
                        </div>
                        {
                            sidebar?.right ?
                                <div className='sidebar-right'>{sidebar.right}</div>
                            :
                                undefined
                        }
                    </Container>
                </section>
            )
        }
    
        default:{
            return(
                <>
                </>
            )
        }
    }

}

function Items(
{ 
        currentItems,
        itemType,
        mode,
        orientation,
        truncate,
        truncateLines,
        itemClass,
        imagePosition,
        imageFit,
        aspectRatio,
        border,
        borderColor,
        stretchedlink,
        hideTitle,
        hideSubtitle,
        hideExcerpt,
        hideImage,
        hideButton,
}) {
    return (
      <>
        {currentItems &&
          currentItems.map((_, index) => (

            <BlurbVertical
                key                 = { index }
                itemType            = { itemType }
                image               = { _.image }
                title               = { _.title }
                subtitle            = { _.subtitle }
                content             = { _.excerpt }
                buttons             = { _.buttons }
                // Aspect
                mode                = { mode }
                orientation         = { orientation }
                truncate            = { truncate }
                truncateLines       = { truncateLines }
                className           = { itemClass }
                imagePosition       = { imagePosition }
                imageFit            = { imageFit }
                aspectRatio         = { aspectRatio }
                border              = { border }
                borderColor         = { borderColor }
                // Button Behavior
                // removeDefaultCss    = { removeDefaultCss }
                stretchedlink       = { stretchedlink }
                // Visibility
                hideTitle           = { hideTitle }
                hideSubtitle        = { hideSubtitle }
                hideExcerpt         = { hideExcerpt }
                hideImage           = { hideImage }
                hideButton          = { hideButton }
            />
          ))}
      </>
    );
}