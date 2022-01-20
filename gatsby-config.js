/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
const path = require("path");

const urljoin = require("url-join");
 
require('dotenv').config({
  path: `.env${ (process.env.NODE_ENV === 'development' ) ? '.development' : (process.env.NODE_ENV) ? '.'+process.env.NODE_ENV : ''}`
})

 module.exports = {
 
   flags: {
     FAST_DEV: true,
   },
 
   pathPrefix: process.env.PATH_PREFIX === "" ? "/" : process.env.PATH_PREFIX,
 
   siteMetadata: {
     siteUrl: process.env.SITE_URL,
 
     title: process.env.SITE_TITLE,
     titleTemplate: "%s"+' '+process.env.SITE_SEPARATOR+' '+process.env.SITE_TITLE,
     description: process.env.SITE_DESCRIPTION,
     url: process.env.SITE_URL,
     image: process.env.SITE_IMAGE,
     twitterUsername: process.env.TWITTER_USERNAME,
 
     rssMetadata: {
       site_url: urljoin(process.env.SITE_URL, process.env.PATH_PREFIX),
       feed_url: urljoin(process.env.SITE_URL, process.env.PATH_PREFIX, process.env.SITE_RSS),
       title: process.env.SITE_TITLE,
       description: process.env.SITE_DESCRIPTION,
       image_url: `${urljoin(
         process.env.SITE_URL,
         process.env.PATH_PREFIX
       )}/logos/logo-512.png`,
       copyright: process.env.SITE_COPYRIGHT
     }
   },
 
   /* Your site config here */
   plugins: [

        /*
        * Functions
        */
        "gatsby-plugin-react-helmet", 
        {
          resolve: `gatsby-plugin-sass`,
          options: {
            implementation: require("node-sass"),
          },
        },
        {
          resolve: `gatsby-plugin-layout`,
          options: {
          component: `${__dirname}/src/components/layouts/index.js`
        }
        },
        {
          resolve: "gatsby-plugin-manifest",
          options: {
            name: process.env.SITE_TITLE,
            short_name: process.env.SITE_TITLE,
            description: process.env.SITE_DESCRIPTION,
            start_url: `/${process.env.PATH_PREFIX.replace(/^\/|\/$/g, "")}`,
            background_color: `#${process.env.MANIFEST_THEME_COLOR}`,
            theme_color: `#${process.env.MANIFEST_THEME_BACKGROUND_COLOR}`,
            display: "standalone",
            icon: `src/assets/img/logo.png`,
            icons: [
              {
                src: "/logos/logo-192.png",
                sizes: "192x192",
                type: "image/png"
              },
              {
                src: "/logos/logo-512.png",
                sizes: "512x512",
                type: "image/png"
              }
            ]
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
                writeQueriesToDisk: true,
                showQueryVarsOnError: true,
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
              trackingId: process.env.GOOGLE_TRACKING_ID,
              anonymize: true
            },
            facebookPixel: {
              pixelId: process.env.FACEBOOK_PIXEL,
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
            failOnError: true, // Set to false to allow builds to continue on image errors
            stripMetadata: true,
            defaultQuality: 60,
            // useMozJpeg: process.env.GATSBY_JPEG_ENCODER === `MOZJPEG`,
          },
        },

        /*
        * SEO related
        */
        {
          resolve: `gatsby-plugin-canonical-urls`,
          options: {
            siteUrl: process.env.SITE_CANONICAL_URL,
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
        * Search: Algolia
        * Description: This plugin must be placed last in your list of plugins to ensure that it can query all the GraphQL data
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
 