'use client';

import {ApolloLink, HttpLink} from '@apollo/client';

import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
  SSRMultipartLink,
} from '@apollo/client-integration-nextjs';

// Make an appollo client to call rick and morty graphql api
function makeClient() {
  const httpLink = new HttpLink({
    uri: 'https://rickandmortyapi.com/graphql',
  });

  // Added SSR and multipart support here even though app isn't making use of it
  return new ApolloClient({
    cache: new InMemoryCache(),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            // when SSR, if @defer is used, lets to strip all interfaces that have the directive from the query.
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

export function ApolloWrapper({children}: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
