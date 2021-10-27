/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
 const path = require("path");

 const urljoin = require("url-join");

 const config = require("./data/SiteConfig");
 
//  require('dotenv').config()
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
 
     title: config.siteTitle,
     titleTemplate: "%s"+' '+config.separator+' '+config.siteTitle,
     description: config.siteDescription,
     url: process.env.SITE_URL,
     image: config.siteLogo,
     twitterUsername: config.twitterUsername,
 
     rssMetadata: {
       site_url: urljoin(process.env.SITE_URL, process.env.PATH_PREFIX),
       feed_url: urljoin(process.env.SITE_URL, process.env.PATH_PREFIX, config.siteRss),
       title: config.siteTitle,
       description: config.siteDescription,
       image_url: `${urljoin(
         process.env.SITE_URL,
         process.env.PATH_PREFIX
       )}/logos/logo-512.png`,
       copyright: config.copyright
     }
   },
 
   /* Your site config here */
   plugins: [

        /*
        * Functions
        */
        `gatsby-plugin-styled-components`, // REMOVE
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
            name: config.siteTitle,
            short_name: config.siteTitleShort,
            description: config.siteDescription,
            start_url: `/${process.env.PATH_PREFIX.replace(/^\/|\/$/g, "")}`,
            background_color: config.backgroundColor,
            theme_color: config.themeColor,
            display: "standalone", //minimal-ui
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
            develop: {
              hardCacheMediaFiles: true,
            },
            schema: {
              perPage: 100, // currently set to 100
              requestConcurrency: 100, // currently set to 5
              previewRequestConcurrency: 100, // currently set to 2
            },
            debug: {
              graphql: {
                writeQueriesToDisk: true,
                showQueryVarsOnError: true,
              },
            },
            type: {
              Post: {
                limit: 5000,
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
              trackingId: config.googleAnalyticsID,
              anonymize: true
            },
            facebookPixel: {
              pixelId: config.facebookPixel,
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
            matchFields: ['slug', 'modified'],
            enablePartialUpdates: true,
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
 