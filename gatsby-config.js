/*
 * Configure your Gatsby site with this file.
 * https://www.gatsbyjs.org/docs/gatsby-config/
 */
const path = require("path");

require('dotenv').config({
  path: `.env${ (process.env.NODE_ENV === 'development' ) ? '.development' : (process.env.NODE_ENV) ? '.'+process.env.NODE_ENV : ''}`
})

module.exports = {

    flags: {
      FAST_DEV: true,
      PRESERVE_FILE_DOWNLOAD_CACHE: process.env.PRESERVE_FILE_DOWNLOAD_CACHE || false,
      PARALLEL_SOURCING: true,
      // LMDB_STORE: true,
    },
  
    pathPrefix: process.env.PATH_PREFIX === "" ? "/" : process.env.PATH_PREFIX,
  
    siteMetadata: {
      siteUrl: process.env.SITE_URL,
      title: process.env.SITE_TITLE,
      titleTemplate: "%s"+' '+process.env.SITE_SEPARATOR+' '+process.env.SITE_TITLE,
      description: process.env.SITE_DESCRIPTION,
      url: process.env.SITE_URL,
      image: process.env.SITE_IMAGE,
    },
  
    /* Your site config here */
    plugins: [

        /*
         * Functions
         */
        "gatsby-plugin-react-helmet", 
        {
          resolve: `gatsby-plugin-sass`
        },
        {
          resolve: `gatsby-plugin-layout`,
          options: {
            component: `${__dirname}/src/components/layouts/index.js`
          }
        },

        /*
         * Sources & Assets
         */
        {
          resolve: `gatsby-source-wordpress`,
          options: {
            url: process.env.WPGRAPHQL_URL,
            verbose: true,
            schema: {
              perPage: process.env.SCHEMA_PER_PAGE || 50,
              requestConcurrency: process.env.SCHEMA_REQUEST_CONCURRENCY || 50,
              previewRequestConcurrency: process.env.SCHEMA_PREVIEW_REQUEST_CONCURRENCY || 2,
              timeout: process.env.SCHEMA_TIMEOUT || 120000,
            },
            debug: {
              graphql: {
                writeQueriesToDisk: false,
                showQueryVarsOnError: false,
              },
            },
            type: {
              __all: {
                limit: process.env.LIMIT_ALL || null,
              },
            },
          },
        },

        {
          resolve: `gatsby-source-filesystem`,
          options: {
            name: `images`,
            path: path.join(__dirname, `src`, `assets`),
          },
        },

        /*
         * Analytics
         */
        {
          resolve: `gatsby-plugin-gdpr-cookies`,
          options: {
            googleAnalytics: {
              trackingId: process.env.GOOGLE_TRACKING_ID || '',
              anonymize: true
            },
            facebookPixel: {
              pixelId: process.env.FACEBOOK_PIXEL || '',
            },
            environments: ['production', 'development']
          },
        },

        /*
         * Image Processing
         */
        `gatsby-plugin-image`,
        `gatsby-transformer-sharp`,
        {
          resolve: `gatsby-plugin-sharp`,
          options: {
            defaults: {},// Defaults used for gatsbyImageData and StaticImage
            failOnError: false, // Set to false to allow builds to continue on image errors
            stripMetadata: true,
            defaultQuality: 50,
            // useMozJpeg: process.env.GATSBY_JPEG_ENCODER === `MOZJPEG`,
          },
        },

        /*
         * SEO related
         */
        {
          resolve: `gatsby-plugin-canonical-urls`,
          options: {
            siteUrl: process.env.GATSBY_SITE_CANONICAL_URL,
            stripQueryString: true,
          },
        },
        {
          resolve: 'gatsby-plugin-robots-txt',
          options: {
            host: process.env.SITE_URL,
            policy: [
            { userAgent: '*', allow: '/' }
            ]
          }
        },
        `gatsby-plugin-sitemap`,

        /*
         * Algolia
         * This plugin must be placed last in your list of plugins to ensure that it can query all the GraphQL data
         */
        {
          resolve: `gatsby-plugin-algolia`,
          options: {
            appId: process.env.GATSBY_ALGOLIA_APP_ID,
            apiKey: process.env.ALGOLIA_ADMIN_KEY,
            queries: require("./src/utils/algolia-queries"),
            matchFields: ['slug', 'modified', 'campus'],
            enablePartialUpdates: process.env.ALGOLIA_PARTIAL_UPDATES || true,
            chunkSize: 10000,
          },
        },

        /*
        * Redirect
        * Must be the last in the array
        */
        `gatsby-plugin-meta-redirect`,
          
  ],
}