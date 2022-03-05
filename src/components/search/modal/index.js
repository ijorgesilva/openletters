import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import algoliasearch from 'algoliasearch/lite'
import { createRef, default as React, useState, useMemo } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { InstantSearch } from 'react-instantsearch-dom'

import SearchBox from './search-box'
import SearchResult from './search-result'
import useClickOutside from './use-click-outside'

import './searchModal.scss'

export default function SearchModal ( 
  { 
    indices, 
    mode 
  } 
) {

  const { t } = useTranslation()

  const rootRef = createRef()
  const [query, setQuery] = useState()
  const [hasFocus, setFocus] = useState(false)
  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
      ),
    []
  )
  useClickOutside(rootRef, () => setFocus(false))

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
      <div className={`searchModal ${ mode ? mode : 'light'}`}>

          <Button 
            variant = { `${ mode ? mode : 'light'}` }
            onClick = { handleShow }
            title   = { t('global.search.placeholder') }
          >
            <FontAwesomeIcon 
              icon      = {faSearch} 
              size      = 'lg'
              className = {`searchIcon`}
            />
          </Button>

          <Modal 
            className=''
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
                  placeholder   = { t('global.search.placeholder') }
                />
                <SearchResult
                  show          = { query && query.length > 0 && hasFocus }
                  indices       = { indices }
                />
              </InstantSearch>
              {/* End Instant Search */}
            </Modal.Body>
          </Modal>
      </div>

  )
}
