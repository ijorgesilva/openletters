// Dependencies
import React from 'react'
import { Link } from 'gatsby'

// Components
import './paginationBasic.scss'

export default function paginationBasic( {className, pages, slug} ) {

    const { currentPage, numberPages } = pages
    const isFirst = currentPage === 1
    const isLast = currentPage === numberPages
    const prevPage = (currentPage - 1 === 1) ? '' : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()
    const maxPages = 10


    return (
        <nav className={`paginationBasic ${className}`} aria-label="navigation">
            <ul className="pagination">
                {!isFirst && (
                    <li className="page-item">
                        <Link className="page-link" to={`${slug}/${prevPage}`} rel="prev">
                            ←
                        </Link>
                    </li>
                )}
                {
                    (numberPages < maxPages) ?
                        Array.from({ length: numberPages }, (_, i) => (
                            <li className={`page-item ${(currentPage === i+1)? 'active': undefined }`}>
                                <Link className="page-link" key={`pagination-number${i + 1}`} 
                                    to={`${slug}/${i === 0 ? "" : i + 1}`}
                                >
                                {i + 1}
                                </Link>
                            </li>
                        ))
                    : 
                        <li className={`page-item active`}>
                            <Link className="page-link" key={`pagination-number${currentPage}`} 
                                to={`${slug}/${currentPage}`}
                            >
                            {currentPage}
                        </Link>
                </li>
                }
                
                {
                    (numberPages !== undefined) ?
                        !isLast && (
                            <li className="page-item">
                                <Link className="page-link" to={`${slug}/${nextPage}`} rel="next">
                                    →
                                </Link>
                            </li>
                        )
                    : undefined
                }
            </ul>
        </nav>
    )
}