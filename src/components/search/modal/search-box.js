import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'

export default connectSearchBox(
  ({ refine, currentRefinement, className, onFocus, placeholder, innerRef }) => (
    <form  className={`${ className ? className : ''}`}>
      <label className='sr-only' htmlFor='inlineFormInputGroup'>
      </label>
      <div className='input-group mb-2'>
        <div className='input-group-prepend'>
          <div className='input-group-text'>
            <FontAwesomeIcon 
              icon      = {faSearch} 
              size      = 'lg'
              className = {`SearchIcon`}
            />
          </div>
        </div>
        <input
          className     = {`SearchInput form-control`}
          type          = 'text'
          placeholder   = {placeholder}
          aria-label    = {placeholder}
          onChange      = {e => refine(e.target.value)}
          value         = {currentRefinement}
          onFocus       = {onFocus}
          ref           = { innerRef }
        />
      </div>
    </form>
  )
)