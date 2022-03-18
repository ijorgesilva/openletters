import React from 'react'
import { connectCurrentRefinements } from 'react-instantsearch-dom'

const ClearRefinements = (
    { 
        items, 
        refine,
        translations,
    }
) => (
  <button
    className='btn btn-outline-secondary'
    onClick={() => refine(items)} disabled={!items.length}
  >
    {translations.resetTitle}
  </button>
)

const CustomClearRefinements = connectCurrentRefinements(ClearRefinements)
export default CustomClearRefinements