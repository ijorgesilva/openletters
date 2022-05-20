<h1 align="center">
  OpenLetters.io
</h1><br/>
<p align="center" style="font-size: 1.2rem;">Openletters is a Gatsby.js project that allows multi-campus organizations to manage content complexity and while retaining flexibility. </p>

## Development 

### Dependencies

- Node v14.17
- gatsby-cli
- python3 pip3

### Environment file

`.env.production` is used when `gatsby build` is run, and `.env.development` when `gatsby develop` is used.
Use `.env.example` as a guideline for both .env files.

### Run project

Start gatsby on specific port:
`gatsby develop --host 0.0.0.0 --port 8000`
App <http://localhost:8000>
GraphiQL <http://localhost:8000/__graphiql>

Start only the GraphQL playground
`$ GATSBY_GRAPHQL_IDE=playground gatsby develop`
[Source](https://github.com/gatsbyjs/gatsby/issues/5801#issuecomment-395786936)

### Docker

Ports:
Development: 8001
Production: 80

### Development
There are different ways to setup a development volume with different trade-offs. The one included on this project only links the source files. This will require to rebuild the container when a new package is installed:
`docker-compose up --build`

Run in development: `docker-compose up`

### Production
The only difference is the port mapping. To run the production docker container run: 
`docker-compose -f docker-compose.prod.yml up`
Add the build tag if you have updated your gatsby website.
`docker-compose -f docker-compose.prod.yml up --build`
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
