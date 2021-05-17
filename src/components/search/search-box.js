// Dependencies
import React from 'react'
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { connectSearchBox } from 'react-instantsearch-dom'

export default connectSearchBox(
  ({ refine, currentRefinement, className, onFocus, placeholder }) => (
    <form className={className}>
      <input
        className     = "SearchInput"
        type          = "text"
        placeholder   = {placeholder}
        aria-label    = {placeholder}
        onChange      = {e => refine(e.target.value)}
        value         = {currentRefinement}
        onFocus       = {onFocus}
      />
      <FontAwesomeIcon 
        icon={faSearch} 
        size="lg" 
        className="SearchIcon"
      />
    </form>
  )
)