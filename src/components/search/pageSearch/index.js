import algoliasearch from 'algoliasearch/lite'
import React, { useMemo } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import {
    InstantSearch,
    Configure,
    connectStateResults,
} from 'react-instantsearch-dom'

import AlertEmptyState from '../../alert/alertEmptyState'

// import CustomSortBy from './customSortBy'
import CustomClearRefinements from './customClearRefinements'
import CustomHits from './customHits'
import CustomPagination from './customPagination'
import CustomRefinementList from './customRefinementList'
import CustomSearchBox from './customSearchBox'

import './pageSearch.scss'

export default function PageSearch ( 
    {
        containerWidth,
        className,
        id,
        size,
        mode, 
        campus,
        indices, 
        hitsPerPage,
        buttonText,
    } 
) {

    const { t } = useTranslation()

    const translations = {
        'page': t('global:global.page'),
        'of': t('global:global.of'),
        'first': t('global:global.first'),
        'last': t('global:global.last'),
        'next': t('global:global.next'),
        'previous': t('global:global.previous'),
        'searchTitle': t('global:global.search.title'),
        'searchTitleEllipsis': t('global:global.search.search-title-ellipsis'),
        'stalled': t('global:global.search.stalled'),
        'noResults': t('global:global.search.no-results'),
        'submitTitle': t('global:global.search.submit-title'),
        'resetTitle': t('global:global.search.reset-title'),
        'placeholder': t('global:global.search.placeholder'),
        'showLess': t('global:global.search.show-less'),
        'showMore': t('global:global.search.show-more'),
        'noResultsFor': t('global:global.search.no-results-for'),
        'filters': t('global:global.search.filters'),
        'filterByCampus': t('global:global.search.filter-by-campus'),
        'filterBySpeaker': t('global:global.search.filter-by-speaker'),
        'entriesFound': t('global:global.search.entries-found'),
    }

    const searchClient = useMemo(
        () =>
          algoliasearch(
            process.env.GATSBY_ALGOLIA_APP_ID,
            process.env.GATSBY_ALGOLIA_SEARCH_KEY
          ),
        []
    )

    return (
        <section id = {id} className = {`pageSearch ${ size ? size : 'md'} ${ className ? className : ''} ${ mode ? mode : 'light' }`}>
            <Container fluid = { containerWidth === 'container' ? undefined : true }>
                <InstantSearch 
                    indexName       = { indices } 
                    searchClient    = { searchClient }
                >
                    <Row>

                        <Col xs={12} md={2} lg={2}>
                            <h5 className='mb-1 text-muted'>{translations.filters}</h5>
                            <hr className='mb-1 mt-1' />
                            <h6 className='font-weight-bold text-muted mb-1'>{translations.filterByCampus}</h6>
                            <CustomRefinementList 
                                attribute               = 'campus'
                                defaultRefinement       = {[campus]} 
                                translations            =  { translations }
                                showMore
                            />
                            <hr className='mb-1 mt-1' />
                            <h6 className='font-weight-bold text-muted mb-1'>{translations.filterBySpeaker}</h6>
                            <CustomRefinementList 
                                attribute       = 'speakers'
                                translations    = { translations }
                                showMore
                            />
                            <hr className='mb-1 mt-1' />

                            <CustomClearRefinements
                                translations = { translations }
                            />

                            <Configure 
                                hitsPerPage     = { hitsPerPage ? hitsPerPage : 8 } 
                            />

                        </Col>

                        <Col xs={12} md={10} lg={10}>
                            <CustomSearchBox 
                                autoFocus               = {true}
                                showLoadingIndicator    = {true}
                                translations            = { translations }
                                mode                    = { mode }
                            />
                            <Results
                                mode            = { mode }
                                translations    = { translations }
                            >
                                <CustomHits 
                                    mode        = { mode }
                                    buttonText  = { buttonText }
                                />
                                <CustomPagination 
                                    defaultRefinement   = { 1 } // The value of the page selected by default (Optional).
                                    mode                = { mode }
                                    translations        = { translations }
                                    center              = { false }
                                />
                            </Results>
                        </Col>
                        
                    </Row>
                </InstantSearch>
            </Container>
        </section>
    )

}

const Results = connectStateResults(
    ({ searchState, searchResults, children, mode, translations }) =>
      searchResults && searchResults.nbHits !== 0 ? (
        children
      ) : (
        <AlertEmptyState 
            mode        = { mode } 
            className   = 'ml-0 mt-1' 
            content     = {`${translations.noResultsFor} ${searchState.query}`} 
        /> //.
      )
  );