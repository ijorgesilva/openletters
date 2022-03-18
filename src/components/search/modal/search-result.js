import { Link } from 'gatsby'
import { default as React } from 'react'
import { 
          Col, Row, Tab, Nav, Card, Button, 
        } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import {
            connectStateResults,
            Highlight,
            Hits,
            Index,
            Snippet,
            RefinementList
        } from 'react-instantsearch-dom'

const HitCount = connectStateResults( ({ searchResults, showText, badge }) => {
  const hitCount = searchResults && searchResults.nbHits
  const { t } = useTranslation()
  return hitCount > 0 ? (
    <span className ={`hitcount ${ badge ? 'badge badge-light' : ''}`}>
      {
        hitCount ? hitCount : '0'
      } 
      {
        showText ?
          hitCount !== 1 ? ` ${ t('global:global.search.results') }` : ` ${ t('global:global.search.result') }`
        : undefined
      }
    </span>
  ) : null
})

function PageHit ( { hit, stretchedLink, hideLink, mode } ) {

  const { t } = useTranslation()

  return (
      <Card className='result'
        bg={ `${ mode ? mode : 'light' }`}
        text={ `${ mode ? mode : 'black' }`}
      >
        <Card.Body>
          <Card.Title>
            <Highlight attribute='title' hit={hit} tagName='mark' />
            {
              hit.series ?
                <span> | <strong><Highlight attribute='series' hit={hit} tagName='mark' /></strong></span>
              : undefined
            }
          </Card.Title>
          <Card.Text>
            <Snippet attribute='excerpt' hit={hit} tagName='mark' />
          </Card.Text>
          <Button 
            className = {`${ stretchedLink ? 'stretched-link' : 'stretched-link' } ${ hideLink ? 'hide' : '' }`}
            as = { Link }
            variant = 'outline-dark'
            to = {hit.link}
          >
            {t('global.read_more')}
          </Button>
        </Card.Body>

        {
          hit.campus ? 
            <Card.Footer>
                <small className='text-muted'>
                  {t('global.campus')}{' '}<strong>{hit.campusTitle}</strong>
                </small>
                <small className='text-muted'>
                  {
                    hit.speakers ?
                      <>
                        {
                          hit.speakers.length > 1 ?
                            `${hit.campus ? ' | ' : ''}${t('global.speakers')} `
                          : `${hit.campus ? ' | ' : ''}${t('global.speaker')} `
                        }
                        <strong>
                          {hit.speakers.map ( ( _, index ) => (
                              <>
                                {index ? ', ': ''}
                                <span className="user-select-none"  key={ index }>
                                    {_}
                                </span>
                              </>
                            )
                          )}
                        </strong>
                      </>
                    : undefined
                  }
                </small>
            </Card.Footer>
          : undefined
        }
      </Card>
  )
}

const HitsInIndex = ({ index }) => (
  <Index indexName={index.name}>
    {/* <HitCount showText /> */}
    <Hits className='hits' stretchedLink hideLink hitComponent={PageHit} />
  </Index>
)

const HitsInIndexTab = ({ index }) => (
  <Index indexName={index.name}>
    {index.title} <HitCount badge />
  </Index>
)

const SearchResult = ({ indices, className, mode }) => (

  <div className={ `searchResults ${ className ? className : '' } ${ mode ? mode : 'light' }`}>
    <RefinementList 
      attribute='type'
      limit={20}
    />
    <Tab.Container id='' defaultActiveKey='series'>
        <Row>
          <Col className='indices' sm={2}>

            <Nav variant='pills' className='flex-column'>
            {
              indices.map(index => (
                <Nav.Item key = {index.name} >
                  <Nav.Link eventKey={index.name}>
                    <HitsInIndexTab index={index} key={index.name} />
                  </Nav.Link>
                </Nav.Item>
              ))
            }
            </Nav>
          </Col>

          <Col className='results' sm={10}>
            <Tab.Content>
              {
                indices.map(index => (
                    <Tab.Pane key = {index.name} eventKey={index.name}>
                      <HitsInIndex index={index} key={index.name} />
                    </Tab.Pane>
                ))
              }
            </Tab.Content>
          </Col>

        </Row>
    </Tab.Container>
  </div>
)

export default SearchResult