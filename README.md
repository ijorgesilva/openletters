### Start develop server for local network access
<!-- Source https://github.com/gatsbyjs/gatsby/issues/5801#issuecomment-395786936 -->

## Develop command
`$ gatsby develop -H $HOSTNAME -p 8000`

## Incoming date format
All the dates received and query with graphql are YYYYMMDD. This helps to correctly order and posterior formating with getDate function (utils.js) and moment.js.

## Responsiveness and breakpoints with include-media
https://www.npmjs.com/package/include-media

## Run Storybook
`$ npm run storybook`

## Deploy to S3
`$ npm run build && npm run deploy`
S3 credentials and backet name can be found on .env.production
- Gatsby plugin: https://www.gatsbyjs.com/plugins/gatsby-plugin-s3/
- Recipe: https://github.com/jariz/gatsby-plugin-s3/blob/master/recipes/with-dotenv.md