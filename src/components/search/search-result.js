// Dependencies
import { Link } from 'gatsby'
import { Badge } from 'react-bootstrap'
import { default as React } from 'react'
import { useTranslation } from 'react-i18next'
import {
            connectStateResults,
            Highlight,
            Hits,
            Index,
            Snippet,
            RefinementList
        } from 'react-instantsearch-dom'

const HitCount = connectStateResults(({ searchResults }) => {

  const hitCount = searchResults && searchResults.nbHits

  return hitCount > 0 ? (
    <div className="HitCount">
      {hitCount} result{hitCount !== 1 ? `s` : ``}
    </div>
  ) : null

})

function ShowPageType ( { type } ) {

  /* Standard fields */
  const { t } = useTranslation()

  switch(type){
    case 'vod':
      return <Badge variant="primary">{t('global.watch.videos')}</Badge>
      break
    case 'series':
      return <Badge variant="dark">{t('global.watch.series')}</Badge>
      break
    case 'page':
      return <Badge variant="info">{t('global.pages.name')}</Badge>
      break
    case 'events':
      return <Badge variant="info">{t('global.events.title')}</Badge>
      break
    case 'news':
      return <Badge variant="info">{t('global.news.title')}</Badge>
      break
    default:
      return ''
  }

}

function PageHit ( { hit } ) {

  /* Standard fields */
  const { t } = useTranslation()

  return (
      <div>

        <Link to={hit.link}>
          {
            (hit.type) ? 
                <ShowPageType type={hit.type} />
            : 
              undefined
          }
          <h4>
            <Highlight attribute="title" hit={hit} tagName="mark" />
          </h4>
        </Link>

        <Snippet attribute="excerpt" hit={hit} tagName="mark" />

        <div className="tags">
          {
              ( hit.campus ) ? 
                  <div className="tag">
                    {t('global.campus')}{' '} <span>{hit.campusTitle}</span>
                  </div>
              : 
                undefined
          }
          {
              ( hit.series ) ?
                <div className="tag">
                  {t('global.watch.series')}{' '}<span><Highlight attribute="series" hit={hit} tagName="mark" /></span>
                </div>
              :
                undefined
          }
        </div>

      </div>
  )
}

const HitsInIndex = ({ index }) => (

  <Index indexName={index.name}>
    <HitCount />
    <Hits className="Hits" hitComponent={PageHit} />
  </Index>

)

const SearchResult = ({ indices, className }) => (

  <div className={className}>

    <RefinementList 
      attribute="type"
      limit={20}
    />

    {
      indices.map(index => (
        <HitsInIndex index={index} key={index.name} />
      ))
    }

  </div>

)

export default SearchResult