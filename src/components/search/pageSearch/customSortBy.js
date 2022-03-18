import React from 'react'
import { connectSortBy } from 'react-instantsearch-dom'

/*
    Source: https://www.algolia.com/doc/api-reference/widgets/sort-by/react/
 */
const SortBy = (
    {
        items, 
        refine, 
        createURL 
    }
) => (
  <ul>
    {
        items.map( _ => (
            <li key = { _.value }>
                <a
                    href    = {createURL(_.value)}
                    style   = {{ fontWeight: _.isRefined ? 'bold' : '' }}
                    onClick =   {
                                    event => {
                                        event.preventDefault();
                                        refine(_.value);
                                    }
                                }
                >
                    {_.label}
                </a>
            </li>
        ))
    }
  </ul>
);

const CustomSortBy = connectSortBy(SortBy)
export default CustomSortBy