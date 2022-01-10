import React from 'react'
import { connectPagination } from 'react-instantsearch-dom'

const Pagination = (
  {
    mode, 
    currentRefinement, // Current Page
    nbPages, // Total Number of pages
    refine, // State Management
    createURL, // Construct Page based on currentRefinement Number
    translations, // Object (Required): with 
    firstPageButton, // Show First Page button If explicitly false the button will not render
    lastPageButton, // Show Last Page button If explicitly false the button will not render
    nextButton, // If explicitly false the button will not render
    previousButton, // If explicitly false the button will not render
    showCurrentIndicator, // If explicitly false the button will not render
    itemLimit, // Determine how many elements should be visible
    center,
    className,
  }
) => (

  <nav className={`${ center ? 'd-flex flex-column align-items-center' : ''} ${className ? className : ''}`}>
    <ul className={`pagination ${ mode ? mode : 'light' }`}>
      {
        !firstPageButton ?
          <li className={`page-item ${ currentRefinement === 1 ? 'disabled' : ''}`}> 
            <a
              className={`page-link`}
              href    = {createURL(1)}
              onClick = {event => {
                          event.preventDefault()
                          refine(1)
                        }}
              title = {translations.first}
            >
              {translations.first}
            </a>
          </li>
        :
          undefined
      }
      {
        !previousButton ?
          <li className={`page-item ${ currentRefinement === 1 ? 'disabled' : ''}`}> 
            <a
              className={`page-link`}
              href    = {createURL(currentRefinement-1)}
              onClick = {event => {
                          event.preventDefault()
                          refine(currentRefinement-1)
                        }}
              title = {translations.previous}
            >
              {'<'}
            </a>
          </li>
        :
          undefined
      }
      {
        new Array(nbPages).fill(null).map((_, index) => {
          const page = index + 1
          const limit = itemLimit ? itemLimit : 10
           // TODO: Flimsy logic when previous items is less than 3 and last item not showing previous pages.
          let nextPages = 
                          currentRefinement === 1 ? // Current Page is the first page, show the next N elements
                            6
                          :
                            currentRefinement === nbPages ? // Last page, don't show next pages
                              0 
                            : 
                              currentRefinement + 3 // Middle Page, show current Page + N pages
          let previousPages =  
                            currentRefinement === nbPages ? // Current Page is the last page, show the previous last N pages
                              nbPages - 5
                            :
                              currentRefinement <= 1 ? // First Page, dont show previous pages
                                0 
                              : 
                                currentRefinement - 3 // Middle Page, show current Page - N pages
          return (
            <>
              {
                // TODO: DRY Page Item
                // Show All if Total Pages is under the Limit/itemLimit
                nbPages <= limit ?
                  <li className='page-item' key={index}>
                    <a
                      className={`page-link ${ currentRefinement === page ? 'active' : ''}`}
                      href    = {createURL(page)}
                      onClick = {event => {
                                  event.preventDefault()
                                  refine(page)
                                }}
                    >
                      {page}
                    </a>
                  </li>
                :
                  // Show Current Page Always
                  currentRefinement === page ? 
                    <li className={`page-item  ${ currentRefinement === page ? 'active' : ''}`} key={index}>
                      <a
                        className={`page-link ${ currentRefinement === page ? 'active' : ''}`}
                        href    = {createURL(page)}
                        onClick = {event => {
                                    event.preventDefault()
                                    refine(page)
                                  }}
                      >
                        {page}
                      </a>
                    </li>
                  :
                    // Main Logic for Previous and Next Pages
                    page < nextPages && page > previousPages  ?
                      <li className='page-item' key={index}>
                        <a
                          className={`page-link`}
                          href    = {createURL(page)}
                          onClick = {event => {
                                      event.preventDefault()
                                      refine(page)
                                    }}
                        >
                          {page}
                        </a>
                      </li>
                    :
                      undefined
              }
            </>
          )

        })
      }
      {
        !nextButton ?
          <li className={`page-item ${ currentRefinement >= nbPages ? 'disabled' : ''}`}> 
            <a
              className={`page-link`}
              href    = {createURL(currentRefinement+1)}
              onClick = {event => {
                          event.preventDefault()
                          refine(currentRefinement+1)
                        }}
              title   = {translations.next}
            >
              {'>'}
            </a>
          </li>
        :
          undefined
      }
      {
        !lastPageButton ?
          <li className={`page-item ${ currentRefinement === nbPages ? 'disabled' : ''}`}> 
            <a
              className={`page-link`}
              href    = {createURL(nbPages)}
              onClick = {event => {
                          event.preventDefault()
                          refine(nbPages)
                        }}
              title = {translations.last}
            >
              {translations.last}
            </a>
          </li>
        :
          undefined
      }
    </ul>
    {
      !showCurrentIndicator ?
        <span className='text-muted'>
          {`${translations.page} ${currentRefinement} ${translations.of} ${nbPages}`}
        </span>
      :
        undefined
    }
  </nav>
)

const CustomPagination = connectPagination(Pagination)
export default CustomPagination