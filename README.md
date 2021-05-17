## Develop command
Allow to be accesed locally:
`$ gatsby develop -H $HOSTNAME -p 8000`

Start only the GraphQL playgorund
`$ GATSBY_GRAPHQL_IDE=playground gatsby develop`
[Source](https://github.com/gatsbyjs/gatsby/issues/5801#issuecomment-395786936)

## Responsiveness
Is being managed by include-media.js
https://www.npmjs.com/package/include-media

## Component Library
`$ npm run storybook`

## Search
Handle by Algolia. Requires an account and the API keys to be added to .env
When changing the data structure on algolia-queries.js, change the `enablePartialUpdates` to false, to allow the index to be reconstructed.
`enablePartialUpdates: false`

## Notes
*Date formats*: All dates are YYYYMMDD.
