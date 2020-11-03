/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
const urljoin = require("url-join");
const path = require("path");
const config = require("./data/SiteConfig");

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
})

module.exports = {
  
  pathPrefix: config.pathPrefix === "" ? "/" : config.pathPrefix,

  siteMetadata: {
    siteUrl: urljoin(config.siteUrl, config.pathPrefix),

    title: config.siteTitle,
    titleTemplate: "%s"+' '+config.separator+' '+config.siteTitle,
    description: config.siteDescription,
    url: config.siteUrl,
    image: config.siteLogo,
    twitterUsername: config.twitterUsername,

    rssMetadata: {
      site_url: urljoin(config.siteUrl, config.pathPrefix),
      feed_url: urljoin(config.siteUrl, config.pathPrefix, config.siteRss),
      title: config.siteTitle,
      description: config.siteDescription,
      image_url: `${urljoin(
        config.siteUrl,
        config.pathPrefix
      )}/logos/logo-512.png`,
      copyright: config.copyright
    }
  },

  /* Your site config here */
  plugins: [
        "gatsby-plugin-react-helmet", 
        "node-sass", 
        "gatsby-plugin-sass", 
        {
          resolve: `gatsby-plugin-layout`,
          options: {
            component: `${__dirname}/src/components/layouts/index.js`
          }
        },    
        {
          resolve: `gatsby-source-filesystem`,
          options: {
            name: `images`,
            path: path.join(__dirname, `src`, `assets`),
          },
        },
        {
          resolve: `gatsby-source-wordpress-experimental`,
          options: {
            url:
              process.env.WPGRAPHQL_URL ||
              config.wordpressUri,
            verbose: true,
            develop: {
              hardCacheMediaFiles: true,
            },
            debug: {
              graphql: {
                writeQueriesToDisk: true,
                showQueryVarsOnError: true,
              },
            },
            type: {
              Post: {
                limit:
                  process.env.NODE_ENV === `development`
                    ? // Lets just pull 50 posts in development to make it easy on ourselves.
                      10
                    : // and we don't actually need more than 5000 in production for this particular site
                      400,
              },
            },
          },
        },
        {
          resolve: "gatsby-plugin-manifest",
          options: {
            name: config.siteTitle,
            short_name: config.siteTitleShort,
            description: config.siteDescription,
            start_url: config.pathPrefix,
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
        {
          resolve: `gatsby-plugin-offline`,
          options: {
            precachePages: [`/`], // Add here the pages that will be working offline
          },
        },
        {
          resolve: `gatsby-plugin-gdpr-cookies`,
          options: {
            googleAnalytics: {
              trackingId: config.googleAnalyticsID,
              anonymize: true
            },
            facebookPixel: {
              pixelId: 'Y'
            },
            environments: ['production', 'development']
          },
        },
        `gatsby-transformer-sharp`,
        {
          resolve: `gatsby-plugin-sharp`,
          options: {
            useMozJpeg: false,
            stripMetadata: true,
            defaultQuality: 75,
          },
        },
        {
          resolve: `gatsby-plugin-canonical-urls`,
          options: {
            siteUrl: config.siteUrl,
            stripQueryString: true,
          },
        },
        {
          resolve: `gatsby-plugin-s3`,
          options: {
            bucketName: process.env.S3_BUCKET_NAME
          }
        },
        `gatsby-plugin-client-side-redirect` // Important: Keep it last
  ],
}
