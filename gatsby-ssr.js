/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
import React from 'react'
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import fetch from 'isomorphic-fetch'
const config = require("./data/SiteConfig");

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        fetch,
        uri: config.wordpressUri,
    })
  });

export const wrapRootElement = ( {element} ) => (
    <ApolloProvider client={client}>{element}</ApolloProvider>
)