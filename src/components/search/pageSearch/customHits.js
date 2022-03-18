import React from 'react'
import { connectHits } from 'react-instantsearch-dom'

import Hit from './hit'

const Hits = (
    { 
        hits,
        mode,
        buttonText,
    }
) => (
  <div className='hits'>
    {hits.map( ( _, index ) => (
        <Hit 
            key     = { index }
            hit     = { _ }
            mode    = { mode }
            buttonText  = { buttonText }
        />
    ))}
  </div>
)

const CustomHits = connectHits(Hits);
export default CustomHits