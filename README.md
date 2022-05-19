<h1 align="center">
  OpenLetters.io
</h1><br/>
<p align="center" style="font-size: 1.2rem;">Openletters is a Gatsby.js project that allows multi-campus organizations to manage content complexity and while retaining flexibility. </p>

## Development 

### Environment file

`.env.production` is used when `gatsby build` is run, and `.env.development` when `gatsby develop` is used.
Use `.env.example` as a guideline for both .env files.

### Run project

Start gatsby on specific port:
`gatsby develop --host 0.0.0.0 --port 8000`

Start only the GraphQL playground
`$ GATSBY_GRAPHQL_IDE=playground gatsby develop`
[Source](https://github.com/gatsbyjs/gatsby/issues/5801#issuecomment-395786936)

### Search Functions

The global search is managed by Algolia. An account is required to be setup and env variables need to setup to work.

#### Algolia

Handle by Algolia. Requires an account and the API keys to be added to .env
When changing the data structure on algolia-queries.js, change the `enablePartialUpdates` to false, to allow the index to be reconstructed.
`enablePartialUpdates: false`

### Sass Library for Responsiveness

Is being managed by include-media.js
<https://www.npmjs.com/package/include-media>
### Dateformats
All dates are YYYYMMDD.
### UI Components visualization
Managed by Storybooks (<https://storybook.js.org/>).
`$ npm run storybook`

## LICENSE

MIT
