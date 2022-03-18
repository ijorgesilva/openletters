import React from 'react'
import { Button, Badge } from 'react-bootstrap'
import { connectRefinementList, Highlight } from 'react-instantsearch-dom'

const RefinementList = ({
    items,
    currentRefinement,
    refine,
    isFromSearch,
    createURL,
    translations,
    currentFilters, // Show current refinements applied
}) => (
    <>
        <div>
            {
                currentFilters ?
                    <div>{translations.filters} {currentRefinement.join(', ')}</div>
                :
                    undefined
            }
            {
                items.map( ( _, index ) => (
                    <Button 
                        className   = {`${index != 0 || index != items.length ? 'ml-1 mb-1' : 'mb-1'}`}
                        variant     = {`${ _.isRefined ? 'dark' : 'outline-dark' }`}
                        size        = 'sm'
                        key         = {_.label}
                        href        = {createURL(_.value)}
                        style       = {{ fontWeight: _.isRefined ? 'bold' : '' }}
                        title       = { `${_.count} ${translations.entriesFound}`}
                        onClick     =   {
                                            event => {
                                                event.preventDefault()
                                                refine(_.value)
                                            }
                                        }
                        pill
                    >
                        {
                            isFromSearch ? 
                                <Highlight attribute='label' hit={_} />
                        : 
                            _.label
                        }{' '}
                        <Badge bg='secondary'>({_.count})</Badge>
                    </Button>
                ))
            }
        </div>
    </>
)


const CustomRefinementList = connectRefinementList(RefinementList)
export default CustomRefinementList