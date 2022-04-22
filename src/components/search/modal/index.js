import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import algoliasearch from 'algoliasearch/lite'
import { default as React, useState, useMemo, useRef, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { InstantSearch } from 'react-instantsearch-dom'

import SearchBox from './search-box'
import SearchResult from './search-result'

import './searchModal.scss'

export default function SearchModal ( 
  { 
    indices, 
    mode 
  } 
) {

  const { t } = useTranslation()

  /* Algolia */
  const [query, setQuery] = useState()
  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
      ),
    []
  )

  /* Auto focus */
  const innerRef = useRef();
  useEffect(() => innerRef.current && innerRef.current.focus())

  /* Modal */
  const [show, setShow] = useState(false)
  function handleClose () { setShow(false) }
  function handleShow () { setShow(true) }

  return (
      <div className={`searchModal ${ mode ? mode : 'light'}`}>

          <Button 
            variant = { `${ mode ? mode : 'light'}` }
            title   = { t('global.search.placeholder') }
            onClick = { handleShow }
          >
            <FontAwesomeIcon 
              icon      = {faSearch} 
              size      = 'lg'
              className = {`searchIcon`}
            />
          </Button>

          <Modal 
            className={`modalRoot ${ mode ? 'mode' : 'light'}`}
            show={show} onHide={handleClose} animation={false}
          >
            <Modal.Header closeButton />
            <Modal.Body>
              {/* Instant Search */}
              <InstantSearch
                searchClient        = {searchClient}
                indexName           = {indices[0].name}
                onSearchStateChange = {({ query }) => setQuery(query)}
              >
                <SearchBox 
                  innerRef      = { innerRef }
                  placeholder   = { t('global.search.placeholder') }
                />
                <SearchResult
                  show          = { query && query.length > 0 }
                  indices       = { indices }
                />
              </InstantSearch>
              {/* End Instant Search */}
            </Modal.Body>
          </Modal>
      </div>

  )
}
