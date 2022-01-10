import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'

const SearchBox = (
    { 
        mode,
        currentRefinement,
        isSearchStalled,
        refine,
        translations,
    }
) => (
    <>
        <nav className= {`navbar navbar-${mode?mode:'light'} bg-${mode?mode:'light'} p-0`}>
            <form className = 'form-inline mb-1' noValidate action='' role='search'>
                <input
                    type        = 'search'
                    value       = {currentRefinement}
                    onChange    = {event => refine(event.currentTarget.value)}
                    className   = 'form-control mr-1'
                    aria-label  = {translations.searchTitleEllipsis}
                    placeholder = {translations.searchTitleEllipsis}
                />
                <button 
                    className   = 'btn btn-outline-secondary'
                    onClick     = {() => refine('')}
                >
                    <FontAwesomeIcon icon={faSearch} size='md' /> { translations.searchTitle }
                </button>
            </form>
        </nav>
        {
            isSearchStalled ? 
                <div className={`text-muted ${mode?mode:'light'}`} role='alert'>
                    {translations.stalled}
                </div>
            : 
                undefined
        }
    </>

)
  
const CustomSearchBox = connectSearchBox(SearchBox);
export default CustomSearchBox