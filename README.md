# Multipurpose Church Website

## Dependencies

- Node v14.17.1
- Gatsby CLI 4.11.2 | npm install -g gatsby@4.11.2

## Develop command

Start only the GraphQL playground
`$ GATSBY_GRAPHQL_IDE=playground gatsby develop`
[Source](https://github.com/gatsbyjs/gatsby/issues/5801#issuecomment-395786936)

Start gatsby on specific port:
`gatsby develop --host 0.0.0.0 --port 8000`

## Responsiveness

Is being managed by include-media.js
<https://www.npmjs.com/package/include-media>

## Component Library

### Storybook

Component Library.
`$ npm run storybook`

## Search

Handle by Algolia. Requires an account and the API keys to be added to .env
When changing the data structure on algolia-queries.js, change the `enablePartialUpdates` to false, to allow the index to be reconstructed.
`enablePartialUpdates: false`

## Additional Notes

*Date formats*: All dates are YYYYMMDD.
