import moment from 'moment'
import React from 'react'
import Helmet from "react-helmet"
import urljoin from "url-join"

export default function SEO({ postNode, postPath, postSEO }){
    let title, description, image, postURL

    if (postSEO) {
        const postMeta = postNode.frontmatter;
        ({ title } = postMeta);
        description = postMeta.description
          ? postMeta.description
          : postNode.excerpt;
        image = postMeta.cover;
        postURL = urljoin( process.env.SITE_URL, process.env.PATH_PREFIX, postPath);
    } else {
        title = process.env.SITE_TITLE;
        description = process.env.SITE_DESCRIPTION;
        image = process.env.SITE_IMAGE;
    }

    const getImagePath = imageURI => {
        if (
          !imageURI.match(
            `(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]`
          )
        )
          return urljoin( process.env.SITE_URL, process.env.PATH_PREFIX, imageURI);
  
        return imageURI;
    }

    const getPublicationDate = () => {
        if (!postNode) return null;
  
        if (!postNode.frontmatter) return null;
  
        if (!postNode.frontmatter.date) return null;
  
        return moment(postNode.frontmatter.date, process.env.DATE_FROM_FORMAT).toDate();
    }

    image = getImagePath(image)

    const datePublished = getPublicationDate();

    const authorJSONLD = {
        "@type": "Person",
        name: process.env.USER_NAME,
        email: process.env.USER_EMAIL,
        address: process.env.USER_LOCATION
    }

    const logoJSONLD = {
        "@type": "ImageObject",
        url: getImagePath(process.env.SITE_IMAGE)
    }

    const blogURL = urljoin( process.env.SITE_URL, process.env.PATH_PREFIX)

    const schemaOrgJSONLD = [
        {
          "@context": "http://schema.org",
          "@type": "WebSite",
          url: blogURL,
          name: title,
          alternateName: process.env.SITE_TITLEAlt ? process.env.SITE_TITLEAlt : ""
        }
    ]

    if (postSEO) {
        schemaOrgJSONLD.push(
          {
            "@context": "http://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: {
                  "@id": postURL,
                  name: title,
                  image
                }
              }
            ]
          },
          {
            "@context": "http://schema.org",
            "@type": "BlogPosting",
            url: blogURL,
            name: title,
            alternateName: process.env.SITE_TITLEAlt ? process.env.SITE_TITLEAlt : "",
            headline: title,
            image: { "@type": "ImageObject", url: image },
            author: authorJSONLD,
            publisher: {
              ...authorJSONLD,
              "@type": "Organization",
              logo: logoJSONLD
            },
            datePublished,
            description
          }
        )
    }
    
    return (
        <Helmet>
            {/* General tags */}
            <meta name="description" content={description} />
            <meta name="image" content={image} />

            {/* Schema.org tags */}
            <script type="application/ld+json">
                {JSON.stringify(schemaOrgJSONLD)}
            </script>

            {/* OpenGraph tags */}
            <meta property="og:url" content={postSEO ? postURL : blogURL} />
            {postSEO ? <meta property="og:type" content="article" /> : null}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta
                property="fb:app_id"
                content={process.env.siteFBAppID ? process.env.siteFBAppID : ""}
            />

            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta
                name="twitter:creator"
                content={process.env.userTwitter ? process.env.userTwitter : ""}
            />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/**/}
            <meta charSet="utf-8" />
        </Helmet>
    )
}